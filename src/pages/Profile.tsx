import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Calendar, FileSpreadsheet, BarChart3, Download, Settings, Shield } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Profile: React.FC = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState<'overview' | 'activity' | 'settings'>('overview');

  const userStats = {
    filesUploaded: 24,
    chartsCreated: 156,
    totalDownloads: 89,
    accountAge: '3 months'
  };

  const recentActivity: { action: string; file: string; time: string }[] = [
    { action: 'Uploaded', file: 'Sales_Q4_2024.xlsx', time: '2 hours ago' },
    { action: 'Created chart', file: 'Marketing_Analytics.xlsx', time: '1 day ago' },
    { action: 'Downloaded', file: 'Financial_Report.pdf', time: '3 days ago' },
    { action: 'Uploaded', file: 'Customer_Data.xlsx', time: '1 week ago' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: User },
    { id: 'activity', label: 'Activity', icon: BarChart3 },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div className="bg-white/10 backdrop-blur-md rounded-xl p-8 border border-white/20">
            <div className="flex items-center space-x-6">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                <User className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white">{user?.name}</h1>
                <p className="text-gray-300 flex items-center space-x-2">
                  <Mail className="h-4 w-4" />
                  <span>{user?.email}</span>
                </p>
                <p className="text-gray-300 flex items-center space-x-2 mt-1">
                  <Shield className="h-4 w-4" />
                  <span className="capitalize">{user?.role}</span>
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Tabs */}
        <div className="mb-8">
          <div className="flex space-x-1 bg-white/10 backdrop-blur-md rounded-xl p-1 border border-white/20">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
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
              {/* Stats */}
              <div className="lg:col-span-2 space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Account Statistics</h2>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-white/5 rounded-lg p-4">
                      <FileSpreadsheet className="h-8 w-8 text-green-400 mb-2" />
                      <h3 className="text-2xl font-bold text-white">{userStats.filesUploaded}</h3>
                      <p className="text-gray-300">Files Uploaded</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <BarChart3 className="h-8 w-8 text-purple-400 mb-2" />
                      <h3 className="text-2xl font-bold text-white">{userStats.chartsCreated}</h3>
                      <p className="text-gray-300">Charts Created</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Download className="h-8 w-8 text-blue-400 mb-2" />
                      <h3 className="text-2xl font-bold text-white">{userStats.totalDownloads}</h3>
                      <p className="text-gray-300">Downloads</p>
                    </div>
                    <div className="bg-white/5 rounded-lg p-4">
                      <Calendar className="h-8 w-8 text-pink-400 mb-2" />
                      <h3 className="text-2xl font-bold text-white">{userStats.accountAge}</h3>
                      <p className="text-gray-300">Account Age</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Usage Analytics</h2>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Monthly Upload Limit</span>
                        <span>24/100 files</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full w-1/4"></div>
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-sm text-gray-300 mb-2">
                        <span>Storage Used</span>
                        <span>2.1/10 GB</span>
                      </div>
                      <div className="w-full bg-white/10 rounded-full h-2">
                        <div className="bg-gradient-to-r from-blue-500 to-cyan-500 h-2 rounded-full w-1/5"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="space-y-6">
                <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                  <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
                  <div className="space-y-3">
                    <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white p-3 rounded-lg font-medium transition-all">
                      Upload New File
                    </button>
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-medium transition-all">
                      View Analytics
                    </button>
                    <button className="w-full bg-white/10 hover:bg-white/20 text-white p-3 rounded-lg font-medium transition-all">
                      Download Report
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === 'activity' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
            >
              <h2 className="text-xl font-semibold text-white mb-4">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity, index) => (
                  <div key={index} className="flex items-center space-x-4 p-4 bg-white/5 rounded-lg">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-white">
                        <span className="font-medium">{activity.action}</span>{' '}
                        <span className="text-gray-300">{activity.file}</span>
                      </p>
                      <p className="text-sm text-gray-400">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={user?.name}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      readOnly
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={user?.email}
                      className="w-full p-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      readOnly
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
                <h2 className="text-xl font-semibold text-white mb-4">Preferences</h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-white">Email Notifications</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Auto-save Charts</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-white">Dark Mode</span>
                    <input type="checkbox" className="toggle" defaultChecked />
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};
