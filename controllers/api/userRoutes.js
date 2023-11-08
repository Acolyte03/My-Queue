// Start of JS file
// UserRoutes for GET, POST, PUT, DELETE of users.
const router = require('express').Router();
const { User, Review, TVShow } = require('../../models');

// GET all users
router.get('/', async (req, res) => {
  await User.findAll({
          attributes: { exclude: ['[password'] }
      })
      .then(userData => res.json(userData))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// GET user by id
router.get('/:id', async (req, res) => {
  await User.findOne({
          attributes: { exclude: ['password'] },
          where: {
              id: req.params.id
          },
          include: [{
                  model: TVShow,
                  attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
              "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
              "genres", "created_by", "networks", "origin_country", "spoken_languages","production_companies",
              "production_countries", "episode_run_time"],
              },
              {
                  model: Review,
                  attributes: ['id', 'title', 'comment', 'created_at'],
                  include: {
                      model: TVShow,
                      attributes: ['name']
                  }
              },
              {
                  model: TVShow,
                  attributes: ['name'],
              }
          ]
      })
      .then(userData => {
          if (!userData) {
              res.status(404).json({ message: 'No user found with this id.' });
              return;
          }
          res.json(userData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// CREATE new user
router.post('/', async (req, res) => {
  await User.create({
      username: req.body.username,
      password: req.body.password
  }).then(userData => {
          req.session.save(() => {
              req.session.user_id = userData.id;
              req.session.username = userData.username;
              req.session.loggedIn = true;

              res.json(userData);
          });
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// CREATE login session
router.post('/login', async (req, res) => {
  try {
    const userData = await User.findOne({ where: { username: req.body.username } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect username or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.username = userData.username;
      req.session.logged_in = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// CREATE logout session
router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// UPDATE User by id
router.put('/:id', async (req, res) => {
  await User.update(req.body, {
          individualHooks: true,
          where: {
              id: req.params.id
          }
      }).then(userData => {
          if (!userData[0]) {
              res.status(404).json({ message: 'No user found with this id.' });
              return;
          }
          res.json(userData);
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

// DELETE User by id
router.delete('/:id', async (req, res) => {
  await User.destroy({
          where: {
              id: req.params.id
          }
      }).then(userData => {
          if (!userData) {
              res.status(404).json({ message: 'No user found with this id.' });
              return;
          }
          res.json(userData);
      }).catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

module.exports = router;
// End of JS file