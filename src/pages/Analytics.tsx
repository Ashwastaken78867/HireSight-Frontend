// src/pages/Analytics.tsx
import React, { useEffect, useState } from "react";
import { getApplications } from "../services/api";
import type { IJobApplication } from "../types";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50"];

const Analytics: React.FC = () => {
  const [applications, setApplications] = useState<IJobApplication[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const data = await getApplications();
      setApplications(data);
    } catch (error) {
      console.error("Error fetching applications:", error);
    } finally {
      setLoading(false);
    }
  };

  // Stats calculations
  const statusCounts = applications.reduce<Record<string, number>>((acc, app) => {
    acc[app.status] = (acc[app.status] || 0) + 1;
    return acc;
  }, {});

  const statusData = Object.entries(statusCounts).map(([status, count]) => ({
    name: status,
    value: count,
  }));

  const roleCounts = applications.reduce<Record<string, number>>((acc, app) => {
    acc[app.role] = (acc[app.role] || 0) + 1;
    return acc;
  }, {});

  const roleData = Object.entries(roleCounts).map(([role, count]) => ({
    name: role,
    value: count,
  }));

  const avgExperience =
    applications.length > 0
      ? applications.reduce((sum, app) => sum + app.experience, 0) /
        applications.length
      : 0;

  if (loading) {
    return <div className="p-6 text-gray-500">Loading analytics...</div>;
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-8 max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold tracking-tight text-gray-900">Analytics</h1>
        <p className="text-sm text-gray-600">Insights into your pipeline performance</p>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Total Candidates</h2>
          <p className="text-3xl font-bold">{applications.length}</p>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Average Experience</h2>
          <p className="text-3xl font-bold">{avgExperience.toFixed(1)} yrs</p>
        </div>
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm text-center">
          <h2 className="text-lg font-semibold mb-2">Stages</h2>
          <p className="text-3xl font-bold">{Object.keys(statusCounts).length}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Candidates per stage */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Candidates by Stage</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {statusData.map((_entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Candidates per role */}
        <div className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm">
          <h2 className="text-lg font-semibold mb-4">Candidates by Role</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={roleData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
