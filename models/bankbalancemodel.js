var mongoose = require('mongoose');

var BankBalanceSchema = new mongoose.Schema({
	bankname: String,
	accountnumber: String,
	customerid: String,
	accountholdername: String,
	bankbalance: String,
	updated_date: { type: Date, default: Date.now },
});

module.exports = mongoose.model('BankBalance', BankBalanceSchema);
