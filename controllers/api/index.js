// Start of JS file
// Index for routes.
const router = require('express').Router();
const tvShowRoutes = require('./tvShowRoutes');
const userRoutes = require('./userRoutes');

router.use('/tvshows', tvShowRoutes);
router.use('/users', userRoutes);
// Routes are based on Models 

module.exports = router;
// End of JS file