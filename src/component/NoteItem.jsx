import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";
import iconPinBlue from "../assets/icons/icon-pin-blue.svg";
import iconDelete from "../assets/icons/icon-delete.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import TimestampComponent from "../utils/timeago";

export default function NoteItem({ notes, setNotes }) {
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [pinnedNoteId, setPinnedNoteId] = useState([]);
  const [clickedNotes, setClickedNotes] = useState({});

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

  const handleClickNote = (noteId) => {
    console.log("Clicked Notes: ", clickedNotes);
    // Check if clicked note is already in the clickedNotes. If it is, remove it from the object
    setClickedNotes((prev) => ({ ...prev, [noteId]: !prev[noteId] }));
  };

  return (
    <>
      {notes.map((note) => (
        <div
          key={note.id}
          className="relative flex flex-col w-full"
          onMouseEnter={() => setHoveredNoteId(note.id)}
          onMouseLeave={() => setHoveredNoteId(null)}
          onClick={() => {
            if (window.innerWidth < 1366) {
              handleClickNote(note.id);
            }
          }}
        >
          <div className="sm:mx-4 lg:mx-84 flex flex-col gap-4">
            <h2 className="sm:text-2xl lg:text-3xl font-semibold text-darkgrey">
              {note.note}
            </h2>
            <div className="flex sm:flex-col lg:flex-row lg:justify-between lg:items-center sm:gap-4">
              <div className="flex flex-row items-center gap-2">
                <img src={iconAddPerson} className="sm:w-8 lg:w-9" />
                <p className="sm:text-base lg:text-lg text-grey">
                  {note.collaborator ? note.collaborator : "No Collaborators"}
                </p>
              </div>
              <p className="sm:text-sm lg:text-base text-grey italic">
                {TimestampComponent(note.timestamp)}
              </p>
            </div>
          </div>
          <div
            className={`sm:max-w-full lg:w-full sm:ml-4 lg:m-0 sm:mt-4 sm:flex sm:flex-row sm:gap-4 lg:absolute lg:top-0 ${
              clickedNotes[note.id] ? "" : "hidden"
            }`}
          >
            {pinnedNoteId.includes(note.id) ? (
              <img
                src={iconPinBlue}
                className={`sm:w-8 lg:w-12 lg:absolute lg:left-68 transition-all cursor-pointer`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickPin(note.id);
                }}
              />
            ) : (
              <img
                src={iconPin}
                className={`sm:w-8 lg:w-12 lg:absolute lg:left-68 transition-all cursor-pointer ${
                  clickedNotes[note.id] ? "" : "hidden"
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  handleClickPin(note.id);
                }}
              />
            )}
            <img
              src={iconDelete}
              className={`sm:w-8 lg:w-9 lg:absolute lg:right-56 transition-all cursor-pointer ${
                clickedNotes[note.id] ? "" : "hidden"
              }`}
              onClick={(e) => {
                e.stopPropagation();
                handleClickDelete(note.id);
              }}
            />
          </div>
        </div>
      ))}
    </>
  );
}
