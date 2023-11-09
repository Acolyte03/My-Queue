// Start of JS file
// UserRoutes for GET, POST, PUT, DELETE of users.
const router = require('express').Router();
const { User, Review, Watchlist } = require('../../models');

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
                  model: Watchlist,
                  attributes: ['id', 'name'],
              },
              {
                  model: Review,
                  attributes: ['id', 'title', 'comment'],
                  include: {
                      model: Watchlist,
                      attributes: ['name']
                  }
              },
              {
                  model: Watchlist,
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
      email: req.body.email,
      password: req.body.password
  }).then(userData => {
          req.session.save(() => {
              req.session.user_id = userData.id;
              req.session.email = userData.email;
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
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userData.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.email = userData.email;
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