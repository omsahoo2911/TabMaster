const express = require('express')
const router = express.Router()
const Song = require('../models/song')

router.get('/', async (req, res)=>{
    let songs 
    try {
        songs = await Song.find().sort({ createdAt: 'desc'}).limit(10).exec()
    } catch {
        songs = []
    }
    res.render('index', {songs: songs})
})

module.exports = router