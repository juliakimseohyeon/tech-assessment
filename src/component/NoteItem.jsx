import iconAddPerson from "../assets/icons/icon-add-person.svg";
import iconPin from "../assets/icons/icon-pin.svg";

export default function NoteItem() {
  return (
    <div className="relative flex flex-col">
      <img src={iconPin} className="absolute w-16" />
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
    </div>
  );
}
