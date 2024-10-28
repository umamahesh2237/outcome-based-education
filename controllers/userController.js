const User = require('../models/User'); // Adjusted path for the User model
const bcrypt = require('bcryptjs');
//const jwt = require('jsonwebtoken');
const Regulation = require('../models/Regulation.js'); // Import the Regulation model

// User sign-up functionality
exports.signUp = async (req, res) => {
  const { firstName, lastName, idRollNo, email, password, confirmPassword, role } = req.body;
  console.log(req.body)
  console.log(role)
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  try {
    const newUser = new User({ firstName, lastName, idRollNo, email, password: hashedPassword, role });
    await newUser.save();
    res.status(200).json({ msg: 'User registered successfully' });
  } catch (error) {
    console.log('error')
    res.status(500).json({ error: 'Error registering user' });
  }
};

// User login functionality
exports.login = async (req, res) => {
  const { userId, password } = req.body;
  try {
    console.log("inside")
    const user = await User.findOne({ 'email': userId });
    console.log(user)
    if (!user) return res.status(400).json({ msg: 'User ID/Password is incorrect' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'User ID/Password is incorrect' });
    console.log("reached");
    //const token = jwt.sign({ id: user._id, role: user.role }, 'secret', { expiresIn: '1h' });
    res.json({ name: user.firstName, role: user.role });
  } catch (error) {
    res.status(500).json({ message: 'Error logging in user' });
  }
};

// Add Regulation functionality
exports.addRegulation = async (req, res) => {
  const { batch, academicYear, regulation, semester } = req.body;

  try {
    // Create a new regulation entry
    const newRegulation = new Regulation({
      batch,
      academicYear,
      regulation,
      semester
    });

    // Save the regulation to the database
    await newRegulation.save();
    
    res.status(200).json({ msg: 'Regulation added successfully' });
  } catch (error) {
    console.error('Error adding regulation:', error);
    res.status(500).json({ error: 'Error adding regulation' });
  }
};

exports.getUserProfile = async (req, res) => {
  try {
    const userId = req.userId;
    console.log() // Ensure user ID is passed with token, adjust as per your authentication logic
    const user = await User.findById(userId, 'firstName');
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ firstName: user.firstName });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ msg: 'Server error' });
  }
};