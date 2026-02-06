import { useState } from 'react';

const API_BASE = 'http://127.0.0.1:8000/api';

export default function InsightPanel() {
  const [overview, setOverview] = useState(null);
  const [ai, setAi] = useState(null);
  const [periodic, setPeriodic] = useState(null);

  const loadOverview = async () => {
    const response = await fetch(`${API_BASE}/analysis/overview/`);
    setOverview(await response.json());
  };

  const loadAi = async () => {
    const response = await fetch(`${API_BASE}/analysis/ai-insights/`, { method: 'POST' });
    setAi(await response.json());
  };

  const loadPeriodic = async () => {
    const response = await fetch(`${API_BASE}/analysis/periodic-insights/`);
    setPeriodic(await response.json());
  };

  return (
    <section className="card">
      <h2>Analysis & Insights</h2>
      <div className="actions">
        <button onClick={loadOverview}>Daily Analytics</button>
        <button onClick={loadAi}>AI Advice</button>
      </div>
      <button style={{ marginTop: '0.75rem' }} onClick={loadPeriodic}>Weekly + Progress Report</button>
      {overview && <pre>{JSON.stringify(overview, null, 2)}</pre>}
      {ai && <pre>{JSON.stringify(ai, null, 2)}</pre>}
      {periodic && <pre>{JSON.stringify(periodic, null, 2)}</pre>}
    </section>
  );
}
