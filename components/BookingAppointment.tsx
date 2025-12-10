import React, { useState } from 'react';
import { Calendar, User, ChevronDown, Loader2, MapPin, Mail, Stethoscope, CheckCircle2 } from 'lucide-react';

const availableDoctors = [
  "Dr. Anjali Sharma (Cardiologist)",
  "Dr. Rajesh Kumar (General Practitioner)",
  "Dr. Priya Patel (Dermatologist)",
  "Dr. Vikram Singh (Neurologist)",
  "Dr. Amit Shah (Orthopedist)",
  "Dr. Meera Iyer (Pediatrician)"
];

const medicalServices = [
  "General Checkup",
  "Cardiology Consultation",
  "Dermatology Screening",
  "Neurology Exam",
  "Orthopedic Assessment",
  "Pediatric Care",
  "Dental Cleaning",
  "ENT Checkup",
  "Gynecology/Obstetrics"
];

const BookingAppointment: React.FC = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    birthdate: '',
    email: '',
    address: '',
    doctor: '',
    service: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const submissionData = {
      ...formData,
      timestamp: new Date().toISOString()
    };

    try {
      await fetch('https://vicky318.app.n8n.cloud/webhook/89adaae8-75f9-4013-885f-6ad6d2547a7b/chat', {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(submissionData),
      });

      setSubmitted(true);
      setFormData({
        firstName: '',
        lastName: '',
        birthdate: '',
        email: '',
        address: '',
        doctor: '',
        service: ''
      });
      // Scroll to top to show success message
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (error) {
      console.error('Error submitting appointment:', error);
      alert('Network error: Unable to reach the scheduling server. Please check your internet connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="p-6 md:p-12 max-w-3xl mx-auto animate-fade-in flex flex-col items-center justify-center min-h-[60vh] text-center">
        <div className="w-20 h-20 bg-emerald-100 rounded-full flex items-center justify-center mb-6">
          <CheckCircle2 className="w-10 h-10 text-emerald-600" />
        </div>
        <h2 className="text-3xl font-bold text-slate-900 mb-4">Request Received!</h2>
        <p className="text-slate-500 text-lg mb-8 max-w-lg">
          Your appointment request has been successfully sent to our scheduling team. You will receive a confirmation email shortly.
        </p>
        <button 
          onClick={() => setSubmitted(false)}
          className="bg-blue-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20"
        >
          Book Another Appointment
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8 max-w-4xl mx-auto space-y-8 animate-fade-in">
      <div className="text-center max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-900">Book an Appointment</h1>
        <p className="text-slate-500 mt-2">
          Fill out the form below to schedule a visit with our specialists. 
        </p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500"></div>
        
        <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-8">
          
          {/* Section: Patient Information */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <User className="w-5 h-5 text-blue-600" />
              Patient Information
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. John"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  placeholder="e.g. Doe"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Birthdate</label>
                <div className="relative">
                  <input 
                    type="date" 
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Email ID</label>
                <div className="relative">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <input 
                    type="email" 
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                    placeholder="john.doe@example.com"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700">Address</label>
              <div className="relative">
                <MapPin className="w-5 h-5 text-slate-400 absolute left-3 top-3.5 pointer-events-none" />
                <textarea 
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none"
                  placeholder="Enter full address including zip code..."
                />
              </div>
            </div>
          </div>

          {/* Section: Medical Details */}
          <div className="space-y-6">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 pb-2 border-b border-slate-100">
              <Stethoscope className="w-5 h-5 text-purple-600" />
              Medical Details
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select Doctor</label>
                <div className="relative">
                  <select 
                    name="doctor"
                    value={formData.doctor}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="">Choose a Physician...</option>
                    {availableDoctors.map((doc, i) => (
                      <option key={i} value={doc}>{doc}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-700">Select Medical Service</label>
                <div className="relative">
                  <select 
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all appearance-none"
                  >
                    <option value="">Choose a Service...</option>
                    {medicalServices.map((service, i) => (
                      <option key={i} value={service}>{service}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-slate-400 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="pt-4">
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-bold text-lg py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-6 h-6 animate-spin" />
                  Processing Request...
                </>
              ) : (
                <>
                  <Calendar className="w-5 h-5" />
                  Confirm Appointment Booking
                </>
              )}
            </button>
            <p className="text-xs text-slate-400 text-center mt-3">
              By submitting this form, you agree to share your details with the selected healthcare provider.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookingAppointment;