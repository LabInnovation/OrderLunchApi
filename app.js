//app.js
//create by Max Yi-Hsun Chou

var express    = require('express');
var app        = express();
var bodyParser = require('body-parser');
var mongoOp     =   require("./models/db");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;

// =============================================================================
var router = express.Router();

// write and config api routes below

router.route('/')
    .all(function(req, res) {
      res.json({"error" : "true", "message" : "nothing here!"});
    });

router.route('/order/add')
      .post(function(req,res){
          var db = new mongoOp();
          var response = {};
          //add param process
          var studentId = req.param('studentid');
          var studentNumber = req.param('studentnumber');
          var mealNumber = req.param('mealnumber');

          //db data insert process
          db.studentId = studentId;
          db.studentNumber = studentNumber;
          db.mealNumber = mealNumber;
          db.createTime = Date.now();

          //db save data process
          db.save(function(err){
          // save() will run insert() command of MongoDB.
          // it will add new data in collection.
              if(err) {
                  response = {"error" : "true",
                              "message" : "error"
                              };
              } else {
                  response = {"error" : "false",
                              "message" : "success"
                              };
              }
              res.json(response);
          });
      });


router.route('/order/views')
    .get(function(req, res) {
      var response = {};
        mongoOp.find({},function(err, data){
        // Mongo command to fetch all data from collection.
            if(err) {
                response = {"error": "true",
                            "message" : "Error fetching data, Database error."
                            };
            } else if (data == 0) {
                response = {"error" : "false",
                            "message" : "No any data in database."
                            };
            } else {
                response = {"message" : data}
            }
            res.json(response);
        });
    });

router.route('/order/views/:id')
    .get(function(req, res) {
      var response = {};
        mongoOp.findById(req.params.id, function(err, data){
        // Mongo Query to fetch data based on ID.
            if(err) {
                response = {"error" : true,
                            "message" : "Error fetching, id incorrent"
                            };
            } else {
                response = {"error" : false,
                            "message" : data
                            };
            }
            res.json(response);
        });
    });


// =============================================================================

app.use('/api', router);



app.listen(port);
console.log('Api server is already run on ' + port);
