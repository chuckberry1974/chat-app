const PORT = process.env.PORT || 3000
const express = require('express')
const app = express()
var http = require('http').Server(app)
var io = require('socket.io')(http)
// app.get('/', function(req, res){
// res.sendFile(dirname + '/index.html');
// });
var root = __dirname + '/'
app.use(express.static(root))

//   io.on('connection', function (socket) {
//     socket.on('chat message', function (msg) {
//     console.log('index => ', msg)
//     io.emit('chat message', msg)
//     })
//   })
//
// app.use("/bower_components", express.static(__dirname + "/bower_components"))

http.listen(PORT, () => {
  console.log(`Listening to http://localhost:${PORT}`)
}
)

// http.listen(3000, function () {
// console.log('listening on *:3000')
// })
