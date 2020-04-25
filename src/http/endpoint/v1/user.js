import User from "../../../controller/user";
import logger from "../../../utils/logger";

export const getMeEndpoint = async (req, res) => {
  try {
    const user = await User.getMe(req, res);
    res.json({
      message: "Success",
      user,
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};

export const changePasswordByMeEndPoint = async (req, res) => {
  try {
    const user = await User.changePasswordByMe(req,res);
    res.json({
      message: "Success",
    });
  } catch (error) {
    logger.error(error);
    res.status(error.code || 500).json({ message: error.message });
  }
};
