import { Search } from 'lucide-react';

const SearchFilterBar = ({ search, setSearch, status, setStatus }) => {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-4">
      <div className="relative flex-1">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
        />
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name or email..."
          className="w-full border border-slate-300 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="border border-slate-300 rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        <option value="all">All Status</option>
        <option value="new">New</option>
        <option value="contacted">Contacted</option>
        <option value="converted">Converted</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;