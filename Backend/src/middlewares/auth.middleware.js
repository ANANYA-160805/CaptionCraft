const jsonwebtoken = require('jsonwebtoken');
const userModel = require('../models/user.model');

async function authMiddleware(req, res, next) {
    // Implementation for creating a new post
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' });
    }
 
    try{
    
const decoded = jsonwebtoken.verify(token, process.env.JWT_SECRET);
const user = await userModel.findById({
    _id: decoded.userId
});
req.user = user;
next();

}catch(err){
    return res.status(401).json({ message: 'Invalid token , PLease login again' });
}


}

module.exports = authMiddleware;