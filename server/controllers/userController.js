const User = require('../models/User');

// --- NEW VALIDATION HELPER FUNCTION ---
const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,15}$/;
  return passwordRegex.test(password);
};

const getUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    res.status(200).json(user);
};

const updateUserProfile = async (req, res) => {
    const user = await User.findById(req.user._id);
    if (user) {
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.dob = req.body.dob || user.dob;
        user.phone = req.body.phone || user.phone;
        user.nationality = req.body.nationality || user.nationality;
        const updatedUser = await user.save();
        res.json({
            _id: updatedUser._id,
            firstName: updatedUser.firstName,
            lastName: updatedUser.lastName,
            email: updatedUser.email,
        });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

const changePassword = async (req, res) => {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user._id).select('+password');

    if (!user || !(await user.matchPassword(currentPassword))) {
        return res.status(401).json({ message: 'Incorrect current password' });
    }

    // --- ADDED VALIDATION CHECK ---
    if (!validatePassword(newPassword)) {
        return res.status(400).json({ 
          message: 'New password must meet the criteria: 6-15 characters, one uppercase, one lowercase, one number, one special character.' 
        });
    }

    user.password = newPassword;
    await user.save();
    res.status(200).json({ message: 'Password updated successfully' });
};

const updateUserSettings = async (req, res) => {
    const user = await User.findById(req.user._id);
    if(user) {
        user.settings.theme = req.body.theme || user.settings.theme;
        await user.save();
        res.status(200).json({ message: 'Settings updated successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
};

module.exports = { getUserProfile, updateUserProfile, changePassword, updateUserSettings };