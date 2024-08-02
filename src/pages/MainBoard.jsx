import iconAdd from "../assets/icons/icon-add.svg";
import NoteList from "../component/NoteList";
import { useState } from "react";
import SearchBar from "../component/SearchBar";

export default function MainBoard() {
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [notes, setNotes] = useState([]);

  return (
    <main className="flex flex-col gap-8">
      <div className="mt-12 mx-64 flex flex-row items-center justify-between">
        <h1 className="text-5xl font-bold text-black">Notes</h1>
        <img
          src={iconAdd}
          className="w-16"
          onClick={() => setAddBtnClicked(true)}
        />
      </div>
      <SearchBar setSearchInput={setSearchInput} setNotes={setNotes} />
      <NoteList
        addBtnClicked={addBtnClicked}
        setAddBtnClicked={setAddBtnClicked}
        notes={notes}
        setNotes={setNotes}
      />
    </main>
  );
}
