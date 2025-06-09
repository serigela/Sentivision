
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Upload, Image, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { UploadProgress } from '@/types';

interface DragDropUploadProps {
  onFileUpload: (file: File) => void;
  onFileProcessed: (dataUrl: string) => void;
  accept?: string;
  maxSize?: number;
}

const DragDropUpload = ({ 
  onFileUpload, 
  onFileProcessed, 
  accept = 'image/*',
  maxSize = 10 * 1024 * 1024 // 10MB
}: DragDropUploadProps) => {
  const [uploadProgress, setUploadProgress] = useState<UploadProgress | null>(null);
  const [uploadedFile, setUploadedFile] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[], rejectedFiles: any[]) => {
    if (rejectedFiles.length > 0) {
      toast.error('File rejected. Please check size and format.');
      return;
    }

    const file = acceptedFiles[0];
    if (file) {
      onFileUpload(file);
      
      // Simulate upload progress
      setUploadProgress({ percentage: 0, stage: 'uploading', message: 'Starting upload...' });
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        setUploadedFile(result);
        onFileProcessed(result);
        
        // Simulate processing stages
        setTimeout(() => {
          setUploadProgress({ percentage: 30, stage: 'processing', message: 'Processing image...' });
        }, 300);
        
        setTimeout(() => {
          setUploadProgress({ percentage: 70, stage: 'analyzing', message: 'Running AI analysis...' });
        }, 800);
        
        setTimeout(() => {
          setUploadProgress({ percentage: 100, stage: 'complete', message: 'Analysis complete!' });
          toast.success('Chart uploaded and analyzed successfully!');
          setTimeout(() => setUploadProgress(null), 1000);
        }, 1500);
      };
      
      reader.readAsDataURL(file);
    }
  }, [onFileUpload, onFileProcessed]);

  const { getRootProps, getInputProps, isDragActive, isDragReject } = useDropzone({
    onDrop,
    accept: { [accept]: [] },
    maxSize,
    multiple: false
  });

  return (
    <div className="space-y-4">
      <Card 
        {...getRootProps()} 
        className={`
          border-2 border-dashed p-8 text-center cursor-pointer transition-all duration-200
          ${isDragActive ? 'border-cyan-500 bg-cyan-500/10' : 'border-slate-600 hover:border-cyan-500'}
          ${isDragReject ? 'border-red-500 bg-red-500/10' : ''}
          ${uploadedFile ? 'border-green-500 bg-green-500/10' : ''}
        `}
      >
        <input {...getInputProps()} />
        
        {uploadedFile ? (
          <div className="space-y-4">
            <img 
              src={uploadedFile} 
              alt="Uploaded chart" 
              className="max-h-64 mx-auto rounded-lg border border-slate-600 shadow-lg"
            />
            <div className="flex items-center justify-center space-x-2 text-green-400">
              <CheckCircle className="h-5 w-5" />
              <span className="font-medium">Chart ready for analysis</span>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {isDragReject ? (
              <AlertCircle className="h-12 w-12 text-red-400 mx-auto" />
            ) : (
              <Upload className={`h-12 w-12 mx-auto transition-colors ${
                isDragActive ? 'text-cyan-400' : 'text-slate-400 hover:text-cyan-400'
              }`} />
            )}
            <div>
              <p className="text-white font-medium">
                {isDragActive ? 'Drop your chart here' : 'Upload Candlestick Chart'}
              </p>
              <p className="text-slate-400 text-sm">
                {isDragReject 
                  ? 'Invalid file type or size too large' 
                  : 'Drag and drop or click to browse'
                }
              </p>
              <p className="text-slate-500 text-xs mt-2">
                Supports PNG, JPG, WebP • Max size: {Math.round(maxSize / (1024 * 1024))}MB
              </p>
            </div>
          </div>
        )}
      </Card>

      {uploadProgress && (
        <Card className="bg-slate-700/50 border-slate-600 p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-white text-sm font-medium">
                {uploadProgress.message}
              </span>
              <span className="text-slate-400 text-sm">
                {uploadProgress.percentage}%
              </span>
            </div>
            <Progress 
              value={uploadProgress.percentage} 
              className="h-2"
            />
            <div className="flex items-center space-x-2 text-xs text-slate-400">
              <Image className="h-3 w-3" />
              <span>Stage: {uploadProgress.stage}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default DragDropUpload;
