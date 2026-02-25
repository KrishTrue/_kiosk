import { useState } from 'react';
import { Plus, Edit2, Trash2, Building2 } from 'lucide-react';
import { Card, Button, Input, Modal } from '../components/ui';
import { INITIAL_BUILDINGS, BUILDING_TYPES } from '../data/mockData';

const BuildingManager = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-slate-800">Buildings & Rooms</h2>
        <Button onClick={() => setModalOpen(true)} icon={Plus}>Add Building</Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {INITIAL_BUILDINGS.map(b => (
          <Card key={b.id} className="p-0 overflow-hidden">
            <div className="p-5 border-b border-slate-50 flex justify-between items-start">
              <div className="flex gap-4">
                <div className="p-3 bg-slate-50 text-slate-600 rounded-lg">
                  <Building2 size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-800">{b.name}</h4>
                  <p className="text-xs text-slate-500 font-mono">CODE: {b.code} | {b.type.toUpperCase()}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-[10px] font-bold ${
                b.status === 'Active' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
              }`}>
                {b.status.toUpperCase()}
              </span>
            </div>
            
            <div className="p-5 grid grid-cols-3 gap-4 bg-slate-50/50">
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Floors</p>
                <p className="font-bold text-slate-700">{b.floors}</p>
              </div>
              <div className="text-center border-x border-slate-200">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Rooms</p>
                <p className="font-bold text-slate-700">{b.rooms}</p>
              </div>
              <div className="text-center">
                <p className="text-[10px] text-slate-400 font-bold uppercase">Accessibility</p>
                <p className="font-bold text-green-600">Yes</p>
              </div>
            </div>
            
            <div className="px-5 py-3 flex justify-between items-center">
              <Button variant="ghost" className="text-xs">Manage Rooms</Button>
              <div className="flex gap-2">
                <Button variant="ghost" className="p-1"><Edit2 size={16} /></Button>
                <Button variant="ghost" className="p-1 text-red-500"><Trash2 size={16} /></Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} title="Register Building">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <Input label="Building Name" placeholder="e.g. Science Block" />
            <Input label="Building Code" placeholder="e.g. SB-01" />
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-slate-700">Type</label>
              <select className="w-full px-3 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500">
                {BUILDING_TYPES.map(type => (
                  <option key={type}>{type}</option>
                ))}
              </select>
            </div>
            <Input label="Total Floors" type="number" defaultValue="1" />
          </div>
          
          <div className="flex gap-6 py-2">
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
              Has Lift
            </label>
            <label className="flex items-center gap-2 text-sm cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500" />
              Wheelchair Accessible
            </label>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <Input label="Coordinates X" placeholder="0.00" />
            <Input label="Coordinates Y" placeholder="0.00" />
          </div>
          
          <div className="flex justify-end gap-3 mt-6">
            <Button variant="secondary" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button onClick={() => setModalOpen(false)}>Save Building</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BuildingManager;
