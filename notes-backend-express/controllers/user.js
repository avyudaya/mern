const usersRouter = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcrypt");

usersRouter.post("/", async (req, res, next) => {
    const body = req.body;

    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(body.password, saltRounds);

    const user = new User({
        username: body.username,
        name: body.name,
        passwordHash: passwordHash,
    });

    user.save()
        .then((savedUser) => {
            res.status(201).json(savedUser);
        })
        .catch(err => next(err));
});

usersRouter.get("/", async (req, res, next) => {
    const users = await User.find({});
    res.json(users);
});

module.exports = usersRouter;