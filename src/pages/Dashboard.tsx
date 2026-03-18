import { Users, UserCheck, UserMinus, ArrowUpRight } from "lucide-react";

interface DashboardProps {
  employeeCount: number;
  presentToday?: number;
  onLeave?: number;
}

interface Stat {
  label: string;
  value: number;
  icon: React.ReactNode;
  color: string;
  bg: string;
}

export default function Dashboard({ employeeCount, presentToday = 0, onLeave = 0 }: DashboardProps) {
  const stats: Stat[] = [
    { label: "Total Employees", value: employeeCount, icon: <Users size={24} />, color: "text-blue-600", bg: "bg-blue-50" },
    { label: "Present Today", value: presentToday, icon: <UserCheck size={24} />, color: "text-emerald-600", bg: "bg-emerald-50" },
    { label: "On Leave", value: onLeave, icon: <UserMinus size={24} />, color: "text-rose-600", bg: "bg-rose-50" },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition"
          >
            <div className="flex items-center gap-5">
              <div className={`w-14 h-14 ${stat.bg} ${stat.color} rounded-2xl flex items-center justify-center`}>
                {stat.icon}
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500 uppercase">{stat.label}</p>
                <h3 className="text-3xl font-bold text-gray-800 mt-1">{stat.value}</h3>
              </div>
            </div>
            <ArrowUpRight className="text-gray-300 transition-colors" size={20} />
          </div>
        ))}
      </div>

      {/* Banner */}
      <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-3xl p-10 text-white shadow-xl relative overflow-hidden">
        <h2 className="text-3xl font-bold mb-2">HR Intelligence Platform</h2>
        <p className="text-gray-300 max-w-lg mb-6">
          Access real-time workforce analytics and management tools from a single unified interface.
        </p>
        <div className="flex gap-4 flex-wrap">
          <button className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-bold transition">
            Generate Report
          </button>
          <button className="bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl font-bold transition backdrop-blur-md">
            View Logs
          </button>
        </div>
        <div className="absolute right-[-5%] bottom-[-20%] w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}