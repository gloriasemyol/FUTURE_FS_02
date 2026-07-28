import { Search, Plus } from 'lucide-react';

const SearchFilterBar = ({ search, setSearch, status, setStatus, onOpenAddModal }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-6 items-center">
      <div className="relative flex-1 w-full">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white"
        />
      </div>

      <div className="flex gap-3 w-full sm:w-auto">
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white flex-1 sm:flex-none"
        >
          <option value="all">All Status</option>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Converted">Converted</option>
        </select>

        <button
          onClick={onOpenAddModal}
          className="flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap"
        >
          <Plus size={18} />
          Add Lead
        </button>
      </div>
    </div>
  );
};

export default SearchFilterBar;