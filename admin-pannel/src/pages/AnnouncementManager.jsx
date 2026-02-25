import { useState } from 'react';
import { Plus, Edit2, Trash2, Languages } from 'lucide-react';
import { Card, Button, Input, Modal } from '../components/ui';

const AnnouncementManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Manage Announcements</h2>
        <Button onClick={() => setModalOpen(true)} icon={Plus}>Create New</Button>
      </div>

      <Card className="overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 border-b border-slate-200">
            <tr>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Subject (EN)</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Translations</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Status</th>
              <th className="px-6 py-4 text-sm font-semibold text-slate-700">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            <tr>
              <td className="px-6 py-4 text-sm text-slate-800 font-medium">
                Final Semester Exams Schedule Out
              </td>
              <td className="px-6 py-4 text-sm">
                <div className="flex gap-2">
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">HI</span>
                  <span className="px-2 py-0.5 bg-indigo-50 text-indigo-600 rounded text-[10px] font-bold">PA</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">
                  Active
                </span>
              </td>
              <td className="px-6 py-4">
                <div className="flex gap-2">
                  <Button variant="ghost" className="p-1"><Edit2 size={16} /></Button>
                  <Button variant="ghost" className="p-1 text-red-500"><Trash2 size={16} /></Button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </Card>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="New Announcement">
        <div className="space-y-6">
          <div className="p-4 bg-indigo-50 rounded-lg flex items-center gap-3">
            <Languages className="text-indigo-600" />
            <p className="text-sm text-indigo-700 font-medium">
              Auto-translation to Hindi & Punjabi will be applied on save.
            </p>
          </div>
          
          <Input label="Subject (English)" placeholder="Enter announcement heading..." />
          
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-slate-700">Message (English)</label>
            <textarea 
              className="w-full px-3 py-2 border border-slate-200 rounded-lg h-32 outline-none focus:ring-2 focus:ring-indigo-500" 
              placeholder="Enter detailed description..." 
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 border border-slate-100 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 mb-2">HINDI PREVIEW</p>
              <p className="text-sm italic text-slate-500">Translation will appear here...</p>
            </div>
            <div className="p-3 border border-slate-100 bg-slate-50 rounded-lg">
              <p className="text-xs font-bold text-slate-400 mb-2">PUNJABI PREVIEW</p>
              <p className="text-sm italic text-slate-500">Translation will appear here...</p>
            </div>
          </div>
          
          <div className="flex justify-end gap-3 pt-4">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Publish Announcement</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default AnnouncementManager;
