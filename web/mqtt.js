const mqtt = require('mqtt')// require mqtt
var http = require('http');
const express = require('express');
// const { Socket } = require('dgram');
const app = express();

// const client  = mqtt.connect('mqtt://test.mosquitto.org')// create a client
const client  = mqtt.connect('mqtt://10.21.31.6:1883')// create a client
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
const port = 8000;
var data;

const socket = io();

app.use(express.static('web'));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

client.on('connect', function () {
  client.subscribe('presence', function (err) {
    if (!err) {
      client.publish('presence', 'Hello mqtt')
    }
  })
})

client.on('message', function (topic, message) {
    // message is Buffer
    console.log(message.toString());
    data = message.toString();
    console.log(data);
  //   client.end()
    //   http.createServer(function (req, res) {

    //   res.writeHead(200, {'Content-Type': 'text/plain'});
    //   res.write(data);
    // }).listen(8000);

  })

// topic = 'test';

server.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
  console.log(`Example app listening at http://localhost:${port}`);
  // console.log(data);
  // res.write(data);
});

socket.on('presence', msg => {
  console.log(msg);

});