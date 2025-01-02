export default function TodoCreate() {
  const btn = document.getElementById("add");
  btn.addEventListener(() => {
    var li = document.createElement("li");
    var inputValue = document.getElementById("myInput").value;
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    if (inputValue === "") {
      alert("....So your todo is to do nothing?");
    } else {
      document.getElementById("myUL").appendChild(li);
    }
    document.getElementById("myInput").value = "";
  });
}
