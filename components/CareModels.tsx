import React from 'react';
import { Video, Share2, Crown, Store, Home, CheckCircle2, ArrowRight } from 'lucide-react';

const models = [
  {
    title: 'Telemedicine/Telehealth',
    description: 'Remote delivery of care via video, phone, or apps. Allows patients to consult with doctors without visiting a clinic, suitable for minor infections, mental health, and follow-ups.',
    icon: Video,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Integrated Health Systems',
    description: 'Large networks that provide coordinated care across all settings (hospitals, clinics, surgery centers). Ensures seamless data sharing and continuity of care for patients.',
    icon: Share2,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Concierge Medicine',
    description: 'Direct payment models for enhanced access to a physician. Patients typically pay a membership fee for longer appointments, 24/7 access, and personalized preventative care.',
    icon: Crown,
    color: 'bg-amber-100 text-amber-600'
  },
  {
    title: 'Retail & Walk-in Clinics',
    description: 'Convenient care located in pharmacies or stores. Ideal for minor illnesses (flu, strep throat), vaccinations, and simple health screenings with no appointment needed.',
    icon: Store,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Home Health Services',
    description: 'Care delivered directly to a patient\'s home. Includes skilled nursing, physical therapy, and assistance with daily activities for elderly or post-surgical patients.',
    icon: Home,
    color: 'bg-rose-100 text-rose-600'
  }
];

const CareModels: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
      `}</style>

      <div className="max-w-3xl animate-fade-in-up">
        <h1 className="text-2xl font-bold text-slate-900">Healthcare Delivery Models</h1>
        <p className="text-slate-500 mt-1">
          Explore the various ways medical care is delivered today, from digital consultations to comprehensive home services.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {models.map((model, idx) => {
          const Icon = model.icon;
          return (
            <div 
              key={idx} 
              className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl hover:border-blue-200 hover:-translate-y-1 transition-all duration-300 group h-full flex flex-col opacity-0 animate-fade-in-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className={`p-3 rounded-xl ${model.color} group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-lg text-slate-900 leading-tight group-hover:text-blue-700 transition-colors">
                  {model.title}
                </h3>
              </div>
              <p className="text-slate-600 text-sm leading-relaxed flex-1">
                {model.description}
              </p>
              <div className="mt-4 pt-4 border-t border-slate-50 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-blue-500 transition-colors">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-slate-300 group-hover:text-blue-500 transition-colors" />
                  <span>Available Service</span>
                </div>
                <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
              </div>
            </div>
          );
        })}
      </div>

      <div 
        className="bg-gradient-to-br from-slate-900 to-slate-800 rounded-3xl p-8 text-white relative overflow-hidden group opacity-0 animate-fade-in-up"
        style={{ animationDelay: '600ms' }}
      >
        <div className="relative z-10 max-w-2xl">
          <h2 className="text-2xl font-bold mb-4">Which model is right for you?</h2>
          <p className="text-slate-300 mb-6 leading-relaxed">
            Choosing the right care delivery model depends on your specific needs, urgency, and budget. 
            For life-threatening emergencies, always choose Emergency Care. for routine checkups, Primary Care or Telehealth might be best.
          </p>
          <button className="bg-white text-slate-900 px-6 py-2.5 rounded-xl font-bold hover:bg-slate-50 hover:scale-105 transition-all duration-300 shadow-lg shadow-white/10">
            Contact a Care Coordinator
          </button>
        </div>
        
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 -mr-16 -mt-16 w-64 h-64 bg-white/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-20 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '1000ms' }}></div>
        <div className="absolute top-1/2 right-1/4 w-16 h-16 bg-indigo-500/20 rounded-full blur-xl animate-bounce" style={{ animationDuration: '3s' }}></div>
      </div>
    </div>
  );
};

export default CareModels;