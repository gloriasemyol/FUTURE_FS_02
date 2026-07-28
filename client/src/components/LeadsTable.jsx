import { MessageSquarePlus } from 'lucide-react';
import StatusBadge from './StatusBadge';

const statusOptions = ['new', 'contacted', 'converted'];

const LeadsTable = ({ leads, loading, onStatusChange, onOpenNotes }) => {
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow p-6">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-12 bg-slate-100 rounded animate-pulse mb-3" />
        ))}
      </div>
    );
  }

  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow p-10 text-center text-slate-400">
        No leads found. Try adjusting your search or filter.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 text-left text-slate-500">
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Source</th>
            <th className="p-4">Status</th>
            <th className="p-4">Received</th>
            <th className="p-4">Notes</th>
          </tr>
        </thead>
        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b border-slate-50 hover:bg-slate-50">
              <td className="p-4 font-medium text-slate-800">{lead.name}</td>
              <td className="p-4 text-slate-600">{lead.email}</td>
              <td className="p-4 text-slate-600">{lead.source}</td>
              <td className="p-4">
                <div className="flex items-center gap-2">
                  <StatusBadge status={lead.status} />
                  <select
                    value={lead.status}
                    onChange={(e) => onStatusChange(lead._id, e.target.value)}
                    className="text-xs border border-slate-200 rounded px-1 py-0.5 focus:outline-none"
                  >
                    {statusOptions.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
              <td className="p-4 text-slate-500">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="p-4">
                <button
                  onClick={() => onOpenNotes(lead)}
                  className="flex items-center gap-1 text-purple-600 hover:text-purple-800 text-xs font-medium"
                >
                  <MessageSquarePlus size={16} />
                  {lead.notes?.length || 0}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadsTable;