import loGet from "lodash/get";
import User from "../../models/user";
import ServerError from "../../utils/serverError";
import crypto from "../../utils/crypto/crypto";
import { STATUS_USER_ENUM } from "../../utils/constant";

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

    user = await User.findOne({ email });
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

  static async signIn(req) {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw new ServerError("User not exist", 404);
    if (loGet(user, ["status"]) === STATUS_USER_ENUM.BLOCKED)  throw new ServerError("User is clocked", 401);
    if (!crypto.verify(password, loGet(user, ["password"], ""))) throw new ServerError("Password is incorrect", 401);
      
    return user;
  }
}
