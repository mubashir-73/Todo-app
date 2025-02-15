import { useEffect, useState } from "react";
import image from "../assets/pngwing.com (2).png";
import useAuth from "../hooks/useAuth";

export default function Main() {
  const { auth } = useAuth();
  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        console.log(auth?.authToken); // Debugging
        const response = await fetch(
          "https://todo-app-mubashir-73.onrender.com/api/tasks/",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth.authToken}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        throw new Error("Error fetching tasks from API");
      }
    };
    fetchTasks();
  }, [auth]);

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
      fetch("https://todo-app-mubashir-73.onrender.com/api/tasks/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authToken}`,
        },
        body: JSON.stringify({ task: newTask }),
      })
        .then((response) => response.json())
        .then((savedTask) => {
          setTasks((prevTasks) => [...prevTasks, savedTask]);
        });
    } catch (error) {
      console.error("Error adding task:", error);
    }
  }

  const tasksListItems = tasks.map((task, index) => (
    <li key={index} id={index}>
      <div className="taskname" contentEditable="true">
        {task.task}
      </div>
      <img onClick={() => deleteTask(task._id, index)} src={image} />
    </li>
  ));

  function deleteTask(taskId, indexToDelete) {
    try {
      fetch(`https://todo-app-mubashir-73.onrender.com/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.authToken}`,
        },
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
        <button>Add Task</button>
      </form>

      <ul className="List">
        <h1>Your Tasks</h1>
        {tasksListItems}
      </ul>
    </main>
  );
}
//TODO: Create an update icon for each task which will send a put request
