import React, { useState } from 'react';
import { Search, Globe, BookOpen, AlertCircle, Loader2, ArrowRight } from 'lucide-react';
import { searchHealthInfo } from '../services/gemini';

const HealthBrowser: React.FC = () => {
  const [query, setQuery] = useState('');
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setHasSearched(true);
    setResult('');
    
    const response = await searchHealthInfo(query);
    setResult(response);
    setLoading(false);
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in min-h-[calc(100vh-6rem)]">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-blue-100 rounded-full text-blue-600 mb-2">
          <Globe className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">MediCare Health Browser</h1>
        <p className="text-lg text-slate-500">
          Professional medical answers powered by advanced AI. Ask complex questions and get detailed, evidence-based insights.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto sticky top-4 z-30">
        <form onSubmit={handleSearch} className="relative shadow-xl rounded-2xl">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-6 w-6 text-slate-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-12 pr-32 py-4 border-2 border-slate-100 rounded-2xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 text-lg transition-all"
            placeholder="Ask about symptoms, conditions, treatments..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 text-white px-6 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:bg-slate-200 disabled:text-slate-400 flex items-center gap-2"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <span className="flex items-center gap-1">Search <ArrowRight className="w-4 h-4" /></span>}
          </button>
        </form>
      </div>

      {/* Results Area */}
      <div className="max-w-4xl mx-auto">
        {!hasSearched ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-12 opacity-60">
             <div className="bg-white p-6 rounded-xl border border-slate-200 border-dashed text-center">
               <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Example Query</span>
               <p className="mt-2 text-slate-700 font-medium">"What are the latest treatments for Type 2 Diabetes?"</p>
             </div>
             <div className="bg-white p-6 rounded-xl border border-slate-200 border-dashed text-center">
               <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider">Example Query</span>
               <p className="mt-2 text-slate-700 font-medium">"Explain the pathophysiology of asthma in detail."</p>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in slide-in-from-bottom-4 duration-500">
            {loading ? (
              <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-100 space-y-4">
                <div className="h-6 bg-slate-100 rounded w-1/3 animate-pulse"></div>
                <div className="space-y-2">
                   <div className="h-4 bg-slate-100 rounded w-full animate-pulse"></div>
                   <div className="h-4 bg-slate-100 rounded w-5/6 animate-pulse"></div>
                   <div className="h-4 bg-slate-100 rounded w-4/6 animate-pulse"></div>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                <div className="bg-slate-50 border-b border-slate-100 px-6 py-4 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-blue-600" />
                  <span className="font-semibold text-slate-700">Medical Insight</span>
                </div>
                <div className="p-6 md:p-8">
                  <div className="prose prose-slate max-w-none prose-headings:text-slate-900 prose-headings:font-bold prose-p:text-slate-600 prose-li:text-slate-600">
                    <div className="whitespace-pre-wrap">{result}</div>
                  </div>
                </div>
                <div className="bg-amber-50 px-6 py-4 border-t border-amber-100 flex items-start gap-3">
                   <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                   <p className="text-sm text-amber-800">
                     <strong>Disclaimer:</strong> This information is AI-generated for educational purposes. It is not a substitute for professional medical advice, diagnosis, or treatment. Always seek the advice of your physician.
                   </p>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HealthBrowser;