
var Stream = require('node-tweet-stream');// Step 1
var Keys = require('./keys.js')(); // Step 1
// eval(require('locus'));
var app = require('express')(); // Step 2
var server = require('http').Server(app); // Step 2
var io = require('socket.io')(server); //Step 4
////////////////// Step 1 //////////////////////////////////
var stream = new Stream({
    consumer_key: Keys.consumer_key,
    consumer_secret: Keys.consumer_secret,
    token: Keys.access_token_key,
    token_secret: Keys.access_token_secret
});


app.get('/', function(req, res) {
	io.on('connection', function (socket) { 
		stream.on('tweet', function (tweet){
			socket.emit('tweet', { tweet: tweet });
		});
	})	
	res.sendFile(__dirname + "/views/index.html");
})


stream.track('i');
stream.untrack('a')
server.listen(3000);
