//API.AI const var
var APIAI_TOKEN = '3f5ee06f4644483bbc540087f3e0ac6c';
var APIAI_SESSION_ID = 'ChatBotchanki';

//Express
var express = require('express');
var app = express();

// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

app.get('/', function (req, res) {
    res.render('index');
});

var server = app.listen(5000, function () {
    console.log("Express server listening on port: " + server.address().port + app.settings.env);
});

//set API.AI
var apiai = require('apiai')(APIAI_TOKEN);

//set socket.io
var io = require('socket.io')(server);
io.on('connection', function (socket) {
    console.log('a user connected');

    socket.on('chat message', function (text) {
        console.log('Message: ' + text);

        // Get a reply from API.ai
        var apiaiReq = apiai.textRequest(text, {
            sessionId: APIAI_SESSION_ID
        });

        apiaiReq.on('response', function (response) {
            var aiText = response.result.fulfillment.speech;
            console.log('Bot reply: ' + aiText);
            socket.emit('bot reply', aiText);
        });

        apiaiReq.on('error', function(error) {
            console.log(error);
        });

        apiaiReq.end();
    });//end chat socket

});





