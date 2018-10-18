const express = require('express');
const app = express();
const cookingRoutes = express.Router();

// Require cookingModel model in our routes module
let cookingModel = require('../models/cookingmodel');

// Defined store route
cookingRoutes.route('/add').post(function (req, res) {
  let cookingModelobj = new cookingModel(req.body);
  cookingModelobj.save()
    .then(game => {
    res.status(200).json({'cookingModelobj': 'cookingModel is added successfully'});
    })
    .catch(err => {
    res.status(400).send("unable to save to database");
    });
});

// Defined get data(index or listing) route
cookingRoutes.route('/').get(function (req, res) {
    cookingModel.find(function (err, cookingModelobj){
    if(err){
      console.log(err);
    }
    else {
      res.json(cookingModelobj);
    }
  });
});

// Defined edit route
cookingRoutes.route('/cookingedit/:id').get(function (req, res) {
  let id = req.params.id;
  console.log('inside cookingroute.js edit route method',id);
  cookingModel.findById(id, function (err, cookingModelobj){
      res.json(cookingModelobj);
  });
});

//  Defined update route
cookingRoutes.route('/update/:id').post(function (req, res) {
    cookingModel.findById(req.params.id, function(err, cookingModelobj) {
    if (!cookingModelobj)
      return next(new Error('Could not load Document'));
    else {
        cookingModelobj.recipetitle = req.body.recipetitle;
        cookingModelobj.ingredients = req.body.ingredients;
        cookingModelobj.recipepreparation = req.body.recipepreparation;
        cookingModelobj.accountholdername = req.body.accountholdername;
        cookingModelobj.updated_date = req.body.updated_date;
        cookingModelobj.save().then(cookingModelobj => {
          res.json('Update complete');
      })
      .catch(err => {
            res.status(400).send("unable to update the database");
      });
    }
  });
});

// Defined delete | remove | destroy route
cookingRoutes.route('/delete/:id').get(function (req, res) {
    cookingModel.findByIdAndRemove({_id: req.params.id}, function(err, cookingModelobj){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = cookingRoutes;
