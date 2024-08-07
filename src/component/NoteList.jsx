import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function NoteList({
  notes,
  setNotes,
  addBtnClicked,
  setAddBtnClicked,
}) {
  return (
    <div className="flex flex-col gap-8 h-1/2 overflow-scroll">
      {addBtnClicked && (
        <AddNote setAddBtnClicked={setAddBtnClicked} setNotes={setNotes} />
      )}
      <NoteItem notes={notes} setNotes={setNotes} />
    </div>
  );
}
