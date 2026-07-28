import { useState } from 'react';
import { X, Send } from 'lucide-react';
import toast from 'react-hot-toast';
import api from '../api/axios';

const NotesDrawer = ({ lead, onClose, onNoteAdded }) => {
  const [noteText, setNoteText] = useState('');
  const [submitting, setSubmitting] = useState(false);

  if (!lead) return null;

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!noteText.trim()) return;

    setSubmitting(true);
    try {
      const res = await api.post(`/leads/${lead._id}/notes`, { text: noteText });
      toast.success('Note added!');
      setNoteText('');
      onNoteAdded(res.data.lead);
    } catch (err) {
      toast.error('Failed to add note.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex justify-end z-50">
      <div className="bg-white w-full max-w-md h-full shadow-xl p-6 overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="text-lg font-bold text-slate-800">{lead.name}</h2>
            <p className="text-sm text-slate-500">{lead.email}</p>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-700">
            <X size={22} />
          </button>
        </div>

        <h3 className="text-sm font-semibold text-slate-600 mb-2">
          Follow-up Notes
        </h3>

        <div className="space-y-3 mb-6">
          {lead.notes && lead.notes.length > 0 ? (
            [...lead.notes]
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map((note, idx) => (
                <div
                  key={idx}
                  className="bg-slate-50 border border-slate-100 rounded-lg p-3"
                >
                  <p className="text-sm text-slate-700">{note.text}</p>
                  <p className="text-xs text-slate-400 mt-1">
                    {new Date(note.date).toLocaleString()}
                  </p>
                </div>
              ))
          ) : (
            <p className="text-sm text-slate-400 italic">No notes yet.</p>
          )}
        </div>

        <form onSubmit={handleAddNote} className="flex gap-2">
          <input
            type="text"
            value={noteText}
            onChange={(e) => setNoteText(e.target.value)}
            placeholder="Add a follow-up note..."
            className="flex-1 border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="bg-purple-600 hover:bg-purple-700 text-white px-3 rounded-lg disabled:opacity-50"
          >
            <Send size={18} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default NotesDrawer;