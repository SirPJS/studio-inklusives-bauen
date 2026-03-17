import { useState } from "react";

interface EditableFieldProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  multiline?: boolean;
  placeholder?: string;
}

const EditableField = ({ label, value, onChange, multiline = false, placeholder }: EditableFieldProps) => {
  const [editing, setEditing] = useState(false);

  if (editing) {
    return (
      <div className="space-y-1">
        <label className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</label>
        {multiline ? (
          <textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            placeholder={placeholder}
            className="w-full p-2 border border-blue-300 rounded text-sm bg-blue-50 min-h-[100px] focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        ) : (
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onBlur={() => setEditing(false)}
            autoFocus
            placeholder={placeholder}
            className="w-full p-2 border border-blue-300 rounded text-sm bg-blue-50 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        )}
      </div>
    );
  }

  return (
    <div
      className="group cursor-pointer hover:bg-blue-50 rounded p-2 -m-2 transition-colors"
      onClick={() => setEditing(true)}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">{label}</span>
          <p className="text-sm text-foreground whitespace-pre-line">
            {value || <span className="text-muted-foreground italic">Klicken zum Bearbeiten...</span>}
          </p>
        </div>
        <span className="text-[10px] text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity ml-2 mt-1">
          bearbeiten
        </span>
      </div>
    </div>
  );
};

export default EditableField;
