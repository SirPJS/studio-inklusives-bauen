import { useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import initialData from "../content/studio.json";

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

const AdminStudio = ({ saveFile }: Props) => {
  const [data, setData] = useState(initialData);

  const updateParagraph = (index: number, value: string) => {
    const newP = [...data.paragraphs];
    newP[index] = value;
    setData({ ...data, paragraphs: newP });
  };

  const save = () => {
    saveFile("src/content/studio.json", JSON.stringify(data, null, 2), "Update Studio-Text");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Studio-Text</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Dieser Text erscheint auf der Webseite unter den Projekten.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-border shadow-sm p-6 space-y-6">
        {/* Paragraphs */}
        <section className="space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Textabschnitte</h4>
          <p className="text-xs text-muted-foreground">
            Verwende <code className="bg-muted px-1 py-0.5 rounded">**fett**</code> für fetten Text.
          </p>
          {data.paragraphs.map((p, i) => (
            <div key={i} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-medium">Absatz {i + 1}</label>
                {data.paragraphs.length > 1 && (
                  <button
                    onClick={() => setData({ ...data, paragraphs: data.paragraphs.filter((_, j) => j !== i) })}
                    className="text-muted-foreground hover:text-red-500 transition-colors p-1 rounded hover:bg-red-50"
                    title="Absatz entfernen"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>
              <textarea
                value={p}
                onChange={(e) => updateParagraph(i, e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-y"
              />
            </div>
          ))}
          <button
            onClick={() => setData({ ...data, paragraphs: [...data.paragraphs, ""] })}
            className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <Plus size={14} /> Absatz hinzufügen
          </button>
        </section>

        <hr className="border-border" />

        {/* Quote */}
        <section className="space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Zitat</h4>
          <div>
            <label className="block text-sm font-medium mb-1.5">Zitat</label>
            <input
              type="text"
              value={data.quote}
              onChange={(e) => setData({ ...data, quote: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5">Autor</label>
            <input
              type="text"
              value={data.quoteAuthor}
              onChange={(e) => setData({ ...data, quoteAuthor: e.target.value })}
              className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
            />
          </div>
        </section>

        <hr className="border-border" />

        {/* Social Links */}
        <section className="space-y-4">
          <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Social Media</h4>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5">LinkedIn URL</label>
              <input
                type="url"
                value={data.linkedinUrl}
                onChange={(e) => setData({ ...data, linkedinUrl: e.target.value })}
                placeholder="https://linkedin.com/in/..."
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5">Instagram URL</label>
              <input
                type="url"
                value={data.instagramUrl}
                onChange={(e) => setData({ ...data, instagramUrl: e.target.value })}
                placeholder="https://instagram.com/..."
                className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
              />
            </div>
          </div>
        </section>

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

export default AdminStudio;
