import { writeFileSync } from 'node:fs';

const [revisionArg='0', checkpoint='A_NORMAL', output='/tmp/heliocide.png'] = process.argv.slice(2);
const revision = Number(revisionArg);
const port = Number(process.env.HELIOCIDE_CDP_PORT || 9227);
const base = process.env.HELIOCIDE_BASE_URL || 'http://127.0.0.1:4173';
const pageUrl = `${base}/?revision=${revision}&checkpoint=${encodeURIComponent(checkpoint)}&deterministic=1`;
const endpoint = `http://127.0.0.1:${port}`;
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const commandTimeoutMs = Number(process.env.HELIOCIDE_CDP_COMMAND_TIMEOUT_MS || 10000);

async function openTarget() {
  const response = await fetch(`${endpoint}/json/new?${encodeURIComponent(pageUrl)}`, {
    method: 'PUT',
    signal: AbortSignal.timeout(commandTimeoutMs)
  });
  if (!response.ok) throw new Error(`CDP target creation failed: ${response.status}`);
  return response.json();
}

const target = await openTarget();
const ws = new WebSocket(target.webSocketDebuggerUrl);
await new Promise((resolve, reject) => {
  const timer = setTimeout(() => reject(new Error('CDP websocket open timeout')), commandTimeoutMs);
  ws.addEventListener('open', () => { clearTimeout(timer); resolve(); }, { once: true });
  ws.addEventListener('error', () => { clearTimeout(timer); reject(new Error('CDP websocket error')); }, { once: true });
});

let sequence = 0;
const pending = new Map();
const browserErrors = [];
const browserWarnings = [];
ws.addEventListener('message', (event) => {
  const message = JSON.parse(event.data);
  if (message.id && pending.has(message.id)) {
    const { resolve, reject } = pending.get(message.id);
    pending.delete(message.id);
    if (message.error) reject(new Error(message.error.message)); else resolve(message.result);
    return;
  }
  if (message.method === 'Runtime.exceptionThrown') {
    browserErrors.push({
      source: 'runtime',
      text: message.params?.exceptionDetails?.text || 'Runtime exception',
      url: message.params?.exceptionDetails?.url || ''
    });
  }
  if (message.method === 'Log.entryAdded' && message.params?.entry?.level === 'error') {
    const entry = message.params.entry;
    const detail = { source: entry.source || 'log', text: entry.text || 'Browser log error', url: entry.url || '' };
    const harmlessFavicon404 = /\/favicon\.ico(?:$|\?)/.test(detail.url) && /404|Failed to load resource/i.test(detail.text);
    if (harmlessFavicon404) browserWarnings.push(detail); else browserErrors.push(detail);
  }
});

function send(method, params={}, timeoutMs=commandTimeoutMs) {
  const id = ++sequence;
  return new Promise((resolve, reject) => {
    const timer = setTimeout(() => {
      pending.delete(id);
      reject(new Error(`CDP command timeout: ${method}`));
    }, timeoutMs);
    pending.set(id, {
      resolve: (value) => { clearTimeout(timer); resolve(value); },
      reject: (error) => { clearTimeout(timer); reject(error); }
    });
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
const evidence = { pageUrl, revision, checkpoint, metrics, browserErrors, browserWarnings };
writeFileSync(output.replace(/\.png$/i, '.json'), JSON.stringify(evidence, null, 2));
const failed = Boolean(metrics.errors?.length || browserErrors.length);
if (failed) console.error(JSON.stringify(evidence));
else console.log(JSON.stringify({ revision, checkpoint, frames: metrics.frames, p95: metrics.p95, warnings: browserWarnings.length, output }));
ws.close();
setTimeout(() => process.exit(failed ? 2 : 0), 100);
