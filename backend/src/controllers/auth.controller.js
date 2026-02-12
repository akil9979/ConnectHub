import { User } from '../models/user.models.js';
import bcrypt from 'bcrypt';
import {generateRefreshToken,generateaccesToken} from '../utils/token.js'; 
export const signUp = async (req, res) => {
    try {
        const { firstname, lastname, email, username, password } = req.body;

        if (!firstname || !lastname || !email || !username || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existedUser = await User.findOne(
            {
                $or: [{ username }, { email }]
            }
        )
        if (existedUser) {
            return res.status(400).json({ message: "email or username are already exist" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(
            {
                firstname,
                lastname,
                username,
                email,
                password: hashedPassword
            }
        )

        const registerUser = await User.findById(user._id).select("-password");
        const accessToken= await generateaccesToken(registerUser._id)
        const refreshToken= await generateRefreshToken(registerUser._id)
        const options={
            httpOnly:true,
            secure:true,
        }

        return res.status(200)
        .cookie("refreshToken",refreshToken,options)
        .cookie("accessToken",accessToken,options)
        .json({ message: "user sigup succesfully",accessToken,refreshToken, registerUser })

    } catch (error) {
        console.log(error);

        return res.status(500).json({ message: "internal server error" })

    }

}
export const LogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({
            $or: [{ email }]
        })

        if (!user) {
            return res.status(400).json({ message: "invalid email " });
        }

        const correctPassword=await bcrypt.compare(password,user.password)
        if(!correctPassword){
            return res.status(400).json({ message: "invalid password" });
        }
        const accessToken= await generateaccesToken(user._id)
        const refreshToken= await generateRefreshToken(user._id)
        const options={
            httpOnly:true,
            secure:true,
        }
        return res
        .status(200)
        .cookie("refreshToken",refreshToken,options)
        .cookie("accessToken",accessToken,options)
        .json({ message: "user login succesfully", accessToken, refreshToken,user })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })

    }
}

export const logOut=async(req,res)=>{
    try {
        const options={
            httpOnly:true,
            secure:true,
        }
        return res
        .status(200)
        .clearCookie("refreshToken",options)
        .clearCookie("accessToken",options)
        .json({ message: "user logout succesfully" })

    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "internal server error" })

    }
}
