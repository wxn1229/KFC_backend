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

router.get("/findbytitle/:title", async (req, res) => {
  try {
    let title = req.params.title;

    let foundItem = await Items.find({ title: title })
    return res.send({
      msg: "sucess to find by title",
      foundItem
    })

  } catch (e) {

    return res.status(500).send(e);

  }

})

router.get("/findbygroup/:group", async (req, res) => {
  try {

    let group = req.params.group

    let foundItems = await Items.find({ group: group })
    return res.send({
      msg: "sucess to find by group",
      foundItems

    })
  } catch (e) {
    return res.status(500).send(e);
  }

})



router.get("/findbyid/:id", async (req, res) => {
  let id = req.params.id;
  try {
    let foundItem = await Items.findOne({ _id: id });
    return res.send({
      msg: "sucess to find by id ",
      foundItem
    })

  } catch (e) {
    return res.status(500).send({
      msg: "fail to find by id ",
      e

    });

  }

})






module.exports = router;
