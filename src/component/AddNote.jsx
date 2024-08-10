import { useState } from "react";
import axios from "axios";
import iconAdd from "../assets/icons/icon-add.svg";

const initialValues = {
  note: "",
  collaborator: "",
};

export default function AddNote({ setAddBtnClicked, setNotes }) {
  const [values, setValues] = useState(initialValues);

  /* -------------------------------------------------------------------------- */
  /*                       Function to capture input data                       */
  /* -------------------------------------------------------------------------- */
  const handleOnChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  /* -------------------------------------------------------------------------- */
  /*                            Function to add note                            */
  /* -------------------------------------------------------------------------- */
  const handleOnSubmit = async (event) => {
    event.preventDefault();

    if (values === initialValues) {
      setAddBtnClicked(false); // If values haven't changed (user hasn't input anything), don't add note
    } else {
      try {
        setValues(initialValues);
        const response = await axios.post(
          `${import.meta.env.VITE_API_URL}`,
          values
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
    <form
      className="flex flex-col gap-4 sm:m-4 lg:mx-84"
      onSubmit={handleOnSubmit}
    >
      <h2 className="sm:text-2xl lg:text-3xl text-grey">Add your note here</h2>
      <input
        type="text"
        placeholder="Note Content"
        onChange={handleOnChange}
        value={values.note}
        name="note"
      />
      <input
        type="text"
        placeholder="Collaborator"
        onChange={handleOnChange}
        value={values.collaborator}
        name="collaborator"
      />
      <button>
        <img src={iconAdd} className="sm:w-8 lg:w-12" />
      </button>
    </form>
  );
}
