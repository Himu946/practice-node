const http= require('http');
const fs= require('fs');
const path= require('path');

const server= http.createServer((req,res)=>{
    const url=req.url;
    const method= req.method;
    if(url==='/'){
        fs.readFile('message.txt',{encoding:"utf-8"},(err,data)=>{
            if(err){
                console.log(err);
            }
            res.writeHead(200,{'content-Type':'text/html'});
            res.write('<html>');
            res.write('<head><title>Enter Message</title></head>');
            res.write(`<body>${data}`)
            res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form></body>')
            res.write('</html>');
            return res.end();
        });
        
    }
    else if(url==="/message"&& method==="POST"){
        const body=[];
        req.on('data',(chunk)=>{
            body.push(chunk);
        });
        return req.on('end',()=>{
            const parsedBody=Buffer.concat(body).toString();
            const message = parsedBody.split('=')[1]; // Extract the message part
            fs.writeFile('message.txt',message,(err)=>{
                if(err){
                    console.log(err);
                    return;
                }
                res.writeHead(302,{'Location':'/'});
                return res.end();
            });
            
        });
        
        

    }else{
    res.writeHead(200,{'content-type':'text/html'});
    res.write('<html>');
    res.write('<head><title>My first page</title></head>');
    res.write('<h1>Hello from my Node.js server</h1>');
    res.write('</html>');
    res.end();
    }
});


server.listen(3000);

