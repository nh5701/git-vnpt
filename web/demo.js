var http = require('http');
var fs = require('fs');

http.createServer(function (req, res) {
    fs.readFile('index.html', function(err, data) {  

  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write(data);
  res.end();
    });

    fs.appendFile('mynewfile2.txt', 'Hello content!', function (err) {
      if (err) throw err;
      console.log('Saved!');
    });

    fs.open('mynewfile1.txt', 'w', function (err, file) {
      if (err) throw err;
      console.log('Saved!');
    });

}).listen(8080);
