import { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Employees from "./pages/Employees";
import AttendancePage from "./pages/Attendance";
import API from "./api/api";

function AnimatedRoutes({ employeeCount }: { employeeCount: number }) {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/dashboard"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Dashboard employeeCount={employeeCount} />
            </motion.div>
          }
        />
        <Route
          path="/employees"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <Employees />
            </motion.div>
          }
        />
        <Route
          path="/attendance"
          element={
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <AttendancePage />
            </motion.div>
          }
        />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="*" element={<div className="p-8">Page Not Found</div>} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [employeeCount, setEmployeeCount] = useState<number>(0);

  const fetchEmployeeCount = async () => {
    try {
      const res = await API.get("/employees");
      if (Array.isArray(res.data)) {
        setEmployeeCount(res.data.length);
      }
    } catch (err) {
      console.error("Failed to fetch employee count:", err);
    }
  };

  useEffect(() => {
    fetchEmployeeCount();
  }, []);

  return (
    <Layout>
      <AnimatedRoutes employeeCount={employeeCount} />
    </Layout>
  );
}