module.exports = function(app)
{
    var bodyparser = require('body-parser');
    var jsonParser = bodyparser.json();
    app.use(bodyparser.urlencoded({extended : true}));
    app.use(bodyparser.json());

    app.use(function(err, req, res, next) {
        res.send({error: err.message});
    });

    // handle POST method data for distance request
    app.post('/distance', jsonParser, function (req, res, next)
    {
        var distanceController = require(__dirname + '/distance');
        var value = distanceController.getDistance(req.body);
        logMessage('POST', JSON.stringify(req.body), value); // log request
        res.send(value + '');
    })

    // handle GET method with date as a query
    app.get('/coordinates', function (req, res, next)
    {
        var date = req.query.time;
        var coordinateController = require(__dirname + '/coordinates');
        var value = date != null ? JSON.stringify(coordinateController.getActiveLocations(date)) : new Error('Please provide valid query parameter: "time".');
        logMessage('GET', date, value); // log request
        res.send(value);
    })

    // log all requests to the server
    function logMessage (type, input, output)
    {
        var fs = require('fs');
        var message = type + ':\n' + 
            new Date().toLocaleString() + 
            '\nRequest Data:\n' + input + 
            '\nResults:\n' + output + '\n--------------------\n';
        fs.appendFileSync('log.txt', message);
    }
}