import loGet from "lodash/get";
import User from "../../models/user";
import Role from "../../models/role"
import ServerError from "../../utils/serverError";
import crypto from "../../utils/crypto/crypto";
import { STATUS_USER_ENUM } from "../../utils/constant";
import {  Types } from "mongoose"

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
      role,
    } = req.body;

    let user,roleUser;
     
    user = await User.findOne({ email });
    if (user) throw new ServerError("User already exist", 404);
    if(role) {
      roleUser = await Role.findOne({ name : role})
      if(!roleUser) throw new ServerError("Role not exist", 404);   
    }
    else {
      roleUser = await Role.findOne({ name : "member"}) 
    }  
    

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
      role : loGet(roleUser,["_id"],""),
    };

    user = new User(objUser);
    await user.save();
    return user;
  }

  static async signIn(req) {
    const { email, password } = req.body;
    const user = await User.findOne({ email }).populate({ path:"role", select:"name"});
    if (!user) throw new ServerError("User not exist", 404);
    if (loGet(user, ["status"]) === STATUS_USER_ENUM.BLOCKED)  throw new ServerError("User is clocked", 401);
    if (!crypto.verify(password, loGet(user, ["password"], ""))) throw new ServerError("Password is incorrect", 401);
      
    return user;
  }
  
  static async refreshToken(req) {
    const { user, token } = req.credentials;
    const dataUser = await User.findOne({ _id : Types.ObjectId(loGet(user,["_id"],""))}).populate({ path:"role", select:"name"});
    return dataUser;
  }

  

}
