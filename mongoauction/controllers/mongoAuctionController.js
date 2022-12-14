const { ObjectId } = require("mongodb")
const { getDb } = require("../config/mongo")


let db = ""
let rooms = ""
let histories = ""
function getCollections() {
    db = getDb()
    return db
}
async function deleteRooms() {
    try {
        getCollections()
        rooms = db.collection('room')
        await rooms.deleteMany({})
    } catch (err) {
        console.log(err)
    }
}
async function deleteHistories() {
    try {
        getCollections()
        histories = db.collection('history')
        await histories.deleteMany({})
    } catch (err) {
        console.log(err)
    }
}
class mongoAuctionController {
    static async getBidHistory(req, res, next) {
        try {
            let { roomId } = req.params
            getCollections()
            histories = db.collection('history')
            let targetHistories = await histories.find({ roomId: roomId }).toArray()
            res.status(200).json(targetHistories)
        } catch (err) {
            console.log(err)
        }
    }
    static async postBid(bidData) {
        try {
            getCollections()
            histories = db.collection('history')
            let createHistory = await histories.insertOne(bidData)
            return createHistory["insertedId"]
        } catch (err) {
            console.log(err)
        }
    }
    static async getBidRoom(req, res, next) {
        try {
            // await deleteHistories()
            // await deleteRooms()
            let { id } = req.params
            getCollections()
            rooms = db.collection('room');
            let targetRoom = await rooms.findOne({
                auctionProductId: +id
                // userIds: { $all: [+currentId, +targetId] } 
            })
            if (!targetRoom) {
                console.log('target room gaada')
                let roomInsertData = {
                    auctionProductId: +id
                }
                // let roomInsertData = {
                //     roomName: `${currentId}-${targetId}`,
                //     userIds: [currentId, targetId],
                //     users: [
                //         {
                //             userId: currentId,
                //             // name: `${currentUserFirstName} ${currentUserLastName}`, 
                //             // profpic: currentUserProfpic 
                //         },
                //         {
                //             userId: targetId,
                //             // name: `${targetUserFirstName} ${targetUserLastName}`, 
                //             // profpic: targetUserProfpic 
                //         }
                //     ]
                // }
                let createRoom = await rooms.insertOne(roomInsertData)
                targetRoom = await rooms.findOne({ "_id": createRoom["insertedId"] })
            }
            res.status(200).json(targetRoom)
        } catch (err) {
            console.log(err)
        }
    }
}

module.exports = mongoAuctionController