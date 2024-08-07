import { useState } from "react";
import axios from "axios";
import iconAdd from "../assets/icons/icon-add.svg";

export default function AddNote({ setAddBtnClicked, setNotes }) {
  const [noteContent, setNoteContent] = useState("");

  /* -------------------------------------------------------------------------- */
  /*                       Function to capture input data                       */
  /* -------------------------------------------------------------------------- */
  const handleOnChange = (event) => {
    setNoteContent(event.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                            Function to add note                            */
  /* -------------------------------------------------------------------------- */
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (noteContent === "") {
      setAddBtnClicked(false);
    } else {
      try {
        setNoteContent("");

        const newNote = {
          note: noteContent,
        };

        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}`,
          newNote
        );
        if (response) {
          setNotes(response.data);
        }
        setAddBtnClicked(false);
      } catch (err) {
        console.error(err);
      }
    }
  };

  return (
    <form className="flex flex-col gap-4 mx-64" onSubmit={handleOnSubmit}>
      <input
        type="text"
        placeholder="Add your note here"
        className="input--add"
        onChange={handleOnChange}
        name="note"
      />
      <button>
        <img src={iconAdd} className="w-12" />
      </button>
    </form>
  );
}
