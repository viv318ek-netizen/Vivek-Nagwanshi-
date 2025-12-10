import React, { useEffect, useState } from 'react';
import { Sparkles, Plus, Check, Globe } from 'lucide-react';

const languages = [
  { code: 'en', name: 'English (US)', flag: '🇺🇸' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸' },
  { code: 'fr', name: 'French', flag: '🇫🇷' },
  { code: 'de', name: 'German', flag: '🇩🇪' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳' },
  { code: 'zh', name: 'Mandarin', flag: '🇨🇳' },
  { code: 'jp', name: 'Japanese', flag: '🇯🇵' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹' },
];

const AiVoiceAgent: React.FC = () => {
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);

  useEffect(() => {
    // Logic adapted from the provided Unicorn Studio snippet:
    // This ensures the script is loaded and initialized exactly as requested
    if (!(window as any).UnicornStudio) {
      (window as any).UnicornStudio = { isInitialized: false };
      const script = document.createElement('script');
      script.src = "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.5.2/dist/unicornStudio.umd.js";
      script.onload = () => {
         if (!(window as any).UnicornStudio.isInitialized) {
            (window as any).UnicornStudio.init();
            (window as any).UnicornStudio.isInitialized = true;
         }
      };
      (document.head || document.body).appendChild(script);
    } else {
       // If script exists (e.g. from previous navigation), ensure init is called
       if ((window as any).UnicornStudio.init) {
         (window as any).UnicornStudio.init();
       }
    }
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in relative min-h-[calc(100vh-4rem)]">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-20">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">HealthGuard AI Voice Agent</h1>
          <p className="text-slate-500 mt-1">Your Intelligent Health Companion • Speaking {selectedLanguage.name}</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white px-5 py-2.5 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg shadow-purple-500/20">
                <Sparkles className="w-4 h-4" />
                Live Agent
            </div>
            
            <div className="relative">
                <button 
                    onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                    className="bg-white border border-slate-200 text-slate-700 hover:text-blue-600 hover:border-blue-200 p-2.5 rounded-full shadow-sm transition-all flex items-center justify-center group"
                    title="Select Language"
                >
                    <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Language Dropdown */}
                {isLangMenuOpen && (
                    <div className="absolute top-full right-0 mt-3 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 z-50">
                        <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                            <Globe className="w-4 h-4 text-slate-400" />
                            <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Select Language</span>
                        </div>
                        <div className="max-h-80 overflow-y-auto p-1 custom-scrollbar">
                            {languages.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => {
                                        setSelectedLanguage(lang);
                                        setIsLangMenuOpen(false);
                                    }}
                                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-sm transition-colors ${
                                        selectedLanguage.code === lang.code 
                                            ? 'bg-blue-50 text-blue-700 font-semibold' 
                                            : 'text-slate-600 hover:bg-slate-50'
                                    }`}
                                >
                                    <span className="flex items-center gap-3">
                                        <span className="text-lg">{lang.flag}</span>
                                        {lang.name}
                                    </span>
                                    {selectedLanguage.code === lang.code && <Check className="w-4 h-4 text-blue-600" />}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
      </div>

      <div className="bg-slate-900 rounded-3xl overflow-hidden shadow-2xl min-h-[600px] flex items-center justify-center relative border border-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/40 via-slate-900/0 to-slate-900/0 pointer-events-none"></div>
        
        {/* 
          Container for the Unicorn Studio Embed.
          We scale the 1080x1080 container to fit responsively within the view.
        */}
        <div className="transform scale-[0.4] sm:scale-[0.55] md:scale-[0.7] lg:scale-90 xl:scale-100 origin-center transition-transform duration-500">
             <div data-us-project="dDkXgbyTkVSr31w3gMgx" style={{ width: '1080px', height: '1080px' }}></div>
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-white/10 backdrop-blur-md border border-white/20 px-6 py-3 rounded-2xl text-white/90 text-sm flex items-center gap-3">
                <div className="flex gap-1 h-3 items-center">
                    <span className="w-1 h-3 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="w-1 h-2 bg-emerald-400 rounded-full animate-pulse delay-75"></span>
                    <span className="w-1 h-4 bg-emerald-400 rounded-full animate-pulse delay-150"></span>
                </div>
                Listening for "{selectedLanguage.name}" input...
            </div>
        </div>
      </div>
    </div>
  );
};

export default AiVoiceAgent;