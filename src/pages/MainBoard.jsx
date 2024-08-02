import iconAdd from "../assets/icons/icon-add.svg";
import iconSearch from "../assets/icons/icon-search.svg";

export default function MainBoard() {
  return (
    <main className="flex flex-col gap-8">
      <div className="mt-12 mx-64 flex flex-row items-center justify-between">
        <h1 className="text-5xl font-bold text-black">Notes</h1>
        <img src={iconAdd} className="w-16" />
      </div>
      <form className="relative mx-64 flex flex-row items-center gap-4">
        <img src={iconSearch} className="w-12 absolute -left-20" />
        <input
          placeholder="Search through your Notes"
          name="search"
          className="w-full"
        />
      </form>
    </main>
  );
}
