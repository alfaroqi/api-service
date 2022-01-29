const { User } = require("../../../models");

module.exports = async (req, res) => {
  const id = req.params.id;

  const user = await User.findByPk(id, {
    attributes: { exclude: ["password"] }, // exclude password
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      messeage: "user not found",
    });
  }

  return res.json({
    status: "success",
    data: user, // { id, name, email, profession, role, avatar }
  });
};
