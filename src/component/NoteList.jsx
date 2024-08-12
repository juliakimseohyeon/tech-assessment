import NoteItem from "./NoteItem";
import AddNote from "./AddNote";

export default function NoteList({
  notes,
  setNotes,
  addBtnClicked,
  setAddBtnClicked,
  pinnedNoteId,
  setPinnedNoteId,
  sortNotes,
}) {
  return (
    <div className="max-w-full flex flex-col sm:gap-4 lg:gap-12 h-1/2 overflow-scroll">
      {addBtnClicked && (
        <AddNote setAddBtnClicked={setAddBtnClicked} setNotes={setNotes} />
      )}
      <NoteItem
        notes={notes}
        setNotes={setNotes}
        pinnedNoteId={pinnedNoteId}
        setPinnedNoteId={setPinnedNoteId}
        sortNotes={sortNotes}
      />
    </div>
  );
}
