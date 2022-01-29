const bycrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const { response } = require("express");
const v = new validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|min:3|empty|false",
    email: "email|empty|false",
    password: "string|min:6|empty|false",
    profession: "string|optional",
    avatar: "string|optional",
  };

  const validate = v.validate(req.body, schema);
  if (validate !== true) {
    return res.status(400).json({
      status: "error",
      message: validate,
    });
  }

  const id = req.params.id;
  const user = await User.findByPk(id);
  if (!user) {
    return res.status(404).json({
      status: "error",
      message: "user not found",
    });
  }

  const email = req.body.email;
  if (email) {
    const checkEmail = await User.findOne({
      where: { email },
    });
    if (checkEmail && email !== user.email) {
      return res.status(409).json({
        status: "error",
        message: "email already exists",
      });
    }
  }

  const password = await bycrypt.hash(req.body.password, 10);
  const { name, profession, avatar } = req.body;

  await user.update({
    name,
    email,
    password,
    profession,
    avatar,
  });

  return res.status(200).json({
    status: "success",
    data: {
      id: user.id,
      name,
      email,
      profession,
      avatar,
    },
  });
};
