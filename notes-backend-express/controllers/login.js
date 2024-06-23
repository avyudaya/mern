const loginRouter = require("express").Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");

loginRouter.post("/", async (req, res, next) => {
  const { username, password } = req.body;

  if (username == null || password == null) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const user = await User.findOne({ username: username });
  const passwordCorrect =
    user == null ? false : await bcrypt.compare(password, user.passwordHash);

  if(!passwordCorrect) {
    return res.status(401).json({
      error: "invalid username or password",
    });
  }

  const userForToken = {
    username: user.username,
    id: user._id,
  };

  const token = jwt.sign(userForToken, process.env.SECRET, {expiresIn: 60*60});
  res.status(200).send({ token: token, username: username, name: user.name });
});

module.exports = loginRouter;
