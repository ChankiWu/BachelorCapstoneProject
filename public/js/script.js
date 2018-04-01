var socket = io();

var input = document.querySelector('.output-you');
var output = document.querySelector('.output-bot');

//Web Speech API
var SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
var recognition = new SpeechRecognition();

//设置一些属性变量来自定义语音识别
//Language
recognition.lang = 'zh-CN';
recognition.interimResults = false;
recognition.maxAlternatives = 1;

//监听点击事件来初始化语音识别
document.querySelector('button').addEventListener('click', function () {
    recognition.start();
});

//设置监听事件
recognition.addEventListener('speechstart', function () {
    console.log('Speech has been detected.');
});

//用result事件将刚刚说过的话转化成文本
recognition.addEventListener('result', function (e) {
    console.log('Result has been detected.');

    var last = e.results.length - 1;
    var text = e.results[last][0].transcript;

    input.textContent = text;
    console.log("The text is: " + text);
    console.log('Confidence: ' + e.results[0][0].confidence);

    //send user's text yo index.js
    socket.emit('chat message', text);
});

recognition.addEventListener('speechend', function () {
    recognition.stop();
});

recognition.addEventListener('error', function (e) {
    output.textContent = 'Error: ' + e.error;
});

//合成语音并返回给前端
function synthVoice(text) {
    var synth = window.speechSynthesis;
    var utterance = new SpeechSynthesisUtterance();
    utterance.text = text;
    synth.speak(utterance);
}

socket.on('bot reply',function (replyText) {

    if (replyText === '') {
        replyText = '对不起，没有匹配的回答。';
    }

    //call the function
    synthVoice(replyText);

    output.textContent = replyText;
});



