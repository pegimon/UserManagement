const {Router} = require('express');
const userRoute = require('./apis/userRoutes');

const router = Router();

router.use('/users', userRoute);

module.exports = router;