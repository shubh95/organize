import { useState } from 'react';

import { API_BASE } from '../config';

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
    <section className="card panel">
      <h3>Analysis & Insights</h3>
      <div className="actions">
        <button onClick={loadOverview}>Daily Analytics</button>
        <button onClick={loadAi}>AI Advice</button>
        <button onClick={loadPeriodic}>Weekly + Progress</button>
      </div>
      {overview && <pre>{JSON.stringify(overview, null, 2)}</pre>}
      {ai && <pre>{JSON.stringify(ai, null, 2)}</pre>}
      {periodic && <pre>{JSON.stringify(periodic, null, 2)}</pre>}
    </section>
  );
}
