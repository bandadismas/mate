const router = require('express').Router();
const mongoose = require('mongoose');

const postModel = require('../models/Post');
const commentModel = require('../models/Comment');
const auth = require("../auth/auth");

router.post("/comment/:id", auth, async (req, res) => {
    const id = req.params.id;
    const {body} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

    const newComment = new commentModel({ body, author: req.userId, post: id })
    try {
        await newComment.save();

        const post = await postModel.findById(id);
        post.comments.push(newComment._id);
        post.save()

        res.status(201).json(newComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/editComment/:id", auth, async (req, res) => {
    const id = req.params.id;
    const {body} = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No comment with id: ${id}`});

        const updatedComment = await commentModel.findByIdAndUpdate(id, {body:body});

        res.json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});



module.exports = router;