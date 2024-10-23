const express = require("express");
const router = express.Router();
const fetchUser = require("../middleware/fetchUser");
const Note = require("../models/Notes");
const { body, validationResult } = require("express-validator");
//Route 1-fetch all th notes using post api/notes/fetchallnotes-login require
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    res.status(500).send("Internal server error");
  }
});
//Route 2-add notes using post api/notes/addnotes-login require
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be atleast 5 character").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //if error return bad request
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const saveNote = await note.save();
      res.json(saveNote);
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);

//Route 3-Update  notes using put api/notes/updatenote-login require
router.put(
  "/updatenote/:id",
  fetchUser,

  async (req, res) => {
    try {
      const { title, description, tag } = req.body;
      //create new not object
      const newNote = {};
      if (title) {
        newNote.title = title;
      }
      if (description) {
        newNote.description = description;
      }
      if (tag) {
        newNote.tag = tag;
      }
      //find note to be update and update it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndUpdate(
        req.params.id,
        { $set: newNote },
        { new: true }
      );
      res.json({ note });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);
//Route 4-Delete  notes using put api/notes/deletenote-login require
router.delete(
  "/deletenote/:id",
  fetchUser,

  async (req, res) => {
    try {
      //find note to be delete and delete it
      let note = await Note.findById(req.params.id);
      if (!note) {
        return res.status(404).send("Not Found");
      }
      if (note.user.toString() !== req.user.id) {
        return res.status(401).send("Not Allowed");
      }
      note = await Note.findByIdAndDelete(req.params.id);
      res.json({ Success: "Note Successfully deleted" });
    } catch (error) {
      res.status(500).send("Internal server error");
    }
  }
);
module.exports = router;
