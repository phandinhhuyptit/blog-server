import Role from "../../../controller/role";
import logger from "../../../utils/logger";


export const createRoleEndpoint = async (req, res) => {
  try {
    const role = await Role.createRole(req,res)

    res.json({
      message: "Success",
      role,
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};


