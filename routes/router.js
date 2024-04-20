const express = require('express');
const { loginUser, createUser } = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/login', (req, res) => {
  res.render("login", { message: '', success: '',  });
});
router.post('/login', loginUser);

router.get('/home', (req, res) => {
  const isLoggedIn = req.session.userId !== undefined;

  res.render('home', { message: req.session.message, isLoggedIn});
});
router.get('/signup', (req, res) => {
  res.render('signup', { error: '', user_exists: '', success: '' });
});
router.post('/signup', createUser);

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            console.error('Error destroying session:', err);
        }
        res.redirect('/login');
    });
});


module.exports = router;
