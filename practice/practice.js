const http = require('http');

const server = http.createServer((req, res) => {
  if (req.url === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome home');
  } else if (req.url === '/about') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to About Us page');
  } else if (req.url === '/node') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Welcome to my Node Js project');
  } else {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('Page not found');
  }
});

server.listen(3000, () => {
  console.log('Server is running on port 3000');
});
