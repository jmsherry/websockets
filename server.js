const express = require('express');
const http = require('http');
const url = require('url');
const WebSocket = require('ws');
const util = require('util');

const app = express();

app.use(express.static('public'))

const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

wss.on('connection', function connection(ws, req) {
  const location = url.parse(req.url, true);
  // You might use location.query.access_token to authenticate or share sessions
  // or req.headers.cookie (see http://stackoverflow.com/a/16395220/151312)

  ws.on('message', function incoming(message) {
    console.log('received: %s', message);
    console.log(util.inspect(message, false, 7, true));
    ws.send('You sent: ' + message);
  });

  ws.send('Hello client!');
});

/*
// Broadcast to all.
wss.broadcast = function broadcast(data) {
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(data);
    }
  });
};

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(data) {
    // Broadcast to everyone else.
    wss.clients.forEach(function each(client) {
      if (client !== ws && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });
});
*/

server.listen(8080, function listening() {
  console.log('Listening on %d', server.address().port);
});
