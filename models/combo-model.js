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
      min: 1, // 確保數量至少為 1
      default: 1,
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
  canChange: {
    type: Boolean,
    require: true,
  }




})


module.exports = mongoose.model("combo", comboSchema);

