import loGet from "lodash";
import User from "../../models/user";
import ServerError from "../../utils/serverError";
import crypto from "../../utils/crypto/crypto";

export default class Authentication {
  static async signUp(req) {
    const {
      username,
      firstName,
      lastName,
      dateOfBirth,
      password,
      email,
      gender,
      address,
      phone,
    } = req.body;

    let user;

    user = await User.findOne({ username });
    if (user) throw new ServerError("User already exist", 400);

    const objUser = {
      phone,
      username,
      firstName,
      lastName,
      dateOfBirth,
      password: crypto.hash(password),
      email,
      gender,
      address,
    };

    user = new User(objUser);
    await user.save();
    return user;
  }
}
