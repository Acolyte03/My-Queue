const router = require('express').Router();
const { Genre, User, Review, TVShow, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

// GET all Watchlist(s) for logged-in User
router.get('/', async (req, res) => {
  try {
    const watchlistData = await Watchlist.findAll({
      include: [
        {
          model: User,
          attributes: ['name'],
        },
        {
            model: TVShow,
            attributes: ['name'], // may need more attributes here
        },
      ],
    });

    // Serialize data so the template can read it
    const watchlists = watchlistData.map((watchlist) => watchlist.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('main', { 
      watchlists, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET TVShows by id? Hmm...
router.get('/tvshows/:id', async (req, res) => {
  try {
    const tvShowData = await TVShow.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['name'], // may need adjusting
        },
      ],
    });

    const tvshows = tvShowData.get({ plain: true });

    res.render('tvshow', {
      ...tvshows,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [{ model: Watchlist }],
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

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

module.exports = router;