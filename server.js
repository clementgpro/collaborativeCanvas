// HTTP server

var express = require('express');
var app = express();
var idUtilisateur = 0;

app.listen(3000);

console.log('HTTP server started on port 3000');

serve('/', '/index.html');
serve('/canvas.js');
serve('/foundation.min.css');
serve('/jquery-1.6.4.min.js');
serve('/pencil.js');

function serve(path, file) {
	app.get(path, function(req, res) {
		res.sendfile(__dirname + (file || path));
	});
}

// WebSocket server
var WebSocketServer = require('ws').Server;
var ws = new WebSocketServer({port: 8080});

ws.broadcast = function(data) {
  for (var c in this.clients)
    this.clients[c].send(data);
};

ws.on('connection', function(socket) {
  idUtilisateur++;
  var data = {type : "id", val : idUtilisateur};
  socket.send(JSON.stringify(data));

  console.log('connection of ' + idUtilisateur);
  socket.on('message', function(message) {
    ws.broadcast(message);
  });
});

console.log('WebSocket server started on port 8080');