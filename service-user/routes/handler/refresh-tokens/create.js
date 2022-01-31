const { User, RefreshToken } = require("../../../models");
const Validator = require("fastest-validator");
const v = new Validator();

module.exports = async (req, res) => {
  const userID = req.body.user_id;
  const refreshToken = req.body.refresh_token;

  const schema = {
    user_id: { type: "number", integer: true },
    refresh_token: { type: "string", min: 1 },
  };

  const validate = v.validate(req.body, schema);
  if (validate !== true) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findByPk(userID);
  if (!user) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  const createdRefreshToken = await RefreshToken.create({
    token: refreshToken,
    user_id: userID,
  });

  return res.status(201).json({
    message: "Refresh token created",
    data: {
      id: createdRefreshToken.id,
      token: createdRefreshToken.token, // you can also don't show this field if you don't want to expose it
    },
  });
};
