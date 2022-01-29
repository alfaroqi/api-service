const express = require("express");
const router = express.Router();

const userHandler = require("./handler/users");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.send("respond with a resource");
});

router.post("/register", userHandler.register);
router.post("/login", userHandler.login);
router.put("/:id", userHandler.update);
router.get("/:id", userHandler.getUser);

module.exports = router;
