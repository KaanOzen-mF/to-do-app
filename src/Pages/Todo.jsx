import React, { useState, useEffect } from "react";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  deleteDoc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import LogoutButton from "../components/Logout";
import InputField from "../components/InputField";
import "../Todo.css";

const categoryOptions = [
  { value: "personal", label: "Personal" },
  { value: "work", label: "Work" },
  // ... other categories ...
];

const priorityOption = [
  { value: "Important", label: "1" },
  { value: "Not Importanan", label: "0" },
  // ... other categories ...
];

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [newTaskDetails, setNewTaskDetails] = useState({
    text: "",
    deadline: "",
    details: "",
    category: "",
    priority: "",
  });
  const [user, setUser] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewTaskDetails((prevState) => ({ ...prevState, [name]: value }));
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        loadTasks(currentUser.uid);
      } else {
        setTasks([]);
      }
    });
    return unsubscribe;
  }, []);

  const loadTasks = async (userId) => {
    const querySnapshot = await getDocs(
      collection(db, "tasks", userId, `${userId} tasks`)
    );
    setTasks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddTask = async () => {
    if (user && newTaskDetails.text.trim() !== "") {
      const taskData = {
        ...newTaskDetails,
        userId: user.uid,
      };

      const docRef = await addDoc(
        collection(db, "tasks", user.uid, "userTasks"),
        taskData
      );

      const newTaskWithId = {
        ...taskData,
        id: docRef.id,
      };

      setTasks([...tasks, newTaskWithId]);

      setNewTaskDetails({
        text: "",
        deadline: "",
        details: "",
        category: "",
        priority: "",
      });
    }
  };

  const handleDelete = async (taskId) => {
    if (user) {
      await deleteDoc(doc(db, "tasks", user.uid, "userTasks", taskId));
      setTasks(tasks.filter((task) => task.id !== taskId));
    }
  };

  return (
    <div className="todo_page">
      <div>
        <div className="todo_page_header">
          <h1>Todo App</h1>

          <LogoutButton />
        </div>
        <div className="todo_page_input_container">
          <InputField
            type="text"
            name="text"
            value={newTaskDetails.text}
            onChange={handleChange}
            placeholder="Add a new task"
            required
          />
          <InputField
            type="date"
            name="deadline"
            value={newTaskDetails.deadline}
            onChange={handleChange}
          />

          <InputField
            type="textarea"
            name="details"
            value={newTaskDetails.details}
            onChange={handleChange}
            placeholder="details"
          />

          <InputField
            type="select"
            name="category"
            value={newTaskDetails.category}
            onChange={handleChange}
            options={categoryOptions}
            placeholder="Select category"
          />

          <InputField
            type="select"
            name="priority"
            value={newTaskDetails.priority}
            onChange={handleChange}
            options={priorityOption}
            placeholder="Select priority"
          />

          <button onClick={handleAddTask}>Add Task</button>
        </div>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <p>{task.id}</p>
              <p>Task: {task.text}</p>
              <p>Deadline: {task.deadline}</p>
              <p>Category: {task.category}</p>
              <p>Details: {task.details}</p>
              <p>Priority: {task.priority}</p>
              <button onClick={() => handleDelete(task.id)}>Delete</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
