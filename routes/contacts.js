const express = require('express')
const router = express.Router()
const {getContacts,createContact,updateContact,getContact,deleteContact} = require("../controller/contactController.js")
//router.route("/").get(getContacts)
//
//router.route("/").post(createContact)
//
//router.route("/:id").put(updateContact)
//
//router.route("/:id").delete(deleteContact)
//router.route("/:id").get(getContact)

router.route("/").get(getContacts).post(createContact)
router.route("/:id").put(updateContact).delete(deleteContact).get(getContact)

module.exports = router
