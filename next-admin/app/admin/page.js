"use client";
import { useEffect, useState } from 'react';

const sections = [
  { id: 'current-selection', label: 'Current Selection' },
  { id: 'events', label: 'Events' },
  { id: 'resources', label: 'Resources' },
  { id: 'membership', label: 'Membership' },
  { id: 'about', label: 'About' },
  { id: 'author-program', label: 'Author Program' },
  { id: 'trust', label: 'Trust & Standards' },
  { id: 'faqs', label: 'FAQs' },
  { id: 'testimonials', label: 'Testimonials' },
  { id: 'globals', label: 'Globals' },
];

export default function AdminPage() {
  const [authChecked, setAuthChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [currentSection, setCurrentSection] = useState(sections[0].id);
  const [content, setContent] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/admin/me')
      .then((res) => {
        if (res.ok) setAuthenticated(true);
      })
      .finally(() => setAuthChecked(true));
  }, []);

  useEffect(() => {
    if (!authenticated) return;
    setLoading(true);
    fetch(`/api/admin/content/${currentSection}`)
      .then((res) => res.json())
      .then((data) => setContent(data.data || {}))
      .finally(() => setLoading(false));
  }, [authenticated, currentSection]);

  const handleLogin = async () => {
    setLoading(true);
    setMessage('');
    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    });
    if (res.ok) {
      setAuthenticated(true);
      setPassword('');
    } else {
      setMessage('Invalid password');
    }
    setLoading(false);
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage('');
    const res = await fetch(`/api/admin/content/${currentSection}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(content),
    });
    if (res.ok) {
      setMessage('Saved successfully');
      await fetch('/api/admin/revalidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ paths: ['/', '/current-selection', '/events', '/resources', '/authors'] }),
      });
    } else {
      setMessage('Save failed');
    }
    setLoading(false);
  };

  if (!authChecked) return null;

  if (!authenticated) {
    return (
      <main style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'white', border: '1px solid #E8E6DC', borderRadius: '16px', padding: '24px', boxShadow: '0 12px 24px rgba(0,0,0,0.06)', width: '100%', maxWidth: '420px' }}>
          <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '12px', color: '#2C2B28', margin: 0 }}>Admin Login</p>
          <h1 style={{ margin: '8px 0 12px 0', fontFamily: 'Playfair Display, Georgia, serif' }}>Elivate</h1>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #E8E6DC', marginBottom: '12px' }}
          />
          <button onClick={handleLogin} disabled={loading} style={{ width: '100%', padding: '12px', borderRadius: '10px', background: '#1E3A5F', color: 'white', border: 'none', fontWeight: 600 }}>
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
          {message && <p style={{ marginTop: '8px', color: '#8B2635' }}>{message}</p>}
        </div>
      </main>
    );
  }

  return (
    <main style={{ minHeight: '100vh', display: 'flex', background: '#F7F3E9' }}>
      <aside style={{ width: '260px', borderRight: '1px solid #E8E6DC', padding: '16px', background: '#fff' }}>
        <p style={{ textTransform: 'uppercase', letterSpacing: '0.2em', fontSize: '11px', color: '#2C2B28' }}>Sections</p>
        <div style={{ display: 'grid', gap: '8px' }}>
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => setCurrentSection(s.id)}
              style={{
                textAlign: 'left',
                padding: '10px 12px',
                borderRadius: '10px',
                border: currentSection === s.id ? '1px solid #1E3A5F' : '1px solid #E8E6DC',
                background: currentSection === s.id ? '#E8E6DC' : '#fff',
                cursor: 'pointer',
              }}
            >
              {s.label}
            </button>
          ))}
        </div>
      </aside>
      <section style={{ flex: 1, padding: '20px', overflow: 'auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
          <h2 style={{ margin: 0, fontFamily: 'Playfair Display, Georgia, serif' }}>Editing: {sections.find((s) => s.id === currentSection)?.label}</h2>
          <button onClick={handleSave} disabled={loading} style={{ padding: '10px 14px', borderRadius: '10px', background: '#1E3A5F', color: 'white', border: 'none', fontWeight: 600 }}>
            {loading ? 'Saving…' : 'Save & Revalidate'}
          </button>
        </div>
        <p style={{ color: '#2C2B28', fontSize: '13px' }}>Edit JSON for this section. Structure should follow the frontend expectations.</p>
        <textarea
          value={JSON.stringify(content, null, 2)}
          onChange={(e) => {
            try {
              const parsed = JSON.parse(e.target.value);
              setContent(parsed);
              setMessage('');
            } catch (err) {
              setMessage('Invalid JSON');
            }
          }}
          style={{ width: '100%', minHeight: '60vh', padding: '12px', borderRadius: '12px', border: '1px solid #E8E6DC', fontFamily: 'Menlo, monospace', fontSize: '13px' }}
        />
        {message && <p style={{ marginTop: '8px', color: message.includes('Invalid') ? '#8B2635' : '#2C2B28' }}>{message}</p>}
      </section>
    </main>
  );
}
