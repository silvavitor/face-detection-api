const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs');
const db = require('./database');

const { handleRegister } = require('./controllers/registerController');
const { handleSignIn } = require('./controllers/signinController');
const { handleGetProfile } = require('./controllers/profileController');
const { handleImage, handleAPICall } = require('./controllers/imageController');

router.get('/', (req, res)            => { res.send('API is working!') });
router.post('/signin', (req, res)     => { handleSignIn(req, res, db, bcrypt) });
router.post('/register', (req, res)   => { handleRegister(req, res, db, bcrypt) });
router.get('/profile/:id', (req, res) => { handleGetProfile(req, res, db) });
router.put('/image', (req, res)       => { handleImage(req, res, db) });
router.post('/imageurl', handleAPICall);

module.exports = router;