var express = require('express');
var app = express();
const http = require('http').createServer(app);
var socket = require('socket.io')

var server = http.listen(3000, () => {
    console.log('Listening at port 3001');
});

var io = socket(server);



io.on('connection', (socket) => {
    console.log(`New connection ${socket.id}`)

    socket.on('chat', function (data) {
        io.sockets.emit('chat', data);
    });

    socket.on('typing', function (data) {
        io.sockets.emit('typing', data);
    });
})

app.use(express.static(__dirname + '/dist/<app-name>'));
app.get('/*', function(req,res) {
res.sendFile(path.join(__dirname+
'/dist/<app-name>/index.html'));});
app.listen(process.env.PORT || 8080);
