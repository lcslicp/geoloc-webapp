import bcrypt from 'bcrypt';
import dotenv from 'dotenv';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';

dotenv.config();

//CREATE user
export const createUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password )
        return res.status(400).json({ message: 'All fields are required.'})

    const duplicate = await User.findOne({ where: { email: email } });
    if (duplicate) {
        return res.sendStatus(409)
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create ({
        email,
        password: hashedPassword
    })

    const accessToken = jwt.sign(
        { user: user.id }, '' + process.env.JWT_SECRET,
        { expiresIn: '7d' }
    );

    const maxAge = 3 * 24 * 60 * 60;
    res.cookie('jwt', accessToken, {
        maxAge: maxAge * 1000,
        httpOnly: true,
    })

    if (user) {
        res.status(201).json({
            id: user.id,
            email: user.email
        })
    } else {
        res.sendStatus(400);
    }
}

//LOGIN user
export const loginUser = async (req, res) => {
    const { email, password } = req.body;
    if(!email || !password)
        return res.sendStatus(400).json({message: 'All fields are required'});

    const matchedUser = await User.findOne( { email: email});
    if (!matchedUser) return res.sendStatus(404)

    const matchedPassword = bcrypt.compare(password, matchUser.password);
    if (matchedPassword) {
        const accessToken = jwt.sign(
            { user: matchedUser.id },
            '' + process.env.JWT_SECRET)
        
        const maxAge = 3 * 24 * 60 * 60;
        res.cookie('jwt', accessToken, {
            maxAge: maxAge * 1000,
            httpOnly: true,
        });

        res.status(200).json({
            email: matchedUser.email
        })
    }else {
        res.sendStatus(401)
    }
}