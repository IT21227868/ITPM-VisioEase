const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const generateToken = require("../utils/generateToken");

//@desc     Get user profile
//route     GET /api/users/profile
//@access   Private
const getUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		res.status(200).json(user);
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//@desc     Get all user profiles
//route     GET /api/users/allProfiles
//@access   Private
const getAllProfiles = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	const users = await User.find({});
	res.json(users);
});

//@desc     Update user profile (including password)
//route     PUT /api/users/profile/:id
//@access   Private
const updateUserProfile = asyncHandler(async (req, res) => {
	const user = await User.findById(req.params.id);

	if (user) {
		user.name = req.body.name || user.name;
		user.email = req.body.email || user.email;
		user.mobile = req.body.mobile || user.mobile;

		// Check if a new password is provided
		if (req.body.newPassword) {
			// Hash the new password
			const salt = await bcrypt.genSalt(10);
			user.password = await bcrypt.hash(req.body.newPassword, salt);
		}

		const updatedUser = await user.save();

		res.status(200).json({
			_id: updatedUser._id,
			name: updatedUser.name,
			email: updatedUser.email,
			mobile: updatedUser.mobile,
		});
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

//@desc     Delete user profile
//route     DELETE /api/users/profile
//@access   Private
const deleteUserProfile = asyncHandler(async (req, res) => {
    const user = await User.findById(req.params.id);

    if (user) {
        await User.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: "User profile deleted" });
    } else {
        res.status(404);
        throw new Error("User not found");
    }
});


const getCurrentUserId = async (req, res) => {
    try {
        // User ID should be available in req.user after authentication
        const userId = req.user.id; 
        res.status(200).json({ userId });
    } catch (error) {
        console.error('Error fetching current user ID:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

module.exports = {
	getUserProfile,
	updateUserProfile,
	deleteUserProfile,
	getAllProfiles,
	getCurrentUserId,
};
