import loGet from "lodash/get";
import User from "../../models/user";
import ServerError from "../../utils/serverError";
import crypto from "../../utils/crypto/crypto" 
import { Types } from "mongoose";

export default class UserV1 {
  static async getMe(req) {
    const { user, token } = req.credentials;
    return user;
  }

  static async changePasswordByMe(req) {
    const { user, token } = req.credentials;
    const { oldPassword, password } = req.body;
    const dataUser = await User.findOne({
      _id: Types.ObjectId(loGet(user, ["_id"], "")),
    });
    const isMatched = crypto.verify(oldPassword,loGet(dataUser,["password"],""))
    if(!isMatched)  throw new ServerError("Your old password not matched", 401) 
    await dataUser.set({ password })
    await dataUser.save()
    return dataUser;
  }
}
