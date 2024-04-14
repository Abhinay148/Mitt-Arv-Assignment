const express = require('express')
const router = express.Router()
const fetchuser = require('../Middleware/Fetchuser');
const authuser = require('../Middleware/authuser');
const Notes = require('../Models/Notes')
const { body, validationResult } = require('express-validator');



//Route 1: add notes by user
router.post('/addnotes', authuser,

    async (req, res) => {
        try {
            const { title, description, image, video } = req.body;
            const note = new Notes({ title, description, image, video, user: req.user.id });
            const savedNote = Notes.create(note)
            res.json(savedNote)

        }
        catch (error) {
            console.log(error.message)
            res.status(500).json('some error occured')
        }
    })

//Route 2: get user note by user
router.get('/fetchusernotes', authuser, async (req, res) => {
    const notes = await Notes.find({ user: req.user.id })
    res.json(notes)
})


module.exports = router
