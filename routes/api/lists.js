const jwt = require('jsonwebtoken');
const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../../models/User');
const keys = require('../../config/keys');
const validateSignupInput = require('../../validation/signup');
const validateLoginInput = require('../../validation/login');
const { route } = require('./users');



