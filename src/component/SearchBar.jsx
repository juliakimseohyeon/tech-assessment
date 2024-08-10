import iconSearch from "../assets/icons/icon-search.svg";
import axios from "axios";
import { useState } from "react";

export default function SearchBar({ notes, setNotes }) {
  // Define a state to manage the input value
  const [inputValue, setInputValue] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                       Function to capture input data                       */
  /* -------------------------------------------------------------------------- */
  const handleOnChange = (event) => {
    const value = event.target.value;
    setInputValue(value);
    if (value) {
      searchNote(value);
    }
  };

  /* -------------------------------------------------------------------------- */
  /*                Function to search for note using input data                */
  /* -------------------------------------------------------------------------- */
  const searchNote = async (input) => {
    if (inputValue !== "") {
      // Only make the request if query is not empty
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/?query=${input}`
        );
        if (response) {
          console.log("Backend response: ", response.data);
          setNotes(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    } else {
      // Clear notes if query is empty
      setNotes(notes);
    }
  };

  return (
    <form className="relative sm:mx-4 lg:mx-84 flex flex-row items-center sm:gap-1 lg:gap-4">
      <img src={iconSearch} className="sm:w-8 lg:w-9 absolute lg:-left-14" />
      <input
        placeholder="Search through your Notes"
        name="search"
        className="sm:ml-10 lg:ml-0 w-full border-b border-solid border-1 border-lightgrey input--search"
        value={inputValue}
        onChange={handleOnChange}
      />
    </form>
  );
}
