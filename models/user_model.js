const mongoose = require("mongoose");
const { Schema } = mongoose;

function checkPassword(password1, password2) {
  return new Promise((resolve, reject) => {

    console.log('checking password');
    resolve(password1 === password2);
  });
}


const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 10,
  },
  email: {
    type: String,
    required: true,
    maxlength: 60,

  },
  password: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50,
  },
  phone: {
    type: Number,
    require: true,
  },
  birthday: {
    type: Date,
    default: Date.now(),

  },







})


userSchema.methods.comparePassword = async function(password, cb) {

  let result = await checkPassword(password, this.password);
  return cb(null, result);




}



module.exports = mongoose.model("User", userSchema);
