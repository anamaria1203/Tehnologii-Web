import { shallowEqual, useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import { addNote, deleteNote } from "../actions/actions";

const noteListSelector = (state) => state.list.notes;

const NoteList = (props) => {
  const notes = useSelector(noteListSelector, shallowEqual);
  const [content, setContent] = useState("");
  const dispatch = useDispatch();

  return (
    <div style={{ padding: "20px" }}>
      <h3>List of notes (Server Synced)</h3>
      {notes.map((note) => (
        <div
          key={note.id}
          style={{ marginBottom: "10px", display: "flex", gap: "10px" }}
        >
          <span>{note.content || note}</span>
          <button
            onClick={() => dispatch(deleteNote(note.id))}
            style={{ color: "red", cursor: "pointer" }}
          >
            Delete from Server
          </button>
        </div>
      ))}

      <div style={{ marginTop: "20px" }}>
        <h3>Add a note</h3>
        <input
          type="text"
          placeholder="note content"
          onChange={(evt) => setContent(evt.target.value)}
        />
        <button onClick={() => dispatch(addNote(content))}>Add</button>
      </div>
    </div>
  );
};

export default NoteList;
