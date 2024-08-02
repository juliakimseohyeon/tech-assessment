import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useState } from "react";

export default function NoteList({
  notes,
  setNotes,
  addBtnClicked,
  setAddBtnClicked,
}) {
  return (
    <div className="flex flex-col gap-8">
      <NoteItem notes={notes} setNotes={setNotes} />
      {addBtnClicked && (
        <AddNote setAddBtnClicked={setAddBtnClicked} setNotes={setNotes} />
      )}
    </div>
  );
}
