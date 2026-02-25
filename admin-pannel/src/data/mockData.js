import { Monitor, Building2, Users, Megaphone } from 'lucide-react';

export const INITIAL_STATS = [
  { label: 'Total Kiosks', value: '12', active: '10', icon: Monitor, color: 'text-blue-600' },
  { label: 'Buildings', value: '8', active: '8', icon: Building2, color: 'text-emerald-600' },
  { label: 'Faculty', value: '142', active: '142', icon: Users, color: 'text-purple-600' },
  { label: 'Active Alerts', value: '3', active: '3', icon: Megaphone, color: 'text-orange-600' },
];

export const INITIAL_BUILDINGS = [
  { id: '1', name: 'Main Block', code: 'MB-01', type: 'block', floors: 4, rooms: 24, status: 'Active' },
  { id: '2', name: 'Central Library', code: 'CL-01', type: 'library', floors: 2, rooms: 12, status: 'Active' },
  { id: '3', name: 'Tech Lab 7', code: 'TL-07', type: 'lab', floors: 1, rooms: 5, status: 'Maintenance' },
];

export const INITIAL_FACULTY = [
  { id: '1', name: 'Dr. Sarah Sharma', dept: 'CSE', designation: 'Professor', email: 'sarah@univ.edu', experience: '15 Years' },
  { id: '2', name: 'Prof. Rajesh Singh', dept: 'ECE', designation: 'Asst. Professor', email: 'rajesh@univ.edu', experience: '8 Years' },
];

export const INITIAL_KIOSKS = [
  { id: 'k1', name: 'Entrance A', location: 'Gate 1', status: 'Online', lastPing: '2 mins ago' },
  { id: 'k2', name: 'Library Hall', location: 'Floor 1', status: 'Offline', lastPing: '4 hours ago' },
  { id: 'k3', name: 'Canteen Area', location: 'Main Plaza', status: 'Online', lastPing: 'Just now' },
];

export const RECENT_ALERTS = [
  { msg: 'System maintenance scheduled for Block B', time: '1h ago', type: 'info' },
  { msg: 'Kiosk "Library Hall" reported a printer error', time: '4h ago', type: 'error' },
  { msg: 'Announcement "Exams 2024" successfully pushed', time: '1d ago', type: 'success' },
];

export const DEPARTMENTS = ['CSE', 'ECE', 'MECH', 'CIVIL', 'EEE', 'IT'];

export const BUILDING_TYPES = ['block', 'library', 'canteen', 'hostel', 'lab', 'medical'];
