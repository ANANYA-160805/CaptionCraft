// api kon kon se route handle karega yahan likhenge
const {registerController,loginController}= require('../controller/auth.controller');
const express = require('express');
const router = express.Router();



// post / register
router.post('/register', registerController);

// post / login
router.post('/login',loginController);

// get / profile [protected route]
router.get('/profile', async (req, res) => {
    // Implementation for fetching user profile
});


module.exports = router;