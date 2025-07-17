import React, { useState, useRef, useEffect } from 'react';
import { Upload, Download, FileText, FileSpreadsheet, Database, ChevronDown } from 'lucide-react';

interface ImportExportMenuProps {
  onImport: (format: string) => void;
  onExport: (format: string) => void;
}

export const ImportExportMenu: React.FC<ImportExportMenuProps> = ({
  onImport,
  onExport
}) => {
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const importRef = useRef<HTMLDivElement>(null);
  const exportRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (importRef.current && !importRef.current.contains(event.target as Node)) {
        setIsImportOpen(false);
      }
      if (exportRef.current && !exportRef.current.contains(event.target as Node)) {
        setIsExportOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const importFormats = [
    { id: 'csv', label: 'CSV File', icon: FileText, description: 'Comma-separated values' },
    { id: 'excel', label: 'Excel File', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { id: 'json', label: 'JSON File', icon: Database, description: 'JavaScript Object Notation' },
  ];

  const exportFormats = [
    { id: 'csv', label: 'Export as CSV', icon: FileText, description: 'Comma-separated values' },
    { id: 'excel', label: 'Export as Excel', icon: FileSpreadsheet, description: 'Microsoft Excel format' },
    { id: 'json', label: 'Export as JSON', icon: Database, description: 'JavaScript Object Notation' },
    { id: 'pdf', label: 'Export as PDF', icon: FileText, description: 'Portable Document Format' },
  ];

  const handleImport = (format: string) => {
    onImport(format);
    setIsImportOpen(false);
  };

  const handleExport = (format: string) => {
    onExport(format);
    setIsExportOpen(false);
  };

  return (
    <div className="flex items-center gap-2">
      {/* Import Menu */}
      <div className="relative" ref={importRef}>
        <button
          onClick={() => setIsImportOpen(!isImportOpen)}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <Upload className="h-4 w-4" />
          <span>Import</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {isImportOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsImportOpen(false)} />
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200/60 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Import Assets</p>
              </div>
              
              {importFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => handleImport(format.id)}
                    className="w-full flex items-start gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{format.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{format.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Export Menu */}
      <div className="relative" ref={exportRef}>
        <button
          onClick={() => setIsExportOpen(!isExportOpen)}
          className="flex items-center gap-2 px-3 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors text-sm"
        >
          <Download className="h-4 w-4" />
          <span>Export</span>
          <ChevronDown className="h-3 w-3" />
        </button>

        {isExportOpen && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setIsExportOpen(false)} />
            <div className="absolute right-0 top-12 w-64 bg-white rounded-xl shadow-xl border border-gray-200/60 py-2 z-50">
              <div className="px-4 py-2 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-900 uppercase tracking-wide">Export Assets</p>
              </div>
              
              {exportFormats.map((format) => {
                const Icon = format.icon;
                return (
                  <button
                    key={format.id}
                    onClick={() => handleExport(format.id)}
                    className="w-full flex items-start gap-3 px-4 py-3 text-sm hover:bg-gray-50 transition-colors"
                  >
                    <Icon className="h-4 w-4 mt-0.5 text-gray-600" />
                    <div className="text-left">
                      <div className="font-medium text-gray-900">{format.label}</div>
                      <div className="text-xs text-gray-500 mt-0.5">{format.description}</div>
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
};