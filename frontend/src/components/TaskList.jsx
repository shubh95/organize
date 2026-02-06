export default function TaskList({ tasks, onToggle }) {
  return (
    <div className="card panel">
      <h3>Today Tasks</h3>
      <ul className="task-list">
        {tasks.map((task) => (
          <li key={task.id} className={task.completed ? 'done' : ''}>
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
