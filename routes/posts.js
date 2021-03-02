const router = require('express').Router();


const postModel = require('../models/Post');

router.get("/", async (req, res) => { 
    try {
        const posts = await postModel.find();
                
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});


module.exports = router;