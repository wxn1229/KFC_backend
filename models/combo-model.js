const mongoose = require("mongoose");
const { Schema } = mongoose;

const comboSchema = new Schema({
  comboname: {
    type: String,
    require: true,


  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item'
    },
    itemnumber: {
      type: Number,
      required: true,
    }
  }],
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  imgpath: {
    type: String,
    require: true,
  },
  imgpath_inside: {
    type: String,
    required: true,

  },



})


module.exports = mongoose.model("combo", comboSchema);

