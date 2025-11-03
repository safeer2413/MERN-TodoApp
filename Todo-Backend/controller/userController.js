import Users from "../Model/userModel.js";
import bcrypt from 'bcrypt'
import asyncHandler from "../middlewares/asyncHandler.js";
import jwt from 'jsonwebtoken'


const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;

    const salt = await bcrypt.genSalt(10)
    const encryptedPassword = await bcrypt.hash(password, salt)

    const userExists = await Users.findOne({ email })

    if (userExists) {
        return res.status(400).json({ message: 'user already exists' });
    };

    const user = await Users.create({
        name,
        email,
        password: encryptedPassword
    });

    if (user) {
        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        });
    }
    else {
        return res.status(400).json({ message: 'invalid user data' });
    }
});


const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    const user = await Users.findOne({ email })

    if (user && (await user.matchPassword(password))) {


        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '30d' });

        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        return res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email
        })
    }
    else {
        return res.status(400).json({ message: 'invalid user data' });
    }
});

const userLogoutHandler = asyncHandler(async (req, res) => {
    res.cookie("jwt", "", {
        httpOnly: true,
        expires: new Date(0),
    });

    res.status(200).json({ message: "Logged out Successfully" });
})

export {
    registerUser,
    authUser,
    userLogoutHandler
}