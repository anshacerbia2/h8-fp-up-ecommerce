const axios = require("axios");
const { ObjectId } = require('mongodb')
const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const http = require("http");
const { Server } = require("socket.io");
const { run, getDb } = require("./config/mongo");
const httpServer = http.createServer(app);
const cors = require("cors");
const router = require("./routes");
const mongoAuctionController = require("./controllers/mongoAuctionController");
// const router = require("./routes/index")
app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
const io = new Server(httpServer, {
    cors: {
        origin: '*',
    }
});

app.use("/", router)

io.on("connection", async (socket) => {
    socket.on("join-room", (payload) => {
        socket.join(payload["_id"])
    })
    socket.on("send-bid", async (roomId, userId, price) => {
        let bidData = {
            roomId,
            userId,
            price: +price
        }
        let newId = await mongoAuctionController.postBid(bidData)
        io.to(roomId).emit("send-bid", {
            ...bidData,
            "_id": newId
        })
    })
})

run()
    .then(() => {
        httpServer.listen(port, () => {
            console.log("Cant stop the mongo auction running on port", port)
            db = getDb()
            rooms = db.collection('room')
            chats = db.collection('chat')
        })
    })
    .catch((err) => {
        console.log(err)
    })