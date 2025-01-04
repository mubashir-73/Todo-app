export default function Todo() {
  return (
    <div className="todo">
      <h1>TO-DO</h1>
      <hr className="todosep" />
      <form className="forms">
        <input
          type="text"
          id="myInput"
          placeholder="e.g. reading a book"
          aria-label="Add Tasks"
        />
        <button className="add">+ New Task</button>
      </form>
      <div className="card">
        <ul className="myUL"></ul>
      </div>
    </div>
  );
}
