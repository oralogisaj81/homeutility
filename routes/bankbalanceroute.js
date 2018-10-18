const express = require('express');
const app = express();
const bankBalanceRoutes = express.Router();
const mongodbName = 'homeangulardb';
function getMongoDbConnection() {
  const MongoClient = require('mongodb').MongoClient;
  const assert = require('assert');
  // Connection URL
  const url = 'mongodb://localhost:27017';
  // Database Name
  const dbName = mongodbName;
  // Create a new MongoClient
  const client = new MongoClient(url,{useNewUrlParser: true });
  return client;
}
// Defined store route
bankBalanceRoutes.route('/add').post(function (req, res) {
  const dbconnection = getMongoDbConnection();
  // Use connect method to connect to the Server
  dbconnection.connect(function(err) {
    console.log("Connected successfully to server");
    const db = dbconnection.db(mongodbName);
    insertBankBalances(db, function() {
      dbconnection.close();
    });
    dbconnection.close();
  });
  const insertBankBalances = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('bankbalances');
    // Insert one documents
    collection.insertOne(
      {bankname : req.body.bankname, accountnumber : req.body.accountnumber,
      customerid : req.body.customerid, accountholdername : req.body.accountholdername,
      bankbalance : req.body.bankbalance, updated_date : new Date()},
      function(err, result) {
      console.log("Inserted 1 documents into the collection bankbalances");
      if(err){
        console.log(err);
        res.status(400).send("unable to save to database");
      }
      else {
        res.json(result);
      }
      callback(result);
    });
  }
});

// Defined get data(index or listing) route
bankBalanceRoutes.route('/').get(function (req, res) {
  const dbconnection = getMongoDbConnection();
  dbconnection.connect(function(err) {
    console.log("Connected successfully to server");
    const db = dbconnection.db(mongodbName);
    findBankBalances(db, function() {
         dbconnection.close();
       });
    dbconnection.close();
  });
  const findBankBalances = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('bankbalances');
    // Find some documents
    collection.find({}).toArray(function(err, docs) {
      console.log("Found the following records");
      console.log(docs)
      callback(docs);
      if(err){
        console.log(err);
      }
      else {
        res.json(docs);
      }
    });
  }
});

// Defined edit route
bankBalanceRoutes.route('/bankbalanceedit/:id').get(function (req, res) {
  let id = req.params.id;
  console.log('inside bankbalanceroute.js edit route method id value is ::',id);
  const dbconnection = getMongoDbConnection();
  // Use connect method to connect to the Server
  dbconnection.connect(function(err) {
    console.log("Connected successfully to server");
    const db = dbconnection.db(mongodbName);
    editBankBalances(db, function() {
      dbconnection.close();
    });
    dbconnection.close();
  });
  const editBankBalances = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('bankbalances');
    ObjectId = require('mongodb').ObjectID;
    console.log("inside editBankBalances callback id value::",id);
    // find one documents
    collection.findOne({"_id":ObjectId(id)},
      function(err, result) {
      callback(result);
      if(err){
        console.log(err);
        res.status(400).send("unable to find the document from the collection bankbalances");
      }
      else {
        console.log("Found 1 document from the collection bankbalances",result);
        console.log("sending the bankbalance document in response");
        res.json(result);
      }
    });
  }
});

//  Defined update route
bankBalanceRoutes.route('/update/:id').post(function (req, res) {
  const dbconnection = getMongoDbConnection();
  // Use connect method to connect to the Server
  dbconnection.connect(function(err) {
    console.log("Connected successfully to server");
    const db = dbconnection.db(mongodbName);
    updateBankBalances(db, function() {
      dbconnection.close();
    });
    dbconnection.close();
  });
  const updateBankBalances = function(db, callback) {
    // Get the documents collection
    const collection = db.collection('bankbalances');
    ObjectId = require('mongodb').ObjectID;
    let id = req.params.id;
    console.log("inside updateBankBalance bankname value::",req.body.bankname);
    // Update one document
    collection.updateOne(
      {"_id": ObjectId(id)},
      { $set: { bankname : req.body.bankname, accountnumber : req.body.accountnumber,
      customerid : req.body.customerid, accountholdername : req.body.accountholdername,
      bankbalance : req.body.bankbalance, updated_date : new Date()}},
      function(err, result) {
      callback(result);
      if(err){
        console.log(err);
        res.status(400).send("unable to update to database");
      }
      else {
        console.log("Updated the collection bankbalances having id value::",id);
        console.log("Updated bankbalance record::",result);
        res.json(result);
      }
      });
  }
});

// Defined delete | remove | destroy route
bankBalanceRoutes.route('/delete/:id').get(function (req, res) {
  console.log('inside bankbalanceroute.js ...about to delete ');
const dbconnection = getMongoDbConnection();
  // Use connect method to connect to the Server
  dbconnection.connect(function(err) {
    console.log("Connected successfully to server");
    const db = dbconnection.db(mongodbName);
    deleteBankBalanceRecord(db, function() {
      dbconnection.close();
    });
    dbconnection.close();
  });
  const deleteBankBalanceRecord = function(db, callback) {
    console.log('inside bankbalanceroute.js...deleteBankBalance method() ');

    // Get the documents collection
    const collection = db.collection('bankbalances');
    ObjectId = require('mongodb').ObjectID;
    let id = req.params.id;
    // Delete document where a is 3
    collection.deleteOne({"_id": ObjectId(id) },function(err, result) {
      console.log("Removed the bankbalance record with the field _id equal to::", req.params.id);
      if(err){
        console.log(err);
      }
      else {
        console.log("sending response to mongo successfully deleted");
        res.json(result);
      }
      callback(result);
    });
  }
});

module.exports = bankBalanceRoutes;
