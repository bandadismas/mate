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

router.get("/getPost/:id", async (req, res) => {
    const id = req.params.id;
    console.log('got id')
    console.log(id);

    try {
        const post = await postModel.findById(id);
        console.log('got post')

        console.log('sending response now')   
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


module.exports = router;