import { useState } from 'react';

import { API_BASE } from '../config';

export default function KnowledgeStudio() {
  const [noteTitle, setNoteTitle] = useState('');
  const [noteContent, setNoteContent] = useState('');
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(null);

  const createNote = async (event) => {
    event.preventDefault();
    if (!noteTitle.trim() || !noteContent.trim()) return;
    await fetch(`${API_BASE}/notes/`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: noteTitle, content: noteContent, tags: 'idea' }),
    });
    setNoteTitle('');
    setNoteContent('');
  };

  const runSearch = async () => {
    const response = await fetch(`${API_BASE}/search/?q=${encodeURIComponent(query)}`);
    setResults(await response.json());
  };

  return (
    <section className="card panel">
      <h3>Knowledge Studio</h3>
      <form onSubmit={createNote}>
        <input value={noteTitle} onChange={(event) => setNoteTitle(event.target.value)} placeholder="Note title" />
        <textarea value={noteContent} onChange={(event) => setNoteContent(event.target.value)} placeholder="Capture ideas and references..." rows={4} />
        <button className="primary" type="submit">Save Note</button>
      </form>
      <div className="search-row">
        <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tasks, notes, goals..." />
        <button onClick={runSearch}>Search</button>
      </div>
      {results && <pre>{JSON.stringify(results, null, 2)}</pre>}
    </section>
  );
}
