import "./App.css";
import Navbar from "./components/navbar.jsx";
import Todo from "./components/todolist.jsx";
export default function App() {
  return (
    <>
      <div className="mainpage">
        <div className="panel">
          <Navbar />
          <hr className="navsep" />
        </div>
        <Todo />
      </div>
    </>
  );
}
