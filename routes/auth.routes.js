const Router = require('express').Router
const router = new Router();
const bcrypt = require("bcrypt")
let jwt = require('jsonwebtoken');
const config = require('config')
const {check, validationResult, body} = require('express-validator')
const User = require('../models/User');

router.post('/register',
            // Middelware масив для валідації даних в даному випадку перевіряємо поле email та password
            [
                check('email', 'Неравильний email').isEmail(),
                check('password', 'Мінімальна кількість символів 6')
                    .isLength({min: 6,})
            ],
             async(req, res)=> {
    try {
        // Передаємо в функцію validationResult() req
        const errors = validationResult(req)
        // Валідація помилок
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректні данні при реєстрації"
            })
        }
        const {email, password} = req.body
        // Пошук існуючого користувача
        const candidate = await User.findOne({email: email})
        // Перевірка на наявність користувача
        if (candidate){
            return res.status(400).json({message: "Такий email вже є"})
        }
        // Хешування паролю bcrypt
        const hashedPassword = await bcrypt.hash(password, 12)
        // Створення нового користувача
        const user = new User({ email, password: hashedPassword })
        // асинхронне збереження користувача
        await user.save()
        // створений юзер
        res.status(200).json({message: "User створений"})
        res.redirect('')

    }
    catch (e) {
        res.status(500).json({message: "Серверна помилка...."})
    }
})

router.post('/login',
        [
            check('email', 'Введіть коректний email').normalizeEmail().isEmail(),
            check('password', 'Введіть пароль').exists()
        ],
        async(req, res) => {
    try {
        const errors = validationResult(req)
        if (!errors.isEmpty()){
            return res.status(400).json({
                errors: errors.array(),
                message: "Некоректні данні при вході в систему"
            })
        }
        const {email, password} = req.body
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: 'Користувача не існує' })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch){
            return res.status(400).json({ message: 'Невірний пароль користувача' })
        }
        const token = jwt.sign(
            {userId: user.id},
            config.get('jwtKey'),
            { expiresIn: '1h' }
        )
        res.json({ token, userId: user.id })

    }
    catch (e) {
        res.status(500).json({message: "opps...."})
    }
})
module.exports = router;