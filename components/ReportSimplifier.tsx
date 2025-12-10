import React, { useState } from 'react';
import { FileText, ArrowRight, Sparkles, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { simplifyMedicalReport } from '../services/gemini';

const ReportSimplifier: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSimplify = async () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setSummary('');
    const result = await simplifyMedicalReport(inputText);
    setSummary(result);
    setLoading(false);
  };

  const loadSample = () => {
    const sample = `MRI OF THE LUMBAR SPINE
    
    FINDINGS:
    There is mild desiccation of the L4-L5 and L5-S1 intervertebral discs. At L4-L5, there is a diffuse disc bulge with a superimposed central disc protrusion, resulting in mild central canal stenosis and bilateral neural foraminal narrowing. The nerve roots appear to be free of significant compression. No evidence of spondylolisthesis or fracture. The conus medullaris terminates at the L1 level and is unremarkable.
    
    IMPRESSION:
    Degenerative disc disease at L4-L5 and L5-S1 with mild canal stenosis at L4-L5. No acute osseous abnormality.`;
    setInputText(sample);
  };

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-6 animate-fade-in">
       <div>
        <h1 className="text-2xl font-bold text-slate-900">Medical Report Simplifier</h1>
        <p className="text-slate-500 mt-1">Paste your medical report or lab results below to get a simple, easy-to-understand explanation.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="flex flex-col space-y-4">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
            <div className="flex justify-between items-center mb-4">
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <FileText className="w-4 h-4 text-blue-500" />
                Original Report Text
              </label>
              <button 
                onClick={loadSample}
                className="text-xs text-blue-600 hover:text-blue-700 font-medium px-3 py-1 bg-blue-50 rounded-full transition-colors"
              >
                Load Sample
              </button>
            </div>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Paste report text here... e.g. 'Patient shows signs of acute bronchitis...'"
              className="flex-1 w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all resize-none text-sm leading-relaxed text-slate-800 placeholder:text-slate-400 min-h-[300px]"
            />

            <button
              onClick={handleSimplify}
              disabled={loading || !inputText}
              className={`mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl font-medium transition-all ${
                loading || !inputText
                  ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20'
              }`}
            >
              {loading ? (
                <>
                  <Sparkles className="w-5 h-5 animate-pulse" />
                  Analyzing...
                </>
              ) : (
                <>
                  Simplify Report <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>
        </div>

        {/* Output Section */}
        <div className="flex flex-col space-y-4">
          <div className={`bg-white p-6 rounded-2xl shadow-sm border h-full flex flex-col transition-all ${summary ? 'border-emerald-200 ring-4 ring-emerald-50' : 'border-slate-200'}`}>
            <div className="flex items-center gap-2 mb-4">
              <div className={`p-2 rounded-lg ${summary ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-400'}`}>
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <h3 className="font-semibold text-slate-900">Patient-Friendly Explanation</h3>
            </div>

            {summary ? (
              <div className="prose prose-sm prose-slate max-w-none flex-1 overflow-y-auto custom-scrollbar">
                <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                  {summary}
                </div>
              </div>
            ) : (
              <div className="flex-1 flex flex-col items-center justify-center text-slate-400 border-2 border-dashed border-slate-100 rounded-xl m-2">
                <Sparkles className="w-12 h-12 mb-3 text-slate-200" />
                <p className="text-sm">Summary will appear here</p>
              </div>
            )}
            
            {summary && (
               <div className="mt-6 p-4 bg-amber-50 rounded-xl flex items-start gap-3 text-amber-800 text-xs border border-amber-100">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <p>
                    <strong>Disclaimer:</strong> This simplification is generated by AI and may contain inaccuracies. 
                    It is not a substitute for professional medical advice. Always consult your doctor for interpretation of results.
                  </p>
               </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportSimplifier;