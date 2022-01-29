const bcrypt = require("bcrypt");
const { User } = require("../../../models");
const validator = require("fastest-validator");
const v = new validator();

module.exports = async (req, res) => {
  const schema = {
    name: "string|empty|false",
    email: "email|empty|false",
    password: "string|min:6|empty|false",
    profession: "string|optional",
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

  if (user) {
    return res.status(409).json({
      status: "error",
      message: "email already exists",
    });
  }

  const password = await bcrypt.hash(req.body.password, 10);

  const data = {
    password,
    name: req.body.name,
    email: req.body.email,
    profession: req.body.profession,
    role: "student",
  };
  const createUser = await User.create(data);

  return res.status(201).json({
    status: "success",
    data: {
      id: createUser.id,
      // user: createUser, // show all user data
    },
  });
};
