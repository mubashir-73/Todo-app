import todologo from "../assets/svg_360836.svg";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div className="leftside">
        <img src={todologo} />
        <h1>Todo List</h1>
      </div>
      <div className="navmenu">
        <ul id="Navlist">
          <li>
            <Link to="/main">home</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
        </ul>
      </div>
    </header>
  );
}
