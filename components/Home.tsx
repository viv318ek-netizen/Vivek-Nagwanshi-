import React from 'react';
import { ArrowRight, Activity, Users, Award, Clock, Search, Heart, Droplets, Zap, FlaskConical, ShieldCheck } from 'lucide-react';
import { ViewState } from '../types';

interface HomeProps {
  onChangeView: (view: ViewState) => void;
}

const featuredServices = [
  {
    title: 'Kidney Care',
    desc: 'Renal function tests including Creatinine, Urea, and eGFR with detailed reporting.',
    icon: Droplets,
    color: 'bg-cyan-50 text-cyan-600',
    hoverBorder: 'hover:border-cyan-200'
  },
  {
    title: 'Heart Health',
    desc: 'Comprehensive cardiac screening including Lipid Profile, ECG, and risk assessment.',
    icon: Heart,
    color: 'bg-rose-50 text-rose-600',
    hoverBorder: 'hover:border-rose-200'
  },
  {
    title: 'Diabetes Care',
    desc: 'Monitoring of HbA1c, Fasting Blood Sugar, and insulin resistance markers.',
    icon: Zap,
    color: 'bg-amber-50 text-amber-600',
    hoverBorder: 'hover:border-amber-200'
  },
  {
    title: 'Thyroid Profile',
    desc: 'T3, T4, and TSH hormone analysis to monitor thyroid gland function.',
    icon: Activity,
    color: 'bg-purple-50 text-purple-600',
    hoverBorder: 'hover:border-purple-200'
  },
  {
    title: 'Liver Function',
    desc: 'Bilirubin, SGOT, SGPT, and protein tests to assess liver health.',
    icon: FlaskConical,
    color: 'bg-emerald-50 text-emerald-600',
    hoverBorder: 'hover:border-emerald-200'
  },
  {
    title: 'Full Body Checkup',
    desc: 'A holistic analysis covering 80+ parameters for complete health assurance.',
    icon: ShieldCheck,
    color: 'bg-blue-50 text-blue-600',
    hoverBorder: 'hover:border-blue-200'
  }
];

const Home: React.FC<HomeProps> = ({ onChangeView }) => {
  return (
    <div className="animate-fade-in pb-10">
      {/* Hero Section */}
      <div className="relative h-[500px] w-full">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2000" 
            alt="Modern Hospital Building" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-slate-900/40"></div>
        </div>
        
        {/* Search Icon Top Right */}
        <div className="absolute top-6 right-6 z-20">
          <button 
            onClick={() => onChangeView(ViewState.HEALTH_BROWSER)}
            className="bg-white/20 hover:bg-white/30 backdrop-blur-md text-white p-3 rounded-full border border-white/30 transition-all shadow-lg group flex items-center gap-2 pr-4 pl-3"
            title="Search Health Info"
          >
            <Search className="w-6 h-6" />
            <span className="font-semibold text-sm">Health Browser</span>
          </button>
        </div>
        
        <div className="relative h-full max-w-7xl mx-auto px-6 flex flex-col justify-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 leading-tight max-w-2xl">
            World-Class Healthcare <br/> At Your Fingertips
          </h1>
          <p className="text-lg md:text-xl text-blue-100 max-w-xl mb-8 leading-relaxed">
            Experience the future of medicine with MediCare. From advanced diagnostics to personalized care plans, we are dedicated to your well-being.
          </p>
          <div className="flex flex-wrap gap-4">
            <button 
              onClick={() => onChangeView(ViewState.SERVICES)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-all flex items-center gap-2 shadow-lg shadow-blue-600/30"
            >
              Our Services <ArrowRight className="w-5 h-5" />
            </button>
            <button 
              onClick={() => onChangeView(ViewState.APPOINTMENTS)}
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-3 rounded-xl font-semibold transition-all"
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      {/* Info Stats */}
      <div className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-blue-600 flex items-center gap-4">
            <div className="p-3 bg-blue-50 rounded-full text-blue-600">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">24/7</div>
              <div className="text-sm text-slate-500">Emergency Care</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-emerald-500 flex items-center gap-4">
            <div className="p-3 bg-emerald-50 rounded-full text-emerald-600">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">500+</div>
              <div className="text-sm text-slate-500">Expert Doctors</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-purple-500 flex items-center gap-4">
            <div className="p-3 bg-purple-50 rounded-full text-purple-600">
              <Award className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">#1</div>
              <div className="text-sm text-slate-500">Patient Choice</div>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-lg border-b-4 border-orange-500 flex items-center gap-4">
            <div className="p-3 bg-orange-50 rounded-full text-orange-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900">15 min</div>
              <div className="text-sm text-slate-500">Avg Wait Time</div>
            </div>
          </div>
        </div>
      </div>

      {/* Featured Services Section */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm bg-blue-50 px-3 py-1 rounded-full">Preventative Care</span>
          <h2 className="text-3xl font-bold text-slate-900 mt-4">Featured Health Packages</h2>
          <p className="text-slate-500 mt-2 max-w-2xl mx-auto">
            Choose from our specialized health packages designed to give you precise insights into your well-being.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredServices.map((service, idx) => {
            const Icon = service.icon;
            return (
              <div 
                key={idx}
                onClick={() => onChangeView(ViewState.SERVICES)}
                className={`group bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer relative overflow-hidden ${service.hoverBorder} hover:-translate-y-1`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${service.color} group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="w-7 h-7" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-900 mb-3">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed mb-6">
                  {service.desc}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                  View Details
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>

                {/* Decorative background element */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-slate-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-bl-[100px] pointer-events-none"></div>
              </div>
            );
          })}
        </div>
      </div>

      {/* About Section */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-blue-600 font-semibold tracking-wider uppercase text-sm">About MediCare</span>
            <h2 className="text-3xl font-bold text-slate-900 mt-2 mb-6">Combining Compassion with Advanced Technology</h2>
            <p className="text-slate-600 leading-relaxed mb-6">
              At MediCare, we believe healthcare should be accessible, efficient, and patient-centered. Our state-of-the-art facility integrates the latest medical advancements with a holistic approach to healing.
            </p>
            <p className="text-slate-600 leading-relaxed mb-6">
              Whether you need a routine checkup, specialized surgical procedure, or emergency assistance, our multidisciplinary team is ready to serve you with excellence and care.
            </p>
            <ul className="space-y-3">
              {[
                "Comprehensive patient portal for easy health tracking",
                "AI-powered diagnostic assistance tools",
                "Integrated pharmacy and laboratory services",
                "Telemedicine support for remote consultations"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-slate-700 font-medium">
                  <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div className="relative">
            <img 
              src="https://images.unsplash.com/photo-1631815589968-fdb09a223b1e?auto=format&fit=crop&q=80&w=1000" 
              alt="Doctor with patient" 
              className="rounded-3xl shadow-2xl relative z-10"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-blue-100 rounded-full blur-3xl -z-0"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-purple-100 rounded-full blur-3xl -z-0"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;