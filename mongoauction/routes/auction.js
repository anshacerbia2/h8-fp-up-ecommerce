const mongoAuctionController = require("../controllers/mongoAuctionController")
const router = require("express").Router()

router.get("/room/:id", mongoAuctionController.getBidRoom)
router.get("/history/:roomId", mongoAuctionController.getBidHistory)

module.exports = router