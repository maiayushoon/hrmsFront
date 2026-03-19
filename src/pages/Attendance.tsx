import { useState, useEffect } from "react";
import { CheckCircle2 } from "lucide-react";
import API from "../api/api";
import type { Attendance, Employee } from "../types/types";

export default function AttendancePage() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [summary, setSummary] = useState<AttendanceSummary[]>([]);
  const [form, setForm] = useState<Attendance>({
    employeeId: "",
    date: new Date().toISOString().split("T")[0],
    status: "Present",
  });
  const [filterDates, setFilterDates] = useState({ start: "", end: "" });

  interface AttendanceSummary {
    employeeId: string;
    present: number;
    absent: number;
  }

  const fetchData = async () => {
    try {
      const [empRes, sumRes] = await Promise.all([
        API.get("/employees"),
        API.get("/attendance_summary"),
      ]);
      setEmployees(empRes.data);
      setSummary(sumRes.data);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to fetch data");
    }
  };

  const handleAdd = async () => {
    if (!form.employeeId) return alert("Select an employee");
    try {
      await API.post("/attendance", form);
      setForm({ ...form, employeeId: "" });
      fetchData();
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to log attendance");
    }
  };

  const handleFilter = async () => {
    if (!filterDates.start && !filterDates.end) return alert("Select start or end date");
    try {
      const res = await API.get("/attendance_summary", {
        params: { start_date: filterDates.start, end_date: filterDates.end },
      });
      setSummary(res.data);
    } catch (err: any) {
      alert(err.response?.data?.detail || "Failed to fetch summary");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="space-y-8">
      {/* Attendance Form */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 bg-emerald-50 rounded-lg text-emerald-600">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-lg font-semibold text-gray-800">Mark Attendance</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <select
            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.employeeId}
            onChange={(e) => setForm({ ...form, employeeId: e.target.value })}
          >
            <option value="">Select Employee</option>
            {employees.map((e) => (
              <option key={e.employeeId} value={e.employeeId}>
                {e.fullName}
              </option>
            ))}
          </select>

          <input
            type="date"
            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
          />

          <select
            className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={form.status}
            onChange={(e) =>
              setForm({ ...form, status: e.target.value.toLowerCase() as "Present" | "Absent" })
            }
          >
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
          </select>
        </div>

        <button
          onClick={handleAdd}
          className="mt-6 flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition"
        >
          <CheckCircle2 size={18} /> Log Attendance
        </button>
      </div>

      {/* Attendance Summary Filter */}
      <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md flex flex-col md:flex-row gap-4 items-end">
        <div className="flex flex-col flex-1">
          <label className="text-xs font-semibold text-gray-500 mb-1">Start Date</label>
          <input
            type="date"
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={filterDates.start}
            onChange={(e) => setFilterDates({ ...filterDates, start: e.target.value })}
          />
        </div>
        <div className="flex flex-col flex-1">
          <label className="text-xs font-semibold text-gray-500 mb-1">End Date</label>
          <input
            type="date"
            className="p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition"
            value={filterDates.end}
            onChange={(e) => setFilterDates({ ...filterDates, end: e.target.value })}
          />
        </div>
        <button
          onClick={handleFilter}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold transition"
        >
          Filter
        </button>
      </div>

      {/* Attendance Summary Table */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-x-auto">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
            <tr>
              <th className="px-6 py-3">Employee</th>
              <th className="px-6 py-3">Present Days</th>
              <th className="px-6 py-3">Absent Days</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-sm">
            {summary.map((s) => {
              const emp = employees.find((e) => e.employeeId === s.employeeId);
              return (
                <tr key={s.employeeId} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 font-medium">{emp ? emp.fullName : s.employeeId}</td>
                  <td className="px-6 py-3 text-emerald-600 font-bold">{s.present}</td>
                  <td className="px-6 py-3 text-rose-600 font-bold">{s.absent}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {summary.length === 0 && (
          <div className="p-6 text-center text-gray-400">No attendance records found.</div>
        )}
      </div>
    </div>
  );
}