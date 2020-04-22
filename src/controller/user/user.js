import loGet from "lodash";
import User from "../../models/user";
import ServerError from "../../utils/serverError";
import { Types } from 'mongoose'

export default class UserV1 {
    
     static async getMe (req) {
        const { user, token } = req.credentials;
        const dataUser = await User.findOne({ _id : Types.ObjectId(loGet(user,["_id"],""))}).populate({ path:"role", select:"name"});
        if(!dataUser) throw new ServerError("User not exist")


     }       


}
