const User = require("../models/user");
const jwt = require("jsonwebtoken");

const requestMiddleware = (req, res, next) => {
  console.log("Method: " + req.method);
  console.log("Path: " + req.path);
  console.log("Body: " + req.body);
  next();
};

const unknownEndpoint = (req, res, next) => {
  res.status(404).send({ error: "unknown endpoint" });
};

const errorHandlerMiddleware = (error, req, res, next) => {
  console.log(error.name);

  if (error.name === "CastError") {
    return res.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).send({ error: error.message });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(401).send({ error: error.message });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).send({ error: "token expired" });
  }

  return res.status(400).send({ error: "please try again." });
};

const getTokenFrom = (request) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
};

const userExtractor = async (req, res, next) => {
  const gotToken = getTokenFrom(req);
  if (!gotToken) {
    return res.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(gotToken, process.env.SECRET);
  if (!decodedToken.id) {
    return res.status(401).json({ error: "token missing or invalid" });
  }

  const user = await User.findById(decodedToken.id);
  req.user = user;
  next();
};

module.exports = {
  userExtractor,
  requestMiddleware,
  unknownEndpoint,
  errorHandlerMiddleware,
};
