const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');

const secret = "SECRET";

router.post("/signup", async (req, res) => {
    const {email, password} = req.body;

    try {
        const user = await userModel.findOne({ email });
    
        if (user) return res.status(400).json({ message: "User already exists" });
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const result = await userModel.create({ email, password: hashedPassword });
    
        const token = jwt.sign( { email: result.email, id: result._id }, secret, { expiresIn: "1h" } );
    
        res.status(201).json({ result, token });
      } catch (error) {
        res.status(500).json({ message: "Something went wrong" });
        
        console.log(error);
      }
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await userModel.findOne({ email });

        if (!user) return res.status(404).json({ message: "User doesn't exist" });

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

        res.status(200).json({ result: user, token });
    } catch (err) {
        res.status(500).json({ message: "Something went wrong" });
    }
});

module.exports = router;