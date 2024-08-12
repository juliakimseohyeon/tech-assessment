import iconAdd from "../assets/icons/icon-add.svg";
import NoteList from "../component/NoteList";
import { useState, useEffect } from "react";
import SearchBar from "../component/SearchBar";
import axios from "axios";

export default function MainBoard() {
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [pinnedNoteId, setPinnedNoteId] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  /* -------------------------------------------------------------------------- */
  /*                   Function to load all notes in database                   */
  /* -------------------------------------------------------------------------- */
  async function getAllNotes() {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}`);
      console.log("Fetched notes: ", response.data);
      if (response.data) {
        const sortedNotes = sortNotes(response.data);
        setNotes(sortedNotes);
        console.log("Sorted notes: ", response.data);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Failed to fetch notes: ", err);
      setIsLoading(false);
    }
  }

  /* -------------------------------------------------------------------------- */
  /*              Function to load pinned state from local storage              */
  /* -------------------------------------------------------------------------- */

  useEffect(() => {
    // Load pinned state from local storage
    const savedPinnedNotes = localStorage.getItem("pinnedNotes");
    if (savedPinnedNotes) {
      setPinnedNoteId(JSON.parse(savedPinnedNotes));
    } else {
      setPinnedNoteId([]);
    }
  }, []);

  // Load pinned status first to get the most up-to-date note data
  useEffect(() => {
    getAllNotes();
  }, []);

  /* -------------------------------------------------------------------------- */
  /*            Function to sort notes by pinned state and date added           */
  /* -------------------------------------------------------------------------- */
  const sortNotes = (notesToSort) => {
    return [...notesToSort].sort((a, b) => {
      if (a.pinned !== b.pinned) {
        return b.pinned - a.pinned;
      }
      return a.timestamp - b.timestamp;
    });
  };

  return (
    <main className="flex flex-col gap-6">
      <div className="max-w-full sm:m-4 lg:mt-12 lg:mx-84 lg:mb-0 flex flex-row items-center justify-between">
        <h1 className="sm:text-4xl lg:text-5xl font-bold text-black">Notes</h1>
        <img
          src={iconAdd}
          className="sm:w-8 lg:w-14 cursor-pointer"
          onClick={() => setAddBtnClicked(!addBtnClicked)}
        />
      </div>
      <SearchBar notes={notes} setNotes={setNotes} getAllNotes={getAllNotes} />
      {isLoading ? (
        <h2>Loading...</h2>
      ) : notes.length === 0 ? (
        <h2 className="sm:text-2xl lg:text-3xl font-semibold text-red sm:mx-4 lg:mx-84">
          No Note Found
        </h2>
      ) : (
        <NoteList
          addBtnClicked={addBtnClicked}
          setAddBtnClicked={setAddBtnClicked}
          notes={notes}
          setNotes={setNotes}
          pinnedNoteId={pinnedNoteId}
          setPinnedNoteId={setPinnedNoteId}
          sortNotes={sortNotes}
        />
      )}
    </main>
  );
}
