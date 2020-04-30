import loGet from "lodash/get";
import User from "../../models/user";
import ServerError from "../../utils/serverError";
import crypto from "../../utils/crypto/crypto";
import authenticator from "../../utils/authenticator"
import { Types } from "mongoose";

export default class UserV1 {
  static async getMe(req) {
    const { user } = req.credentials;
    return user;
  }

  static async changePasswordByMe(req) {
    const { user, token } = req.credentials;
    const { oldPassword, password } = req.body;
    const dataUser = await User.findOne({
      _id: Types.ObjectId(loGet(user, ["_id"], "")),
    });
    const isMatched = crypto.verify(
      oldPassword,
      loGet(dataUser, ["password"], "")
    );
    if (!isMatched) throw new ServerError("Your old password not matched", 401);
    const hashPassword = crypto.hash(password);
    await dataUser.set({ password : hashPassword });
    await dataUser.save();
    await authenticator.expiryAccessToken(token)
    return dataUser;
  }

  static async changePasswordByAdmin(req) {
    const { id } = req.params;
    const { newPassword } = req.body;
    const user = await User.findById(id);
    if (!user) throw new ServerError("Can not find user", 404);
    const hashPassword = crypto.hash(newPassword);
    await user.set({ password: hashPassword });
    await user.save();
    return user;
  }

  static async changeProfileByMe(req) {
    const { user} = req.credentials;
    const {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      gender,
      address,
    } = req.body;
    const objUpdate = {
      firstName,
      lastName,
      dateOfBirth,
      phone,
      gender,
      address,
    };

    Object.keys(objUpdate).forEach((key) => {
      if (!objUpdate[key]) delete objUpdate[key];
    }); 

    const dataUser = await User.findByIdAndUpdate(loGet(user, ["_id"], ""));
    return dataUser;
  }
}
