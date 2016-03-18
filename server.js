// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');
var main       = require('./main');

// DB
// var mongoose   = require('mongoose');
// var uri = 'mongodb://comicr:hunter318@ds033018.mlab.com:33018/comicr';
// mongoose.connect(uri, function(error) {
//     console.log(error);
// }); // connect to our database
// // Output - 0 = disconnected, 1 = connected, 2 = connecting, 3 = disconnecting
// console.log(mongoose.connection.readyState);

// Start your program
// var Bear     = require('./app/models/bear');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 8080;        // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    var data = main._run();
    // console.log(data);
    // console.log(main._run);
    res.json(data);
});

// more routes for our API will happen here
// on routes that end in /bears
// ----------------------------------------------------
router.route('/bears')

    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });

    // // get all the bears (accessed at GET http://localhost:8080/api/bears)
    // .get(function(req, res) {
    //     Bear.find(function(err, bears) {
    //         if (err)
    //             res.send(err);

    //         res.json(bears);
    //     });
    // });

// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
