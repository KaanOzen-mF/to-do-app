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

const categoryOptions = [
  { value: "👤 Personal", label: "👤 Personal" },
  { value: "💼 Work", label: "💼 Work" },
  { value: "💪 Health", label: "💪 Health" },
  { value: "🛍️ Shopping", label: "🛍️ Shopping" },
  { value: "💰 Finance", label: "💰 Finance" },
  { value: "📚 Education", label: "📚 Education" },
  { value: "🏠 Home", label: "🏠 Home" },
  { value: "🎉 Entertainment", label: "🎉 Entertainment" },
  { value: "✈️ Travel", label: "✈️ Travel" },
  { value: "🔖 Other", label: "🔖 Other" },
];

const priorityOptions = [
  { value: "High", label: "High Priority", color: "#FF6347" }, // Tomato red for high urgency
  { value: "Medium", label: "Medium Priority", color: "#FFD700" }, // Gold for medium importance
  { value: "Low", label: "Low Priority", color: "#90EE90" }, // Light green for lower urgency
  { value: "None", label: "No Priority", color: "#D3D3D3" }, // Light grey for no urgency
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

  const getPriorityColor = (priorityValue) => {
    const priorityObj = priorityOptions.find(
      (option) => option.value === priorityValue
    );
    return priorityObj ? priorityObj.color : "#000"; // default to black if not found
  };

  return (
    <div className="todo">
      <div className="todo_page">
        <div className="todo_page_header">
          <h1>Todo App</h1>

          <LogoutButton />
        </div>
        <div className="todo_page_input_container">
          <div className="todo_page_task_date_container">
            <InputField
              type="text"
              name="text"
              value={newTaskDetails.text}
              onChange={handleChange}
              placeholder="Add a new task"
              className="todo_text_input"
            />
            <InputField
              type="date"
              name="deadline"
              value={newTaskDetails.deadline}
              onChange={handleChange}
              className="todo_date_input"
            />
          </div>

          <InputField
            type="textarea"
            name="details"
            value={newTaskDetails.details}
            onChange={handleChange}
            placeholder="Details"
            className="todo_details_input"
          />

          <div className="todo_page_select_container">
            <InputField
              type="select"
              name="category"
              value={newTaskDetails.category}
              onChange={handleChange}
              options={categoryOptions}
              placeholder="Select category"
              className="select_btn"
            />

            <InputField
              type="select"
              name="priority"
              value={newTaskDetails.priority}
              onChange={handleChange}
              options={priorityOptions}
              placeholder="Select priority"
              className="select_btn"
            />
          </div>

          <button onClick={handleAddTask} className="add_task_btn">
            Add Task
          </button>

          <hr />
        </div>
        <div className="todo_card_container">
          <ul>
            {tasks.map((task) => (
              <div className="todo_card">
                <li key={task.id}>
                  <p>Task: {task.text}</p>
                  <p>Deadline: {task.deadline}</p>
                  <p>Category: {task.category}</p>
                  <p>Details: {task.details}</p>
                  <p style={{ color: getPriorityColor(task.priority) }}>
                    Priority: {task.priority}
                  </p>
                  <button
                    onClick={() => handleDelete(task.id)}
                    className="todo_delete_btn"
                  >
                    Delete
                  </button>
                </li>
              </div>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
