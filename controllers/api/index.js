const router = require('express').Router();
const userRoutes = require('./userRoutes');

router.use('/users', userRoutes);
// figure out routes here
// const <route> = require('/<route>');

// router.use('/<name>', <const route>);
// Routes are based on Models

module.exports = router;

