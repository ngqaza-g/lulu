const User = require('../../models/User');

const validate_token = async (req, res, next)=>{
    const { token } = req.cookies;
    if(token){
        const user = await User.verifyToken(token);
        if(user){
            req.token = token;
            req.user = user;
        }
    }
    next();
}


module.exports = validate_token;