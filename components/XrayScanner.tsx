import React, { useState, useRef } from 'react';
import { Upload, X, Scan, AlertTriangle, FileImage, Sparkles, CheckCircle2 } from 'lucide-react';
import { analyzeMedicalImage } from '../services/gemini';

const XrayScanner: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageBase64, setImageBase64] = useState<string | null>(null);
  const [mimeType, setMimeType] = useState<string | null>(null);
  const [analysis, setAnalysis] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    // Create preview URL
    const objectUrl = URL.createObjectURL(file);
    setSelectedImage(objectUrl);
    setAnalysis(''); // Clear previous analysis

    // Convert to Base64 for API
    const reader = new FileReader();
    reader.onloadend = () => {
      const result = reader.result as string;
      // Remove data URL prefix (e.g., "data:image/jpeg;base64,")
      const base64Data = result.split(',')[1];
      setImageBase64(base64Data);
      setMimeType(file.type);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleAnalyze = async () => {
    if (!imageBase64 || !mimeType) return;

    setLoading(true);
    setAnalysis('');
    
    const result = await analyzeMedicalImage(imageBase64, mimeType);
    
    setAnalysis(result);
    setLoading(false);
  };

  const clearImage = () => {
    setSelectedImage(null);
    setImageBase64(null);
    setMimeType(null);
    setAnalysis('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">AI XMC Scanner</h1>
        <p className="text-slate-500 mt-1">Upload an X-Ray, MRI, or CT Scan to get an instant analysis and potential solutions.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="flex flex-col space-y-4">
          <div 
            className={`bg-white p-6 rounded-2xl shadow-sm border-2 border-dashed h-full flex flex-col items-center justify-center transition-all ${selectedImage ? 'border-slate-200' : 'border-blue-300 bg-blue-50/30'}`}
            onDragOver={handleDragOver}
            onDrop={handleDrop}
          >
            {!selectedImage ? (
              <div className="text-center p-8">
                <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  <Upload className="w-8 h-8" />
                </div>
                <h3 className="text-lg font-semibold text-slate-800 mb-2">Upload Scan Image</h3>
                <p className="text-slate-500 text-sm mb-6">Drag and drop your X-Ray here, or click to browse</p>
                <input 
                  type="file" 
                  ref={fileInputRef}
                  onChange={handleFileSelect}
                  accept="image/*"
                  className="hidden"
                />
                <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20"
                >
                  Select File
                </button>
              </div>
            ) : (
              <div className="relative w-full h-full min-h-[300px] flex flex-col">
                <div className="relative flex-1 bg-slate-900 rounded-xl overflow-hidden group">
                  <img 
                    src={selectedImage} 
                    alt="Scan Preview" 
                    className="w-full h-full object-contain"
                  />
                  <button 
                    onClick={clearImage}
                    className="absolute top-3 right-3 bg-black/50 hover:bg-red-500 text-white p-2 rounded-full backdrop-blur-sm transition-all"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                
                <button
                  onClick={handleAnalyze}
                  disabled={loading}
                  className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                    loading
                      ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
                  }`}
                >
                  {loading ? (
                    <>
                      <Sparkles className="w-5 h-5 animate-pulse" />
                      Analyzing Image...
                    </>
                  ) : (
                    <>
                      <Scan className="w-5 h-5" />
                      Analyze & Get Solutions
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Results Section */}
        <div className="flex flex-col space-y-4">
          <div className={`bg-white p-6 rounded-2xl shadow-sm border h-full flex flex-col transition-all ${analysis ? 'border-emerald-200 ring-4 ring-emerald-50' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${analysis ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                {analysis ? <CheckCircle2 className="w-5 h-5" /> : <FileImage className="w-5 h-5" />}
              </div>
              <h3 className="font-semibold text-slate-900">Analysis Findings & Solutions</h3>
            </div>

            {analysis ? (
              <div className="prose prose-sm prose-slate max-w-none flex-1 overflow-y-auto custom-scrollbar">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {analysis}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl m-2 bg-slate-50/50">
                <Scan className="w-12 h-12 mb-3 text-slate-300" />
                <p className="text-sm">Upload an image and click analyze</p>
              </div>
            )}
            
            {analysis && (
               <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-start gap-3 text-amber-800 text-xs border border-amber-100">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Disclaimer:</strong> This analysis is generated by AI and may be incorrect. 
                    It detects visual patterns but cannot diagnose medical conditions. 
                    <strong>Always consult a radiologist or doctor.</strong>
                  </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default XrayScanner;