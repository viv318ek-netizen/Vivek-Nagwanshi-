import React, { useState } from 'react';
import { ViewState } from '../types';
import { LayoutDashboard, Stethoscope, FileText, Calendar, Activity, LogOut, Scan, ChevronLeft, ChevronRight, Bell, Home, Building2, Network, PlusCircle, Mic2, Navigation } from 'lucide-react';

interface SidebarProps {
  currentView: ViewState;
  onChangeView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentView, onChangeView }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const menuItems = [
    { id: ViewState.HOME, label: 'Home', icon: Home },
    { id: ViewState.VOICE_AGENT, label: 'MediVoice', icon: Mic2 },
    { id: ViewState.FIND_HOSPITALS, label: 'Find Hospitals', icon: Navigation },
    { id: ViewState.HEALTH_BROWSER, label: 'Health Browser', icon: Activity },
    { id: ViewState.BOOKING, label: 'Book Appointment', icon: PlusCircle },
    { id: ViewState.APPOINTMENTS, label: 'My Appointments', icon: Calendar },
    { id: ViewState.SERVICES, label: 'Medical Services', icon: Building2 },
    { id: ViewState.CARE_MODELS, label: 'Care Models', icon: Network },
    { id: ViewState.DASHBOARD, label: 'Dashboard', icon: LayoutDashboard },
    { id: ViewState.SYMPTOM_CHECKER, label: 'Symptom AI', icon: Stethoscope },
    { id: ViewState.MEDICATION_REMINDERS, label: 'Med Reminders', icon: Bell },
    { id: ViewState.XRAY_SCANNER, label: 'AI XMC Scanner', icon: Scan },
    { id: ViewState.REPORTS, label: 'Lab Reports', icon: FileText },
  ];

  return (
    <div 
      className={`${isCollapsed ? 'w-20' : 'w-64'} bg-white border-r border-slate-200 h-screen hidden md:flex flex-col sticky top-0 transition-all duration-300 ease-in-out relative`}
    >
      <button 
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-10 bg-white border border-slate-200 text-slate-400 hover:text-blue-600 rounded-full p-1.5 shadow-sm z-10 transition-colors"
      >
        {isCollapsed ? <ChevronRight size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'gap-3'} h-20 overflow-hidden`}>
        <div className="bg-blue-600 p-2 rounded-lg flex-shrink-0 transition-all">
          <Activity className="text-white w-6 h-6" />
        </div>
        <span className={`text-xl font-bold text-slate-800 whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
          MediCare
        </span>
      </div>

      <nav className="flex-1 px-3 py-4 space-y-2 overflow-x-hidden custom-scrollbar overflow-y-auto">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onChangeView(item.id)}
              className={`w-full flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 rounded-xl transition-all duration-200 group relative ${
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-slate-500 hover:bg-slate-50 hover:text-slate-700'
              }`}
            >
              <Icon className={`w-5 h-5 flex-shrink-0 ${isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'}`} />
              <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
                {item.label}
              </span>
              
              {isCollapsed && (
                <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg">
                  {item.label}
                </div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-100 overflow-x-hidden">
        <button className={`flex items-center ${isCollapsed ? 'justify-center px-2' : 'gap-3 px-4'} py-3 text-slate-500 hover:text-red-500 w-full transition-colors rounded-xl hover:bg-slate-50 group relative`}>
          <LogOut className="w-5 h-5 flex-shrink-0" />
          <span className={`font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100 w-auto'}`}>
            Sign Out
          </span>
          {isCollapsed && (
            <div className="absolute left-full ml-4 px-2 py-1 bg-slate-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 pointer-events-none whitespace-nowrap z-50 transition-opacity shadow-lg">
              Sign Out
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default Sidebar;