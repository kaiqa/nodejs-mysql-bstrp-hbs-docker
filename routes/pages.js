const express = require('express');
const debug = require('debug');
const authController = require('../controllers/auth');

const router = express.Router();

router.get('/', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  res.render('index', {
    user: req.user
  });
});

router.get('/profile', authController.isLoggedIn, (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('profile', {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
  
});

router.get('/login', (req, res) => {
  res.render('login');
});

router.get('/videos', authController.isLoggedIn,  (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('videos', {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
});

router.get('/games/*', authController.isLoggedIn,  (req, res) => {
  console.log("inside");
  console.log(req.user);
  if(req.user) {
    res.render('games', {
      user: req.user
    });
  } else {
    res.redirect("/login");
  }
});

router.get('/register', (req, res) => {
  res.render('register');
});

module.exports = router;