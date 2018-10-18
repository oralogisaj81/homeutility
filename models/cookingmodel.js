var mongoose = require('mongoose');
var CookingSchema = new mongoose.Schema({
	recipetitle: String,
	ingredients: String,
	recipepreparation: String,
	updated_date: { type: Date, default: Date.now },
});
module.exports = mongoose.model('Cooking', CookingSchema);
