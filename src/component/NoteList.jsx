import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useState } from "react";

export default function NoteList({ addBtnClicked, setAddBtnClicked }) {
  return (
    <div>
      <NoteItem />
      {addBtnClicked && <AddNote setAddBtnClicked={setAddBtnClicked} />}
    </div>
  );
}
