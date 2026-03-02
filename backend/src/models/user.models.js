import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
    firstname: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true,
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, "password ism required"]
    },
    profileImage: {
        type: String,
        default: "",
    },
    coverImage: {
        type: String,
        default: "",
    },
    headline: {
        type: String,
        default: "",
    },
    skills: [{ type: String }],
    education: [{
        college: { type: String },
        degree: { type: String },
        fieldOfStudy: { type: String },
    }],
    location: {
        type: String,
        default:"india"
    },
    gender: {
        type: String,
        enum: ["male", "female", "other"],
    },
    experience: [{
        title: { type: String },
        company: { type: String },
        description: { type: String },
    }],
    projects: [{
        title: { type: String },
        description: { type: String },
        link: { type: String },
    }],
    connections: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        }
    ],

}, { timestamps: true });

export  const User=mongoose.model("User", userSchema);