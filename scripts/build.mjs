import { rmSync, mkdirSync, cpSync, copyFileSync, writeFileSync, readFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join } from 'node:path';
const root = new URL('../', import.meta.url).pathname;
const dist = join(root,'dist');
rmSync(dist,{recursive:true,force:true}); mkdirSync(dist,{recursive:true});
copyFileSync(join(root,'index.html'),join(dist,'index.html'));
cpSync(join(root,'src'),join(dist,'src'),{recursive:true});
cpSync(join(root,'assets'),join(dist,'assets'),{recursive:true});
const files=['index.html','src/app.js','src/renderer.js','src/shaders.js','src/style.css','src/timeline.js','src/ui.js','src/visualRevision.js'];
const hashes={};
for(const file of files){const data=readFileSync(join(dist,file));hashes[file]=createHash('sha256').update(data).digest('hex');}
writeFileSync(join(dist,'build-manifest.json'),JSON.stringify({project:'heliocide-observatory-dexgpt',builtAt:new Date().toISOString(),files:hashes},null,2));
console.log(`PASS build: ${dist}`);
