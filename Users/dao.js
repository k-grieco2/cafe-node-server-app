import mongoose from "mongoose";
import model from "./model.js";
export const createUser = (user) => {
    user._id = new mongoose.Types.ObjectId();
    return model.create(user);
};
export const findAllUsers = () => model.find();
export const findUserById = (userId) => model.findById(userId);
export const findUserByEmail = (email) =>  model.findOne({ email: email });
export const findUserByCredentials = (email, password) =>  model.findOne({ email, password });
export const findUsersByRole = (role) => model.find({ role: role });
export const updateUser = (userId, user) =>  model.updateOne({ _id: userId }, { $set: user });
export const deleteUser = (userId) => model.deleteOne({ _id: userId });