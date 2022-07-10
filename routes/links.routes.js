const Router = require('express').Router
const router = new Router();
const Link = require('../models/Link');
const config = require('config');
const shortid = require('shortid')

// middleware, який перевіряє чи авторизований користувач і повертає дешефрований токен користувача
const auth = require('../middleware/auth.middleware')

router.post('/generate', auth, async (req, res) => {
    try {
        const baseUrl = config.get("baseUrl")
        // Получаєм данні з фронта про силку
        const {from} = req.body
        const code = shortid.generate()
        // Перевірка на те чи існує посилання
        const existing = await Link.findOne({from})
        if(existing){
            return res.json({ Link: existing })
        }
        // Формуємо данні для нашого сайту
        const to = baseUrl + '/t/' + code
        const link = new Link({
            code, to, from, owner: req.user.userId
        })
        await link.save()
        res.status(201).json({ link })
    }
    catch (e) {
        res.status(500).json({message: "opps...."})
    }
})

// Підключення auth до запиту
router.get('/', auth, async (req, res) => {
    try {
        const links = await Link.find({owner: req.user.userId}) // знайти за користувачем
        res.json(links)
    }
    catch (e) {
        res.status(500).json({message: "opps...."})
    }
})

router.get('/:id', auth, async (req, res) => {
    try {
        const link = await Link.findById(req.params.id) // знайти за користувачем
        res.json(link)
    }
    catch (e) {
        res.status(500).json({message: "opps...."})
    }
})

module.exports = router