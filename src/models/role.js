import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  status: { type: String, required: true, default: "active"},
});

roleSchema.plugin(uniqueValidator);
export default mongoose.model("Role", roleSchema);
