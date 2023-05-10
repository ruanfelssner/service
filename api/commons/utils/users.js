


const { User, UserLogin } = require('../../models/User')


/* PASSWORD */

const CryptoJS = require("crypto-js");
const generatePasswordHash = (password) => {
  return CryptoJS.HmacSHA512(password, process.env.SECRET).toString(
    CryptoJS.enc.Hex
  );
};
  
/* TOKENS */

const jwt = require("jsonwebtoken");
const createUserToken = async (userId) => {
  const token = jwt.sign(
    {
      user_id: userId,
      expiresAt: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
    },
    process.env.SECRET
  );
  return token;
};

const createUserRefreshToken = async (userId) => {
  const refreshToken = jwt.sign(
    {
      user_id: userId,
      expiresAt: Math.floor(Math.random() * 100000000) + 1,
    },
    process.env.SECRET
  );
  return refreshToken;
};

/* GOOGLE AUTHENTICATION */

const { OAuth2Client, UserRefreshClient } = require("google-auth-library");

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const client = new OAuth2Client(GOOGLE_CLIENT_ID);

const getGoogleUserByGoogleAuthentication = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  return payload;
};

const getGoogleUserIdByGoogleAuthentication = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: GOOGLE_CLIENT_ID,
  });
  const payload = ticket.getPayload();
  const googleUserId = payload["sub"];
  return googleUserId;
};

const getUserByGoogleAuthentication = async (credential) => {
  const ticket = await client.verifyIdToken({
    idToken: credential,
    audience: GOOGLE_CLIENT_ID,
  });
  console.log(ticket, 'ticket')
  const payload = ticket.getPayload();
  const googleUserId = payload["sub"];

  const user = await User.findOne({ googleId: googleUserId });

  if (!user) return null;
  else return user;
};

/* LOGIN USER */

const loginUser = async (userId, req) => {
    let ip = req.headers["x-forwarded-for"];
    let userAgent = req.headers["user-agent"];
    if (ip) {
      ip = ip.split(",")[0];
    } else if (ip == undefined) {
      ip = 0;
    }
    const timeToExpire = 60 * 60 * 1;
    const currentDate = new Date();
    const token = await createUserToken(userId);
    const refreshToken = await createUserRefreshToken(userId);
    const userLogin = new UserLogin({
        userId: userId,
        ip,
        userAgent,
        token: token,
        refreshToken: refreshToken,
        createdAt: currentDate,
        expirationDate: Math.floor(currentDate / 1000) + timeToExpire,
    });

    userLogin.save();

    const user = await User.findById(userId);
    return {
      user,
      token,
      refreshToken,
      createdAt: currentDate,
      expirationDate: Math.floor(currentDate / 1000) + timeToExpire
    };
  }

module.exports = {
  generatePasswordHash,
  createUserToken,
  createUserRefreshToken,
  getGoogleUserIdByGoogleAuthentication,
  getUserByGoogleAuthentication,
  getGoogleUserByGoogleAuthentication,
  loginUser
};