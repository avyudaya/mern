const notesRouter = require("express").Router();
const Note = require("../models/note");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require('../utils/logger');

notesRouter.get("/", (req, res) => {
  Note.find({}).then((notes) => {
    res.json(notes);
  });
});

notesRouter.get("/:id", (req, res, next) => {
  Note.findById(req.params.id)
    .then((note) => {
      res.json(note);
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
});

const getTokenFrom = request => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    return authorization.replace("Bearer ", "");
  }
  return null;
}

notesRouter.post("/", async (req, res, next) => {
  const body = req.body;
  const gotToken = getTokenFrom(req);
  if(!gotToken){
    return res.status(401).json({ error: "token missing" });
  }
  const decodedToken = jwt.verify(gotToken, process.env.SECRET);
  if(!decodedToken.id){
    return res.status(401).json({ error: "token missing or invalid" });
  }

  if (body.content == null) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const user = await User.findById(decodedToken.id);

  const note = Note({
    content: body.content,
    important: body.important || false,
    user: user.id,
  });

  const savedNote = await note.save();
  user.notes = user.notes.concat(savedNote._id);
  await user.save();

  res.status(201).json(savedNote);
});

notesRouter.delete("/:id", (req, res, next) => {
  Note.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).end();
    })
    .catch((err) => next(err));
});

notesRouter.put("/:id", (req, res, next) => {
  const body = req.body;

  if (body.content == null) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = {
    content: body.content,
    important: body.important || false,
  };

  Note.findByIdAndUpdate(req.params.id, note, { new: true })
    .then((updatedNote) => {
      res.json(updatedNote);
    })
    .catch((err) => next(err));
});

module.exports = notesRouter;
