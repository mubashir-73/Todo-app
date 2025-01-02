import { useEffect } from "react";
import Todocreate from "./addtodo";

export default function Todo() {
  useEffect(() => {
    Todocreate();
  }, []);
  return (
    <div className="todo">
      <h1>TO-DO</h1>
      <hr className="todosep" />
      <div className="butts">
        <button className="add">+ New Task</button>
        <input
          type="text"
          id="myInput"
          placeholder="Enter name of the task here"
        />
      </div>
      <div className="card">
        <ul className="myUL"></ul>
      </div>
    </div>
  );
}
