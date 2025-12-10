import React, { useState } from 'react';
import { Search, MapPin, Star, Clock, Filter, Phone, Calendar, ArrowRight, ShieldCheck, Award } from 'lucide-react';

interface Specialist {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  image: string;
  availability: string;
  verified: boolean;
  tags: string[];
}

const mockSpecialists: Specialist[] = [
  {
    id: '1',
    name: 'Dr. Anjali Sharma',
    specialty: 'Cardiologist',
    rating: 4.9,
    reviews: 124,
    location: 'Heart Care Center, Building A',
    distance: '1.2 miles',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Today',
    verified: true,
    tags: ['Heart Surgery', 'Hypertension', 'Angioplasty']
  },
  {
    id: '2',
    name: 'Dr. Amit Shah',
    specialty: 'Orthopedist',
    rating: 4.8,
    reviews: 89,
    location: 'Ortho & Joint Clinic, West Wing',
    distance: '2.5 miles',
    image: 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&q=80&w=300',
    availability: 'Next Available: Tomorrow',
    verified: true,
    tags: ['Sports Injury', 'Joint Replacement', 'Arthritis']
  },
  {
    id: '3',
    name: 'Dr. Priya Patel',
    specialty: 'Dermatologist',
    rating: 4.9,
    reviews: 215,
    location: 'Skin Glow Clinic, Downtown',
    distance: '0.8 miles',
    image: 'https://images.unsplash.com/photo-1594824476967-48c8b964273f?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Today',
    verified: true,
    tags: ['Acne', 'Cosmetic', 'Skin Cancer Screening']
  },
  {
    id: '4',
    name: 'Dr. Vikram Singh',
    specialty: 'Neurologist',
    rating: 4.7,
    reviews: 56,
    location: 'Neuro Science Institute',
    distance: '3.1 miles',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&q=80&w=300',
    availability: 'Next Available: Wed, Oct 26',
    verified: true,
    tags: ['Migraine', 'Epilepsy', 'Stroke Recovery']
  },
  {
    id: '5',
    name: 'Dr. Meera Iyer',
    specialty: 'Pediatrician',
    rating: 5.0,
    reviews: 180,
    location: 'Children\'s Wellness Center',
    distance: '1.5 miles',
    image: 'https://images.unsplash.com/photo-1614608682850-e0d6ed316d47?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Today',
    verified: true,
    tags: ['Newborn Care', 'Vaccination', 'Development']
  },
  {
    id: '6',
    name: 'Dr. Arjun Gupta',
    specialty: 'General Practitioner',
    rating: 4.6,
    reviews: 92,
    location: 'Family Health Associates',
    distance: '0.5 miles',
    image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&q=80&w=300',
    availability: 'Available Today',
    verified: true,
    tags: ['Checkups', 'Flu', 'Diabetes Mgmt']
  }
];

const specialties = [
  "All Specialties",
  "Cardiologist",
  "Dermatologist",
  "Neurologist",
  "Orthopedist",
  "Pediatrician",
  "General Practitioner",
  "Dentist",
  "Psychiatrist"
];

const FindSpecialists: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecialty, setSelectedSpecialty] = useState('All Specialties');

  const filteredSpecialists = mockSpecialists.filter(doctor => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          doctor.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())) ||
                          doctor.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialty = selectedSpecialty === 'All Specialties' || doctor.specialty === selectedSpecialty;
    return matchesSearch && matchesSpecialty;
  });

  return (
    <div className="p-6 md:p-8 max-w-7xl mx-auto space-y-8 animate-fade-in">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Find Specialists</h1>
          <p className="text-slate-500 mt-2 text-lg">Locate top-rated medical professionals near you.</p>
        </div>
      </div>

      {/* Search and Filter Section */}
      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by doctor name, condition, or location..." 
            className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-64 relative">
          <Filter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <select 
            className="w-full pl-10 pr-8 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none cursor-pointer"
            value={selectedSpecialty}
            onChange={(e) => setSelectedSpecialty(e.target.value)}
          >
            {specialties.map(spec => (
              <option key={spec} value={spec}>{spec}</option>
            ))}
          </select>
          <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none border-l border-slate-300 pl-2">
            <ArrowRight className="w-3 h-3 text-slate-400 rotate-90" />
          </div>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSpecialists.map((doctor) => (
          <div key={doctor.id} className="bg-white rounded-2xl border border-slate-100 shadow-sm hover:shadow-lg hover:border-blue-200 transition-all overflow-hidden group flex flex-col">
            <div className="p-6 flex gap-4">
              <div className="relative">
                <img 
                  src={doctor.image} 
                  alt={doctor.name} 
                  className="w-20 h-20 rounded-2xl object-cover shadow-md" 
                />
                {doctor.verified && (
                  <div className="absolute -bottom-2 -right-2 bg-white p-1 rounded-full shadow-sm">
                    <ShieldCheck className="w-5 h-5 text-blue-600 fill-blue-50" />
                  </div>
                )}
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 group-hover:text-blue-600 transition-colors">
                  {doctor.name}
                </h3>
                <p className="text-sm font-medium text-slate-500">{doctor.specialty}</p>
                <div className="flex items-center gap-1 mt-1">
                  <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span className="text-sm font-bold text-slate-800">{doctor.rating}</span>
                  <span className="text-xs text-slate-400">({doctor.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <div className="px-6 pb-4 space-y-3 flex-1">
              <div className="flex items-start gap-2 text-sm text-slate-600">
                <MapPin className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
                <span className="line-clamp-1">{doctor.location}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap">({doctor.distance})</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-emerald-600 font-medium bg-emerald-50 w-fit px-2 py-1 rounded-lg">
                <Clock className="w-3.5 h-3.5" />
                {doctor.availability}
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {doctor.tags.map(tag => (
                  <span key={tag} className="text-xs text-slate-500 bg-slate-50 border border-slate-100 px-2 py-1 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 grid grid-cols-2 gap-3">
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-slate-700 font-medium text-sm hover:bg-slate-50 transition-colors">
                <Phone className="w-4 h-4" /> Call
              </button>
              <button className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl font-medium text-sm hover:bg-blue-700 transition-colors shadow-sm shadow-blue-500/20">
                <Calendar className="w-4 h-4" /> Book
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredSpecialists.length === 0 && (
        <div className="text-center py-16">
          <div className="bg-slate-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Search className="w-8 h-8 text-slate-300" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">No specialists found</h3>
          <p className="text-slate-500 mt-1">Try adjusting your search criteria or specialty filter.</p>
        </div>
      )}

      {/* Featured Banner */}
      <div className="mt-12 bg-gradient-to-r from-indigo-900 to-blue-900 rounded-3xl p-8 text-white relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
        <div className="relative z-10 max-w-xl">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium mb-4 border border-white/20">
            <Award className="w-4 h-4 text-yellow-400" />
            <span>Top Rated Network</span>
          </div>
          <h2 className="text-2xl font-bold mb-3">Join our Premium Care Network</h2>
          <p className="text-blue-100 leading-relaxed mb-6">
            Get priority access to the country's top specialists, same-day appointments, and exclusive health monitoring services.
          </p>
          <button className="bg-white text-blue-900 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors">
            View Membership Plans
          </button>
        </div>
        <div className="relative z-10 hidden md:block">
           <div className="w-64 h-40 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 p-4 transform rotate-3">
              <div className="flex items-center gap-3 mb-3">
                 <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center font-bold">JD</div>
                 <div>
                    <div className="text-sm font-bold">John Doe</div>
                    <div className="text-xs text-blue-200">Premium Member</div>
                 </div>
              </div>
              <div className="space-y-2">
                 <div className="h-2 bg-white/20 rounded w-3/4"></div>
                 <div className="h-2 bg-white/20 rounded w-1/2"></div>
              </div>
           </div>
        </div>
        
        {/* Decorative Background */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -mr-32 -mt-32"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-3xl -ml-32 -mb-32"></div>
      </div>
    </div>
  );
};

export default FindSpecialists;