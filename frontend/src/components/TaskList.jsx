export default function TaskList({ tasks, onToggle }) {
  return (
    <div className="card">
      <h2>Today Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label>
              <input type="checkbox" checked={task.completed} onChange={() => onToggle(task)} />
              <span>{task.title}</span>
            </label>
            <small>{task.category} · {task.priority}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}
