import React, { useState } from 'react';
import { motion } from 'framer-motion';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Scene3D } from '../components/Scene3D';
import { Chart3D } from '../components/Chart3D';

const dummyFiles: string[] = ['SalesData.xlsx', 'UserGrowth.xlsx', 'Revenue.xlsx'];

const dummyChartData = [
  { x: 1, y: 2, z: 1, value: 20, color: '#8b5cf6' },
  { x: 2, y: 4, z: 2, value: 40, color: '#ec4899' },
  { x: 3, y: 1, z: 3, value: 30, color: '#f59e0b' },
  { x: 4, y: 3, z: 4, value: 50, color: '#10b981' }
];

export const Analytics: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>(dummyFiles[0]);
  const [chartType, setChartType] = useState<'bar' | 'line' | 'pie'>('bar');
  const [is3DMode, setIs3DMode] = useState<boolean>(false);
  const [isExporting, setIsExporting] = useState<boolean>(false);

  const handleExport = async (type: 'png' | 'pdf') => {
    setIsExporting(true);
    const chartNode = document.querySelector('.chart-container') as HTMLElement;
    if (!chartNode) return;

    const canvas = await html2canvas(chartNode);
    if (type === 'png') {
      const link = document.createElement('a');
      link.download = `${selectedFile}_${chartType}.png`;
      link.href = canvas.toDataURL('image/png');
      link.click();
    } else {
      const pdf = new jsPDF();
      const imgData = canvas.toDataURL('image/png');
      pdf.addImage(imgData, 'PNG', 10, 10, 180, 130);
      pdf.save(`${selectedFile}_${chartType}.pdf`);
    }
    setIsExporting(false);
  };

  return (
    <div className="min-h-screen px-6 py-10">
      <div className="max-w-7xl mx-auto">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-white mb-6"
        >
          Excel Analytics Dashboard
        </motion.h1>

        <div className="flex flex-wrap gap-4 justify-between items-center mb-6">
          <div className="flex gap-2">
            <select
              value={selectedFile}
              onChange={(e) => setSelectedFile(e.target.value)}
              className="bg-white/10 text-white border border-white/20 p-2 rounded"
            >
              {dummyFiles.map((file) => (
                <option key={file} value={file}>
                  {file}
                </option>
              ))}
            </select>

            <select
              value={chartType}
              onChange={(e) => setChartType(e.target.value as 'bar' | 'line' | 'pie')}
              className="bg-white/10 text-white border border-white/20 p-2 rounded"
            >
              <option value="bar">Bar</option>
              <option value="line">Line</option>
              <option value="pie">Pie</option>
            </select>

            <button
              onClick={() => setIs3DMode(!is3DMode)}
              className={`px-4 py-2 rounded text-white transition-colors ${
                is3DMode ? 'bg-purple-600' : 'bg-gray-600'
              }`}
            >
              {is3DMode ? 'Switch to 2D' : 'Switch to 3D'}
            </button>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => handleExport('png')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export PNG'}
            </button>
            <button
              onClick={() => handleExport('pdf')}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              disabled={isExporting}
            >
              {isExporting ? 'Exporting...' : 'Export PDF'}
            </button>
          </div>
        </div>

        <div className="chart-container bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20">
          {is3DMode ? (
            <Scene3D data={dummyChartData} type="3d-bar" />
          ) : (
            <Chart2D data={dummyChartData} type={chartType} />
          )}
        </div>
      </div>
    </div>
  );
};
