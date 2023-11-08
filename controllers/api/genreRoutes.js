// Start of JS file
// GenreRoutes for GET, POST, PUT, DELETE of genres.
const router = require('express').Router();
const { Genre } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all genres
router.get('/', async (req, res) => {
      await Genre.findAll({})
      .then(genreData =>  res.json(genreData))
      .catch (err =>
    {
      console.log(err);
      res.status(500).json(err);
    });
  });
  
// GET genre by id
router.get('/:id', async (req, res) => {
      await Genre.findAll({
        where: {
            id: req.params.id
        }
    })
    .then(genreData => {
        if (!genreData) 
        {
          res.status(404).json({ message: 'No genre found with this id!' });
          return;
        }
        res.json(genreData);
  
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
    });
  });
  
// CREATE new genre?
router.post('/', withAuth, async (req, res) => {
    if (req.session) {
      await Genre.create(
      {
        genre_name: req.body.genre_name,
        description: req.body.description,
        tv_show_id: req.body.tv_show_id
      })
      .then(genreData => res.json(genreData))
      .catch((err) => {
        console.log(err);
        res.status(400).json(err);
    });
  }
});
  
// UPDATE genre by id
router.put('/:id', withAuth, async (req, res) => {
    await Genre.update(
      {
        genre_name: req.body.genre_name,
        description: req.body.description
      }, {
      where: {
        id: req.params.id,
      },
    })
      .then(genreData => {
        if (!genreData) {
          res.status(404).json({ message: 'No genre found with this id.'});
          return;
      }
        res.json(genreData);
      }).catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
});
  
// DELETE genre?
router.delete('/:id', withAuth, async (req, res) => {
     await Genre.destroy(
      {
        where: {
          id: req.params.id,
        },
      }).then((genreData) => {
        if (!genreData) 
        {
          res.status(404).json({ message: 'No genre found with this id.' });
          return;
        }
        res.json(genreData);
      }).catch(err => {
      console.log(err);
      res.status(400).json(err);
    });
});

module.exports = router;