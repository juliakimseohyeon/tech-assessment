import iconSearch from "../assets/icons/icon-search.svg";
import axios from "axios";

export default function SearchBar({ setNotes }) {
  /* -------------------------------------------------------------------------- */
  /*                       Function to capture input data                       */
  /* -------------------------------------------------------------------------- */
  const handleOnChange = (event) => {
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
    <form className="relative sm:mx-4 lg:mx-64 flex flex-row items-center sm:gap-1 lg:gap-4">
      <img src={iconSearch} className="sm:w-8 lg:w-12 absolute lg:-left-20" />
      <input
        placeholder="Search through your Notes"
        name="search"
        className="sm:ml-10 w-full input--search"
        onChange={handleOnChange}
      />
    </form>
  );
}
