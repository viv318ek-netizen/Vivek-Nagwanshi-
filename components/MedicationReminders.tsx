import React, { useState } from 'react';
import { Bell, Plus, Trash2, Clock, Pill, CheckCircle2, AlertCircle } from 'lucide-react';
import { MedicationReminder } from '../types';

const MedicationReminders: React.FC = () => {
  const [reminders, setReminders] = useState<MedicationReminder[]>([
    {
      id: '1',
      name: 'Lisinopril',
      dosage: '10mg',
      time: '08:00',
      frequency: 'Daily',
      instructions: 'Take with food'
    },
    {
      id: '2',
      name: 'Metformin',
      dosage: '500mg',
      time: '18:00',
      frequency: 'Daily',
      instructions: 'After dinner'
    }
  ]);

  const [newMed, setNewMed] = useState({
    name: '',
    dosage: '',
    time: '',
    frequency: 'Daily',
    instructions: ''
  });

  const handleAddReminder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMed.name || !newMed.time) return;

    const reminder: MedicationReminder = {
      id: Date.now().toString(),
      name: newMed.name,
      dosage: newMed.dosage,
      time: newMed.time,
      frequency: newMed.frequency,
      instructions: newMed.instructions
    };

    setReminders([...reminders, reminder]);
    setNewMed({
      name: '',
      dosage: '',
      time: '',
      frequency: 'Daily',
      instructions: ''
    });
  };

  const handleDelete = (id: string) => {
    setReminders(reminders.filter(r => r.id !== id));
  };

  // Sort reminders by time
  const sortedReminders = [...reminders].sort((a, b) => a.time.localeCompare(b.time));

  return (
    <div className="p-6 md:p-8 max-w-6xl mx-auto space-y-8 animate-fade-in">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Medication Reminders</h1>
        <p className="text-slate-500 mt-1">Track your medication schedule and dosage.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Add New Reminder Form */}
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 sticky top-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                <Plus className="w-5 h-5" />
              </div>
              <h2 className="font-bold text-slate-800">Add New Reminder</h2>
            </div>

            <form onSubmit={handleAddReminder} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Medication Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Aspirin"
                  value={newMed.name}
                  onChange={e => setNewMed({...newMed, name: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Dosage
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 50mg"
                    value={newMed.dosage}
                    onChange={e => setNewMed({...newMed, dosage: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                    Time
                  </label>
                  <input
                    type="time"
                    value={newMed.time}
                    onChange={e => setNewMed({...newMed, time: e.target.value})}
                    className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Frequency
                </label>
                <select 
                  value={newMed.frequency}
                  onChange={e => setNewMed({...newMed, frequency: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                >
                  <option value="Daily">Daily</option>
                  <option value="Twice Daily">Twice Daily</option>
                  <option value="Weekly">Weekly</option>
                  <option value="As Needed">As Needed</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                  Instructions (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. With food"
                  value={newMed.instructions}
                  onChange={e => setNewMed({...newMed, instructions: e.target.value})}
                  className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-colors shadow-lg shadow-blue-600/20 flex items-center justify-center gap-2 mt-4"
              >
                <Bell className="w-4 h-4" />
                Set Reminder
              </button>
            </form>
          </div>
        </div>

        {/* List of Reminders */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-2">
            <h2 className="font-bold text-slate-800 flex items-center gap-2">
              <Clock className="w-5 h-5 text-slate-400" />
              Your Schedule
            </h2>
            <span className="text-sm font-medium text-slate-500 bg-slate-100 px-3 py-1 rounded-full">
              {reminders.length} Active
            </span>
          </div>

          {sortedReminders.length > 0 ? (
            <div className="grid grid-cols-1 gap-4">
              {sortedReminders.map((reminder) => (
                <div 
                  key={reminder.id}
                  className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row items-start sm:items-center justify-between group"
                >
                  <div className="flex items-start gap-4">
                    <div className="bg-emerald-50 text-emerald-600 p-3 rounded-xl flex-shrink-0">
                      <Pill className="w-6 h-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-lg text-slate-900">{reminder.name}</h3>
                        <span className="bg-slate-100 text-slate-600 text-xs px-2 py-0.5 rounded-md font-medium">
                          {reminder.dosage}
                        </span>
                      </div>
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 mt-1 text-sm text-slate-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3.5 h-3.5" />
                          {reminder.time}
                        </span>
                        <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                        <span>{reminder.frequency}</span>
                        {reminder.instructions && (
                          <>
                            <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                            <span className="text-blue-600">{reminder.instructions}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
                    <button className="flex-1 sm:flex-none px-4 py-2 bg-slate-50 hover:bg-emerald-50 text-slate-600 hover:text-emerald-600 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2">
                      <CheckCircle2 className="w-4 h-4" />
                      Take
                    </button>
                    <button 
                      onClick={() => handleDelete(reminder.id)}
                      className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      title="Delete Reminder"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-slate-50 border-2 border-dashed border-slate-200 rounded-2xl p-12 text-center flex flex-col items-center justify-center">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                <Bell className="w-8 h-8 text-slate-300" />
              </div>
              <h3 className="text-lg font-medium text-slate-900">No reminders set</h3>
              <p className="text-slate-500 max-w-xs mx-auto mt-2">
                Add your medications using the form to get daily reminders.
              </p>
            </div>
          )}

          <div className="mt-8 bg-blue-50 border border-blue-100 rounded-xl p-4 flex items-start gap-3">
             <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
             <p className="text-sm text-blue-800">
               <strong>Note:</strong> This is a simple tracker. Please always follow the official prescription instructions provided by your doctor or pharmacist.
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MedicationReminders;