import mongoose, { Schema } from "mongoose";
import uniqueValidator from "mongoose-unique-validator";


const conversationSchema = new Schema(
  {
    isRamdom: { type: Boolean, default: true },
    usersMembers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    lastMessage: { type: Schema.Types.ObjectId, ref: "Message" },
    countReply: { type: Number, default: 0 },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

conversationSchema.plugin(uniqueValidator);

export default mongoose.model("Conversation", conversationSchema);
