import React from 'react';
import { motion } from 'framer-motion';
import {
  Upload,
  FileSpreadsheet,
  TrendingUp,
  BarChart3,
  Activity,
  Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

interface Stat {
  icon: React.ElementType;
  label: string;
  value: string;
  change: string;
}

interface RecentFile {
  name: string;
  date: string;
  size: string;
  charts: number;
}

export const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const stats: Stat[] = [
    { icon: FileSpreadsheet, label: 'Files Uploaded', value: '24', change: '+12%' },
    { icon: BarChart3, label: 'Charts Created', value: '156', change: '+8%' },
    { icon: Download, label: 'Downloads', value: '89', change: '+23%' },
    { icon: Activity, label: 'Active Projects', value: '7', change: '+2%' }
  ];

  const recentFiles: RecentFile[] = [
    { name: 'Sales_Q4_2024.xlsx', date: '2 hours ago', size: '2.3 MB', charts: 5 },
    { name: 'Marketing_Analytics.xlsx', date: '1 day ago', size: '1.8 MB', charts: 3 },
    { name: 'Financial_Report.xlsx', date: '3 days ago', size: '4.1 MB', charts: 8 },
    { name: 'Customer_Data.xlsx', date: '1 week ago', size: '3.2 MB', charts: 12 }
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
          <h1 className="text-3xl font-bold text-white mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-300">
            Here's what's happening with your data analysis projects
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-300 text-sm">{stat.label}</p>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-green-400 text-sm">{stat.change}</p>
                  </div>
                  <Icon className="h-8 w-8 text-purple-400" />
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent Files */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-2 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Recent Files</h2>
            <div className="space-y-4">
              {recentFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="h-8 w-8 text-green-400" />
                    <div>
                      <h3 className="text-white font-medium">{file.name}</h3>
                      <p className="text-gray-400 text-sm">{file.date} • {file.size}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-purple-400 font-medium">{file.charts} charts</p>
                    <button className="text-gray-400 hover:text-white text-sm transition-colors">
                      View →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
              <div className="space-y-3">
                <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-lg font-medium transition-all transform hover:scale-105 flex items-center space-x-2">
                  <Upload className="h-5 w-5" />
                  <span>Upload New File</span>
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-medium transition-all flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5" />
                  <span>Create Chart</span>
                </button>
                <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-medium transition-all flex items-center space-x-2">
                  <TrendingUp className="h-5 w-5" />
                  <span>View Analytics</span>
                </button>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
              <h2 className="text-xl font-semibold text-white mb-4">Usage This Month</h2>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Files Processed</span>
                  <span className="text-white font-medium">24/100</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-1/4"></div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-300">Storage Used</span>
                  <span className="text-white font-medium">2.1/10 GB</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-2">
                  <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-1/5"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};
