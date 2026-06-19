const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// Generate JWT
const generateToken = (id) => {
  return jwt.sign(
    { id },
    process.env.JWT_SECRET,
    {
      expiresIn: "7d",
    }
  );
};


// SIGNUP
const signup = async (req, res) => {
  try {
    const {
      fullName,
      phone,
      email,
      password,
      description,
      profilePic,
    } = req.body;

    if (
      !/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(
        password
      )
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 8 characters and contain letters and numbers only",
      });
    }

    const existingUser = await User.findOne({
      $or: [
        { email },
        { phone },
      ],
    });

    if (existingUser) {
      return res.status(400).json({
        message:
          "Email or Phone already exists",
      });
    }

    const hashedPassword =
      await bcrypt.hash(password, 10);

    const user = await User.create({
      fullName,
      phone,
      email,
      password: hashedPassword,
      description,
      profilePic,
    });

    const token = generateToken(user._id);

    res.status(201).json({
      success: true,

      token,

      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        description: user.description,
        profilePic: user.profilePic,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};


// LOGIN
const login = async (req, res) => {
  try {
    const { phone, password } = req.body;

    const user = await User.findOne({ phone });

    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const isMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid phone number or password",
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        phone: user.phone,
        description: user.description,
        profilePic: user.profilePic,
      },
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};


module.exports = {
  signup,
  login,
};