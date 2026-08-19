import { writeFileSync } from 'node:fs';

const [revisionArg='0', checkpoint='A_NORMAL', output='/tmp/heliocide.png'] = process.argv.slice(2);
const revision = Number(revisionArg);
const port = Number(process.env.HELIOCIDE_CDP_PORT || 9227);
const base = process.env.HELIOCIDE_BASE_URL || 'http://127.0.0.1:4173';
const pageUrl = `${base}/?revision=${revision}&checkpoint=${encodeURIComponent(checkpoint)}&deterministic=1`;
const endpoint = `http://127.0.0.1:${port}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

async function openTarget() {
  const response = await fetch(`${endpoint}/json/new?${encodeURIComponent(pageUrl)}`, { method: 'PUT' });
  if (!response.ok) throw new Error(`CDP target creation failed: ${response.status}`);
  return response.json();
}

const target = await openTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('CDP websocket open timeout')), 10000);
  ws.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('CDP websocket error')); }, { once: true });
});

let sequence = 0;
const pending = new Map();
const browserErrors = [];
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
    return;
  }
  if (message.method === 'Runtime.exceptionThrown') browserErrors.push(message.params?.exceptionDetails?.text || 'Runtime exception');
  if (message.method === 'Log.entryAdded' && message.params?.entry?.level === 'error') browserErrors.push(message.params.entry.text);
});

function send(method, params={}) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    pending.set(id, { resolve, reject });
    ws.send(JSON.stringify({ id, method, params }));
  });
}

await send('Page.enable');
await send('Runtime.enable');
await send('Log.enable');
await send('Emulation.setDeviceMetricsOverride', { width: 1600, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: pageUrl });

let metrics = null;
for (let attempt = 0; attempt < 100; attempt += 1) {
  await sleep(100);
  const result = await send('Runtime.evaluate', {
    expression: 'JSON.stringify(window.__HELIOCIDE_METRICS__ ?? null)',
    returnByValue: true
  });
  const value = result?.result?.value;
  if (value && value !== 'null') {
    metrics = JSON.parse(value);
    if (metrics.frames >= 30) break;
  }
}
if (!metrics || metrics.frames < 30) throw new Error('Runtime metrics never reached 30 deterministic frames');

const shot = await send('Page.captureScreenshot', { format: 'png', fromSurface: true, captureBeyondViewport: false });
writeFileSync(output, Buffer.from(shot.data, 'base64'));
const evidence = { pageUrl, revision, checkpoint, metrics, browserErrors };
writeFileSync(output.replace(/\.png$/i, '.json'), JSON.stringify(evidence, null, 2));
const failed = Boolean(metrics.errors?.length || browserErrors.length);
if (failed) console.error(JSON.stringify(evidence));
else console.log(JSON.stringify({ revision, checkpoint, frames: metrics.frames, p95: metrics.p95, output }));
ws.close();
setTimeout(() => process.exit(failed ? 2 : 0), 100);
