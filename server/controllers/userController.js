const User = require("../models/User");

const updateProfile = async (req, res) => {
  try {

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.fullName =
      req.body.fullName || user.fullName;

    user.email =
      req.body.email || user.email;

    user.phone =
      req.body.phone || user.phone;

    user.description =
      req.body.description || user.description;

    user.profilePic =
      req.body.profilePic || user.profilePic;

    await user.save();

    res.status(200).json({
      success: true,
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
  updateProfile,
};