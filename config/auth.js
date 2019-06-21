module.exports = {

  'facebookAuth' : {
      'clientID'      : process.env.FACEBOOK_CLIENT_ID, // your App ID
      'clientSecret'  : process.env.FACEBOOK_CLIENT_SECRET, // your App Secret
      'callbackURL'   : process.env.FACEBOOK_CALLBACK_URL,
  'callbackURL_local' : 'http://localhost:80/auth/facebook/callback',
      'profileFields' : ['id', 'email', 'name'] // For requesting permissions from Facebook API
  },

  'googleAuth' : {
      'clientID'      : process.env.GOOGLE_CLIENT_ID,
      'clientSecret'  : process.env.GOOGLE_CLIENT_SECRET,
      'callbackURL'   : process.env.GOOGLE_CALLBACK_URL,
  'callbackURL_local' : 'http://localhost:80/auth/google/callback'
  },

  'githubAuth' : {
      'clientID'      : process.env.GITHUB_CLIENT_ID,
      'clientSecret'  : process.env.GITHUB_CLIENT_SECRET,
      'callbackURL'   : process.env.GITHUB_CALLBACK_URL,
  'callbackURL_local' : 'http://localhost:80/auth/github/callback'
  }

};
