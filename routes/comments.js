const router = require('express').Router();
const mongoose = require('mongoose');

const postModel = require('../models/Post');
const commentModel = require('../models/Comment');
const auth = require("../auth/auth");

router.post("/comment/:id", auth, async (req, res) => {
    console.log('create comment route');
    const id = req.params.id;
    const {body} = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

    const newComment = new commentModel({ body, author: req.userId, post: id })
    try {
        await newComment.save();

        const post = await postModel.findById(id);
        post.comments.push(newComment._id);
        post.save()

        res.status(201).json({comment:newComment, post:post});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/editComment/:id", auth, async (req, res) => {
    console.log('edit comment route');

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

router.delete("/deleteComment/:id", auth, async (req, res) => {
    console.log('delete comment route');

    const id = req.params.id;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
    
        await commentModel.findByIdAndRemove(id);

        res.json({Message: "Comment deleted successfully"});
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/likeComment/:id", auth, async (req, res) => {
    console.log('like comment route');

    const id = req.params.id;

    try {
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
        
        const comment = await commentModel.findById(id);
    
        const likeIndex = comment.likes.findIndex((id) => id ===String(req.userId));
        const dislikeIndex = comment.dislikes.findIndex((id) => id ===String(req.userId));
        
    
        if (likeIndex === -1) {
          comment.likes.push(req.userId);

          if (dislikeIndex !== -1) {
            comment.dislikes = comment.dislikes.filter((id) => id !== String(req.userId));
          }
        } else {
          comment.likes = comment.likes.filter((id) => id !== String(req.userId));
        }
        const updatedComment = await commentModel.findByIdAndUpdate(id, comment, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/dislikeComment/:id", auth, async (req, res) => {
    console.log('dislike comment route');

    const id = req.params.id;

    try {
        if (!req.userId) {
            return res.json({ message: "Unauthenticated" });
          }
    
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});
        
        const comment = await commentModel.findById(id);
    
        const likeIndex = comment.likes.findIndex((id) => id ===String(req.userId));
        const dislikeIndex = comment.dislikes.findIndex((id) => id ===String(req.userId));
        
    
        if (dislikeIndex === -1) {
          comment.dislikes.push(req.userId);

          if (likeIndex !== -1) {
            comment.likes = comment.likes.filter((id) => id !== String(req.userId));
          }
        } else {
          comment.dislikes = comment.dislikes.filter((id) => id !== String(req.userId));
        }
        const updatedComment = await commentModel.findByIdAndUpdate(id, comment, { new: true });
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;