const { User, RefreshToken } = require("../../../models");

module.exports = async (req, res) => {
  const userID = req.body.user_id;
  const user = await User.findByPk(userID);
  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }

  await RefreshToken.destroy({
    where: {
      user_id: userID,
    },
  });

  return res.status(200).json({
    status: "success",
    message: "refresh token deleted",
  });
};
