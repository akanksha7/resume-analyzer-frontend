import React, { useState, useEffect } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { api } from '@/services/api';
import ResumeAnalysis from '@/pages/ResumeAnalysisPage';
import { Loader2 } from 'lucide-react';

const ResumeAnalysisDialog = ({ 
  isOpen, 
  onClose, 
  resumeId 
}) => {
  const [analysisData, setAnalysisData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!resumeId) return;
      
      try {
        setIsLoading(true);
        setError(null);
        const response = await api.getResumeAnalysis(resumeId);
        setAnalysisData(response);
      } catch (err) {
        setError(err.message || 'Failed to fetch analysis');
      } finally {
        setIsLoading(false);
      }
    };

    if (isOpen) {
      fetchAnalysis();
    }
  }, [resumeId, isOpen]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 z-40" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] h-[90vh] bg-background rounded-lg shadow-lg z-50 flex flex-col overflow-hidden">
          <Dialog.Header className="flex justify-between items-center p-4 border-b">
            <Dialog.Title className="text-xl font-semibold">
              Resume Analysis
            </Dialog.Title>
            <button 
              onClick={onClose}
              className="rounded-full p-2 hover:bg-gray-100 transition-colors"
            >
              ×
            </button>
          </Dialog.Header>
          
          <div className="flex-1 overflow-y-auto">
            {isLoading ? (
              <div className="h-full flex items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : error ? (
              <div className="h-full flex items-center justify-center text-red-500">
                {error}
              </div>
            ) : analysisData ? (
              <ResumeAnalysis data={analysisData} />
            ) : null}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default ResumeAnalysisDialog;