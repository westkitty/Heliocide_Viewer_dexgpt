import { createServer } from 'node:http';
import { readFile, stat } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
const root = process.env.SERVE_ROOT || new URL('../dist/', import.meta.url).pathname;
const port = Number(process.env.PORT || 4173);
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'};
createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    let rel=decodeURIComponent(url.pathname); if(rel==='/'||rel==='') rel='/index.html';
    const file=normalize(join(root,rel)); if(!file.startsWith(normalize(root))){res.writeHead(403);return res.end('forbidden');}
    const info=await stat(file); if(!info.isFile()) throw new Error('not file');
    res.setHeader('Content-Type',types[extname(file)]||'application/octet-stream');
    res.setHeader('Cache-Control','no-store'); res.end(await readFile(file));
  }catch{res.writeHead(404);res.end('not found');}
}).listen(port,'127.0.0.1',()=>console.log(`Heliocide Observatory serving http://127.0.0.1:${port}`));
