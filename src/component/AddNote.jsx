import iconAdd from "../assets/icons/icon-add.svg";

export default function AddNote({ setAddBtnClicked }) {
  return (
    <form className="flex flex-col mx-64">
      <input
        type="text"
        placeholder="Add your note here"
        className="input--add"
      />
      <img
        src={iconAdd}
        className="w-12"
        onClick={() => setAddBtnClicked(false)}
      />
    </form>
  );
}
