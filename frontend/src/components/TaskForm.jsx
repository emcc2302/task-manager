import { useState } from "react";

function TaskForm({ onAdd }) {
  const [title, setTitle] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setLoading(true);
    setError("");
    try {
      await onAdd(title.trim());
      setTitle("");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="task-form">
      <input
        type="text"
        placeholder="What needs to be done?"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={loading}
        maxLength={200}
      />
      <button type="submit" disabled={loading || !title.trim()}>
        {loading ? "Adding..." : "Add"}
      </button>
      {error && <p className="error">{error}</p>}
    </form>
  );
}

export default TaskForm;
