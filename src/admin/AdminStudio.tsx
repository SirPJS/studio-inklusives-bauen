import { useState } from "react";
import EditableField from "./EditableField";
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
    <div className="space-y-8">
      <h2 className="text-lg font-bold">Studio-Text</h2>

      <div className="border border-border rounded-lg p-6 space-y-6 bg-muted/20">
        <p className="text-xs text-muted-foreground">
          So erscheint der Text auf der Webseite unter den Projekten. Benutze **fett** f&uuml;r fetten Text.
        </p>

        {data.paragraphs.map((p, i) => (
          <EditableField
            key={i}
            label={`Absatz ${i + 1}`}
            value={p}
            onChange={(v) => updateParagraph(i, v)}
            multiline
          />
        ))}

        <div className="flex space-x-2">
          <button
            onClick={() => setData({ ...data, paragraphs: [...data.paragraphs, ""] })}
            className="text-xs text-blue-500 hover:text-blue-700"
          >
            + Absatz hinzuf&uuml;gen
          </button>
          {data.paragraphs.length > 1 && (
            <button
              onClick={() =>
                setData({ ...data, paragraphs: data.paragraphs.slice(0, -1) })
              }
              className="text-xs text-red-400 hover:text-red-600"
            >
              Letzten Absatz entfernen
            </button>
          )}
        </div>

        <hr className="border-border" />

        <EditableField
          label="Zitat"
          value={data.quote}
          onChange={(v) => setData({ ...data, quote: v })}
        />
        <EditableField
          label="Zitat Autor"
          value={data.quoteAuthor}
          onChange={(v) => setData({ ...data, quoteAuthor: v })}
        />

        <hr className="border-border" />

        <EditableField
          label="LinkedIn URL"
          value={data.linkedinUrl}
          onChange={(v) => setData({ ...data, linkedinUrl: v })}
        />
        <EditableField
          label="Instagram URL"
          value={data.instagramUrl}
          onChange={(v) => setData({ ...data, instagramUrl: v })}
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

export default AdminStudio;
