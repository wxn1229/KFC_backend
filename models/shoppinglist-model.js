
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
  listitems: [{
    title: {
      type: String
    },
    itemprice: {
      type: Number

    },
    item: [{
      itemname: {
        type: String
      },

      itemnum: {
        type: Number
      }

    }]

  }
  ],


  deliveryAddress: {
    type: String,
  },
  pickupTime: {
    type: String,
  }

});

module.exports = mongoose.model('ShoppingList', shoppingListSchema);


