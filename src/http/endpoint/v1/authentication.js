import Authentication from "../../../controller/authentication";
import logger from "../../../utils/logger";

export const signUpEndpoint = async (req, res) => {
  try {
    const user = await Authentication.signUp(req, res);
    res.json({
      message: "Success",
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};
