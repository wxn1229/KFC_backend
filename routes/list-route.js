const router = require("express").Router();
const ShoppingList = require("../models").shoppinglist;


router.use((req, res, next) => {
  console.log("in list router");
  next();

})
router.get('/findbyid/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // 查找所有屬於該用戶的購物清單
    const shoppingLists = await ShoppingList.find({ user: userId });

    if (shoppingLists.length === 0) {
      return res.status(404).send({ message: 'No shopping lists found for the user.' });
    }

    res.status(200).send(shoppingLists);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

router.post('/create', async (req, res) => {
  const { user, deliveryAddress, pickupTime } = req.body;

  try {
    const newShoppingList = new ShoppingList({
      user,
      deliveryAddress,
      pickupTime
    });

    const savedList = await newShoppingList.save();
    res.status(201).send(savedList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});


router.put('/addproduct', async (req, res) => {
  const { userId, newItem } = req.body; // newItem 應該是一個包含 title 和 item 的物件

  try {
    // 找到用戶的購物清單並更新
    const updatedList = await ShoppingList.findOneAndUpdate(
      { user: userId },
      { $push: { listitems: newItem } },
      { new: true, upsert: true } // upsert: true 表示如果沒有找到購物清單，將創建一個新的
    );

    res.status(200).send(updatedList);
  } catch (error) {
    res.status(400).send({ message: error.message });
  }
});
router.delete('/deleteone', async (req, res) => {
  const { userId, itemId } = req.body;

  try {
    // 從用戶的購物清單中刪除特定 item
    const updatedList = await ShoppingList.findOneAndUpdate(
      { user: userId },
      { $pull: { 'listitems.$.item': { _id: itemId } } },
      { new: true }
    );

    if (!updatedList) {
      return res.status(404).json({ message: 'Shopping list not found.' });
    }

    res.status(200).send(updatedList);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});



router.delete('/deleteAll/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    // 刪除所有屬於該用戶的購物清單
    const result = await ShoppingList.deleteMany({ user: userId });


    if (result.deletedCount === 0) {
      return res.status(404).json({ message: 'No shopping lists found for the user.' });
    }


    res.status(200).send({ message: 'All shopping lists for the user have been deleted.' });
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
});

module.exports = router;

