import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const userSchema = new Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfBirth: { type: Date, min: "1930-01-01", max: Date.now() },
  password: { type: String, required: true },
  email: { type: String, required: true,unique: true },
  phone: { type: String, required: true },
  gender: { type: String, required: true },
  address: { type: String, default: null },
  avatar: { type: String, default: null },
  facebookID: { type: String, default: null },
  status: { type: String, default: "active" },
  role: { type: Schema.Types.ObjectId, ref: "Role" },
});

userSchema.plugin(uniqueValidator);
export default mongoose.model("User", userSchema);
