import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightPanel from './components/InsightPanel';
import GoalPlanner from './components/GoalPlanner';
import KnowledgeStudio from './components/KnowledgeStudio';

import { API_BASE } from './config';

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [wallet, setWallet] = useState('');

  const loadTasks = async () => {
    const response = await fetch(`${API_BASE}/tasks/`);
    const data = await response.json();
    setTasks(data);
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addTask = async (payload) => {
    await fetch(`${API_BASE}/tasks/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
    loadTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`${API_BASE}/tasks/${task.id}/`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !task.completed }),
    });
    loadTasks();
  };

  const connectWallet = async () => {
    if (!window.ethereum) return;
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    setWallet(await signer.getAddress());
  };

  const completed = tasks.filter((task) => task.completed).length;
  const pending = tasks.length - completed;
  const completionRate = tasks.length ? Math.round((completed / tasks.length) * 100) : 0;

  return (
    <main className="app-shell">
      <aside className="sidebar">
        <h1>OrganizeAI</h1>
        <p>Plan • Think • Connect • Execute</p>
        <div className="pill">Web + Android + Extension Ready</div>
      </aside>

      <section className="main-content">
        <header className="topbar card">
          <div>
            <h2>Daily Organizer AI + dApp</h2>
            <p>Design inspired by modern productivity workspaces.</p>
          </div>
          <button className="primary" onClick={connectWallet}>
            {wallet ? `Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}
          </button>
        </header>

        <section className="stats-grid">
          <article className="card stat">
            <span>Total Tasks</span>
            <strong>{tasks.length}</strong>
          </article>
          <article className="card stat">
            <span>Completed</span>
            <strong>{completed}</strong>
          </article>
          <article className="card stat">
            <span>Pending</span>
            <strong>{pending}</strong>
          </article>
          <article className="card stat">
            <span>Progress</span>
            <strong>{completionRate}%</strong>
          </article>
        </section>

        <section className="grid two-col">
          <TaskForm onSubmit={addTask} />
          <TaskList tasks={tasks} onToggle={toggleTask} />
        </section>

        <section className="grid two-col">
          <GoalPlanner />
          <KnowledgeStudio />
        </section>

        <InsightPanel />
      </section>
    </main>
  );
}
