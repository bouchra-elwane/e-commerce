import { useState } from "react";
import { FaPlus, FaTrash, FaClipboardList, FaCheck } from "react-icons/fa";

const TaskManager = () => {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleAddTask = () => {
    if (title.trim() === "") return;
    const newTask = {
      id: Date.now(),
      title,
      description,
      completed: false,
    };
    setTasks([...tasks, newTask]);
    setTitle("");
    setDescription("");
  };

  const handleDelete = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-5 flex items-center gap-2">
        <span className="text-indigo-600"><FaClipboardList /></span> Task Manager
      </h1>

      {/* Add Task Form */}
      <div className="bg-white shadow-2xl rounded-xl px-6 py-8 mb-6">
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-800">Task Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter task title"
            className="w-full border border-transparent rounded px-4 py-2 focus:outline-none focus:border-black-500 focus:ring-1 focus:ring-black-300 transition"
          />
        </div>
        <div className="mb-4">
          <label className="block font-semibold mb-1 text-gray-800">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter task description"
            className="w-full border border-transparent rounded px-4 py-2 focus:outline-none focus:border-black-500 focus:ring-1 focus:ring-black-300 transition"
          />
        </div>
        <button
          onClick={handleAddTask}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          <FaPlus /> Add Task
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center justify-between text-center mb-15">
        <h2 className="text-xl font-semibold text-gray-800">Task</h2>
        <div className="flex gap-2">
          {["all", "completed", "incomplete"].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-4 py-2 rounded-full border transition ${
                filter === status
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>

      {/* Task List */}
      <div>
        {filteredTasks.length === 0 ? (
          <p className="flex justify-center text-gray-500 py-10">No tasks found</p>
        ) : (
          filteredTasks.map((task) => (
            <div
              key={task.id}
              className="flex justify-between items-start bg-white rounded-xl shadow p-4 mb-4"
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => handleToggleComplete(task.id)}
                  className={`mt-1 text-green-500 hover:text-green-700 transition ${
                    task.completed ? "opacity-100" : "opacity-40"
                  }`}
                  title="Toggle Complete"
                >
                  <FaCheck />
                </button>
                <div>
                  <h2 className={`font-semibold text-lg ${task.completed ? "line-through text-green-600" : ""}`}>
                    {task.title}
                  </h2>
                  <p className="text-gray-600">{task.description}</p>
                </div>
              </div>
              <button
                onClick={() => handleDelete(task.id)}
                className="text-red-500 hover:text-red-700 transition"
              >
                <FaTrash />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TaskManager;
