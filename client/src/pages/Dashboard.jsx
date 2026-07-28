import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { token, logout } = useAuth();
  const [leads, setLeads] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/leads', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch leads');
        }

        setLeads(data.leads);
      } catch (err) {
        setError(err.message);
        if (err.message.includes('token') || err.message.includes('denied')) {
          logout();
          navigate('/login', { replace: true });
        }
      }
    };

    if (token) {
      fetchLeads();
    }
  }, [token, logout, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/login', { replace: true });
  };

  return (
    <div style={{ maxWidth: '600px', margin: '50px auto', padding: '20px', border: '1px solid #ccc' }}>
      <h2>Leads Dashboard</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      
      <h3>Lead Records</h3>
      <ul>
        {leads.map((lead) => (
          <li key={lead.id}>
            <strong>{lead.name}</strong> - {lead.email} ({lead.status})
          </li>
        ))}
      </ul>

      <button onClick={handleLogout} style={{ marginTop: '20px', padding: '10px 15px', cursor: 'pointer' }}>
        Log Out
      </button>
    </div>
  );
};

export default Dashboard;