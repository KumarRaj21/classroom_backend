const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../modals/User');
const router = express.Router();

// Principal login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).send('User not found');
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(400).send('Invalid credentials');
  const token = jwt.sign({ id: user._id, role: user.role },'my_authentication_key_123');
  res.send({ token });
  } catch (error) {
    console.log(error)
  }
  
});

// Create teacher or student
router.post('/register', async (req, res) => {
  try {
    const { email, password, role } = req.body;
  const user = new User({ email, password, role });
  await user.save().then(()=>{
    res.status(200).json({message: "user created"});
  });
  } catch (error){
    res.status(200).json({ message:"user already exists"});
  }
  
});

module.exports = router;
