const router = require('express').Router();
const mongoose = require('mongoose');


const postModel = require('../models/Post');
const auth = require("../auth/auth");

router.get("/", async (req, res) => { 
    console.log('home route');

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
    console.log('create post route');

    const {body} = req.body;

    const newPost = new postModel({ body, author: req.userId });

    try {
        await newPost.save();

        res.status(201).json(newPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/editPost/:id", auth, async (req, res) => {
    console.log('edit post route');

    const id = req.params.id;
    const {body} = req.body;
    
    try {
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

        const updatedPost = await postModel.findByIdAndUpdate(id, {body:body},{
            new:true});
        console.log(body);

        console.log(updatedPost);
        res.json(updatedPost);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.delete("/deletePost/:id", auth, async (req, res) => {
    console.log('delete post route');

    const id = req.params.id;

    try{
        if (!mongoose.Types.ObjectId.isValid(id)) return res.status(404).json({message:`No post with id: ${id}`});

        await postModel.findByIdAndRemove(id);

        res.json({ message: "Post deleted successfully.", id });
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.patch("/likePost/:id", auth, async (req, res) => {
    console.log('like post route');

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
    console.log('dislike post route');

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