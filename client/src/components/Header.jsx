import todologo from "../assets/svg_360836.svg";

export default function Header() {
  return (
    <header>
      <img src={todologo} />
      <h1>Todo List</h1>
    </header>
  );
}
