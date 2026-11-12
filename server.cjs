const http=require('node:http');
const fs=require('node:fs');
const path=require('node:path');
const files=new Set(['index.html','styles.css','app.js','core.js','words.js']);
function createServer(){return http.createServer((req,res)=>{
  let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname).replace(/^\//,'')||'index.html';}catch{res.writeHead(400);res.end('Bad request');return;}
  if(!['GET','HEAD'].includes(req.method)){res.writeHead(405,{'Allow':'GET, HEAD'});res.end();return;}
  if(!files.has(name)){res.writeHead(404);res.end('Not found');return;}
  fs.readFile(path.join(__dirname,name),(err,data)=>{if(err){res.writeHead(500);res.end('Unable to read asset');return;}
    const type=name.endsWith('.html')?'text/html':name.endsWith('.css')?'text/css':'text/javascript';
    res.writeHead(200,{'Content-Type':type+'; charset=utf-8','Cache-Control':'no-cache','X-Content-Type-Options':'nosniff'});res.end(req.method==='HEAD'?undefined:data);
  });
});}
if(require.main===module){const port=Number(process.env.PORT)||5173;createServer().listen(port,'127.0.0.1',()=>console.log(`IELTS Studio: http://127.0.0.1:${port}`));}
module.exports={createServer};
