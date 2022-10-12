const router = require("express").Router()
const auction = require("./auction.js")

router.use("/", auction)

module.exports = router