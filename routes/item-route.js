const router = require("express").Router();
const Items = require("../models").items;


router.use((req, res, next) => {
  console.log("catch from item router")
  next();

})


router.post("/create", async (req, res) => {
  let { itemname, title, price, imgpath, group, canChange } = req.body;

  let imgpath_inside = imgpath + "_in.jpg"
  imgpath = imgpath + ".jpg"
  let newItem = new Items({ itemname, title, price, imgpath, imgpath_inside, group, canChange });

  try {
    let savedItem = await newItem.save();
    return res.send({
      msg: "Item sucess to saved",
      savedItem
    })

  } catch (e) {

    return res.status(500).send(
      e
    );
  }

})



router.get("/searchAll", async (req, res) => {
  try {

    let searchAll = await Items.find({});
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
    let foundItem = await Items.findOne({ _id: id });
    return res.send({
      msg: "sucess to find by id ",
      foundItem
    })

  } catch (e) {
    return res.status(500).send("id server error");

  }

})






module.exports = router;
