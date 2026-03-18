import { useState, useEffect } from "react";
import { Trash2, Mail, Briefcase, Hash, UserPlus, Users } from "lucide-react";
import API from "../api/api";
import type { Employee } from "../types/types";

interface EmployeeForm {
    employeeId: string;
    fullName: string;
    email: string;
    department: string;
}

export default function EmployeePage() {
    const [employees, setEmployees] = useState<Employee[]>([]);
    const [form, setForm] = useState<EmployeeForm>({
        employeeId: "",
        fullName: "",
        email: "",
        department: "",
    });

    const loadData = async () => {
        try {
            const res = await API.get<Employee[]>("/employees");
            setEmployees(res.data);
        } catch (err: any) {
            alert(err.response?.data?.detail || "Failed to load employees");
        }
    };

    const handleAdd = async () => {
        if (Object.values(form).some((v) => !v)) return alert("Please fill all fields");
        try {
            await API.post("/employees", form);
            setForm({ employeeId: "", fullName: "", email: "", department: "" });
            loadData();
        } catch (err: any) {
            alert(err.response?.data?.detail || "Failed to add employee");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Delete this employee?")) return;
        try {
            await API.delete(`/employees/${id}`);
            loadData();
        } catch (err: any) {
            alert(err.response?.data?.detail || "Failed to delete employee");
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className="space-y-8">
            {/* Add Employee Form */}
            <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md">
                <div className="flex items-center gap-3 mb-6">
                    <div className="p-2 bg-blue-50 rounded-lg text-blue-600">
                        <UserPlus size={20} />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800">Add New Employee</h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <InputField placeholder="ID" icon={<Hash size={16} />} value={form.employeeId} onChange={(v) => setForm({ ...form, employeeId: v })} />
                    <InputField placeholder="Full Name" icon={<Users size={16} />} value={form.fullName} onChange={(v) => setForm({ ...form, fullName: v })} />
                    <InputField placeholder="Email" icon={<Mail size={16} />} value={form.email} onChange={(v) => setForm({ ...form, email: v })} />
                    <InputField placeholder="Department" icon={<Briefcase size={16} />} value={form.department} onChange={(v) => setForm({ ...form, department: v })} />
                </div>

                <button
                    onClick={handleAdd}
                    disabled={Object.values(form).some((v) => !v)}
                    className="mt-6 bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white px-6 py-3 rounded-xl font-bold transition shadow"
                >
                    Save Employee
                </button>
            </div>

            {/* Employee Table */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-md overflow-x-auto">
                <table className="min-w-full text-left">
                    <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        <tr>
                            <th className="px-6 py-3">Full Identity</th>
                            <th className="px-6 py-3">Employee ID</th>
                            <th className="px-6 py-3">Department</th>
                            <th className="px-6 py-3 text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 text-sm">
                        {employees.map((emp) => (
                            <tr key={emp.employeeId} className="hover:bg-gray-50 transition-colors">
                                <td className="px-6 py-3 flex items-center gap-3">
                                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600 text-sm">
                                        {emp.fullName[0]}
                                    </div>
                                    <div className="truncate">
                                        <p className="font-semibold text-gray-800 truncate">{emp.fullName}</p>
                                        <p className="text-xs text-gray-400 truncate">{emp.email}</p>
                                    </div>
                                </td>
                                <td className="px-6 py-3">
                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">
                                        {emp.employeeId}
                                    </span>
                                </td>
                                <td className="px-6 py-3">
                                    <span className="bg-gray-100 text-gray-600 px-2.5 py-1 rounded-lg text-xs font-semibold uppercase">
                                        {emp.department}
                                    </span>
                                </td>
                                <td className="px-6 py-3 text-right">
                                    <button
                                        onClick={() => handleDelete(emp.employeeId)}
                                        className="text-gray-300 hover:text-rose-600 p-2 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {employees.length === 0 && (
                    <div className="p-6 text-center text-gray-400">No employees found.</div>
                )}
            </div>
        </div>
    );
}

// InputField Component
interface InputFieldProps {
    placeholder: string;
    icon: React.ReactNode;
    value: string;
    onChange: (value: string) => void;
}

function InputField({ placeholder, icon, value, onChange }: InputFieldProps) {
    return (
        <div className="flex items-center bg-gray-50 border border-gray-200 rounded-xl overflow-hidden focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition">
            {/* Icon container */}
            <div className="flex items-center justify-center w-12 text-gray-400 ">
                {icon}
            </div>

            {/* Input */}
            <input
                type="text"
                className="flex-1 px-4 py-3 outline-none text-sm bg-transparent placeholder-gray-400"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
}