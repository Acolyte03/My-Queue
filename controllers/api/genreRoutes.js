const router = require('express').Router();
const { Genre, TVShow } = require('../../models');
const withAuth = require('../../utils/auth');

// GET all genres
router.get('/', async (req, res) => {
      await Genre.findAll( 
      {
        // attributes: ["id", "genre_name"],
        // include: [{
        //   model: TVShow,
        //   attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
        // "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
        // "genres", "created_by", "networks"]
        // }]
      }).then((genres) => {
        res.json(genres);
      }).catch ((err) =>
    {
      res.status(500).json(err);
    });
  });
  
  // GET genre by id
  router.get('/:id', async (req, res) => {
      await Genre.findByPk(req.params.id, 
      {
        // attributes: ["id", "genre_name"],
        // include: [
        //   { 
        //     model: TVShow,
        //     attributes: ["id","name", "number_of_seasons", "number_of_episodes", "vote_count",
        // "vote_average", "overview", "homepage", "in_production", "popularity", "tagline", 
        // "genres", "created_by", "networks"]
        //   }],
      }).then((genreData) => {
        if (!genreData) 
        {
          res.status(404).json({ message: 'No genre found with this id!' });
          return;
        }
        res.json(genreData);
  
      }).catch((err) =>
    {
      res.status(500).json(err);
    });
  });
  
//   // CREATE new genre?
//   router.post('/', async (req, res) => {
//       await Genre.create(
//       {
//         genre_name: req.body.category_name
//       }).then(newGenreData => res.json(newGenreData))
//     .catch((err) => {
//       res.status(400).json(err);
//     });
//   });
  
  // UPDATE genre by id
  router.put('/:id', async (req, res) => {
    await Genre.update(req.body, {
      where: {
        id: req.params.id,
      },
    })
      .then((genre) => {
        res.json(genre);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });
  
//   // DELETE genre?
//   router.delete('/:id', async (req, res) => {
//      await Genre.destroy(
//       {
//         where: {
//           id: req.params.id,
//         },
//       }).then((genreData) => {
//         if (!genreData) 
//         {
//           res.status(404).json({ message: 'No genre found with that id!' });
//           return;
//         }
//         res.json(genreData);
//       }).catch((err) =>
//     {
//       res.status(400).json(err);
//     });
//   });

module.exports = router;