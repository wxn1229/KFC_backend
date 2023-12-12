const router = require("express").Router();
const User = require("../models").user;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");




router.use((req, res, next) => {
  console.log("catch from auth router ")
  next();
});


router.get("/testAPI", (req, res) => {
  return res.send("sucess connect to auth");
})

router.post("/register", async (req, res) => {

  console.log(req.body);

  let { error } = registerValidation(req.body);
  if (error) return res.status(500).send(error.details[0].message);

  const phoneExist = await User.findOne({ phone: req.body.phone })
  if (phoneExist) return res.status(400).send("手機已經被註冊過了");

  const emailExist = await User.findOne({ email: req.body.email })
  if (emailExist) return res.status(400).send("email 已經被註冊過了");

  let { phone, username, email, password, birthday } = req.body;
  let newUser = new User({ phone, username, email, password, birthday });
  try {
    let savedUser = await newUser.save();
    return res.send({
      msg: "成功註冊",
      savedUser,
    });

  } catch (e) {
    return res.status(500).send(e);

  }



})


router.post("/login", async (req, res) => {
  let { error } = loginValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  const emailExist = await User.findOne({ email: req.body.email })
  if (!emailExist) return res.status(401).send("此email 尚未註冊");

  emailExist.comparePassword(req.body.password, (err, isMatch) => {
    if (isMatch) {
      const tokenObject = { _id: emailExist._id, email: emailExist.email };
      const token = jwt.sign(tokenObject, "wxn");
      return res.send({
        msg: "成功登入",
        token: "JWT " + token,
        user: emailExist,
      })


    } else {
      return res.status(400).send("密碼錯誤")
    }
  })






})





module.exports = router;
