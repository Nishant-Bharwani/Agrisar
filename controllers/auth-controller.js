const User = require('../models/user-model');

class AuthController {

    async login(req, res) {
        console.log(req.body);
        const { phone, password, name, city, address, pincode, type } = req.body;

        if (!phone) {
            res.status(400).json({ error: "Phone Field is required" });
        }

        if (!password) {
            res.status(400).json({ error: "Password Field is required" });
        }


        const user = await User.findOne({
            phone
        });

        console.log(user);
        if (!user) {
            return res.status(403).json({ error: "No such user" });
        }

        if (user.password === password) {
            return res.status(200).json({
                message: "Login Successfull."
            });
        } else {
            return res.status(403).json({
                message: "Password incorrect"
            });
        }

    }

}


module.exports = new AuthController();