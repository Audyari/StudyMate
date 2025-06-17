import { useState, useRef } from 'react';
import { 
  CloudArrowUpIcon, 
  XMarkIcon, 
  DocumentIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  ExclamationCircleIcon,
  ArrowUpTrayIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';

const FileUpload = () => {
    const [isDragging, setIsDragging] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const [status, setStatus] = useState({ type: '', message: '' });
    const [isUploading, setIsUploading] = useState(false);
    const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files.length) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileSelect = (e) => {
    if (e.target.files.length) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file) => {
    // Validasi tipe file
    const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    const fileExt = file.name.split('.').pop().toLowerCase();
    
    if (!validTypes.includes(file.type) && !['pdf', 'docx', 'txt'].includes(fileExt)) {
      setStatus({ type: 'error', message: 'Format file tidak didukung. Harap unggah file PDF, DOCX, atau TXT.' });
      return;
    }

    // Validasi ukuran file (10MB)
    if (file.size > 10 * 1024 * 1024) {
      setStatus({ type: 'error', message: 'Ukuran file terlalu besar. Maksimal 10MB.' });
      return;
    }

    setSelectedFile(file);
    setStatus({ type: 'info', message: 'File siap diupload' });
  };

  const removeFile = () => {
    setSelectedFile(null);
    setStatus({ type: '', message: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadFile = async () => {
    if (!selectedFile) return;

    const formData = new FormData();
    formData.append('file', selectedFile);

    setIsUploading(true);
    setStatus({ type: 'info', message: 'Mengupload file...' });

    try {
      // Hapus deklarasi response yang tidak digunakan
      await axios.post('http://localhost:5000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setStatus({ 
        type: 'success', 
        message: 'File berhasil diupload!' 
      });

      // Reset form setelah 2 detik
      setTimeout(() => {
        setSelectedFile(null);
        setStatus({ type: '', message: '' });
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      }, 2000);

    } catch (error) {
      setStatus({ 
        type: 'error', 
        message: error.response?.data?.error || 'Terjadi kesalahan saat mengupload' 
      });
    } finally {
      setIsUploading(false);
    }
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
      {/* Header Card */}
      <div className="px-6 py-5 border-b border-gray-200">
        <h2 className="text-lg font-medium text-gray-900">Unggah File</h2>
        <p className="mt-1 text-sm text-gray-500">Unggah file materi dalam format PDF, DOCX, atau TXT</p>
      </div>

      {/* Drop Zone */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        className={`px-8 py-12 text-center transition-all duration-200 ${
          isDragging 
            ? 'bg-indigo-50 border-2 border-dashed border-indigo-400' 
            : 'bg-white'
        }`}
      >
        <div className="max-w-md mx-auto">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-indigo-100 mb-4">
            <CloudArrowUpIcon 
              className={`h-8 w-8 ${
                isDragging ? 'text-indigo-600' : 'text-indigo-500'
              }`} 
            />
          </div>
          
          <h3 className="text-lg font-medium text-gray-900 mb-1">
            {isDragging ? 'Lepaskan file di sini' : 'Seret file ke sini'}
          </h3>
          <p className="text-sm text-gray-500 mb-6">
            atau <span className="text-indigo-600 font-medium">pilih file</span> dari perangkat Anda
          </p>
          
          <div className="relative">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              accept=".pdf,.docx,.txt"
            />
            <div className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
              <ArrowUpTrayIcon className="-ml-1 mr-2 h-5 w-5 text-gray-500" />
              Pilih File
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Format yang didukung: PDF, DOCX, TXT (maks. 10MB)
            </p>
          </div>
        </div>
      </div>

      {/* File Info */}
      {selectedFile && (
        <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              <DocumentIcon className="h-10 w-10 text-indigo-500" />
            </div>
            <div className="ml-4 flex-1 min-w-0">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {selectedFile.name}
                </p>
                <button
                  onClick={removeFile}
                  className="ml-4 text-gray-400 hover:text-gray-500"
                  disabled={isUploading}
                >
                  <XMarkIcon className="h-5 w-5" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                {formatFileSize(selectedFile.size)}
              </p>
              <div className="mt-2 w-full bg-gray-200 rounded-full h-1.5">
                <div 
                  className="bg-indigo-600 h-1.5 rounded-full transition-all duration-300" 
                  style={{ width: isUploading ? '70%' : '0%' }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Status Message */}
      {status.message && (
        <div
          className={`p-4 border-t ${
            status.type === 'info'
              ? 'bg-blue-50 border-blue-200'
              : status.type === 'success'
              ? 'bg-green-50 border-green-200'
              : 'bg-red-50 border-red-200'
          }`}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 pt-0.5">
              {status.type === 'info' && (
                <InformationCircleIcon className="h-5 w-5 text-blue-400" />
              )}
              {status.type === 'success' && (
                <CheckCircleIcon className="h-5 w-5 text-green-400" />
              )}
              {status.type === 'error' && (
                <ExclamationCircleIcon className="h-5 w-5 text-red-400" />
              )}
            </div>
            <div className="ml-3">
              <p className={`text-sm font-medium ${
                status.type === 'info'
                  ? 'text-blue-800'
                  : status.type === 'success'
                  ? 'text-green-800'
                  : 'text-red-800'
              }`}>
                {status.message}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Upload Button */}
      {selectedFile && !isUploading && (
        <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
          <button
            onClick={uploadFile}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
          >
            <ArrowUpTrayIcon className="h-5 w-5 mr-2" />
            Unggah File
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;