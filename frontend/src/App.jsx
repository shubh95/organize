import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import InsightPanel from './components/InsightPanel';
import GoalPlanner from './components/GoalPlanner';
import KnowledgeStudio from './components/KnowledgeStudio';

const API_BASE = 'http://127.0.0.1:8000/api';

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

  return (
    <main className="container">
      <header>
        <h1>Daily Organizer AI + dApp</h1>
        <button onClick={connectWallet}>
          {wallet ? `Wallet: ${wallet.slice(0, 6)}...${wallet.slice(-4)}` : 'Connect Wallet'}
        </button>
      </header>
      <section className="grid">
        <TaskForm onSubmit={addTask} />
        <TaskList tasks={tasks} onToggle={toggleTask} />
      </section>
      <section className="grid">
        <GoalPlanner />
        <KnowledgeStudio />
      </section>
      <InsightPanel />
      <section className="card">
        <h2>Publish Targets</h2>
        <ul>
          <li>Web App: React + Django deployment</li>
          <li>Google Extension: reuse React with extension manifest wrapper</li>
          <li>Android App: React Native client using same API contracts</li>
        </ul>
      </section>
    </main>
  );
}
