import { useEffect, useState } from "react";
import iconSearch from "../assets/icons/icon-search.svg";
import axios from "axios";

export default function SearchBar({ setSearchInput, setNotes }) {
  const [userInput, setUserInput] = useState("");
  /* -------------------------------------------------------------------------- */
  /*                       Function to capture input data                       */
  /* -------------------------------------------------------------------------- */
  const handleOnChange = (event) => {
    setSearchInput(event.target.value);
    searchNote(event.target.value);
  };

  /* -------------------------------------------------------------------------- */
  /*                Function to search for note using input data                */
  /* -------------------------------------------------------------------------- */
  const searchNote = async (input) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/?query=${input}`
      );
      if (response) {
        setNotes(response.data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form className="relative mx-64 flex flex-row items-center gap-4">
      <img src={iconSearch} className="w-12 absolute -left-20" />
      <input
        placeholder="Search through your Notes"
        name="search"
        className="w-full"
        onChange={handleOnChange}
      />
    </form>
  );
}
