const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema.Types;
const { Permissions } = require('../commons/enums/Permissions');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    select: false
  },
  cpf: {
    type: String
  },
  phoneNumber: {
    type: Number
  },
  picture: {
    type: String
  },
  token: {
    type: String,
  },
  refreshToken: {
    type: String,
  },
  googleId: {
    type: String,
  },
  permissions: {
    type: String,
    enum: Permissions,
    default: Permissions.USER,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const userLoginSchema = new mongoose.Schema({
  userId: ObjectId,
  ip: String,
  userAgent: String,
  token: String,
  refreshToken: String,
  createdAt: Date,
  expirationDate: Date,
});

module.exports = {
  User: mongoose.model('User', userSchema),
  UserLogin: mongoose.model('UserLogin', userLoginSchema),
}