import { Users, CheckCircle, Calendar } from 'lucide-react';

const StatCard = ({ icon: Icon, label, value, gradient }) => (
  <div className={`text-white rounded-xl shadow-lg p-6 ${gradient}`}>
    <Icon className="w-10 h-10 mb-3 opacity-80" />
    <h3 className="text-2xl font-bold">{value}</h3>
    <p className="opacity-80">{label}</p>
  </div>
);

const StatsCards = ({ totalMembers, totalCheckins, filteredCount }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
    <StatCard
      icon={Users}
      label="Total Members"
      value={totalMembers}
      gradient="bg-gradient-to-br from-blue-500 to-blue-600"
    />
    <StatCard
      icon={CheckCircle}
      label="Total Check-ins"
      value={totalCheckins}
      gradient="bg-gradient-to-br from-emerald-500 to-emerald-600"
    />
    <StatCard
      icon={Calendar}
      label="Filtered Records"
      value={filteredCount}
      gradient="bg-gradient-to-br from-purple-500 to-purple-600"
    />
  </div>
);

export default StatsCards;
