import mongoose, { Schema } from 'mongoose'
import uniqueValidator from 'mongoose-unique-validator'

const userSchema = new Schema({ 
  username : { type: String, required: true, unique: true },
  fullname : { type : String, required : true},
  password: { type: String, required: true, select: false },   
  email: { type: String, required: true },
  phone: { type: String, required: true },
  gender: { type: String },
  address: { type: String },
  avatar: { type: String },
  facebookID: { type: String, default: null },
  active: { type: Boolean, default: true }, 
})

userSchema.plugin(uniqueValidator)
export default mongoose.model('User',userSchema)

