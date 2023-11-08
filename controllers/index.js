// Start of JS file
// Index for routes.
const router = require('express').Router();

const apiRoutes = require('./api');
const homeRoutes = require('./homeRoutes');
const reviewsRoutes = require('./reviewsRoutes');
const tvshowsViewRoutes = require('./tvShowsViewRoutes');

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/reviews', reviewsRoutes);
router.use('/tvshows', tvshowsViewRoutes);
// Routes are based on Views + User logged in or not

module.exports = router;
// End of JS file