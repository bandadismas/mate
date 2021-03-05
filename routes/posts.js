const router = require('express').Router();
const mongoose = require('mongoose');


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

router.get("/getPost/:id", async (req, res) => {
    const id = req.params.id;

    try {
        const post = await postModel.findById(id);
          
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/createPost", auth, async (req, res) => {
    const {body} = req.body;

    const newPost = new postModel({ body, author: req.userId })

    try {
        await newPost.save();

        res.status(201).json(newPost );
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/editPost/:id", auth, async (req, res) => {
    const id = req.params.id;
    const {body} = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).send(`No post with id: ${id}`);

        const updatedPost = await postModel.findByIdAndUpdate(id, {body:body});

        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});


module.exports = router;