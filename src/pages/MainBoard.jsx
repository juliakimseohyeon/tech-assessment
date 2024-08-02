import iconAdd from "../assets/icons/icon-add.svg";
import iconSearch from "../assets/icons/icon-search.svg";

export default function MainBoard() {
  return (
    <main>
      <div>
        <h1>Notes</h1>
        <img src={iconAdd} />
      </div>
      <form>
        <img src={iconSearch} />
        <input placeholder="Search through your Notes" name="search" />
      </form>
    </main>
  );
}
