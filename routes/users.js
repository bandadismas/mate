const router = require('express').Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userModel = require('../models/User');
const userDetailsModel = require('../models/UserDetails');
const auth = require("../auth/auth");
const secret = "SECRET"; 

router.post("/signup", async (req, res) => {
    console.log('signup route');

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
    console.log('login route');

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

router.get("/users", async (req, res) => {
    console.log('get all users route');

    console.log('users path hit');
    try {
        const users = await userModel.find();
        console.log(users);

        res.status(200).json(users);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
});

router.post("/userDetails/", auth, async (req, res) => {
    console.log('create user details route');

    const {firstName, middleName, lastName, city, country} = req.body;

    try {
        const newDetails = await userDetailsModel.create({user: req.userId ,
                                                          firstName: firstName, 
                                                          middleName: middleName,
                                                          lastName: lastName,
                                                          city: city,
                                                          country:country});

        res.status(201).json(newDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

router.get("/userDetails/", auth, async (req, res) => {
    console.log('get user details route');

    try {
        const userDetails = await userDetailsModel.find((user) => user === req.userId);

        res.status(200).json(userDetails);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
});

module.exports = router;