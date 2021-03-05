const router = require('express').Router();


const postModel = require('../models/Post');
const auth = require("../auth/auth");

router.get("/", async (req, res) => { 
    try {
        const posts = await postModel.find();
                
        res.status(200).json(posts);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/create-post", auth, async (req, res) => {
    const post = req.body;

    const newPost = new postModel({ ...post, author: req.userId })

    try {
        await newPost.save();

        res.status(201).json(newPost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});


module.exports = router;