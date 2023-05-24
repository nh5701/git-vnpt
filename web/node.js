// var http = require('http');
// var uc = require('upper-case');
// http.createServer(function (req, res) {
//   res.writeHead(200, {'Content-Type': 'text/html'});
//   res.write(uc.upperCase("Hello World!"));
//   res.end();
// }).listen(8080);
var http = require('http');
var formidable = require('formidable');
var fs = require('fs');
var rs = fs.createReadStream('./demofile.txt');
rs.on('open', function () {
  console.log('The file is open');
});

var events = require('events');
const { Console } = require('console');
var eventEmitter = new events.EventEmitter();
var a = 8;
var b =10;
var c;
//Create an event handler:
var myEventHandler = function () {
  console.log('I hear a scream! ');
}
var my = function () {
  c = a+b;
  console.log('So ' + b);
}

//Assign the event handler to an event:
eventEmitter.on('scream', my);
eventEmitter.on('scream', myEventHandler);

//Fire the 'scream' event:
eventEmitter.emit('scream');
// eventEmitter.emit('scream1');

http.createServer(function (req, res) {
  if (req.url == '/fileupload') {
    // var form = new formidable.IncomingForm();
    // form.parse(req, function (err, fields, files) {
    //   res.write('File uploaded');
    //   res.end();
    var form = new formidable.IncomingForm();
    form.parse(req, function (err, fields, files) {
      var oldpath = files.filetoupload.filepath;
      var newpath = '/home/hoangduong/Desktop/web' + files.filetoupload.originalFilename;
      fs.rename(oldpath, newpath, function (err) {
        if (err) throw err;
        res.write('File uploaded and moved!');
        res.end();
      });
    });
  } else {
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<form action="fileupload" method="post" enctype="multipart/form-data">');
    res.write('<input type="file" name="filetoupload"><br>');
    res.write('<input type="submit">');
    res.write('</form>');
    return res.end();
  }
}).listen(8080);