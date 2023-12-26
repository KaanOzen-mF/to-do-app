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
      collection(db, "tasks", userId, "userTasks")
    );
    setTasks(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
  };

  const handleAddTask = async () => {
    if (user && newTaskDetails.text.trim() !== "") {
      const taskData = {
        ...newTaskDetails,
        userId: user.uid,
      };
      await addDoc(collection(db, "tasks", user.uid, "userTasks"), taskData);
      setTasks([...tasks, { ...taskData }]);
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
    <>
      <div>
        <h1>Todo App</h1>
        <InputField
          type="text"
          name="text"
          value={newTaskDetails.text}
          onChange={handleChange}
          placeholder="Add a new task"
        />
        <InputField
          type="date"
          name="deadline"
          value={newTaskDetails.deadline}
          onChange={handleChange}
        />

        <InputField
          type="text"
          name="category"
          value={newTaskDetails.category}
          onChange={handleChange}
          placeholder="category"
        />
        <InputField
          type="text"
          name="details"
          value={newTaskDetails.details}
          onChange={handleChange}
          placeholder="details"
        />

        <InputField
          type="text"
          name="priority"
          value={newTaskDetails.priority}
          onChange={handleChange}
          placeholder="priority"
        />

        <button onClick={handleAddTask}>Add Task</button>

        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
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
      <LogoutButton />
    </>
  );
}
