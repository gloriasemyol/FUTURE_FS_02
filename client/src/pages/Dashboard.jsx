import { useState, useEffect, useCallback } from 'react';
import { LogOut } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

import StatsCards from '../components/StatsCards';
import SearchFilterBar from '../components/SearchFilterBar';
import LeadsTable from '../components/LeadsTable';
import NotesDrawer from '../components/NotesDrawer';

const Dashboard = () => {
  const { username, logout } = useAuth();
  const navigate = useNavigate();

  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState(null);
  const [loadingLeads, setLoadingLeads] = useState(true);
  const [loadingStats, setLoadingStats] = useState(true);

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('all');
  const [selectedLead, setSelectedLead] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoadingStats(true);
    try {
      const res = await api.get('/leads/stats');
      setStats(res.data);
    } catch (err) {
      toast.error('Failed to load stats.');
    } finally {
      setLoadingStats(false);
    }
  }, []);

  const fetchLeads = useCallback(async () => {
    setLoadingLeads(true);
    try {
      const params = {};
      if (search) params.search = search;
      if (status !== 'all') params.status = status;

      const res = await api.get('/leads', { params });
      setLeads(res.data);
    } catch (err) {
      toast.error('Failed to load leads.');
    } finally {
      setLoadingLeads(false);
    }
  }, [search, status]);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeads();
    }, 400);
    return () => clearTimeout(timer);
  }, [fetchLeads]);

  const handleStatusChange = async (leadId, newStatus) => {
    try {
      await api.patch(`/leads/${leadId}/status`, { status: newStatus });
      toast.success('Status updated!');
      setLeads((prev) =>
        prev.map((l) => (l._id === leadId ? { ...l, status: newStatus } : l))
      );
      fetchStats();
    } catch (err) {
      toast.error('Failed to update status.');
    }
  };

  const handleNoteAdded = (updatedLead) => {
    setLeads((prev) =>
      prev.map((l) => (l._id === updatedLead._id ? updatedLead : l))
    );
    setSelectedLead(updatedLead);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 p-6 md:p-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-purple-700">Mini CRM Dashboard</h1>
          <p className="text-sm text-slate-500">Welcome back, {username}</p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-4 py-2 rounded-lg text-sm font-medium"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>

      <StatsCards stats={stats} loading={loadingStats} />

      <SearchFilterBar
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <LeadsTable
        leads={leads}
        loading={loadingLeads}
        onStatusChange={handleStatusChange}
        onOpenNotes={(lead) => setSelectedLead(lead)}
      />

      {selectedLead && (
        <NotesDrawer
          lead={selectedLead}
          onClose={() => setSelectedLead(null)}
          onNoteAdded={handleNoteAdded}
        />
      )}
    </div>
  );
};

export default Dashboard;