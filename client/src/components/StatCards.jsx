const StatsCards = ({ stats, loading }) => {
  const cards = [
    { label: 'Total Leads', value: stats?.total ?? 0, color: 'text-purple-700' },
    { label: 'New', value: stats?.new ?? 0, color: 'text-blue-600' },
    { label: 'Contacted', value: stats?.contacted ?? 0, color: 'text-yellow-600' },
    { label: 'Converted', value: stats?.converted ?? 0, color: 'text-green-600' },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
      {cards.map((card) => (
        <div
          key={card.label}
          className="bg-white rounded-xl shadow p-5 border border-slate-100"
        >
          <p className="text-sm text-slate-500 mb-1">{card.label}</p>
          {loading ? (
            <div className="h-8 w-16 bg-slate-200 rounded animate-pulse" />
          ) : (
            <p className={`text-3xl font-bold ${card.color}`}>{card.value}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default StatsCards;