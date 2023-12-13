const router = require("express").Router();
const User = require("../models").user;
const registerValidation = require("../validation").registerValidation;
const loginValidation = require("../validation").loginValidation;
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer")

function generateVerificationCode() {
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += Math.floor(Math.random() * 10).toString();
  }
  return code;
}

async function sendEmail(recipientEmail, verificationCode) {
  // 创建一个SMTP客户端配置
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // 对于465端口使用true，对于其他端口使用false
    auth: {
      user: 'wxn1229@gmail.com', // 你的Gmail地址
      pass: 'dhhtzkmvtzhykuzy' // 你的Gmail密码
    }
  });

  // 设置电子邮件内容
  let mailOptions = {
    from: '"KFC" <wxn1229@gmail.com>', // 发件人
    to: recipientEmail, // 收件人
    subject: 'Your Verification Code', // 主题
    text: `Your verification code is: ${verificationCode}`, // 纯文本正文
    html: `<b>Your verification code is: ${verificationCode}</b>` // HTML正文
  };

  // 发送电子邮件
  try {
    let info = await transporter.sendMail(mailOptions);
    console.log('Message sent: %s', info.messageId);
    return { success: true, messageId: info.messageId }; // 返回成功信息和邮件ID
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error }; // 返回错误信息
  }
}


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



router.post("/sendverificationcode", async (req, res) => {
  let { email } = req.body;
  let code = generateVerificationCode();

  try {
    let emailResult = await sendEmail(email, code);

    if (emailResult.success) {
      // 邮件发送成功
      return res.send({
        message: 'Verification email sent successfully.',
        messageId: emailResult.messageId, // 可以选择发送邮件ID
        code: code // 谨慎地返回验证码，通常不应该这么做
      });
    } else {
      // 邮件发送失败
      return res.status(500).send({
        message: 'Failed to send verification email.',
        error: emailResult.error
      });
    }
  } catch (e) {
    console.log(e);
    return res.status(500).send({ message: 'An error occurred.' });
  }
});

module.exports = router;
