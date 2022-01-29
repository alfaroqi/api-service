const bycrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const { response } = require("express");
const v = new validator();

module.exports = async (req, res) => {
  const schema = {
    email: "email|empty|false",
    password: "string|min:6|empty|false",
  };

  const validate = v.validate(req.body, schema);
  if (validate !== true) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const user = await User.findOne({
    where: { email: req.body.email },
  });

  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }
  const isMatch = await bycrypt.compare(req.body.password, user.password);
  if (!isMatch) {
    return res.status(401).json({
      status: "error",
      message: "password does not match",
    });
  }

  res.json({
    status: "success",
    data: {
      id: user.id,
      name: user.name,
      email: user.email,
      profession: user.profession,
      role: user.role,
      avatar: user.avatar,
    },
  });
};
