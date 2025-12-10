export enum ViewState {
  HOME = 'HOME',
  SERVICES = 'SERVICES',
  DASHBOARD = 'DASHBOARD',
  SYMPTOM_CHECKER = 'SYMPTOM_CHECKER',
  REPORTS = 'REPORTS',
  APPOINTMENTS = 'APPOINTMENTS',
  BOOKING = 'BOOKING',
  MEDICATION_REMINDERS = 'MEDICATION_REMINDERS',
  XRAY_SCANNER = 'XRAY_SCANNER',
  CARE_MODELS = 'CARE_MODELS',
  HEALTH_BROWSER = 'HEALTH_BROWSER',
  VOICE_AGENT = 'VOICE_AGENT',
  FIND_HOSPITALS = 'FIND_HOSPITALS'
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface MedicalReport {
  id: string;
  title: string;
  date: string;
  doctor: string;
  content: string;
  summary?: string;
}

export interface Appointment {
  id: string;
  doctor: string;
  specialty: string;
  date: string;
  time: string;
  status: 'upcoming' | 'completed' | 'cancelled';
}

export interface MedicationReminder {
  id: string;
  name: string;
  dosage: string;
  time: string;
  frequency: string;
  instructions?: string;
}