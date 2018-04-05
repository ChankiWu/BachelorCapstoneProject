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


//load MySQL Module and Pool connections.
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'wqc960630',
    port: '3306',
    database: 'dmovie'
});


// 加载hbs模块
var hbs = require('hbs');

// 指定模板文件的后缀名为html
app.set('view engine', 'html');

// 运行hbs模块
app.engine('html', hbs.__express);

app.use(express.static(__dirname + '/views')); // html
app.use(express.static(__dirname + '/public')); // js, css, images

//routes
app.get('/', function (req, res) {
    res.render('index');
});

//webhook,handle entity and return results.
app.post('/apiai',function (req,res) {

    //req.body is a json.
    console.log("APIAI Request is " +  util.inspect(req.body.result.parameters));

    //parameters is the entity.
    var reqkey = Object.keys(req.body.result.parameters);
    var reqval = req.body.result.parameters[reqkey];
    console.log("Key is "+ reqkey + "\nValue is " + reqval);

    //根据用户不同的请求匹配不同的entity
    switch (reqkey.toString()){
        case 'movie-genre':
            //find corresponding results from Database
            var  sql1 = 'select * from dmovie.top where genre like "%'+ reqval +'%";';
            connection.query(sql1,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------SELECT  1----------------------------');

                //默认展示五个
                var response = '';
                if (result.length >=5 ){
                    for (var i=0;i<5;i++)
                    {
                        response = response + result[i].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
                else{
                    for (var j=0;j<result.length;j++)
                    {
                        response = response + result[j].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }

            });
            break;
        case "movie-actor":
            //find corresponding results from Database
            var  sql2 = 'select * from dmovie.top where actor like "%'+ reqval +'%";';
            connection.query(sql2,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------SELECT  2----------------------------');

                //默认先展示五个
                var response = '';
                if (result.length >=5 ){
                    for (var i=0;i<5;i++)
                    {
                        response = response + result[i].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
                else{
                    for (var j=0;j<result.length;j++)
                    {
                        response = response + result[j].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
            });
            break;
        case "sys.number":
            //find corresponding results from Database
            var  sql3 = 'select * from dmovie.top where rate >='+ reqval +';';
            connection.query(sql3,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------SELECT  3----------------------------');

                //默认先展示五个
                var response = '';
                if (result.length >=5 ){
                    for (var i=0;i<5;i++)
                    {
                        response = response + result[i].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
                else{
                    for (var j=0;j<result.length;j++)
                    {
                        response = response + result[j].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
            });
            break;
        case "movie-country":
            //find corresponding results from Database
            var  sql4 = 'select * from dmovie.top where country like "%'+ reqval +'%";';
            connection.query(sql4,function (err, result) {
                if(err){
                    console.log('[SELECT ERROR] - ',err.message);
                    return;
                }

                console.log('--------------------------SELECT  4----------------------------');

                //默认先展示五个
                var response = '';
                if (result.length >=5 ){
                    for (var i=0;i<5;i++)
                    {
                        response = response + result[i].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
                else{
                    for (var j=0;j<result.length;j++)
                    {
                        response = response + result[j].name + " ";
                    }
                    res.setHeader('Content-Type', 'application/json'); //Requires application/json MIME type
                    res.send(JSON.stringify({ "speech": response, "displayText": response
                        //"speech" is the spoken version of the response, "displayText" is the visual version
                    }));
                }
            });
            break;
        default:
            console.log("\ndefault switch");
            break;
    }
});

//Server
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
        //get user's text form script.js.
        console.log('Message: ' + text);

        // Get a reply from API.ai
        var apiaiReq = apiai.textRequest(text, {
            sessionId: APIAI_SESSION_ID
        });

        apiaiReq.on('response', function (response) {
            var aiText = response.result.fulfillment.speech;
            console.log('Bot reply: ' + aiText);

            //send response to script.js, frontend shows.
            socket.emit('bot reply', aiText);
        });

        apiaiReq.on('error', function(error) {
            console.log(error);
        });

        apiaiReq.end();
    });//end chat socket

});





