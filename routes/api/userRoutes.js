const router = require("express").Router();
const {
  getUsers,
  createUser,
  getSingleUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
} = require("../../controllers/userController");

// api/users
router.route("/").get(getUsers).post(createUser);

// api/users/:userID
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

// /api/users/:userId/friends/:friendId
router.route("/:userId/friends/:friendId").post(addFriend).delete(removeFriend);

module.exports = router;
