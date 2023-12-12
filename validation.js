const Joi = require("joi");

const registerValidation = (data) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(50).required(),
    email: Joi.string().max(60).required(),
    password: Joi.string().min(5).max(50).required(),
    phone: Joi.number().required(),
    birthday: Joi.string()


  })
  return schema.validate(data);
};


const loginValidation = (data) => {
  const schema = Joi.object({
    email: Joi.string().max(60).required(),
    password: Joi.string().min(5).max(50).required(),
  })
  return schema.validate(data);
}
module.exports.registerValidation = registerValidation;
module.exports.loginValidation = loginValidation;
