// Start of JS file
// Index for routes.
const router = require('express').Router();
const tvShowRoutes = require('./tvShowRoutes');
const genreRoutes = require('./genreRoutes');
const userRoutes = require('./userRoutes');
const reviewRoutes = require('./reviewRoutes');

router.use('/tvshows', tvShowRoutes);
router.use('/genres', genreRoutes);
router.use('/users', userRoutes);
router.use('/reviews', reviewRoutes);
// Routes are based on Models 

module.exports = router;
// End of JS file