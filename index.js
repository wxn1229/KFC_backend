const express = require("express");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./routes").auth;
const itemRoute = require("./routes").item;
const comboRoute = require("./routes").combo;
const listRoute = require("./routes").list;

const passport = require("passport");

require("./config/passport")(passport);
const cors = require("cors");



mongoose
  .connect("mongodb://localhost:27017/KFC")
  .then(() => {
    console.log("connect to mongodb");
  })
  .catch((e) => {
    console.log(e)
  });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


app.use("/api/user", authRoute);

app.use("/api/item", itemRoute);
app.use("/api/combo", comboRoute);

app.use("/api/list", listRoute)
//app.use("/api/list", passport.authenticate("jwt", { session: false }), listRoute)



app.listen(8080, () => {
  console.log("server is listening in port 8080...")

});

