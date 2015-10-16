// server.js

// setup
var fs = require('fs');
var request = require('request');
var express = require('express');
var app = express();
var router = express.Router();

// configuration
var apiurl = 'http://api.openweathermap.org/data/2.5/weather';
var config = JSON.parse(fs.readFileSync('./config.json', 'utf8'));
var port = 3000;
app.use(express.static(__dirname + '/public'));

// define routes
router.get('/', function(req, res) {
    res.sendfile('./public/index.html');
});

router.get('/weather', function(req, res) {
    // get the clients params
    var options = {
        'url': apiurl,
        'qs': {
            'appid': config.appid,
            'q': req.query.q,
            'zip': req.query.zip,
            'units': req.query.units
        }
    }
    // hit the owm api and return data to client
    request(options, function(error, response, body) {
        if(!error && response.statusCode == 200) {
            //res.json(response);
            body = JSON.parse(response.body);
            res.json({
                'coordinates': body.coord,
                'temperature': {
                    'high': body.main.temp_max,
                    'low': body.main.temp_min,
                    'current': body.main.temp
                },
                'conditions': body.weather.main
            });
        } else {
            console.log('Error: ' + error);
        }
    });
});

// register routes and start server
app.use('/', router);
app.listen(port);
console.log('Listening on port ' + port);

