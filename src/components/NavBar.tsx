import React, { useRef } from "react";
import "./NavBar-style.css";
interface NavBarProps {
  addInput: (s: string) => void;
}
const NavBar: React.FC<NavBarProps> = ({ addInput }) => {
  const input = useRef<HTMLInputElement>(null);
  return (
    <nav>
      <h1 className="Logo">MovieNest</h1>
      {/* <ul>
        <li>
          <a href="#">Home</a>
        </li>
        <li>
          <a href="#">Favorates</a>
        </li>
        <li>
          <a href="#">About</a>
        </li>
      </ul> */}
      <form>
        <input
          type="text"
          ref={input}
          placeholder=" 🔎  Search..."
          onChange={(e) => {
            input.current!.value = e.target.value;
          }}
        ></input>
        <button
          type="submit"
          onClick={(e) => {
            e.preventDefault();
            addInput(input.current!.value);
          }}
        >
          Search
        </button>
      </form>
    </nav>
  );
};
export default NavBar;
