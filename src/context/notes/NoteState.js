import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const noteInitial = [];
  //get all notes
  const getNotes = async () => {
    //Fetch note API
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      }
    });
    const json = await response.json();
    // console.log(json);
    setNotes(json);
  };

  //Add note
  const addNote = async (title, description, tag) => {
    //Fetch note API
   //console.log(title + "  " + description + "  " + tag+ localStorage.getItem('token'));
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
     },
     body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    console.log(json);
    getNotes();
    /* const note = {
      _id: "657175264035c5687823f230118",
      user: "6570484f3c4096f8ef00ccb1",
      title: title,
      description: description,
      tag: tag,
      date: "2023-12-07T07:33:56.692Z",
      __v: 0,
    };
    setNotes(notes.concat(note));*/
  };
  //Delete note
  const deleteNote = async (id) => {
    //Delete API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token')
      }
    });
    const json = await response.json();
    //console.log(json);
    //setNotes(json);

    //client side code
    const newNote = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNote);
  };
  //Edit note
  const editNote =async (id,title,description,tag) => {
    console.log(description)
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
         localStorage.getItem('token'),
     
      },
      body: JSON.stringify({ title, description, tag })
    });
    getNotes();
  //  const json = await response.json();
   // console.log(json);
  };
  const [notes, setNotes] = useState(noteInitial);

  return (
    <NoteContext.Provider
      value={{ notes, addNote, deleteNote, editNote, getNotes }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};
export default NoteState;
