// Express server for Jaden Application
var mongoose = require('mongoose');
var express = require('express');
var app = express();
var database = require('./app/js/db/database');
// MongoDB database
mongoose.connect(database.remoteUrl);

app.all('*', function(req, res, next) {
	res.header('Access-Control-Allow-Origin', req.headers.origin );
	res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
    res.header('Access-Control-Allow-Headers',
    	'Content-Type, Authorization, Content-Length, X-Requested-With');
    if (req.method === 'OPTIONS'){
        res.send(200);
    } else {
		next();
	}
});

app.engine('.html', require('ejs').__express);
app.use(express.static('./public'));
app.set('views', __dirname + '/public/views');
app.set('view engine', 'html');

// DATABASE
require('./app/js/db/routes.js')(app);

// Application
app.get('/', function(req, res){
	res.render('index');
});


// set ports
var port = process.env.PORT || 315;

app.listen(port, function () {
   console.log('Application is now open on port: ' + port);
});
