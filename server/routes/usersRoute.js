const express = require("express")

const {
  getAllUsers,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser
} = require("../controllers/userControllers")

const router = express.Router()

// --------------ROUTER USERS----------------

router.route("/").get(getAllUsers).post(createUser)

router.route("/:id").get(getSingleUser).patch(updateUser).delete(deleteUser)

module.exports = router
