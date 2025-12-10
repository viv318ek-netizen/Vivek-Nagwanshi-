import React, { useState } from 'react';
import { ViewState } from './types';
import Sidebar from './components/Sidebar';
import Home from './components/Home';
import MedicalServices from './components/MedicalServices';
import Dashboard from './components/Dashboard';
import SymptomChecker from './components/SymptomChecker';
import ReportSimplifier from './components/ReportSimplifier';
import Appointments from './components/Appointments';
import BookingAppointment from './components/BookingAppointment';
import XrayScanner from './components/XrayScanner';
import MedicationReminders from './components/MedicationReminders';
import CareModels from './components/CareModels';
import HealthBrowser from './components/HealthBrowser';
import VoiceAiAgent from './components/VoiceAiAgent';
import HospitalFinder from './components/HospitalFinder';
import { Menu } from 'lucide-react';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewState>(ViewState.HOME);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderContent = () => {
    switch (currentView) {
      case ViewState.HOME:
        return <Home onChangeView={setCurrentView} />;
      case ViewState.SERVICES:
        return <MedicalServices />;
      case ViewState.CARE_MODELS:
        return <CareModels />;
      case ViewState.DASHBOARD:
        return <Dashboard />;
      case ViewState.SYMPTOM_CHECKER:
        return <SymptomChecker />;
      case ViewState.MEDICATION_REMINDERS:
        return <MedicationReminders />;
      case ViewState.XRAY_SCANNER:
        return <XrayScanner />;
      case ViewState.REPORTS:
        return <ReportSimplifier />;
      case ViewState.APPOINTMENTS:
        return <Appointments />;
      case ViewState.BOOKING:
        return <BookingAppointment />;
      case ViewState.HEALTH_BROWSER:
        return <HealthBrowser />;
      case ViewState.VOICE_AGENT:
        return <VoiceAiAgent />;
      case ViewState.FIND_HOSPITALS:
        return <HospitalFinder />;
      default:
        return <Home onChangeView={setCurrentView} />;
    }
  };

  return (
    <div className="flex h-screen bg-slate-50">
      <Sidebar currentView={currentView} onChangeView={(view) => {
        setCurrentView(view);
        setIsMobileMenuOpen(false);
      }} />

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 w-full bg-white z-50 border-b border-slate-200 px-4 py-3 flex items-center justify-between">
        <span className="font-bold text-lg text-slate-800">MediCare</span>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-slate-600">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-slate-900/50" onClick={() => setIsMobileMenuOpen(false)}>
          <div className="absolute top-0 right-0 w-64 h-full bg-white shadow-xl p-4 pt-16" onClick={e => e.stopPropagation()}>
             <nav className="flex flex-col space-y-2">
                <button onClick={() => { setCurrentView(ViewState.HOME); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Home</button>
                <button onClick={() => { setCurrentView(ViewState.VOICE_AGENT); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">MediVoice</button>
                <button onClick={() => { setCurrentView(ViewState.FIND_HOSPITALS); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Find Hospitals</button>
                <button onClick={() => { setCurrentView(ViewState.HEALTH_BROWSER); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Health Browser</button>
                <button onClick={() => { setCurrentView(ViewState.BOOKING); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Book Appointment</button>
                <button onClick={() => { setCurrentView(ViewState.APPOINTMENTS); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">My Appointments</button>
                <button onClick={() => { setCurrentView(ViewState.SERVICES); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Medical Services</button>
                <button onClick={() => { setCurrentView(ViewState.CARE_MODELS); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Care Models</button>
                <button onClick={() => { setCurrentView(ViewState.DASHBOARD); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Dashboard</button>
                <button onClick={() => { setCurrentView(ViewState.SYMPTOM_CHECKER); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Symptom AI</button>
                <button onClick={() => { setCurrentView(ViewState.MEDICATION_REMINDERS); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Med Reminders</button>
                <button onClick={() => { setCurrentView(ViewState.XRAY_SCANNER); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">AI XMC Scanner</button>
                <button onClick={() => { setCurrentView(ViewState.REPORTS); setIsMobileMenuOpen(false); }} className="text-left px-4 py-3 rounded-lg hover:bg-slate-50 font-medium text-slate-700">Lab Reports</button>
             </nav>
          </div>
        </div>
      )}

      <main className="flex-1 overflow-y-auto w-full pt-16 md:pt-0">
        {renderContent()}
      </main>
    </div>
  );
};

export default App;