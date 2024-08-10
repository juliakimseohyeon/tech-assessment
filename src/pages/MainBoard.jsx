import iconAdd from "../assets/icons/icon-add.svg";
import NoteList from "../component/NoteList";
import { useState } from "react";
import SearchBar from "../component/SearchBar";

export default function MainBoard() {
  const [addBtnClicked, setAddBtnClicked] = useState(false);
  const [notes, setNotes] = useState([]);

  return (
    <main className="flex flex-col gap-6">
      <div className="max-w-full sm:m-4 lg:mt-12 lg:mx-84 lg:mb-0 flex flex-row items-center justify-between">
        <h1 className="sm:text-4xl lg:text-5xl font-bold text-black">Notes</h1>
        <img
          src={iconAdd}
          className="sm:w-8 lg:w-14 cursor-pointer"
          onClick={() => setAddBtnClicked(true)}
        />
      </div>
      <SearchBar notes={notes} setNotes={setNotes} />
      <NoteList
        addBtnClicked={addBtnClicked}
        setAddBtnClicked={setAddBtnClicked}
        notes={notes}
        setNotes={setNotes}
      />
    </main>
  );
}
