const notesRouter = require("express").Router();
const Note = require("../models/note");

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

notesRouter.post("/", (req, res, next) => {
  const body = req.body;

  if (body.content == null) {
    return res.status(400).json({
      error: "content missing",
    });
  }

  const note = Note({
    content: body.content,
    important: body.important || false,
  });

  console.log(note);

  note
    .save()
    .then((savedNote) => {
      res.json(savedNote);
    })
    .catch((err) => next(err));
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
