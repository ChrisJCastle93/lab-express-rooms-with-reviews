const Room = require("../models/Room.model");
const router = require("express").Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const isLoggedOut = require("../middleware/isLoggedOut");
const User = require("../models/User.model");

/* GET home page */
router.get("/", (req, res, next) => {
  Room.find().then((rooms) => {
    res.render("rooms/read", { rooms });
  });
});

// router.get("/new", isLoggedIn, (req, res, next) => {
router.get("/new", (req, res, next) => {
  res.render("rooms/create");
});

router.post("/new", isLoggedIn, (req, res, next) => {
  const user = req.session.user;
  const { name, description, imageURL } = req.body;
  Room.create({
    name,
    description,
    imageURL,
    owner: user._id,
  })
    .then((newRoom) => {
      return newRoom;
    })
    .then((newRoom) => {
      return User.find(newRoom.owner)
    })
    .then((user) => console.log(user))
    .catch((err) => console.log(err));
});

module.exports = router;
