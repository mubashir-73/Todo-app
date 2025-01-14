import { useEffect, useState } from "react";
import image from "../assets/pngwing.com (2).png";

export default function Main() {
  /**
   * Challenge: Update our app so that when the user enters a
   * new ingredient and submits the form, it adds that new
   * ingredient to our list!
   */
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        fetch("http://localhost:5000/api/tasks/")
          .then((response) => response.json()) // Parse JSON
          .then((data) => {
            setTasks(data); // Extract "task" field from the JSON array
          });
      } catch {
        throw new Error("Error fetching tasks from api");
      }
    };
    fetchTasks();
  }, []);

  function handleSubmit(event) {
    /**
     * Like before, don't worry about this FormData stuff yet.
     * Just use the newIngredient below to help you finish the
     * challenge.
     */
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const newTask = formData.get("task");
    try {
      fetch("http://localhost:5000/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ task: newTask }),
      });
    } catch (error) {
      console.error("Error adding task:", error);
    }
    setTasks((prevTasks) => [...prevTasks, newTask]);
  }
  const tasksListItems = tasks.map((task, index) => (
    <li key={index} id={index}>
      <div className="taskname">{task.task}</div>
      <img onClick={() => deleteTask(task._id, index)} src={image} />
    </li>
  ));

  function deleteTask(taskId, indexToDelete) {
    try {
      fetch(`http://localhost:5000/api/tasks/${taskId}`, {
        method: "DELETE",
      }).then(
        setTasks((prevtask) =>
          prevtask.filter((_, index) => index !== indexToDelete),
        ),
      );
    } catch (error) {
      console.error("Error deleting task: ", error);
    }
  }

  return (
    <main>
      <form onSubmit={handleSubmit} className="add-ingredient-form">
        <input
          type="text"
          placeholder="e.g. clean the room"
          aria-label="Add task"
          name="task"
        />
        <button>Add ingredient</button>
      </form>
      <ul className="List">{tasksListItems}</ul>
    </main>
  );
}

//BUG: Name of latest task is not displaying in card view.
