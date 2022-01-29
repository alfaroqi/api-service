const { User } = require("../../../models");

module.exports = async (req, res) => {
  const userIDs = req.query.user_ids || [];

  const sqlOptions = {
    attributes: { exclude: ["password"] }, // exclude password
  };

  if (userIDs.length) {
    sqlOptions.where = {
      id: userIDs,
    };
  }

  const users = await User.findAll(sqlOptions);

  return res.json({
    status: "success",
    data: users,
  });
};
