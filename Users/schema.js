import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    _id: String,
    full_name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, require: true },
    image: String,
    birthdate: Date,
    hometown: String,
    bio: String,
    interests: Array,
    favorite_cafe_days: Array,
    favorite_drinks: Array,
    favorite_menu_items: Array,
    favorite_recipes: Array,
    role: {
      type: String,
      enum: ["admin", "customer", "owner", "guest"],
      default: "customer",},
  },
  { collection: "users" });
export default userSchema;