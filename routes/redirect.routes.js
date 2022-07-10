const Router = require('express').Router
const router = new Router();
const Link = require('../models/Link');

router.get('/:code', async (req,res) => {
    try {
        const link = await Link.findOne({code: req.params.code})
        if(link){
            link.clicks++
            await link.save()
            res.redirect(link.from)
        }
        res.status(404).json('link not found')
    }
    catch (e) {}
})

module.exports = router;