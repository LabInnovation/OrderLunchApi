var mongoose = require("mongoose");
mongoose.connect('mongodb://localhost:27017/orderLunch');
// create instance of Schema
var mongoSchema =   mongoose.Schema;
// create schema
var orderSchema  = {
    "studentId" : String,
    "studentNumber" : String,
    "mealNumber" : String,
    "createTime" : Date
};
// create model if not exists.
module.exports = mongoose.model('order',orderSchema);
