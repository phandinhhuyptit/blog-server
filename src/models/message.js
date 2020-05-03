import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";

const messageSchema = new Schema(
  {
    message: { type: String }, //text message
    from: { type: Schema.Types.ObjectId, ref: "User" },
    tag: { type: Number, default: -1 },
    conversation: { type: Schema.Types.ObjectId, ref: "Conversation" },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

messageSchema.plugin(uniqueValidator);

export default mongoose.model("Message", messageSchema);
