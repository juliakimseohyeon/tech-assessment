import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";
import iconPinBlue from "../assets/icons/icon-pin-blue.svg";
import iconDelete from "../assets/icons/icon-delete.svg";
import { useEffect, useState } from "react";
import axios from "axios";
import TimestampComponent from "../utils/timeago";

export default function NoteItem({
  notes,
  setNotes,
  pinnedNoteId,
  setPinnedNoteId,
  sortNotes,
}) {
  const [hoveredNoteId, setHoveredNoteId] = useState(null);
  const [clickedNotes, setClickedNotes] = useState({});
  const isMobile = () => window.innerWidth < 1280;

  const handleClickPin = async (noteId) => {
    // Check if pinned note is already in the pinnedNoteId array. If it is, remove it from the array
    if (pinnedNoteId.includes(noteId)) {
      setPinnedNoteId(pinnedNoteId.filter((id) => id !== noteId));
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/${noteId}`,
          { pinned: 0 }
        );
        // Sort the updated notes
        const sortedNotes = sortNotes(response.data);
        setNotes(sortedNotes);

        // Save pinned state to local storage
        localStorage.setItem(
          "pinnedNotes",
          JSON.stringify(pinnedNoteId.filter((id) => id !== noteId))
        );
      } catch (err) {
        console.error("Error removing pinned status: ", err);
      }
    } else {
      setPinnedNoteId([...pinnedNoteId, noteId]);
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_API_URL}/${noteId}`,
          { pinned: 1 }
        );
        // Sort the updated notes
        const sortedNotes = sortNotes(response.data);
        setNotes(sortedNotes);

        // Save pinned state to local storage
        localStorage.setItem(
          "pinnedNotes",
          JSON.stringify([...pinnedNoteId, noteId])
        );
      } catch (err) {
        console.error("Error adding pinned status: ", err);
      }
    }
  };

  const handleClickDelete = async (noteId) => {
    try {
      const response = await axios.delete(
        `${import.meta.env.VITE_API_URL}/${noteId}`
      );
      if (response.data) {
        setNotes(response.data);
      }
    } catch (err) {
      console.error("Failed to delete note: ", err);
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
          onMouseEnter={() =>
            !isMobile() &&
            (setHoveredNoteId(note.id),
            console.log("Mouse entered. Hovered Note: ", hoveredNoteId))
          }
          onMouseLeave={() =>
            !isMobile() &&
            (setHoveredNoteId(null),
            console.log("Mouse left. Hovered Note: ", hoveredNoteId))
          }
          onClick={() => isMobile() && handleClickNote(note.id)}
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
              (isMobile() && clickedNotes[note.id]) ||
              (!isMobile() && hoveredNoteId === note.id)
                ? ""
                : "hidden"
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
                  (isMobile() && clickedNotes[note.id]) ||
                  (!isMobile() && hoveredNoteId === note.id)
                    ? ""
                    : "hidden"
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
                (isMobile() && clickedNotes[note.id]) ||
                (!isMobile() && hoveredNoteId === note.id)
                  ? ""
                  : "hidden"
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
