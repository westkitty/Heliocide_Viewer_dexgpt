import { readdirSync, readFileSync, statSync, existsSync } from 'node:fs';
import { join, relative } from 'node:path';
import { spawnSync } from 'node:child_process';

const root = new URL('../', import.meta.url).pathname;
const failures = [];
function walk(dir) {
  const out = [];
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (name === 'dist' || name === '.git') continue;
    if (statSync(path).isDirectory()) out.push(...walk(path));
    else out.push(path);
  }
  return out;
}
const jsFiles = walk(join(root, 'src')).filter((p) => p.endsWith('.js'));
for (const file of jsFiles) {
  const result = spawnSync(process.execPath, ['--check', file], { encoding: 'utf8' });
  if (result.status !== 0) failures.push(`${relative(root,file)}: ${result.stderr || result.stdout}`);
}
const authored = [...jsFiles, join(root,'index.html'), join(root,'README.md'), join(root,'CANON.md')].filter(existsSync);
const forbidden = [/\bShard-God\b/, /\bShardGod\b/, /\bTiger\b/];
for (const file of authored) {
  const text = readFileSync(file,'utf8');
  for (const rx of forbidden) if (rx.test(text)) failures.push(`${relative(root,file)} contains forbidden current-identity alias ${rx}`);
  if (/https?:\/\//.test(text) && file.includes('/src/')) failures.push(`${relative(root,file)} contains a runtime hotlink`);
}
const required = [
  'assets/source-reference/shard-god/1761893423477.jpg.png',
  'assets/source-reference/shard-god/1763713752850.jpg'
];
for (const path of required) if (!existsSync(join(root,path))) failures.push(`missing ${path}`);
const html = readFileSync(join(root,'index.html'),'utf8');
const css = readFileSync(join(root,'src/style.css'),'utf8');
if (!html.includes('legacy-label-mask') || !css.includes('.legacy-label-mask')) {
  failures.push('canonical dossier must nondestructively mask obsolete baked source labels');
}
if (failures.length) {
  console.error(failures.join('\n'));
  process.exit(1);
}

console.log(`PASS syntax/contracts: ${jsFiles.length} JS modules checked; naming lock and asset presence verified.`);
