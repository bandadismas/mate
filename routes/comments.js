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
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

        const updatedPost = await postModel.findByIdAndUpdate(id, {body:body});

        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.delete("/deletePost/:id", auth, async (req, res) => {
    const id = req.params.id;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

        await postModel.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully." });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/likePost/:id", auth, async (req, res) => {
    const id = req.params.id;

    try {
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
        
        const post = await postModel.findById(id);
    
        const likeIndex = post.likes.findIndex((id) => id ===String(req.userId));
        const dislikeIndex = post.dislikes.findIndex((id) => id ===String(req.userId));
        
    
        if (likeIndex === -1) {
          post.likes.push(req.userId);

          if (dislikeIndex !== -1) {
            post.dislikes = post.dislikes.filter((id) => id !== String(req.userId));
          }
        } else {
          post.likes = post.likes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/dislikePost/:id", auth, async (req, res) => {
    const id = req.params.id;

    try {
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
        
        const post = await postModel.findById(id);
    
        const likeIndex = post.likes.findIndex((id) => id ===String(req.userId));
        const dislikeIndex = post.dislikes.findIndex((id) => id ===String(req.userId));
        
    
        if (dislikeIndex === -1) {
          post.dislikes.push(req.userId);

          if (likeIndex !== -1) {
            post.likes = post.likes.filter((id) => id !== String(req.userId));
          }
        } else {
          post.dislikes = post.dislikes.filter((id) => id !== String(req.userId));
        }
        const updatedPost = await postModel.findByIdAndUpdate(id, post, { new: true });
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;