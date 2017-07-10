var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
var port = 5000;
var pg = require('pg');
app.use(bodyParser.urlencoded({extended:true}));
// var config = {
//   database: 'antares', // name of your database
//   host: 'localhost', // where is your database?
//   port: 5432, // port for the database
//   max: 10, // how many connections at one time?
//   idleTimeoutMillis: 30000 // 30 second time out
// };
// var pool = new pg.Pool(config);
var tasks = require('./routes/tasks.js')
var pool = require('./modules/pool.js')

app.use(pool);

app.use('/tasks', tasks);

//serve static files
app.get('/*', function(req, res){
  var file = req.params[0] || '/views/index.html';
  res.sendFile(path.join(__dirname, '/public/', file));
});

//listen on port
app.listen(port, function(){
  console.log('listening on port ' + port);
});
