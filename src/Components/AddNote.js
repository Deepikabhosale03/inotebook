import React, { useContext, useState } from "react";
import noteContext from "../context/notes/noteContext";
const AddNote = () => {
  const context = useContext(noteContext);
  const { addNote } = context;
  const[note,setNotes] = useState({title:"",description:"",tag:""});
  const handleclick=(e)=>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setNotes({title:"",description:"",tag:""});
  }
  const onchange=(e)=>{
    setNotes({...note,[e.target.name]:e.target.value})
  }
  return (
    
    <div>
        <div className="container my-3">
        <h2>Add a Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title" name="title"
              aria-describedby="emailHelp" onChange={onchange} value={note.title}
            />
          
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
             Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description" name="description" onChange={onchange} value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
         Tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag" name="tag" onChange={onchange} value={note.tag}
            />
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleclick}>
            Add note
          </button>
        </form>
      </div>
    </div>
  )
}

export default AddNote
