// Simple in-memory store. Would swap this for a DB in production.
let tasks = [];

module.exports = {
  getAll: () => tasks,

  getById: (id) => tasks.find((t) => t.id === id),

  create: (task) => {
    tasks.push(task);
    return task;
  },

  update: (id, changes) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return null;
    tasks[index] = { ...tasks[index], ...changes };
    return tasks[index];
  },

  remove: (id) => {
    const index = tasks.findIndex((t) => t.id === id);
    if (index === -1) return false;
    tasks.splice(index, 1);
    return true;
  },
};
