import jwt from 'jsonwebtoken'
import { User } from '../models/user.models.js';

const generateaccesToken=async (userId) => {
    const user= await User.findById(userId)
    return jwt.sign(
        {
            _id: user._id,
        },
        process.env.access_token_secret,
        {
            expiresIn:process.env.access_token_secret_expiry,
        }
    )
}

const generateRefreshToken=async (userId) => {
    const user= await User.findById(userId)
    return jwt.sign(
        {
            _id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            username: user.username,
            email: user.email,
        },
        process.env.refresh_token_secret,
        {
            expiresIn:process.env.refresh_token_secret_expiry,
        }
    )
}

export {generateaccesToken, generateRefreshToken}