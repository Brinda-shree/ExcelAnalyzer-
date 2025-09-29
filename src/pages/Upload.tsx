import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload as UploadIcon, FileSpreadsheet, X, Check } from 'lucide-react';

interface UploadFile {
  file: File;
  progress: number;
  status: 'uploading' | 'completed';
}

export const Upload: React.FC = () => {
  const [uploadedFiles, setUploadedFiles] = useState<UploadFile[]>([]);

  const onDrop = (acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading'
    }));

    setUploadedFiles(prev => [...prev, ...newFiles]);

    newFiles.forEach(uploadFile => {
      const timer = setInterval(() => {
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === uploadFile.file
              ? { ...f, progress: Math.min(f.progress + 10, 100) }
              : f
          )
        );
      }, 200);

      setTimeout(() => {
        clearInterval(timer);
        setUploadedFiles(prev =>
          prev.map(f =>
            f.file === uploadFile.file
              ? { ...f, progress: 100, status: 'completed' }
              : f
          )
        );
      }, 2000);
    });
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
      'application/vnd.ms-excel': ['.xls']
    },
    multiple: true
  });

  const removeFile = (fileToRemove: File) => {
    setUploadedFiles(prev => prev.filter(f => f.file !== fileToRemove));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Upload Excel Files</h1>
          <p className="text-gray-300">
            Drop your Excel files here to start analyzing your data
          </p>
        </motion.div>

        {/* Upload Area */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all duration-300 ${
              isDragActive
                ? 'border-purple-400 bg-purple-400/10'
                : 'border-white/30 bg-white/5 hover:bg-white/10'
            }`}
          >
            <input {...getInputProps()} />
            <UploadIcon className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-white mb-2">
              {isDragActive ? 'Drop files here' : 'Drag & drop your Excel files'}
            </h3>
            <p className="text-gray-300 mb-4">
              or click to browse and select files
            </p>
            <div className="flex flex-wrap justify-center gap-2 text-sm text-gray-400">
              <span className="bg-white/10 px-3 py-1 rounded-full">.xlsx</span>
              <span className="bg-white/10 px-3 py-1 rounded-full">.xls</span>
            </div>
          </div>
        </motion.div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
          >
            <h2 className="text-xl font-semibold text-white mb-4">Uploaded Files</h2>
            <div className="space-y-4">
              {uploadedFiles.map((uploadFile, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-4 bg-white/5 rounded-lg"
                >
                  <div className="flex items-center space-x-3">
                    <FileSpreadsheet className="h-8 w-8 text-green-400" />
                    <div>
                      <h3 className="text-white font-medium">{uploadFile.file.name}</h3>
                      <p className="text-gray-400 text-sm">
                        {formatFileSize(uploadFile.file.size)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    {uploadFile.status === 'uploading' && (
                      <div className="w-32">
                        <div className="flex justify-between text-sm text-gray-300 mb-1">
                          <span>Uploading...</span>
                          <span>{uploadFile.progress}%</span>
                        </div>
                        <div className="w-full bg-white/10 rounded-full h-2">
                          <div
                            className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      </div>
                    )}

                    {uploadFile.status === 'completed' && (
                      <div className="flex items-center space-x-2">
                        <Check className="h-5 w-5 text-green-400" />
                        <span className="text-green-400 text-sm">Completed</span>
                      </div>
                    )}

                    <button
                      onClick={() => removeFile(uploadFile.file)}
                      className="text-gray-400 hover:text-red-400 transition-colors"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {uploadedFiles.some(f => f.status === 'completed') && (
              <div className="mt-6 text-center">
                <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-6 py-3 rounded-lg font-medium transition-all transform hover:scale-105">
                  Analyze Files
                </button>
              </div>
            )}
          </motion.div>
        )}

        {/* Tips Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mt-8 bg-white/10 backdrop-blur-md rounded-xl p-6 border border-white/20"
        >
          <h2 className="text-xl font-semibold text-white mb-4">Tips for Better Results</h2>
          <ul className="space-y-2 text-gray-300">
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Ensure your Excel files have clear column headers</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Remove any empty rows or columns before uploading</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Use consistent data formats (dates, numbers, text)</span>
            </li>
            <li className="flex items-start space-x-2">
              <span className="text-purple-400 mt-1">•</span>
              <span>Maximum file size: 10MB per file</span>
            </li>
          </ul>
        </motion.div>
      </div>
    </div>
  );
};
