import loGet from "lodash/get";
import Role from "../../models/role";
import ServerError from "../../utils/serverError";

export default class RoleV1 {
  static async createRole(req) {
    const {
      name,
      status, 
    } = req.body;

    const role = await Role.findOne({ name });
    if (role) throw new ServerError("Role already exist", 400);

    const objRole = {
      name,
      status,
    };
    
    const newRole = new Role(objRole);
    await newRole.save();
    return newRole;
  }

}
