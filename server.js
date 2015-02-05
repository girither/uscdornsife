var express = require('express');

var app = express();

app.listen(3001,function(){
	console.log('hosting server at port 3000');
});

app.use(express.static(__dirname + '/public'));


app.get('/',function(req,res){
	res.sendfile('./index.html');
});

