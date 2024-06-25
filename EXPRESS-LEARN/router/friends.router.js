const express = require("express");

const friendsController = require("../controllers/friends.controller");

const friendRouter = express.Router();

friendRouter.use((req, res, next) => {
  console.log(`request ip address ${req.ip}`);
  next();
});

friendRouter.get("/", friendsController.getFriends);
friendRouter.post("/", friendsController.postFriend);
friendRouter.get("/:friendId", friendsController.getFriend);

module.exports = friendRouter;
