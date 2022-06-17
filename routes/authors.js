const express = require('express')
const author = require('../models/author')
const router = express.Router()
const Author = require('../models/author')

//All Authors route
router.get('/', async (req, res)=>{
    let searchOptions = {}
    if (req.query.name != null && req.query.name !== ''){
        searchOptions.name = new RegExp(req.query.name, 'i')
    }
    try {
        const authors = await Author.find(searchOptions)
        res.render('authors/index', {
            authors: authors, 
            searchOptions: req.query
        })
    } catch {
        res.redirect('/')
    }
})

//New Authors route
router.get('/new', (req, res)=>{
    res.render('authors/new', {author: new Author()})
})

//Create Authors route
router.post('/', async (req, res)=>{
    const author = new Author({
        name: req.body.name
    })
    try {
        //res.redirect(`authors/${newAuthor.id}`)
        const newAuthor = await author.save()
        res.redirect(`authors`)
    } catch {
        res.render('authors/new', {
                 author: author,
                 errorMessage: 'Error creating Author'
             })
    }
})

module.exports = router