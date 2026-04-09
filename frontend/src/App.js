import { useEffect, useState } from "react";
import TaskForm from "./components/TaskForm";
import TaskItem from "./components/TaskItem";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all"); // all | active | completed

  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await fetchTasks();
      setTasks(data);
    } catch (err) {
      setError("Could not load tasks. Is the server running?");
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async (title) => {
    const task = await createTask(title);
    setTasks((prev) => [...prev, task]);
  };

  const handleToggle = async (id, completed) => {
    const updated = await updateTask(id, { completed });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleEdit = async (id, title) => {
    const updated = await updateTask(id, { title });
    setTasks((prev) => prev.map((t) => (t.id === id ? updated : t)));
  };

  const filtered = tasks.filter((t) => {
    if (filter === "active") return !t.completed;
    if (filter === "completed") return t.completed;
    return true;
  });

  const remaining = tasks.filter((t) => !t.completed).length;

  return (
    <div className="app">
      <header>
        <h1>Task Manager</h1>
      </header>

      <main>
        <TaskForm onAdd={handleAdd} />

        {error && <p className="error">{error}</p>}

        {loading ? (
          <p className="status">Loading tasks...</p>
        ) : (
          <>
            <div className="filter-bar">
              <span className="count">{remaining} left</span>
              <div className="filters">
                {["all", "active", "completed"].map((f) => (
                  <button
                    key={f}
                    className={filter === f ? "active" : ""}
                    onClick={() => setFilter(f)}
                  >
                    {f.charAt(0).toUpperCase() + f.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            {filtered.length === 0 ? (
              <p className="status">No tasks here.</p>
            ) : (
              <ul className="task-list">
                {filtered.map((task) => (
                  <TaskItem
                    key={task.id}
                    task={task}
                    onToggle={handleToggle}
                    onDelete={handleDelete}
                    onEdit={handleEdit}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;
