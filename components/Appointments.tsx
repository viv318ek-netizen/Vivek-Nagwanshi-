import React from 'react';
import { Clock, MapPin, Video, MoreHorizontal, FileText, Star, Stethoscope, Heart, Zap, BedDouble, Activity, Home } from 'lucide-react';
import { Appointment } from '../types';

const appointments: Appointment[] = [
  { id: '1', doctor: 'Dr. Anjali Sharma', specialty: 'Cardiologist', date: 'Oct 24, 2023', time: '10:00 AM', status: 'upcoming' },
  { id: '2', doctor: 'Dr. Rajesh Kumar', specialty: 'General Practitioner', date: 'Nov 02, 2023', time: '02:30 PM', status: 'upcoming' },
  { id: '3', doctor: 'Dr. Priya Patel', specialty: 'Dermatologist', date: 'Sep 15, 2023', time: '09:00 AM', status: 'completed' },
  { id: '4', doctor: 'Dr. Vikram Singh', specialty: 'Neurologist', date: 'Aug 10, 2023', time: '11:15 AM', status: 'completed' },
  { id: '5', doctor: 'Dr. Sarah Johnson', specialty: 'Cardiologist', date: 'Jul 05, 2023', time: '09:30 AM', status: 'completed' },
  { id: '6', doctor: 'Dr. Michael Chen', specialty: 'Neurologist', date: 'Jun 20, 2023', time: '02:00 PM', status: 'completed' },
  { id: '7', doctor: 'Dr. Emily Davis', specialty: 'Pediatrician', date: 'May 12, 2023', time: '11:00 AM', status: 'completed' },
  { id: '8', doctor: 'Dr. James Wilson', specialty: 'Orthopedist', date: 'Apr 30, 2023', time: '04:15 PM', status: 'completed' },
  { id: '9', doctor: 'Dr. Linda Martinez', specialty: 'Dermatologist', date: 'Apr 15, 2023', time: '10:45 AM', status: 'completed' },
  { id: '10', doctor: 'Dr. Robert Taylor', specialty: 'General Practitioner', date: 'Mar 28, 2023', time: '01:30 PM', status: 'completed' },
  { id: '11', doctor: 'Dr. Patricia Anderson', specialty: 'Gynecologist', date: 'Mar 10, 2023', time: '03:00 PM', status: 'completed' },
  { id: '12', doctor: 'Dr. David Thomas', specialty: 'Oncologist', date: 'Feb 22, 2023', time: '09:00 AM', status: 'completed' },
  { id: '13', doctor: 'Dr. Jennifer Jackson', specialty: 'ENT Specialist', date: 'Feb 05, 2023', time: '11:30 AM', status: 'completed' },
  { id: '14', doctor: 'Dr. Charles White', specialty: 'Psychiatrist', date: 'Jan 18, 2023', time: '02:45 PM', status: 'completed' },
  { id: '15', doctor: 'Dr. Elizabeth Harris', specialty: 'Endocrinologist', date: 'Jan 02, 2023', time: '10:15 AM', status: 'completed' },
  { id: '16', doctor: 'Dr. Thomas Martin', specialty: 'Urologist', date: 'Dec 15, 2022', time: '04:00 PM', status: 'completed' },
  { id: '17', doctor: 'Dr. Susan Thompson', specialty: 'Rheumatologist', date: 'Nov 30, 2022', time: '01:00 PM', status: 'completed' },
  { id: '18', doctor: 'Dr. Joseph Garcia', specialty: 'Gastroenterologist', date: 'Nov 12, 2022', time: '09:45 AM', status: 'completed' },
  { id: '19', doctor: 'Dr. Karen Robinson', specialty: 'Pulmonologist', date: 'Oct 25, 2022', time: '03:30 PM', status: 'completed' },
  { id: '20', doctor: 'Dr. Christopher Clark', specialty: 'Nephrologist', date: 'Oct 08, 2022', time: '11:00 AM', status: 'completed' },
  { id: '21', doctor: 'Dr. Nancy Lewis', specialty: 'Ophthalmologist', date: 'Sep 20, 2022', time: '02:15 PM', status: 'completed' },
  { id: '22', doctor: 'Dr. Daniel Lee', specialty: 'Allergist', date: 'Sep 05, 2022', time: '10:30 AM', status: 'completed' },
  { id: '23', doctor: 'Dr. Margaret Walker', specialty: 'Geriatrician', date: 'Aug 18, 2022', time: '04:45 PM', status: 'completed' },
  { id: '24', doctor: 'Dr. Paul Hall', specialty: 'Hematologist', date: 'Aug 01, 2022', time: '09:15 AM', status: 'completed' },
  { id: '25', doctor: 'Dr. Lisa Allen', specialty: 'Infectious Disease', date: 'Jul 15, 2022', time: '01:45 PM', status: 'completed' },
  { id: '26', doctor: 'Dr. Kevin Young', specialty: 'Plastic Surgeon', date: 'Jun 28, 2022', time: '11:15 AM', status: 'completed' },
  { id: '27', doctor: 'Dr. Betty Hernandez', specialty: 'Sports Medicine', date: 'Jun 10, 2022', time: '03:00 PM', status: 'completed' },
  { id: '28', doctor: 'Dr. Brian King', specialty: 'Anesthesiologist', date: 'May 25, 2022', time: '10:00 AM', status: 'completed' },
  { id: '29', doctor: 'Dr. Dorothy Wright', specialty: 'Pathologist', date: 'May 08, 2022', time: '02:30 PM', status: 'completed' },
  { id: '30', doctor: 'Dr. Jason Lopez', specialty: 'Radiologist', date: 'Apr 20, 2022', time: '09:00 AM', status: 'completed' },
  { id: '31', doctor: 'Dr. Melissa Hill', specialty: 'Nutritionist', date: 'Apr 05, 2022', time: '11:45 AM', status: 'completed' },
  { id: '32', doctor: 'Dr. Jeffrey Scott', specialty: 'Podiatrist', date: 'Mar 18, 2022', time: '01:00 PM', status: 'completed' },
  { id: '33', doctor: 'Dr. Amy Green', specialty: 'Chiropractor', date: 'Mar 02, 2022', time: '04:30 PM', status: 'completed' },
  { id: '34', doctor: 'Dr. Ryan Adams', specialty: 'Pain Management', date: 'Feb 15, 2022', time: '10:45 AM', status: 'completed' }
];

const careTypes = [
  {
    title: 'Primary Care',
    description: 'First point of contact (e.g., family doctors, pediatricians, internists) for general health, preventive care, and managing common illnesses.',
    icon: Stethoscope,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Specialty Care',
    description: 'Services provided by experts in specific fields (e.g., cardiology, oncology, orthopedics, neurology).',
    icon: Heart,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Emergency & Urgent Care',
    description: 'For immediate, life-threatening (Emergency Room) or acute, non-life-threatening (Urgent Care Clinic) conditions.',
    icon: Zap,
    color: 'bg-rose-100 text-rose-600'
  },
  {
    title: 'Inpatient/Hospital Care',
    description: 'Services requiring overnight stay for surgery, serious illness, or intensive monitoring.',
    icon: BedDouble,
    color: 'bg-indigo-100 text-indigo-600'
  },
  {
    title: 'Outpatient/Ambulatory Care',
    description: 'Services where the patient does not stay overnight (e.g., clinics, surgical centers, dialysis centers).',
    icon: Activity,
    color: 'bg-emerald-100 text-emerald-600'
  },
  {
    title: 'Long-Term & Residential Care',
    description: 'Nursing homes, rehabilitation centers, hospice care.',
    icon: Home,
    color: 'bg-orange-100 text-orange-600'
  }
];

const Appointments: React.FC = () => {
  return (
    <div className="p-6 md:p-8 max-w-5xl mx-auto space-y-8 animate-fade-in relative">
       <div className="flex justify-between items-end">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">My Appointments</h1>
          <p className="text-slate-500 mt-1">Manage your upcoming visits and view history.</p>
        </div>
      </div>

      <div className="space-y-4">
        {appointments.map((apt) => (
          <div key={apt.id} className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col md:flex-row md:items-center gap-6 group hover:border-blue-200 transition-all">
            {/* Date Badge */}
            <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-xl font-bold">
              <span className="text-xs uppercase tracking-wide text-blue-400">{apt.date.split(' ')[0]}</span>
              <span className="text-xl">{apt.date.split(' ')[1].replace(',', '')}</span>
            </div>

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-bold text-lg text-slate-900">{apt.doctor}</h3>
                {apt.status === 'upcoming' && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold uppercase tracking-wide">
                    Upcoming
                  </span>
                )}
                 {apt.status === 'completed' && (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wide">
                    Completed
                  </span>
                )}
              </div>
              <p className="text-slate-500 font-medium">{apt.specialty}</p>
              
              <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                  <Clock className="w-4 h-4 text-slate-400" />
                  {apt.time}
                </div>
                <div className="flex items-center gap-1.5">
                  {Number(apt.id) % 2 === 0 ? <Video className="w-4 h-4 text-slate-400" /> : <MapPin className="w-4 h-4 text-slate-400" />}
                  {Number(apt.id) % 2 === 0 ? 'Telehealth Video Call' : 'Heart Care Center, Building A'}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-3 border-t md:border-t-0 md:border-l border-slate-100 pt-4 md:pt-0 md:pl-6 mt-2 md:mt-0">
               {apt.status === 'completed' ? (
                 <>
                  <button className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="View Summary">
                    <FileText className="w-5 h-5" />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-yellow-500 hover:bg-yellow-50 rounded-lg transition-colors" title="Rate Doctor">
                    <Star className="w-5 h-5" />
                  </button>
                 </>
               ) : (
                 <>
                  <button className="px-4 py-2 text-sm font-medium text-slate-600 bg-slate-50 hover:bg-slate-100 rounded-lg transition-colors">
                    Reschedule
                  </button>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors shadow-md shadow-blue-500/20">
                    Join Call
                  </button>
                 </>
               )}
               <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg md:hidden">
                 <MoreHorizontal className="w-5 h-5" />
               </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pt-8 border-t border-slate-200">
        <div className="mb-6">
           <h2 className="text-xl font-bold text-slate-900">Care Type Guide</h2>
           <p className="text-slate-500 mt-1">Understanding the different levels of medical care available.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {careTypes.map((type, idx) => {
            const Icon = type.icon;
            return (
              <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all group">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 ${type.color} group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">{type.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed">{type.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Appointments;