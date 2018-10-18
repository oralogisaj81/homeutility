const express = require('express'),
    path = require('path'),
    bodyParser = require('body-parser'),
    cors = require('cors');
    const app = express();

const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'homeangulardb';
// Create a new MongoClient
const client = new MongoClient(url,{useNewUrlParser: true });
// Use connect method to connect to the Server
client.connect(function(err) {
  assert.equal(null, err);
  console.log("Connected successfully to server");
  const db = client.db(dbName);
  findDocuments(db, function() {
       client.close();
     });
  client.close();
});
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('bankbalances');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}
const bankBalanceRoutes = require('./routes/bankbalanceroute');
const cookingRoutes = require('./routes/cookingroute');

app.use(bodyParser.json());
//app.use(cors());
app.use(cors({
'allowedHeaders': ['sessionId', 'Content-Type'],
'exposedHeaders': ['sessionId'],
'origin': '*',
'methods': 'GET,HEAD,PUT,PATCH,POST,DELETE',
'preflightContinue': false
}));
const port = process.env.PORT || 4000;
  app.use('/bankbalances', bankBalanceRoutes);
app.use('/cooking', cookingRoutes);

const server = app.listen(port, function(){
    console.log('Listening on port ' + port);
});
