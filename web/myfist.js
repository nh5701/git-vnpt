var http = require('http');
// var mqtt =require('mqtt');
// var dt = require('./myfistmodule');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(req.url);
//   res.write("THE DATE :" + dt.myDateTime());
  res.end('Hello World!');
}).listen(8080);

