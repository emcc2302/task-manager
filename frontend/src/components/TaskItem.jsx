import { useState } from "react";

function TaskItem({ task, onToggle, onDelete, onEdit }) {
  const [editing, setEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(task.title);
  const [loading, setLoading] = useState(false);

  const handleEdit = async () => {
    if (!editTitle.trim() || editTitle.trim() === task.title) {
      setEditing(false);
      setEditTitle(task.title);
      return;
    }
    setLoading(true);
    try {
      await onEdit(task.id, editTitle.trim());
      setEditing(false);
    } catch {
      setEditTitle(task.title);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") handleEdit();
    if (e.key === "Escape") {
      setEditing(false);
      setEditTitle(task.title);
    }
  };

  return (
    <li className={`task-item ${task.completed ? "completed" : ""}`}>
      <input
        type="checkbox"
        checked={task.completed}
        onChange={() => onToggle(task.id, !task.completed)}
      />

      {editing ? (
        <input
          className="edit-input"
          value={editTitle}
          onChange={(e) => setEditTitle(e.target.value)}
          onBlur={handleEdit}
          onKeyDown={handleKeyDown}
          autoFocus
          disabled={loading}
        />
      ) : (
        <span className="task-title" onDoubleClick={() => setEditing(true)}>
          {task.title}
        </span>
      )}

      <div className="task-actions">
        {!editing && (
          <button
            className="btn-edit"
            onClick={() => setEditing(true)}
            title="Edit task"
          >
            Edit
          </button>
        )}
        <button
          className="btn-delete"
          onClick={() => onDelete(task.id)}
          title="Delete task"
        >
          Delete
        </button>
      </div>
    </li>
  );
}

export default TaskItem;
