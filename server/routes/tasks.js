var express = require('express');
var router = express.Router();
var pg = require('pg');
// var config = {
//   database: 'antares', // name of your database
//   host: 'localhost', // where is your database?
//   port: 5432, // port for the database
//   max: 10, // how many connections at one time?
//   idleTimeoutMillis: 30000 // 30 second time out
// };
// var pool = new pg.Pool(config);

router.delete('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      var queryText = 'DELETE FROM "tasks" WHERE "id" = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          //console.log(queryText);
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
})

//set task to complete
router.put('/:id', function(req, res){
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var id = req.params.id;
      var queryText = 'UPDATE "tasks" SET "complete" = true WHERE "id" = $1;';
      db.query(queryText, [id], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          //console.log(queryText);
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
})

//retrieve tasks
router.get('/', function(req, res){
  console.log('request recieved');
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'SELECT * FROM "tasks" ORDER BY "complete" ASC;';
      db.query(queryText, function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          //console.log(queryText);
          res.send({tasks: result.rows});
        }
      }); // end query
    } // end if
  }); // end pool
  //res.send('recieved');
})

//add new task
router.post('/', function(req, res){
  console.log('Task recieved');
  var newTask = req.body;
  console.log(newTask);
  var name = newTask.name;
  var by = newTask.completeBy;
  console.log(name, by);
  console.log(newTask);
  pool.connect(function(errorConnectingToDatabase, db, done){
    if(errorConnectingToDatabase) {
      console.log('Error connecting to the database.');
      res.sendStatus(500);
    } else {
      var queryText = 'INSERT INTO "tasks" ' +
      '("task_name", "complete", complete_by) VALUES ($1, \'false\', $2);';
      db.query(queryText,[name, by], function(errorMakingQuery, result){
        done();
        if(errorMakingQuery) {
          console.log('Attempted to query with', queryText);
          console.log('Error making query');
          res.sendStatus(500);
        } else {
          console.log(queryText);
          res.sendStatus(200);
        }
      }); // end query
    } // end if
  }); // end pool
})

module.exports = router;
