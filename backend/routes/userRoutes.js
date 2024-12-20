const express= require('express');
const {registerUser,authUser,allUsers,} = require("../controllers/userControllers");
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();
router.post('/register',registerUser);
router.post('/login',authUser);
router.get('/all',protect,allUsers);

module.exports = router;