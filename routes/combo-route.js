const router = require("express").Router();
const Combo = require("../models").combo;

router.use((req, res, next) => {
  console.log("catch from combo router")
  next();

})



router.get("/testAPI", (req, res) => {
  return res.send("test API in combo router")

})


router.post("/create", async (req, res) => {
  let { comboname, title, price, imgpath, item1, num1, item2, num2, item3, num3, item4, num4, item5, num5 } = req.body;

  let imgpath_inside = imgpath + "_in.jpg"
  imgpath = imgpath + ".jpg"

  // 初始化一個空陣列來存儲items
  let items = [];

  // 為每個item和num對檢查，如果都不為空，則添加到陣列
  if (item1 && num1) items.push({ item: item1, itemnumber: num1 });
  if (item2 && num2) items.push({ item: item2, itemnumber: num2 });
  if (item3 && num3) items.push({ item: item3, itemnumber: num3 });
  if (item4 && num4) items.push({ item: item4, itemnumber: num4 });
  if (item5 && num5) items.push({ item: item5, itemnumber: num5 });

  let newCombo = new Combo({
    comboname: comboname,
    price: price,
    title: title,
    imgpath: imgpath,
    imgpath_inside: imgpath_inside,
    items: items // 使用過濾後的items陣列
  })

  try {
    let savedCombo = await newCombo.save();
    return res.send({
      msg: "combo success to saved",
      savedCombo
    })
  } catch (e) {
    return res.status(500).send(e);
  }
})

router.get("/searchAll", async (req, res) => {
  try {

    let searchAll = await Combo.find({});
    return res.send({
      msg: "sucess to find all",
      searchAll,
    })
  } catch (e) {
    return res.status(500).send(e);

  }
})

router.get("/findbytitle/:title", async (req, res) => {
  try {
    let title = req.params.title;

    let foundcombo = await Combo.find({ title: title })
    return res.send({
      msg: "sucess to find by title",
      foundcombo
    })

  } catch (e) {

    return res.status(500).send(e);

  }


})

router.get("/findbygroup/:group", async (req, res) => {
  try {

    let group = req.params.group

    let fondcombo = await Combo.find({ group: group })
    return res.send({
      msg: "sucess to find by group",
      foundcombo

    })
  } catch (e) {
    return res.status(500).send(e);
  }

})


router.get("/findbyid/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let foundcombo = await Combo.findOne({ _id: id });
    return res.send({
      msg: "sucess to find by id ",
      foundcombo
    })

  } catch (e) {
    return res.status(500).send({
      msg: "find by id fail",
      e
    });

  }

})







module.exports = router;
