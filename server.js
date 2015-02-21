var express = require('express');

var app = express();

app.listen(3001,function(){
	console.log('hosting server at port 3000');
});

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use('/mock',  express.static(__dirname + '/mock'));

app.get('/',function(req,res){
	res.sendfile('./index.html');
});

