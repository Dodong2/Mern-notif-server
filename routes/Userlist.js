const express = require('express')
const router = express.Router()

const UserModel = require('./Model')

router.get('/getUser', async(req, res) => {
    try {
        const users = await UserModel.find({})
        res.status(200).json(users)
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Database Error!" })
    }
})

router.post('/createUser', async(req, res) => {
    try {
        const user = req.body
        const newUser = new UserModel(user)
        const savedUser =  await newUser.save()
        res.status(200).json({ message: "successfully created", user:savedUser })
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: 'Database Error!' })
    }
})

router.post('/updateUser/:id', async(req, res) => {
    try {
        const { id } = req.params
        const updateData = req.body
        const users = await UserModel.findByIdAndUpdate(id, updateData, { new: true })
        if(!users) {
            return res.status(404).json({ error: "users not found" })
        }
        res.status(200).json({ message: "User data updated successfully !", users })
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Database Error!" })
    }
})

router.post('/delete/:id', async(req, res) => {
    try {
        const { id } = req.params
        if (!id) {
            return res.status(400).json({ error: "Invalid ID" });
        }
        const deleteUser = await UserModel.findByIdAndDelete(id)
        if(!deleteUser) {
            res.status(404).json({ error: "user not found" })
        }
        res.status(200).json({ message: "Deleted Successfully!" })
    } catch(err) {
        console.log(err)
        res.status(500).json({ error: "Database Error!" })
    }
})

module.exports = router