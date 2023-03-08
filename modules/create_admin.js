const User = require("../models/User")

const create_admin = async () =>{
    try{
        const admin = await User.create({
                name: "Admin",
                username: "admin",
                password: "admin",
                email: "admin@somewhere.com",
                role: "admin",
            });
    }catch(error){
        console.log("Admin already exists");
    }
}


module.exports = create_admin;