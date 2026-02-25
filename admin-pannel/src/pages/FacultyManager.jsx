import { useState } from 'react';
import { Plus, Edit2, Trash2, Upload, UserCircle } from 'lucide-react';
import { Card, Button, Input, Modal } from '../components/ui';
import { INITIAL_FACULTY, DEPARTMENTS } from '../data/mockData';

const FacultyManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Faculty Directory</h2>
        <Button onClick={() => setModalOpen(true)} icon={Plus}>Add Member</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {INITIAL_FACULTY.map(f => (
          <Card key={f.id} className="p-5">
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center text-slate-400 shrink-0 overflow-hidden">
                <UserCircle size={64} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-slate-800 truncate">{f.name}</h4>
                <p className="text-sm text-indigo-600 font-medium">{f.dept} Department</p>
                <p className="text-xs text-slate-500 mt-1">{f.designation}</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-50 flex justify-between items-center">
              <span className="text-xs text-slate-400">{f.email}</span>
              <div className="flex gap-1">
                <Button variant="ghost" className="p-1.5"><Edit2 size={14} /></Button>
                <Button variant="ghost" className="p-1.5 text-red-500"><Trash2 size={14} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Add Faculty Member">
        <div className="space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative group cursor-pointer">
              <div className="w-24 h-24 rounded-full bg-slate-100 flex items-center justify-center text-slate-400 border-2 border-dashed border-slate-300">
                <Upload size={32} />
              </div>
              <div className="absolute inset-0 bg-indigo-600/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <p className="text-[10px] font-bold text-indigo-700">UPLOAD</p>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Full Name" placeholder="e.g. Dr. John Doe" />
            <Input label="Designation" placeholder="e.g. Associate Professor" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Department</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                {DEPARTMENTS.map(dept => (
                  <option key={dept}>{dept}</option>
                ))}
              </select>
            </div>
            <Input label="Experience (Years)" type="number" />
          </div>
          
          <Input label="Email Address" type="email" />
          <Input label="Phone Number" />
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Save Faculty</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default FacultyManager;
