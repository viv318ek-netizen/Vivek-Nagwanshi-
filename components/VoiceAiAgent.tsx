import React, { useState, useRef, useEffect } from 'react';
import { Mic, MicOff, Power, Activity, Volume2, AlertCircle, Plus, Check, Globe } from 'lucide-react';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';

// --- Audio Helper Functions ---

function createBlob(data: Float32Array): Blob {
  const l = data.length;
  const int16 = new Int16Array(l);
  for (let i = 0; i < l; i++) {
    // Clamp values to [-1, 1] then convert to 16-bit PCM
    const s = Math.max(-1, Math.min(1, data[i]));
    int16[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
  }
  return new Blob([int16], { type: 'audio/pcm' });
}

function decode(base64: string) {
  const binaryString = atob(base64);
  const len = binaryString.length;
  const bytes = new Uint8Array(len);
  for (let i = 0; i < len; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
}

async function decodeAudioData(
  data: Uint8Array,
  ctx: AudioContext,
  sampleRate: number,
  numChannels: number,
): Promise<AudioBuffer> {
  const dataInt16 = new Int16Array(data.buffer);
  const frameCount = dataInt16.length / numChannels;
  const buffer = ctx.createBuffer(numChannels, frameCount, sampleRate);

  for (let channel = 0; channel < numChannels; channel++) {
    const channelData = buffer.getChannelData(channel);
    for (let i = 0; i < frameCount; i++) {
      channelData[i] = dataInt16[i * numChannels + channel] / 32768.0;
    }
  }
  return buffer;
}

function encode(bytes: Uint8Array) {
  let binary = '';
  const len = bytes.byteLength;
  for (let i = 0; i < len; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
}

// --- Component ---

const VoiceAiAgent: React.FC = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [logs, setLogs] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);

  // Refs for audio and session management
  const audioContextRef = useRef<AudioContext | null>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const processorRef = useRef<ScriptProcessorNode | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const nextStartTimeRef = useRef<number>(0);
  const sourcesRef = useRef<Set<AudioBufferSourceNode>>(new Set());
  const aiRef = useRef<GoogleGenAI | null>(null);
  const sessionRef = useRef<Promise<any> | null>(null);

  const languages = [
    { name: 'English', native: 'English' },
    { name: 'Hindi', native: 'हिंदी' },
    { name: 'Marathi', native: 'मराठी' }
  ];

  const addLog = (msg: string) => {
    setLogs(prev => [...prev.slice(-4), msg]); // Keep last 5 logs
  };

  const startSession = async () => {
    try {
      setError(null);
      addLog("Initializing audio...");
      
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaStreamRef.current = stream;

      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      const ctx = new AudioContextClass({ sampleRate: 16000 }); // Input sample rate
      audioContextRef.current = ctx;

      // Output context (higher quality for playback)
      const outputCtx = new AudioContextClass({ sampleRate: 24000 });

      addLog("Connecting to Gemini...");
      
      // Initialize Google GenAI
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
      aiRef.current = ai;

      const sessionPromise = ai.live.connect({
        model: 'gemini-2.5-flash-native-audio-preview-09-2025',
        callbacks: {
          onopen: () => {
            addLog("Connected! Start speaking.");
            setIsConnected(true);

            // Setup Input Processing
            const source = ctx.createMediaStreamSource(stream);
            sourceRef.current = source;
            
            // Using ScriptProcessor for compatibility with SDK example requirements
            const processor = ctx.createScriptProcessor(4096, 1, 1);
            processorRef.current = processor;

            processor.onaudioprocess = (e) => {
              const inputData = e.inputBuffer.getChannelData(0);
              // Convert Float32 to PCM 16-bit
              const pcmData = new Int16Array(inputData.length);
              for (let i = 0; i < inputData.length; i++) {
                 const s = Math.max(-1, Math.min(1, inputData[i]));
                 pcmData[i] = s < 0 ? s * 0x8000 : s * 0x7FFF;
              }
              
              // Helper to base64 encode the Uint8Array view of the Int16Array
              const uint8 = new Uint8Array(pcmData.buffer);
              const base64Data = encode(uint8);

              // Send to model
              sessionPromise.then((session: any) => {
                session.sendRealtimeInput({
                   media: {
                     mimeType: 'audio/pcm;rate=16000',
                     data: base64Data
                   }
                });
              });
            };

            source.connect(processor);
            processor.connect(ctx.destination);
          },
          onmessage: async (message: LiveServerMessage) => {
             // Handle Audio Output
             const base64Audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
             if (base64Audio) {
                setIsSpeaking(true);
                const audioBuffer = await decodeAudioData(
                  decode(base64Audio),
                  outputCtx,
                  24000,
                  1
                );
                
                // Schedule playback
                nextStartTimeRef.current = Math.max(nextStartTimeRef.current, outputCtx.currentTime);
                
                const source = outputCtx.createBufferSource();
                source.buffer = audioBuffer;
                source.connect(outputCtx.destination);
                
                source.addEventListener('ended', () => {
                  sourcesRef.current.delete(source);
                  if (sourcesRef.current.size === 0) setIsSpeaking(false);
                });

                source.start(nextStartTimeRef.current);
                nextStartTimeRef.current += audioBuffer.duration;
                sourcesRef.current.add(source);
             }

             // Handle Interruptions
             if (message.serverContent?.interrupted) {
               addLog("Interrupted by user.");
               sourcesRef.current.forEach(s => s.stop());
               sourcesRef.current.clear();
               nextStartTimeRef.current = 0;
               setIsSpeaking(false);
             }
          },
          onclose: () => {
            addLog("Session closed.");
            setIsConnected(false);
            stopSession();
          },
          onerror: (err) => {
            console.error(err);
            setError("Connection error. Please try again.");
            stopSession();
          }
        },
        config: {
           responseModalities: [Modality.AUDIO],
           systemInstruction: `You are MediVoice, an expert AI medical consultant. 
           Your role is to answer complex medical questions with professional depth, accuracy, and empathy.
           
           CURRENT LANGUAGE SETTING: ${selectedLanguage}.
           
           CRITICAL INSTRUCTION:
           You must speak and converse with the user in ${selectedLanguage} ONLY.
           If the user speaks another language, kindly reply in ${selectedLanguage} that you are currently set to this language, or switch if they ask.
           
           Guidelines:
           1. Use professional medical terminology but explain it clearly in ${selectedLanguage}.
           2. Provide detailed, evidence-based answers.
           3. If a user describes serious symptoms, immediately advise them to seek emergency care.
           4. Be concise in conversation but thorough in explanation.
           5. Maintain a calm, reassuring, and professional voice tone.`,
           speechConfig: {
             voiceConfig: { prebuiltVoiceConfig: { voiceName: 'Kore' } }
           }
        }
      });
      
      sessionRef.current = sessionPromise;

    } catch (err) {
      console.error("Failed to start session:", err);
      setError("Failed to access microphone or connect to AI service.");
      setIsConnected(false);
    }
  };

  const stopSession = () => {
    // Close session if possible (the SDK might handle this differently, but we clean up client side)
    // There isn't a direct 'close' method on the promise, but we can clean up resources.
    
    if (processorRef.current) {
      processorRef.current.disconnect();
      processorRef.current = null;
    }
    if (sourceRef.current) {
      sourceRef.current.disconnect();
      sourceRef.current = null;
    }
    if (mediaStreamRef.current) {
      mediaStreamRef.current.getTracks().forEach(track => track.stop());
      mediaStreamRef.current = null;
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
      audioContextRef.current = null;
    }
    
    // Stop all playing audio
    sourcesRef.current.forEach(s => s.stop());
    sourcesRef.current.clear();

    setIsConnected(false);
    setIsSpeaking(false);
    addLog("Session stopped.");
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSession();
    };
  }, []);

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in min-h-[calc(100vh-6rem)] flex flex-col items-center justify-center relative">
       
       {/* Language Selector */}
       <div className="absolute top-0 right-0 p-4 z-20">
         <div className="relative">
            <button 
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              className="bg-white border border-slate-200 text-slate-600 hover:text-blue-600 hover:border-blue-200 p-2.5 rounded-full shadow-sm transition-all flex items-center justify-center group"
              title="Change Language"
            >
              <Plus className={`w-5 h-5 transition-transform duration-300 ${isLanguageMenuOpen ? 'rotate-45 text-blue-600' : ''}`} />
            </button>
            
            {isLanguageMenuOpen && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                <div className="p-3 bg-slate-50 border-b border-slate-100 flex items-center gap-2">
                  <Globe className="w-3.5 h-3.5 text-slate-400" />
                  <span className="text-xs font-bold text-slate-600 uppercase tracking-wider">Language</span>
                </div>
                <div className="p-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.name}
                      onClick={() => {
                        setSelectedLanguage(lang.name);
                        setIsLanguageMenuOpen(false);
                      }}
                      className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm transition-colors ${
                        selectedLanguage === lang.name
                          ? 'bg-blue-50 text-blue-700 font-medium'
                          : 'text-slate-600 hover:bg-slate-50'
                      }`}
                    >
                      <div className="flex flex-col items-start text-left">
                        <span>{lang.name}</span>
                        <span className="text-[10px] text-slate-400 font-medium">{lang.native}</span>
                      </div>
                      {selectedLanguage === lang.name && <Check className="w-4 h-4 text-blue-600" />}
                    </button>
                  ))}
                </div>
              </div>
            )}
         </div>
       </div>

       <div className="text-center space-y-4 mb-8">
         <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl shadow-lg mb-4">
           <Activity className="w-10 h-10 text-white" />
         </div>
         <h1 className="text-4xl font-bold text-slate-900">MediVoice</h1>
         <div className="flex items-center justify-center gap-2 text-lg text-slate-500 max-w-xl mx-auto">
           <span>Your professional AI medical consultant.</span>
           <span className="bg-slate-100 px-2 py-0.5 rounded-md text-xs font-semibold text-slate-600 uppercase border border-slate-200">
             {selectedLanguage}
           </span>
         </div>
       </div>

       {/* Main Interaction Area */}
       <div className="relative w-full max-w-md aspect-square bg-slate-900 rounded-full flex items-center justify-center shadow-2xl border-8 border-slate-800 overflow-hidden">
          
          {/* Ambient Background Animation */}
          <div className={`absolute inset-0 bg-gradient-to-br from-indigo-600/20 to-purple-600/20 transition-opacity duration-1000 ${isConnected ? 'opacity-100' : 'opacity-0'}`}></div>

          {/* Visualizer Rings */}
          {isConnected && (
            <>
              <div className={`absolute w-full h-full border border-indigo-500/30 rounded-full ${isSpeaking ? 'animate-ping' : 'scale-90 opacity-20'}`} style={{ animationDuration: '3s' }}></div>
              <div className={`absolute w-3/4 h-3/4 border border-purple-500/30 rounded-full ${isSpeaking ? 'animate-ping' : 'scale-90 opacity-30'}`} style={{ animationDuration: '2s', animationDelay: '0.5s' }}></div>
              <div className={`absolute w-1/2 h-1/2 border border-blue-500/30 rounded-full ${isSpeaking ? 'animate-ping' : 'scale-90 opacity-40'}`} style={{ animationDuration: '1.5s', animationDelay: '1s' }}></div>
            </>
          )}

          {/* Center Control */}
          <div className="relative z-10 flex flex-col items-center gap-4">
             {isConnected ? (
               <button 
                 onClick={stopSession}
                 className="w-24 h-24 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-xl shadow-red-500/30"
               >
                 <MicOff className="w-10 h-10" />
               </button>
             ) : (
               <button 
                 onClick={startSession}
                 className="w-24 h-24 bg-indigo-600 hover:bg-indigo-700 rounded-full flex items-center justify-center text-white transition-all transform hover:scale-105 shadow-xl shadow-indigo-600/30 group"
               >
                 <Mic className="w-10 h-10 group-hover:animate-pulse" />
               </button>
             )}

             <div className="h-8 flex items-center justify-center">
                {isConnected ? (
                   <div className="flex items-center gap-2 text-indigo-300 font-medium animate-pulse">
                      <Volume2 className="w-4 h-4" />
                      {isSpeaking ? "Agent Speaking..." : "Listening..."}
                   </div>
                ) : (
                   <span className="text-slate-500 font-medium">Tap to Start</span>
                )}
             </div>
          </div>
       </div>

       {/* Status / Logs */}
       <div className="w-full max-w-lg mt-8 space-y-4">
         {error && (
           <div className="bg-red-50 border border-red-100 text-red-600 px-4 py-3 rounded-xl flex items-center gap-2 justify-center">
             <AlertCircle className="w-5 h-5" />
             {error}
           </div>
         )}
         
         <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm min-h-[100px] flex flex-col justify-end">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 block">System Logs</span>
            <div className="space-y-1">
              {logs.length === 0 && <span className="text-slate-300 text-sm italic">Ready to connect...</span>}
              {logs.map((log, i) => (
                <div key={i} className="text-sm text-slate-600 font-mono">
                  <span className="text-indigo-400 mr-2">{'>'}</span>{log}
                </div>
              ))}
            </div>
         </div>

         <div className="text-center text-xs text-slate-400 max-w-sm mx-auto">
           Powered by Gemini 2.5 Flash Native Audio. 
           <br/>Note: This is an AI simulation. Do not rely on it for life-threatening medical emergencies.
         </div>
       </div>
    </div>
  );
};

export default VoiceAiAgent;