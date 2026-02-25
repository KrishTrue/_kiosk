const Input = ({ label, ...props }) => (
  <div className="space-y-1.5 w-full">
    {label && <label className="text-sm font-medium text-slate-700">{label}</label>}
    <input 
      {...props}
      className="w-full px-3 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
    />
  </div>
);

export default Input;
