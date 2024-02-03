const express = require('express')
const { registerUser, loginUser, currentUser } = require('../controller/userController')
const router = express.Router()
const validateToken = require("../middleware/validateTokenHandler")

router.post("/register",registerUser)

router.post("/login",loginUser)

router.post("/current",validateToken,currentUser)//private route

module.exports = router
