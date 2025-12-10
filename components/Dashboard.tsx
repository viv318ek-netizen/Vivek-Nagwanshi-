import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';
import { Activity, Heart, Calendar, ArrowUp, Droplets, Thermometer } from 'lucide-react';
import { Appointment } from '../types';

const bpData = [
  { name: 'Mon', systolic: 120, diastolic: 80 },
  { name: 'Tue', systolic: 122, diastolic: 82 },
  { name: 'Wed', systolic: 118, diastolic: 79 },
  { name: 'Thu', systolic: 121, diastolic: 81 },
  { name: 'Fri', systolic: 124, diastolic: 83 },
  { name: 'Sat', systolic: 119, diastolic: 78 },
  { name: 'Sun', systolic: 120, diastolic: 80 },
];

const heartRateData = [
  { time: '08:00', bpm: 72 },
  { time: '10:00', bpm: 75 },
  { time: '12:00', bpm: 82 },
  { time: '14:00', bpm: 78 },
  { time: '16:00', bpm: 74 },
  { time: '18:00', bpm: 70 },
];

const upcomingAppointments: Appointment[] = [
  { id: '1', doctor: 'Dr. Anjali Sharma', specialty: 'Cardiologist', date: 'Oct 24, 2023', time: '10:00 AM', status: 'upcoming' },
  { id: '2', doctor: 'Dr. Rajesh Kumar', specialty: 'General Practitioner', date: 'Nov 02, 2023', time: '02:30 PM', status: 'upcoming' },
];

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 md:p-8 space-y-8 animate-fade-in max-w-7xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Good Morning, Sir</h1>
        <p className="text-slate-500 mt-1">Here is your daily health summary.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-rose-50 rounded-lg text-rose-500">
              <Heart className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full flex items-center gap-1">
              <ArrowUp className="w-3 h-3" /> 2%
            </span>
          </div>
          <div className="text-3xl font-bold text-slate-900">72 <span className="text-sm font-normal text-slate-500">bpm</span></div>
          <div className="text-sm text-slate-500 mt-1">Avg Heart Rate</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-50 rounded-lg text-blue-500">
              <Activity className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-700 rounded-full">Normal</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">120/80</div>
          <div className="text-sm text-slate-500 mt-1">Blood Pressure</div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500">
              <Droplets className="w-6 h-6" />
            </div>
            <span className="text-xs font-medium px-2 py-1 bg-slate-100 text-slate-600 rounded-full">-5%</span>
          </div>
          <div className="text-3xl font-bold text-slate-900">96 <span className="text-sm font-normal text-slate-500">mg/dL</span></div>
          <div className="text-sm text-slate-500 mt-1">Glucose Level</div>
        </div>

         <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-orange-50 rounded-lg text-orange-500">
              <Thermometer className="w-6 h-6" />
            </div>
          </div>
          <div className="text-3xl font-bold text-slate-900">98.6 <span className="text-sm font-normal text-slate-500">°F</span></div>
          <div className="text-sm text-slate-500 mt-1">Body Temperature</div>
        </div>
      </div>

      {/* Main Charts Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 lg:col-span-2">
          <h2 className="text-lg font-bold text-slate-900 mb-6">Blood Pressure History</h2>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={bpData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748B'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748B'}} domain={[60, 140]} />
                <Tooltip 
                  contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="systolic" stroke="#3B82F6" strokeWidth={3} dot={{r: 4, fill: '#3B82F6', strokeWidth: 0}} activeDot={{r: 6}} name="Systolic" />
                <Line type="monotone" dataKey="diastolic" stroke="#F43F5E" strokeWidth={3} dot={{r: 4, fill: '#F43F5E', strokeWidth: 0}} activeDot={{r: 6}} name="Diastolic" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
           <h2 className="text-lg font-bold text-slate-900 mb-6">Heart Rate Trend</h2>
           <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={heartRateData}>
                <defs>
                  <linearGradient id="colorBpm" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EC4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#EC4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E2E8F0" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748B'}} />
                <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}/>
                <Area type="monotone" dataKey="bpm" stroke="#EC4899" strokeWidth={3} fillOpacity={1} fill="url(#colorBpm)" />
              </AreaChart>
            </ResponsiveContainer>
           </div>
        </div>
      </div>

      {/* Appointments */}
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-slate-900">Upcoming Appointments</h2>
          <button className="text-blue-600 text-sm font-medium hover:text-blue-700">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {upcomingAppointments.map((apt) => (
            <div key={apt.id} className="flex items-center gap-4 p-4 rounded-xl border border-slate-100 hover:border-blue-100 hover:bg-blue-50/50 transition-colors">
              <div className="bg-blue-100 p-3 rounded-lg text-blue-600">
                <Calendar className="w-6 h-6" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-900">{apt.doctor}</h3>
                <p className="text-sm text-slate-500">{apt.specialty}</p>
                <div className="flex items-center gap-3 mt-1 text-xs text-slate-400 font-medium">
                  <span>{apt.date}</span>
                  <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                  <span>{apt.time}</span>
                </div>
              </div>
              <div className="ml-auto">
                 <button className="px-3 py-1.5 text-sm bg-white border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors">
                  Details
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;