import React, { useState } from 'react';
import { Search, MapPin, Navigation, Loader2, Building, Star, AlertCircle, ExternalLink } from 'lucide-react';
import { findHospitals } from '../services/gemini';

interface ParsedHospital {
  name: string;
  address: string;
  rating: string;
  description: string;
}

const HospitalFinder: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<ParsedHospital[]>([]);
  const [rawText, setRawText] = useState('');
  const [mapLinks, setMapLinks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [usingLocation, setUsingLocation] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const parseHospitalText = (text: string): ParsedHospital[] => {
    // Split by the delimiter we requested in the prompt
    const parts = text.split('---HOSPITAL_ITEM---').filter(p => p.trim().length > 0);
    
    return parts.map(part => {
      const lines = part.split('\n').filter(l => l.trim());
      const hospital: any = {};
      
      lines.forEach(line => {
        if (line.includes('Name:')) hospital.name = line.split('Name:')[1].trim();
        else if (line.includes('Address:')) hospital.address = line.split('Address:')[1].trim();
        else if (line.includes('Rating:')) hospital.rating = line.split('Rating:')[1].trim();
        else if (line.includes('Description:')) hospital.description = line.split('Description:')[1].trim();
      });

      // Fallback if parsing fails but text exists (e.g. model didn't follow format perfectly)
      if (!hospital.name && lines.length > 0) {
        hospital.name = lines[0].replace(/^\d+\.\s*/, '').replace(/\*\*/g, ''); // Try to clean up "1. **Name**"
        hospital.description = lines.slice(1).join(' ');
      }

      return hospital as ParsedHospital;
    });
  };

  const handleSearch = async (e?: React.FormEvent, location?: { latitude: number; longitude: number }) => {
    if (e) e.preventDefault();
    
    if (!query.trim() && !location) return;

    setLoading(true);
    setResults([]);
    setRawText('');
    setMapLinks([]);
    setLocationError('');
    setHasSearched(true);

    const searchQuery = location ? (query || "hospitals near me") : query;
    const { text, groundingChunks } = await findHospitals(searchQuery, location);
    
    // Attempt to parse
    const parsed = parseHospitalText(text);
    
    if (parsed.length > 0) {
      setResults(parsed);
    } else {
      setRawText(text); // Fallback to raw text if parsing yielded nothing
    }

    setMapLinks(groundingChunks);
    setLoading(false);
    setUsingLocation(false);
  };

  const handleNearMe = () => {
    if (!navigator.geolocation) {
      setLocationError("Geolocation is not supported by your browser.");
      return;
    }

    setUsingLocation(true);
    setLoading(true);
    
    navigator.geolocation.getCurrentPosition(
      (position) => {
        handleSearch(undefined, {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude
        });
      },
      (error) => {
        console.error("Geolocation error:", error);
        setLocationError("Unable to retrieve your location. Please check permissions.");
        setLoading(false);
        setUsingLocation(false);
      }
    );
  };

  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in min-h-[calc(100vh-6rem)]">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center justify-center p-3 bg-rose-100 rounded-full text-rose-600 mb-2">
          <Building className="w-8 h-8" />
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-slate-900">Hospital Finder AI</h1>
        <p className="text-lg text-slate-500">
          Locate the best hospitals, clinics, and medical centers near you using real-time maps data.
        </p>
      </div>

      {/* Search Bar */}
      <div className="max-w-3xl mx-auto bg-white p-2 rounded-2xl shadow-lg border border-slate-200 flex flex-col md:flex-row gap-2 sticky top-4 z-30">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input
            type="text"
            className="w-full pl-12 pr-4 py-3 bg-transparent border-none outline-none text-slate-800 placeholder:text-slate-400 text-lg"
            placeholder="e.g. Cardiac hospitals in New York..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch(e)}
          />
        </div>
        <div className="flex gap-2">
           <button
            onClick={handleNearMe}
            disabled={loading}
            className="px-4 py-2 bg-slate-100 text-slate-700 hover:bg-slate-200 rounded-xl font-medium transition-colors flex items-center gap-2 whitespace-nowrap"
            title="Find near me"
          >
            <Navigation className={`w-4 h-4 ${usingLocation ? 'animate-pulse text-blue-600' : ''}`} />
            <span className="hidden md:inline">Near Me</span>
          </button>
          <button
            onClick={(e) => handleSearch(e)}
            disabled={loading}
            className="px-6 py-2 bg-rose-600 text-white rounded-xl font-medium hover:bg-rose-700 transition-colors disabled:bg-slate-200 disabled:text-slate-400 flex items-center justify-center min-w-[100px]"
          >
            {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Search"}
          </button>
        </div>
      </div>

      {locationError && (
        <div className="max-w-3xl mx-auto p-3 bg-red-50 text-red-600 text-sm rounded-xl flex items-center justify-center gap-2">
          <AlertCircle className="w-4 h-4" />
          {locationError}
        </div>
      )}

      {/* Results Area */}
      <div className="max-w-4xl mx-auto">
        {!hasSearched ? (
          <div className="text-center py-12 opacity-50">
            <MapPin className="w-16 h-16 text-slate-300 mx-auto mb-4" />
            <p className="text-slate-500">Search for hospitals to see results here</p>
          </div>
        ) : loading ? (
          <div className="space-y-4">
            {[1, 2, 3].map(i => (
              <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-pulse">
                  <div className="flex justify-between items-start mb-4">
                    <div className="h-6 bg-slate-100 rounded w-1/3"></div>
                    <div className="h-6 bg-slate-100 rounded w-16"></div>
                  </div>
                  <div className="h-4 bg-slate-100 rounded w-1/2 mb-2"></div>
                  <div className="h-16 bg-slate-100 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-2 px-2">
                <MapPin className="w-5 h-5 text-rose-600" />
                <h2 className="font-bold text-slate-800 text-lg">Found {results.length > 0 ? results.length : ''} Locations</h2>
            </div>

            {/* Render Parsed Cards */}
            {results.length > 0 ? (
                <div className="grid gap-6">
                    {results.map((hospital, idx) => (
                        <div key={idx} className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 hover:shadow-md transition-shadow relative overflow-hidden group">
                            {/* Number Badge */}
                            <div className="absolute top-0 right-0 bg-slate-100 text-slate-400 font-bold text-4xl opacity-20 px-4 py-2 pointer-events-none group-hover:text-rose-200 group-hover:opacity-100 transition-all">
                                #{idx + 1}
                            </div>

                            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 relative z-10">
                                <div className="space-y-2 flex-1">
                                    <h3 className="text-xl font-bold text-slate-900">{hospital.name}</h3>
                                    
                                    <div className="flex items-start gap-2 text-slate-600">
                                        <MapPin className="w-4 h-4 flex-shrink-0 mt-1 text-slate-400" />
                                        <span>{hospital.address || "Address not available"}</span>
                                    </div>
                                    
                                    {hospital.description && (
                                        <p className="text-sm text-slate-500 mt-2 leading-relaxed bg-slate-50 p-3 rounded-xl border border-slate-100">
                                            {hospital.description}
                                        </p>
                                    )}
                                </div>

                                <div className="flex md:flex-col items-center md:items-end gap-3 md:min-w-[120px]">
                                    {hospital.rating && hospital.rating !== 'N/A' && (
                                        <div className="flex items-center gap-1.5 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-lg border border-amber-100 font-bold">
                                            <Star className="w-4 h-4 fill-amber-500 text-amber-500" />
                                            {hospital.rating}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                // Fallback Text Render
                <div className="bg-white p-6 rounded-2xl border border-slate-200 whitespace-pre-wrap text-slate-700">
                    {rawText || "No results found."}
                </div>
            )}

            {/* Map Sources / Grounding Links */}
            {mapLinks.length > 0 && (
                <div className="mt-8 pt-6 border-t border-slate-200">
                    <h4 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Source Map Links</h4>
                    <div className="flex flex-wrap gap-2">
                        {mapLinks.map((chunk, idx) => {
                            // Extract title and uri safely
                            const title = chunk.web?.title || chunk.title || `Map Location ${idx + 1}`;
                            const uri = chunk.web?.uri || chunk.uri;
                            
                            if (!uri) return null;

                            return (
                                <a 
                                    key={idx} 
                                    href={uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm text-blue-600 hover:bg-blue-50 hover:border-blue-200 transition-colors shadow-sm"
                                >
                                    <ExternalLink className="w-3 h-3" />
                                    {title}
                                </a>
                            );
                        })}
                    </div>
                </div>
            )}

            <div className="bg-amber-50 px-6 py-4 rounded-xl border border-amber-100 flex items-start gap-3">
               <Star className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5 fill-amber-500" />
               <p className="text-sm text-amber-800">
                 <strong>Note:</strong> Ratings and operating hours are subject to change. Please check official sources or call ahead.
               </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HospitalFinder;