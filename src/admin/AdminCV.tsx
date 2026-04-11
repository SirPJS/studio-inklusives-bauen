import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";
import initialData from "../content/cv.json";

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

interface TimelineEntry {
  year: string;
  text: string;
}

const TimelineSection = ({
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
    <section className="space-y-3">
      <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">{title}</h4>
      {entries.map((entry, i) => (
        <div key={i} className="flex items-start gap-2 group">
          <GripVertical size={14} className="text-muted-foreground/30 mt-2.5 flex-shrink-0" />
          <input
            type="text"
            value={entry.year}
            onChange={(e) => update(i, "year", e.target.value)}
            className="w-28 flex-shrink-0 px-3 py-2 border border-border rounded-lg text-sm font-medium bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            placeholder="Jahr"
          />
          <textarea
            value={entry.text}
            onChange={(e) => update(i, "text", e.target.value)}
            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-y min-h-[44px]"
            placeholder="Beschreibung"
            rows={2}
          />
          <button
            onClick={() => onChange(entries.filter((_, j) => j !== i))}
            className="mt-1.5 w-8 h-8 flex items-center justify-center text-muted-foreground/50 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 opacity-0 group-hover:opacity-100 flex-shrink-0"
            title="Eintrag entfernen"
          >
            <Trash2 size={14} />
          </button>
        </div>
      ))}
      <button
        onClick={() => onChange([...entries, { year: "", text: "" }])}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors ml-5"
      >
        <Plus size={14} /> Eintrag hinzufügen
      </button>
    </section>
  );
};

const AdminCV = ({ saveFile }: Props) => {
  const [data, setData] = useState(initialData);

  const save = () => {
    saveFile("src/content/cv.json", JSON.stringify(data, null, 2), "Update Lebenslauf");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Lebenslauf</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Der Lebenslauf wird auf der Webseite als Zeitleiste angezeigt.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-8">
        {/* Name */}
        <section className="space-y-3">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Name</h4>
          <input
            type="text"
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
            className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground font-medium"
          />
        </section>

        <hr className="border-border" />
        <TimelineSection
          title="Ausbildung"
          entries={data.ausbildung}
          onChange={(e) => setData({ ...data, ausbildung: e })}
        />

        <hr className="border-border" />
        <TimelineSection
          title="Tätigkeiten"
          entries={data.taetigkeiten}
          onChange={(e) => setData({ ...data, taetigkeiten: e })}
        />

        <hr className="border-border" />
        <TimelineSection
          title="Forschung"
          entries={data.forschung}
          onChange={(e) => setData({ ...data, forschung: e })}
        />

        <hr className="border-border" />
        <TimelineSection
          title="Vorträge, Workshops, Beratungen"
          entries={data.vortraege}
          onChange={(e) => setData({ ...data, vortraege: e })}
        />

        <hr className="border-border" />
        <TimelineSection
          title="Ehrenamt"
          entries={data.ehrenamt || []}
          onChange={(e) => setData({ ...data, ehrenamt: e })}
        />

        {/* Save */}
        <div className="flex justify-end pt-4 border-t border-border">
          <button
            onClick={save}
            className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
          >
            Speichern
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminCV;
