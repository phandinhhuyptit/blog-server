import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true },
  code: { type: Number, required: true },
});

roleSchema.plugin(uniqueValidator);
export default mongoose.model("Role", roleSchema);
