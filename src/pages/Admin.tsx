import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Users,
  FileSpreadsheet,
  BarChart3,
  TrendingUp,
  Activity,
  Settings,
  Shield,
  Download,
  LucideIcon,
} from 'lucide-react';

// Type definitions
type TabType = 'overview' | 'users' | 'system';

type StatItem = {
  icon: LucideIcon;
  label: string;
  value: number;
  change: string;
};

type TabItem = {
  id: TabType;
  label: string;
  icon: LucideIcon;
};

type SystemStat = {
  label: string;
  value: string;
  color: string;
};

type UserItem = {
  id: number;
  name: string;
  email: string;
  files: number;
  lastActive: string;
};

export const Admin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<TabType>('overview');

  const adminStats = {
    totalUsers: 1234,
    activeUsers: 456,
    totalFiles: 5678,
    totalCharts: 9012,
  };

  const recentUsers: UserItem[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', files: 12, lastActive: '2 hours ago' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', files: 8, lastActive: '1 day ago' },
    { id: 3, name: 'Bob Johnson', email: 'bob@example.com', files: 15, lastActive: '3 days ago' },
    { id: 4, name: 'Alice Brown', email: 'alice@example.com', files: 5, lastActive: '1 week ago' },
  ];

  const systemStats: SystemStat[] = [
    { label: 'Server Uptime', value: '99.9%', color: 'text-green-400' },
    { label: 'Storage Used', value: '2.1 TB', color: 'text-blue-400' },
    { label: 'API Requests', value: '1.2M', color: 'text-purple-400' },
    { label: 'Error Rate', value: '0.1%', color: 'text-red-400' },
  ];

  const tabs: TabItem[] = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'system', label: 'System', icon: Settings },
  ];

  const statCards: StatItem[] = [
    { icon: Users, label: 'Total Users', value: adminStats.totalUsers, change: '+12%' },
    { icon: Activity, label: 'Active Users', value: adminStats.activeUsers, change: '+8%' },
    { icon: FileSpreadsheet, label: 'Files Uploaded', value: adminStats.totalFiles, change: '+23%' },
    { icon: BarChart3, label: 'Charts Created', value: adminStats.totalCharts, change: '+15%' },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="flex items-center space-x-3 mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
          </div>
          <p className="text-gray-300">
            Manage users, monitor system performance, and view platform analytics
          </p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {statCards.map((stat, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-300 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value.toLocaleString()}</p>
                  <p className="text-green-400 text-sm">{stat.change}</p>
                </div>
                <stat.icon className="h-8 w-8 text-purple-400" />
              </div>
            </div>
          ))}
        </motion.div>

        {/* Tab Navigation */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-purple-600 text-white'
                    : 'text-gray-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <tab.icon className="h-4 w-4" />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-8">
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 lg:grid-cols-3 gap-8"
            >
              {/* Placeholder Chart */}
              <div className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">Platform Usage</h2>
                <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <TrendingUp className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <p className="text-gray-300">Usage analytics chart would go here</p>
                  </div>
                </div>
              </div>

              {/* System Health */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">System Health</h2>
                  <div className="space-y-4">
                    {systemStats.map((stat, index) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-300">{stat.label}</span>
                        <span className={`font-semibold ${stat.color}`}>{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'users' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-white">User Management</h2>
                <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition-colors">
                  Add User
                </button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/20">
                      <th className="text-left py-3 text-gray-300">Name</th>
                      <th className="text-left py-3 text-gray-300">Email</th>
                      <th className="text-left py-3 text-gray-300">Files</th>
                      <th className="text-left py-3 text-gray-300">Last Active</th>
                      <th className="text-left py-3 text-gray-300">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentUsers.map((user) => (
                      <tr key={user.id} className="border-b border-white/10">
                        <td className="py-3 text-white">{user.name}</td>
                        <td className="py-3 text-gray-300">{user.email}</td>
                        <td className="py-3 text-white">{user.files}</td>
                        <td className="py-3 text-gray-300">{user.lastActive}</td>
                        <td className="py-3">
                          <button className="text-purple-400 hover:text-purple-300 transition-colors">
                            View
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {activeTab === 'system' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {/* Config */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">System Configuration</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max File Size (MB)
                    </label>
                    <input
                      type="number"
                      defaultValue={10}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Max Files Per User
                    </label>
                    <input
                      type="number"
                      defaultValue={100}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">System Actions</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-lg font-medium transition-all flex items-center space-x-2">
                    <Download className="h-5 w-5" />
                    <span>Export Logs</span>
                  </button>
                  <button className="bg-green-600 hover:bg-green-700 text-white p-3 rounded-lg font-medium transition-all flex items-center space-x-2">
                    <Activity className="h-5 w-5" />
                    <span>Run Backup</span>
                  </button>
                  <button className="bg-yellow-600 hover:bg-yellow-700 text-white p-3 rounded-lg font-medium transition-all flex items-center space-x-2">
                    <Settings className="h-5 w-5" />
                    <span>System Check</span>
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
