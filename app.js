//server.js
//create by Max Yi-Hsun Chou

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// =============================================================================
var router = express.Router();

// write and config api routes below

router.route('/')
    .all(function(req, res) {
      res.json({"status": "Success",
                "message": "hi there! welcome to visit our api server! :P"
              })
    });

router.route('/apply')
    .all(function(req, res) {
      res.json({"status": "Error",
                "message": "We're not open public apply yet!"
              })
    });



// =============================================================================
// Success
app.use('/api', router);

// Handle 404
app.use(function(req, res) {
  res.send('404: Page not Found', 404);
});

// Handle 500
app.use(function(error, req, res, next) {
  res.send('500: Internal Server Error', 500);
});

app.listen(port);
console.log('Api server is already run on ' + port);
