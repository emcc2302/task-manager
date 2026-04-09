const BASE_URL = "/tasks";

export async function fetchTasks() {
  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to load tasks.");
  return res.json();
}

export async function createTask(title) {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title }),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to create task.");
  }
  return res.json();
}

export async function updateTask(id, changes) {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(changes),
  });
  if (!res.ok) {
    const data = await res.json();
    throw new Error(data.error || "Failed to update task.");
  }
  return res.json();
}

export async function deleteTask(id) {
  const res = await fetch(`${BASE_URL}/${id}`, { method: "DELETE" });
  if (!res.ok) throw new Error("Failed to delete task.");
}
