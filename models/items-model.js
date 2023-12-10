const mongoose = require("mongoose");
const { Schema } = mongoose;


const itemSchema = new Schema({
  itemname: {
    type: String,
    required: true,

  },
  title: {
    type: String,
    required: true,

  },
  price: {
    type: Number,
    required: true,
  },
  imgpath: {
    type: String,
    required: true,


  },
  imgpath_inside: {
    type: String,
    required: true,


  },
  group: {
    type: String,
    required: true,
  },
  canChange: {
    type: Boolean,
    require: true,
  }





})



module.exports = mongoose.model("Item", itemSchema);
