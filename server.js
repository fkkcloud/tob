// modules =================================================
var express        = require('express');
var app            = express();
var server         = require('http').createServer(app);
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');

// configuration ===========================================
var port = process.env.PORT || 4000; // set our port
//mongoose.connect(db.url); // connect to our mongoDB database (commented out after you enter in your own credentials)

// get all data/stuff of the body (POST) parameters
app.use(bodyParser.json()); // parse application/json 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(bodyParser.urlencoded({ extended: true })); // parse application/x-www-form-urlencoded

app.use(methodOverride()); // 'X-HTTP-Method-Override' override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT

app.use('/', express.static(__dirname + '/TOB'));
app.use('/map', express.static(__dirname + '/map'));
// routes ==================================================
//
//require('./app/routes')(app); // pass our application into our routes


// start app server ===============================================
server.listen(port);	

console.log('Magic happens on web server port ' + port); 			// shoutout to the user
exports = module.exports = app; 						// expose app