import { useState } from 'react';

import { API_BASE } from '../config';

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
    <section className="card panel">
      <h3>Goal Planner</h3>
      <form onSubmit={saveGoal}>
        <input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Goal title" />
        <select value={goalType} onChange={(event) => setGoalType(event.target.value)}>
          <option value="short_term">Short Term</option>
          <option value="long_term">Long Term</option>
        </select>
        <button className="primary" type="submit">Save Goal</button>
      </form>
    </section>
  );
}
