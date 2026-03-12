
import { io, userSocketMap } from "../index.js"
import { Connection } from "../models/connection.moels.js"
import { User } from "../models/user.models.js"

export const sendConnection = async (req, res) => {
    try {
        const { id } = req.params
        const sender = req.user._id
        const user = await User.findById(sender)
        if (sender.toString() == id) {
            return res.status(400).json({ message: "you can not send request yourself" })
        }
        if (user.connections.includes(id)) {
            return res.status(400).json({ message: "you are already connected" })
        }
        const existingConnection = await Connection.findOne({
            $or: [
                { sender, receiver: id },
                { sender: id, receiver: sender }
            ],
            status: "pending"
        })
       
        if (existingConnection) {
            return res.status(400).json({ message: "connection request already sent" })

        }
        const newRequest = await Connection.create({
            sender,
            receiver: id
        })

        const receiverSocketId = userSocketMap.get(id)
        const senderSocketId = userSocketMap.get(sender)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpdate", {
                updatedUserId: sender,
                newStatus: "received",
            })
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpdate", {
                updatedUserId: id,
                newStatus: "pending",
            })

        }

        return res.status(200).json({ message: "connection request sent successfully", request: newRequest })
    } catch (error) {
        return res.status(400).json({ message: "connection request error" })
    }
}

export const acceptConnection = async (req, res) => {
    try {
        const { connectionId } = req.params
        const connection = await Connection.findById(connectionId)
        if (!connection) {
            return res.status(400).json({ message: "connection does not exist" })
        }
        if (connection.status != "pending") {
            return res.status(400).json({ message: "connection request is not pending" })
        }
        connection.status = "accepted"
        await connection.save()

        await User.findByIdAndUpdate(req.user._id, {
            $addToSet: { connections: connection.sender._id }
        })

        await User.findByIdAndUpdate(connection.sender._id, {
            $addToSet: { connections: req.user._id }
        })

        const receiverSocketId = userSocketMap.get(connection.receiver._id.toString())
        const senderSocketId = userSocketMap.get(connection.sender._id.toString())

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpdate", {
                updatedUserId: connection.sender._id,
                newStatus: "disconnect",
            })
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpdate", {
                updatedUserId: req.user._id,
                newStatus: "disconnect",
            })

        }

        return res.status(200).json({ message: "connection request accepted successfully" })
    } catch (error) {
        return res.status(400).json({ message: "accept connection request error" })
    }
}

export const rejectConnection = async (req, res) => {
    try {
        const { connectionId } = req.params
        const connection = await Connection.findById(connectionId)
        if (!connection) {
            return res.status(400).json({ message: "connection does not exist" })
        }
        if (connection.status != "pending") {
            return res.status(400).json({ message: "connection request is not pending" })
        }
        connection.status = "rejected"
        await connection.save()



        return res.status(200).json({ message: "connection request rejected successfully" })
    } catch (error) {
        return res.status(400).json({ message: "reject connection request error" })
    }
}


export const getConnectionStatus = async (req, res) => {
    try {
        const targetUserId = req.params.userId
        const currentUserId = req.user._id
        const currentUser = await User.findById(currentUserId)
        if (currentUser.connections.includes(targetUserId)) {
            return res.json({ status: "disconnect" })
        }

        const pendingConnection = await Connection.findOne({
            $or: [
                { sender: currentUserId, receiver: targetUserId, status: "pending" },
                { sender: targetUserId, receiver: currentUserId, status: "pending" }
            ]
        })

        if (pendingConnection) {
            if (pendingConnection.sender.toString() === currentUserId.toString()) {
                return res.json({ status: "pending" })
            }
            else {
                return res.json({ status: "received", requestId: pendingConnection._id })
            }

        }

        return res.json({ status: "connect" })

    } catch (error) {
        return res.status(400).json({ message: "get connection status error" })
    }
}

export const removeConnection = async (req, res) => {
    try {
        const myId = req.user._id
        const targetUserId = req.params.userId
        const connection = await Connection.findOneAndDelete({
            $or: [
                { sender: myId, receiver: targetUserId, status: "accepted" },
                { sender: targetUserId, receiver: myId, status: "accepted" }
            ]
        })

        await User.findByIdAndUpdate(myId,{
            $pull:{ connections: targetUserId }
        })

        await User.findByIdAndUpdate(targetUserId,{
            $pull:{ connections: myId }
        })
        const receiverSocketId = userSocketMap.get(targetUserId)
        const senderSocketId = userSocketMap.get(myId)

        if (receiverSocketId) {
            io.to(receiverSocketId).emit("statusUpdate", {
                updatedUserId: myId,
                newStatus: "connect",
            })
        }
        if (senderSocketId) {
            io.to(senderSocketId).emit("statusUpdate", {
                updatedUserId: targetUserId,
                newStatus: "connect",
            })

        }
        return res.status(200).json({ message: "connection removed successfully" })

    } catch (error) {
        return res.status(400).json({ message: "remove connection error" })
    }
}

export const getConnectionRequest = async (req, res) => {
    try {
        const userId = req.user._id
        const request = await Connection.find({
            receiver: userId,
            status: "pending"
        }).populate("sender", "firstname lastname email username profileImage headline")
        return res.status(200).json({ requests: request })
    } catch (error) {
        console.error("Error in getConnectionRequest:", error);
        return res.status(400).json({ message: "get connections error" })
    }
}

export const getUserConnections = async (req, res) => {
    try {
        const userId = req.user._id
        const user = await User.findById(userId).populate("connections", "firstname lastname email username profileImage headline")
        return res.status(200).json(user.connections)
    } catch (error) {
        return res.status(400).json({ message: "get connections error" })
    }
}