// Start of JS file
// Home page routes. For someone NOT logged in to view.
const router = require('express').Router();
const { Genre, User, Review, TVShow, Watchlist } = require('../models');
const withAuth = require('../utils/auth');

// Need to implement Genres here

// GET all tv shows -> main
router.get('/', async (req, res) => {
  console.log(res);
  await TVShow.findAll({
    attributes: ["id","name", "vote_average", "overview", "in_production", "popularity", "tagline", "genres"],
    include: [{
            model: Review,
              attributes: [
                'id',
                'comment',
                'created_at'
            ],
            include: {
                model: User,
                attributes: ['email']
            }
        },
    ]
})
.then(tvData => {
    //console.log('test: ', reviewData);
    const tvshows = tvData.map(tvshow => tvshow.get({ plain: true }));
    res.render('layouts/main', {tvshows, loggedIn: req.session.loggedIn});
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// GET reviews by id -> single-review
router.get('/tvshows/:id', async (req, res) => {
  await TVShow.findOne({
    where: {
        id: req.params.id
    },
    attributes: ["id","name", "vote_average", "overview", "in_production", "popularity", "tagline", "genres"],
    include: [{
            model: Review,
            attributes: [
              'id',
              'comment',
              'created_at'
          ],
            include: {
                model: User,
                attributes: ['email']
            }
        },
        {
            model: User,
            attributes: ['email']
        }
    ]
})
.then(tvData => {
    if (!tvData) {
        res.status(404).json({ message: 'No TV show found with this id.' });
        return;
    }
    const tvshow = tvData.get({ plain: true });
    console.log(tvshow);
    res.render('single-show', { tvshow, loggedIn: req.session.loggedIn });
})
.catch(err => {
    console.log(err);
    res.status(500).json(err);
});
});

// GET reviews for tv shows -> reviews-shows
router.get('/reviews-shows', async (req, res) => {
  await Review.findOne({
        where: {
            id: req.params.id
        },
        attributes: [
            'id',
            'comment',
            'created_at'
        ],
        include: [{
                model: TVShow,
                attributes: ["id","name", "vote_average", "overview", "in_production", "popularity", "tagline", "genres"],
                include: {
                    model: User,
                    attributes: ['username']
                }
            },
            {
                model: User,
                attributes: ['username']
            }
        ]
    })
    .then(reviewData => {
        if (!reviewData) {
            res.status(404).json({ message: 'No review found with this id.' });
            return;
        }
        const review = reviewData.get({ plain: true });
        res.render('reviews-shows', { review, loggedIn: req.session.loggedIn });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

// GET login route -> login
router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  res.render('login');
});

// GET signup -> signup page
router.get('/signup', (req, res) => {
  res.render('signup');
});

module.exports = router;
// End of JS file