const User = require('../../models/User');
const error_msg = require('../error_message');
const crypto = require('crypto');

const register = async (req, res,)=>{
    

    if(req.user.role === "admin"){
        const {name, email, role} = req.body;
        const username = generate_username(name);
        const password = crypto.randomBytes(3).toString('hex');
        try{
            await User.create({
                name,
                username, 
                email,
                password,
                role
            });

            res.render('register', {error : null, msg : "User registerd successfully"} );
            
        }catch(error){
            res.render('register', {error: error_msg(error), msg: null});
        }
    }
}


function generate_username(name){
    const name_arr = name.toLowerCase().split();
    const username = name_arr.join("_");
    return username;
}


module.exports = register;