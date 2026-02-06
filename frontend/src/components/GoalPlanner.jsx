import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function GoalPlanner() {
  const [title, setTitle] = useState('');
  const [goalType, setGoalType] = useState('short_term');

  const saveGoal = async (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    await fetch(`${API_BASE}/goals/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, goal_type: goalType, progress: 0, plan: 'Milestones to be refined.' }),
    });
    setTitle('');
  };

  return (
    <section className="card">
      <h2>Goal Planner (short + long term)</h2>
      <form onSubmit={saveGoal}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Goal title" />
        <select value={goalType} onChange={(event) => setGoalType(event.target.value)}>
          <option value="short_term">Short Term</option>
          <option value="long_term">Long Term</option>
        </select>
        <button type="submit">Save Goal</button>
      </form>
    </section>
  );
}
