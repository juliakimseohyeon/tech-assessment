import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";
import iconPinBlue from "../assets/icons/icon-pin-blue.svg";
import iconDelete from "../assets/icons/icon-delete.svg";
import { useEffect, useState } from "react";
import axios from "axios";

export default function NoteItem({ notes, setNotes }) {
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [pinnedNoteId, setPinnedNoteId] = useState([]);

  /* -------------------------------------------------------------------------- */
  /*                   Function to load all notes in database                   */
  /* -------------------------------------------------------------------------- */
  useEffect(() => {
    async function getAllNotes() {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
        if (response) {
          setNotes(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    }
    getAllNotes();
  }, []);

  const handleClickPin = (noteId) => {
    // Check if pinned note is already in the pinnedNoteId array. If it is, remove it from the array
    if (pinnedNoteId.includes(noteId)) {
      setPinnedNoteId(pinnedNoteId.filter((id) => id !== noteId));
    } else {
      setPinnedNoteId([...pinnedNoteId, noteId]);
    }
  };

  const handleClickDelete = async (noteId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${noteId}`
      );
      if (response) {
        setNotes(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="relative flex flex-col"
          onMouseEnter={() => setHoveredNoteId(note.id)}
          onMouseLeave={() => setHoveredNoteId(null)}
        >
          {pinnedNoteId.includes(note.id) ? (
            <img
              src={iconPinBlue}
              className={`absolute w-16 left-40 top-1/4 transition-all`}
              onClick={() => {
                handleClickPin(note.id);
              }}
            />
          ) : (
            <img
              src={iconPin}
              className={`absolute w-16 left-40 top-1/4 transition-all ${
                hoveredNoteId === note.id ? "block" : "hidden"
              }`}
              onClick={() => {
                handleClickPin(note.id);
              }}
            />
          )}
          <div className="mx-64 flex flex-col gap-4">
            <h2 className="text-3xl font-semibold text-darkgrey">
              {note.note}
            </h2>
            <div className="flex flex-row justify-between items-center">
              <div className="flex flex-row items-center gap-4">
                <img src={iconAddPerson} className="w-10" />
                <p className="text-lg text-grey">
                  {note.collaborator ? note.collaborator : "No Collaborators"}
                </p>
              </div>
              <p className="text-grey italic">{note.timestamp}</p>
            </div>
          </div>
          <img
            src={iconDelete}
            className={`absolute w-16 right-40 top-1/4 transition-all ${
              hoveredNoteId === note.id ? "block" : "hidden"
            }`}
            onClick={() => handleClickDelete(note.id)}
          />
        </div>
      ))}
    </>
  );
}
