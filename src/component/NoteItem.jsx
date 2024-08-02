import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";
import iconDelete from "../assets/icons/icon-delete.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NoteItem() {
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [notes, setNotes] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                   Function to load all notes in database                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function getAllNotes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
        if (response) {
          console.log(response.data);
          setNotes(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getAllNotes();
  }, []);
  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="relative flex flex-col"
          onMouseEnter={() => setHoveredNoteId(note.id)}
          onMouseLeave={() => setHoveredNoteId(null)}
        >
          <img
            src={iconPin}
            className={`absolute w-16 -left-20 top-1/4 transition-all ${
              hoveredNoteId === note.id ? "block" : "hidden"
            }`}
          />
          <h2 className="text-3xl font-semibold text-darkgrey">{note.note}</h2>
          <div className="flex flex-row justify-between items-center">
            <div className="flex flex-row items-center">
              <img src={iconAddPerson} className="w-16" />
              <p className="text-lg text-lightgrey">
                {note.collaborator ? note.collaborator : "No Collaborators"}
              </p>
            </div>
            <p className="text-lightgrey">{note.timestamp}</p>
          </div>
          <img
            src={iconDelete}
            className={`absolute w-16 -right-20 top-1/4 transition-all ${
              hoveredNoteId === note.id ? "block" : "hidden"
            }`}
          />
        </div>
      ))}
    </>
  );
}
