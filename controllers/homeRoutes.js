// Start of JS file
// Home page routes.
const router = require('express').Router();
const { TVShow, User } = require('../models');
const withAuth = require('../utils/auth');

// GET all TV shows belonging to user
router.get('/', async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const tvshowData = await TVShow.findAll({
      include: [
        {
          model: User
        },
      ],
    });

    // Serialize data so the template can read it
    const tvshows = tvshowData.map((tvshow) => tvshow.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      tvshows, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TV shows via browse
router.get('/browse', async (req, res) => {
  try {
    console.log('------------ ????? ')
    // Get all projects and JOIN with user data
    const tvshowData = await TVShow.findAll();
    console.log('!!!!!      ', tvshowData);

    // Serialize data so the template can read it
    const tvshows = tvshowData.map((tvshow) => tvshow.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('browse', { 
      tvshows, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TV shows via id
router.get('/tvshow/:id', async (req, res) => {
  try {
    const tvshowData = await TVShow.findByPk(req.params.id, {
      include: [
        {
          model: User,
        },
      ],
    });

    const tvshow = tvshowData.get({ plain: true });
// This might need to render "browse" instead of "homepage"
    res.render('homepage', {
      ...tvshow,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET user via profile
// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: TVShow }],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET login session.
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }
  res.render('login');
});

module.exports = router;
// End of JS file