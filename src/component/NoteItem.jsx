import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";
import iconDelete from "../assets/icons/icon-delete.svg";
import { useState } from "react";

export default function NoteItem() {
  const [hover, setHover] = useState(false);
  return (
    <div
      className="relative flex flex-col"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <img
        src={iconPin}
        className={`absolute w-16 -left-20 top-1/4 transition-all ${
          hover ? "block" : "hidden"
        }`}
      />
      <h2 className="text-3xl font-semibold text-darkgrey">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Repellat
        doloremque aliquam repellendus ratione molestiae quia amet?
      </h2>
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-row items-center">
          <img src={iconAddPerson} className="w-16" />
          <p className="text-lg text-lightgrey">
            Roger Craig and Shakeel Avadhany
          </p>
        </div>
        <p className="text-lightgrey">2 mins ago</p>
      </div>
      <img
        src={iconDelete}
        className={`absolute w-16 -right-20 top-1/4 transition-all ${
          hover ? "block" : "hidden"
        }`}
      />
    </div>
  );
}
