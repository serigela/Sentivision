
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Upload, FileImage, Trash2 } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const BatchUpload = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(event.target.files || []);
    setFiles(prev => [...prev, ...selectedFiles]);
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleBatchUpload = async () => {
    if (files.length === 0) return;
    
    setUploading(true);
    setProgress(0);
    
    // Simulate batch processing
    for (let i = 0; i < files.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 1000));
      setProgress(((i + 1) / files.length) * 100);
    }
    
    setUploading(false);
    setFiles([]);
  };

  return (
    <div className="space-y-4">
      <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
        <input
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
          id="batch-upload"
        />
        <label htmlFor="batch-upload" className="cursor-pointer">
          <Upload className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-slate-300">Drop multiple chart images here or click to select</p>
          <p className="text-slate-500 text-sm mt-1">Upload up to 10 charts at once</p>
        </label>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="text-white font-medium">Selected Files ({files.length})</h4>
          <div className="grid grid-cols-1 gap-2 max-h-40 overflow-y-auto">
            {files.map((file, index) => (
              <Card key={index} className="bg-slate-700/50">
                <CardContent className="p-3 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <FileImage className="h-4 w-4 text-slate-400" />
                    <span className="text-slate-300 text-sm truncate">{file.name}</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeFile(index)}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}

      {uploading && (
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-400">Processing charts...</span>
            <span className="text-slate-300">{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="w-full" />
        </div>
      )}

      <Button
        onClick={handleBatchUpload}
        disabled={files.length === 0 || uploading}
        className="w-full bg-cyan-500 hover:bg-cyan-600"
      >
        {uploading ? 'Processing...' : `Analyze ${files.length} Charts`}
      </Button>
    </div>
  );
};

export default BatchUpload;
