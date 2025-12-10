import React from 'react';
import { 
  Heart, Bone, Brain, Baby, Stethoscope, Scissors, 
  Smile, Pill, Activity, Zap, Search, Monitor, 
  FlaskConical, Phone, Microscope, UserPlus
} from 'lucide-react';

const coreServices = [
  { name: 'General Medicine & Primary Care', icon: Stethoscope, desc: 'Comprehensive health checkups and preventative care for all ages.' },
  { name: 'Emergency & Critical Care', icon: Zap, desc: '24/7 life-saving support with advanced trauma and ICU facilities.' },
  { name: 'Diagnostic Imaging', icon: Search, desc: 'State-of-the-art X-Ray, MRI, CT Scans, and Ultrasound services.' },
  { name: 'Laboratory & Pathology', icon: FlaskConical, desc: 'Accurate and rapid testing services for precise diagnosis.' },
  { name: 'Telemedicine', icon: Phone, desc: 'Virtual consultations with specialists from the comfort of your home.' },
];

const specialties = [
  { name: 'Cardiology', icon: Heart, desc: 'Expert heart care including diagnostics, surgery, and rehabilitation.' },
  { name: 'Orthopedics', icon: Bone, desc: 'Treatment for bone, joint, and muscle conditions and injuries.' },
  { name: 'Neurology', icon: Brain, desc: 'Advanced care for disorders of the brain, spine, and nervous system.' },
  { name: 'Pediatrics', icon: Baby, desc: 'Specialized healthcare for infants, children, and adolescents.' },
  { name: 'Gynecology & Obstetrics', icon: UserPlus, desc: 'Women\'s health, pregnancy care, and reproductive medicine.' },
  { name: 'Dermatology', icon: Activity, desc: 'Diagnosis and treatment for skin, hair, and nail conditions.' },
  { name: 'ENT Care', icon: Stethoscope, desc: 'Specialized treatment for ear, nose, and throat disorders.' },
  { name: 'Dental Services', icon: Smile, desc: 'Comprehensive dental care including cosmetic and surgical procedures.' },
  { name: 'Mental Health', icon: Brain, desc: 'Counseling and psychiatric services for mental well-being.' },
  { name: 'Physiotherapy', icon: Activity, desc: 'Rehabilitation services to restore movement and function.' },
  { name: 'Oncology', icon: Microscope, desc: 'Compassionate cancer care with advanced treatment options.' },
  { name: 'Gastroenterology', icon: Pill, desc: 'Digestive health services for stomach and intestinal disorders.' },
  { name: 'Urology', icon: Activity, desc: 'Treatment for urinary tract and male reproductive system issues.' },
  { name: 'Endocrinology', icon: Activity, desc: 'Management of diabetes, thyroid, and hormonal disorders.' },
  { name: 'Wellness Programs', icon: Activity, desc: 'Preventive health checkups and personalized wellness plans.' },
];

const MedicalServices: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-12 animate-fade-in">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">Our Medical Services</h1>
        <p className="text-slate-500 text-lg">
          We offer a comprehensive range of medical specialties and support services to ensure you receive the best possible care under one roof.
        </p>
      </div>

      {/* Core Services Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800">Core Facilities</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coreServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <div key={index} className="bg-blue-50/50 p-6 rounded-2xl border border-blue-100 hover:border-blue-300 hover:shadow-md transition-all group">
                <div className="bg-white w-12 h-12 rounded-xl flex items-center justify-center mb-4 text-blue-600 shadow-sm group-hover:scale-110 transition-transform">
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{service.name}</h3>
                <p className="text-sm text-slate-600">{service.desc}</p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Specialties Grid */}
      <div className="space-y-6">
         <div className="flex items-center gap-3">
          <div className="h-8 w-1 bg-emerald-500 rounded-full"></div>
          <h2 className="text-xl font-bold text-slate-800">Specialized Departments</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {specialties.map((specialty, index) => {
            const Icon = specialty.icon;
            return (
              <div key={index} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-emerald-200 transition-all group">
                 <div className="flex items-center gap-4 mb-3">
                   <div className="p-2.5 bg-slate-50 rounded-lg text-slate-600 group-hover:bg-emerald-50 group-hover:text-emerald-600 transition-colors">
                     <Icon className="w-5 h-5" />
                   </div>
                   <h3 className="font-bold text-slate-800 text-sm">{specialty.name}</h3>
                 </div>
                 <p className="text-xs text-slate-500 leading-relaxed pl-[3.25rem]">
                   {specialty.desc}
                 </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* CTA Bottom */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-8 md:p-12 text-center text-white shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/medical-icons.png')] opacity-10"></div>
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-4">Need Personalized Medical Advice?</h2>
          <p className="text-blue-100 mb-8 max-w-2xl mx-auto">
            Our expert doctors are here to help. Book an appointment today or use our AI symptom checker for preliminary guidance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button className="bg-white text-blue-600 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
               Find a Doctor
             </button>
             <button className="bg-blue-500/30 text-white border border-white/30 px-8 py-3 rounded-xl font-bold hover:bg-blue-500/40 transition-colors">
               Contact Support
             </button>
          </div>
        </div>
      </div>

    </div>
  );
};

export default MedicalServices;