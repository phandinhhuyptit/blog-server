import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const revokedTokenSchema = new Schema({
  token: { type: String, required: true, unique: true },
  expiredAt: { type: Date, required: true, default: Date.now },
});

revokedTokenSchema.plugin(uniqueValidator);
export default mongoose.model("RevokedToken", revokedTokenSchema);
