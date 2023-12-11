
const mongoose = require("mongoose");
const { Schema } = mongoose;

// 前面定義的 Item 和 Combo 模型

// 購物清單模型
const shoppingListSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User', // 假設你有一個用戶模型
    required: true
  },
  items: [{
    item: {
      type: Schema.Types.ObjectId,
      ref: 'Item',
      required: true
    },
    itemnumber: {
      type: Number,
      required: true,
      min: 1 // 確保數量至少為 1
    }
  }],
  combos: [{
    combo: {
      type: Schema.Types.ObjectId,
      ref: 'Combo',
      required: true
    },
    combonumber: {
      type: Number,
      required: true,
      min: 1 // 確保數量至少為 1
    }
  }],
  deliveryAddress: {
    type: String,
    required: true
  },
  pickupTime: {
    type: Date,
    required: true
  }

});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);

