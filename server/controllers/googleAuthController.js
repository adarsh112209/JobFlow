const { google } = require('googleapis');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  'http://localhost:5000/api/auth/google/callback'
);

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });
};

const redirectToGoogle = (req, res) => {
  const scopes = [
    'https://www.googleapis.com/auth/userinfo.profile',
    'https://www.googleapis.com/auth/userinfo.email',
    'https://www.googleapis.com/auth/gmail.readonly'
  ];

  const url = oauth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: scopes,
    prompt: 'consent'
  });
  res.redirect(url);
};

const handleGoogleCallback = async (req, res) => {
  const { code } = req.query;
  try {
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: googleUser } = await oauth2.userinfo.get();

    // --- THIS IS THE UPDATED LOGIC ---
    // Find a user by EITHER their existing googleId OR their email address
    const user = await User.findOneAndUpdate(
        { $or: [{ googleId: googleUser.id }, { email: googleUser.email }] },
        {
            googleId: googleUser.id,
            name: googleUser.name,
            email: googleUser.email,
            googleAccessToken: tokens.access_token,
            googleRefreshToken: tokens.refresh_token,
        },
        { upsert: true, new: true, setDefaultsOnInsert: true }
    );

    const appToken = generateToken(user._id);

    // Redirect user back to the frontend with our app's token
    // We redirect to a dedicated callback page now
    res.redirect(`http://localhost:3000/google-callback?token=${appToken}`);

  } catch (error) {
    console.error('Error handling Google callback', error);
    res.redirect('http://localhost:3000/login?error=true');
  }
};

module.exports = { redirectToGoogle, handleGoogleCallback };