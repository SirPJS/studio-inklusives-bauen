import { useState } from "react";
import initialData from "../content/impressum.json";

interface LineItem {
  type?: string;
  text?: string;
  url?: string;
}

interface Block {
  heading: string;
  lines: (string | LineItem)[];
}

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

const AdminImpressum = ({ saveFile }: Props) => {
  const [blocks, setBlocks] = useState<Block[]>(initialData.blocks as Block[]);

  const updateHeading = (bi: number, value: string) => {
    const updated = [...blocks];
    updated[bi] = { ...updated[bi], heading: value };
    setBlocks(updated);
  };

  const updateLine = (bi: number, li: number, value: string) => {
    const updated = [...blocks];
    const line = updated[bi].lines[li];
    if (typeof line === "string") {
      updated[bi].lines[li] = value;
    } else {
      updated[bi].lines[li] = { ...line, text: value };
    }
    setBlocks(updated);
  };

  const updateLineUrl = (bi: number, li: number, value: string) => {
    const updated = [...blocks];
    const line = updated[bi].lines[li];
    if (typeof line !== "string") {
      updated[bi].lines[li] = { ...line, url: value };
    }
    setBlocks(updated);
  };

  const addLine = (bi: number) => {
    const updated = [...blocks];
    updated[bi].lines.push("");
    setBlocks(updated);
  };

  const removeLine = (bi: number, li: number) => {
    const updated = [...blocks];
    updated[bi].lines.splice(li, 1);
    setBlocks(updated);
  };

  const addBlock = () => {
    setBlocks([...blocks, { heading: "", lines: [""] }]);
  };

  const removeBlock = (bi: number) => {
    setBlocks(blocks.filter((_, i) => i !== bi));
  };

  const toggleLink = (bi: number, li: number) => {
    const updated = [...blocks];
    const line = updated[bi].lines[li];
    if (typeof line === "string") {
      updated[bi].lines[li] = { type: "link", text: line, url: "" };
    } else {
      updated[bi].lines[li] = line.text || "";
    }
    setBlocks(updated);
  };

  const save = () => {
    saveFile(
      "src/content/impressum.json",
      JSON.stringify({ blocks }, null, 2),
      "Update Impressum"
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Impressum</h2>
        <p className="text-xs text-muted-foreground">
          Bearbeiten Sie alle Textbl&ouml;cke frei. Jeder Block kann eine &Uuml;berschrift und beliebig viele Zeilen haben.
        </p>
      </div>

      <div className="space-y-6">
        {blocks.map((block, bi) => (
          <div key={bi} className="border border-border rounded-lg p-5 space-y-3 bg-muted/20">
            <div className="flex items-center gap-2">
              <input
                value={block.heading}
                onChange={(e) => updateHeading(bi, e.target.value)}
                placeholder="Überschrift (optional, fett dargestellt)"
                className="flex-1 px-3 py-1.5 text-sm border border-border rounded bg-background font-medium"
              />
              <button
                onClick={() => removeBlock(bi)}
                className="text-xs text-red-500 hover:text-red-700 px-2"
                title="Block entfernen"
              >
                &times;
              </button>
            </div>

            {block.lines.map((line, li) => {
              const isLink = typeof line !== "string" && line.type === "link";
              const text = typeof line === "string" ? line : line.text || "";
              const url = typeof line !== "string" ? line.url || "" : "";

              return (
                <div key={li} className="flex items-start gap-2">
                  <div className="flex-1 space-y-1">
                    <input
                      value={text}
                      onChange={(e) => updateLine(bi, li, e.target.value)}
                      placeholder="Zeile..."
                      className="w-full px-3 py-1.5 text-xs border border-border rounded bg-background"
                    />
                    {isLink && (
                      <input
                        value={url}
                        onChange={(e) => updateLineUrl(bi, li, e.target.value)}
                        placeholder="URL (z.B. https://... oder mailto:...)"
                        className="w-full px-3 py-1.5 text-xs border border-border rounded bg-background text-blue-600"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => toggleLink(bi, li)}
                    className={`text-xs px-2 py-1 rounded ${isLink ? 'bg-blue-100 text-blue-700' : 'bg-muted text-muted-foreground'}`}
                    title={isLink ? "Link entfernen" : "Als Link markieren"}
                  >
                    {isLink ? "Link" : "Text"}
                  </button>
                  <button
                    onClick={() => removeLine(bi, li)}
                    className="text-xs text-red-400 hover:text-red-600 px-1"
                    title="Zeile entfernen"
                  >
                    &times;
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => addLine(bi)}
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              + Zeile hinzuf&uuml;gen
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between pt-2">
        <button
          onClick={addBlock}
          className="text-xs text-muted-foreground hover:text-foreground border border-border px-4 py-2 rounded"
        >
          + Block hinzuf&uuml;gen
        </button>
        <button
          onClick={save}
          className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
        >
          Speichern
        </button>
      </div>
    </div>
  );
};

export default AdminImpressum;
