var express = require('express');
var app = express();
var favicon = require('serve-favicon');
var path = require('path');

app.set('views', __dirname + '/src');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.set('trust proxy', true);

app.use(favicon(path.join(__dirname, 'images', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build/bundled')));
app.set('appPath', path.join(__dirname, 'build/bundled'));

console.log(app.get('appPath'));

// All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });

var server = require('http').createServer(app);

server.listen(process.env.PORT || 3000, function () {
	var host = server.address().address;
	var port = server.address().port;
	console.log('Example app listening at http://localhost:%s', port);
});
