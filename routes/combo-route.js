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

  let newCombo = new Combo({
    comboname: comboname,
    price: price,
    title: title,
    imgpath: imgpath,
    imgpath_inside: imgpath_inside,
    items: [{
      item: item1,
      itemnumber: num1,
    },
    {
      item: item2,
      itemnumber: num2,
    },
    {
      item: item3,
      itemnumber: num3,
    },
    {
      item: item4,
      itemnumber: num4
    },
    {
      item: item5,
      itemnumber: num5,
    }

    ]


  })

  try {
    let savedCombo = await newCombo.save();
    return res.send({
      msg: "combo sucess to saved",
      savedCombo
    })

  } catch (e) {

    return res.status(500).send(
      e
    );
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
    return res.status(500).send("search server error");

  }
})


router.get("/find/:id", async (req, res) => {
  let id = req.params;
  try {
    let foundcombo = await Combo.findOne({ _id: id });
    return res.send({
      msg: "sucess to find by id ",
      foundcombo
    })

  } catch (e) {
    return res.status(500).send("id server error");

  }

})







module.exports = router;
