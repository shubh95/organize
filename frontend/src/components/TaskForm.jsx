import { useState } from 'react';

export default function TaskForm({ onSubmit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('work');
  const [priority, setPriority] = useState('medium');

  const submit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit({ title, description, category, priority, estimated_minutes: 30 });
    setTitle('');
    setDescription('');
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>Add Task</h2>
      <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Task title" />
      <textarea value={description} onChange={(event) => setDescription(event.target.value)} rows={3} placeholder="Task details" />
      <select value={category} onChange={(event) => setCategory(event.target.value)}>
        <option value="work">Work</option>
        <option value="health">Health</option>
        <option value="learning">Learning</option>
      </select>
      <select value={priority} onChange={(event) => setPriority(event.target.value)}>
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <button type="submit">Create</button>
    </form>
  );
}
