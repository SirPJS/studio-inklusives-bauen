import { useState } from "react";
import EditableField from "./EditableField";
import initialData from "../content/cv.json";

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

interface TimelineEntry {
  year: string;
  text: string;
}

const TimelineEditor = ({
  title,
  entries,
  onChange,
}: {
  title: string;
  entries: TimelineEntry[];
  onChange: (entries: TimelineEntry[]) => void;
}) => {
  const update = (index: number, field: string, value: string) => {
    const newEntries = [...entries];
    newEntries[index] = { ...newEntries[index], [field]: value };
    onChange(newEntries);
  };

  return (
    <div className="space-y-3">
      <h3 className="font-bold text-sm">{title}</h3>
      {entries.map((entry, i) => (
        <div key={i} className="flex items-start space-x-3 group">
          <input
            type="text"
            value={entry.year}
            onChange={(e) => update(i, "year", e.target.value)}
            className="w-28 shrink-0 p-2 border border-border rounded text-xs font-medium"
            placeholder="Jahr"
          />
          <textarea
            value={entry.text}
            onChange={(e) => update(i, "text", e.target.value)}
            className="flex-1 p-2 border border-border rounded text-xs min-h-[60px]"
            placeholder="Text"
          />
          <button
            onClick={() => onChange(entries.filter((_, j) => j !== i))}
            className="text-red-400 hover:text-red-600 text-sm opacity-0 group-hover:opacity-100 transition-opacity mt-2"
          >
            &times;
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...entries, { year: "", text: "" }])}
        className="text-xs text-blue-500 hover:text-blue-700"
      >
        + Eintrag hinzuf&uuml;gen
      </button>
    </div>
  );
};

const AdminCV = ({ saveFile }: Props) => {
  const [data, setData] = useState(initialData);

  const save = () => {
    saveFile("src/content/cv.json", JSON.stringify(data, null, 2), "Update Lebenslauf");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold">Lebenslauf</h2>

      <div className="border border-border rounded-lg p-6 space-y-8 bg-muted/20">
        <EditableField
          label="Name"
          value={data.name}
          onChange={(v) => setData({ ...data, name: v })}
        />

        <hr className="border-border" />
        <TimelineEditor
          title="Ausbildung"
          entries={data.ausbildung}
          onChange={(e) => setData({ ...data, ausbildung: e })}
        />

        <hr className="border-border" />
        <TimelineEditor
          title="T&auml;tigkeiten"
          entries={data.taetigkeiten}
          onChange={(e) => setData({ ...data, taetigkeiten: e })}
        />

        <hr className="border-border" />
        <TimelineEditor
          title="Forschung"
          entries={data.forschung}
          onChange={(e) => setData({ ...data, forschung: e })}
        />

        <hr className="border-border" />
        <TimelineEditor
          title="Vortr&auml;ge, Workshops, Beratungen"
          entries={data.vortraege}
          onChange={(e) => setData({ ...data, vortraege: e })}
        />

        <div className="flex justify-end pt-4">
          <button
            onClick={save}
            className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCV;
