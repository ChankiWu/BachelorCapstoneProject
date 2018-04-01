//API.AI const var
var APIAI_TOKEN = '2a6eac61e666469295cec068bf986040';
var APIAI_SESSION_ID = 'ChatBotchanki';

//Express
var express = require('express');
var app = express();

//request body
var bodyParser = require('body-parser');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
var util = require('util');

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

//webhook,handle entity and return results.
app.post('/apiai',function (req,res) {
    var response = "This is a sample response from your webhook!"; //Default response from the webhook to show it's working
    //req, req.body, req.body.result is object.
    console.log("APIAI Request is " +  util.inspect(req.body.result.parameters) + "\n" + Object.keys(req.body.result.parameters));
    var reqkey = Object.keys(req.body.result.parameters);
    console.log("Value is " + req.body.result.parameters[reqkey]);

    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
    /*res.send(JSON.stringify({ "speech": response, "displayText": response
        //"speech" is the spoken version of the response, "displayText" is the visual version
    }));*/

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





