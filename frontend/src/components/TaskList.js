import axios from "axios";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { FaCheckDouble, FaEdit, FaRegTrashAlt } from "react-icons/fa";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editing, setEditing] = useState(false);
  const [id, setId] = useState();
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    getTasks();
  }, []);

  const getTasks = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/tasks");
      setTasks(response.data);
      updateCompletedTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const updateCompletedTasks = (tasks) => {
    const completed = tasks.filter((task) => task.Completed);
    setCompletedTasks(completed);
  };

  const enterTask = async (value) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/tasks",
        value
      );
      console.log(response.data);
      getTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const response = await axios.delete(
        `http://localhost:5000/api/tasks/${taskId}`
      );
      console.log(response.data);
      getTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const updateTask = async (value, taskId) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        value
      );
      console.log(response.data);
      setEditing(false);
      getTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const setToComplete = async (task) => {
    const updatedTask = { ...task, Completed: true };
    updateTask(updatedTask, task._id);
  };

  const getSingleTask = (task) => {
    formik.setValues({ name: task.name, Completed: task.Completed });
    setEditing(true);
    setId(task._id);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      Completed: false,
    },
    onSubmit: () => {
      if (editing) {
        updateTask(formik.values, id);
      } else {
        enterTask(formik.values);
      }
    },
  });

  return (
    <>
      <h2>Task Manager</h2>
      <form className="task-form" onSubmit={formik.handleSubmit}>
        <label className="--form-control label" htmlFor="name">
          Task Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        <button type="submit">{editing ? "Edit" : "Add"}</button>
      </form>
      <div className="--flex-between --pd">
        <p>
          <b>Total Tasks: </b> {tasks.length}
        </p>
        <p>
          <b>Completed Tasks: </b> {completedTasks.length}
        </p>
      </div>
      <hr />
      {tasks.map((task, index) => (
        <div
          key={task._id}
          className={task.Completed ? "task completed" : "task"}
        >
          <p>
            <b>{index + 1} </b> {task.name}
          </p>
          <div className="task-icons">
            <FaCheckDouble onClick={() => setToComplete(task)} color="green" />
            <FaEdit onClick={() => getSingleTask(task)} color="purple" />
            <FaRegTrashAlt onClick={() => deleteTask(task._id)} color="red" />
          </div>
        </div>
      ))}
    </>
  );
};

export default TaskList;
