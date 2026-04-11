import { useState } from "react";
import { Plus, Trash2, Link as LinkIcon, Type } from "lucide-react";
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

  const removeBlock = (bi: number) => setBlocks(blocks.filter((_, i) => i !== bi));
  const addBlock = () => setBlocks([...blocks, { heading: "", lines: [""] }]);

  const save = () => {
    saveFile("src/content/impressum.json", JSON.stringify({ blocks }, null, 2), "Update Impressum");
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold">Impressum</h2>
        <p className="text-sm text-muted-foreground mt-1">
          Jeder Block kann eine Überschrift und beliebig viele Zeilen haben. Zeilen können als Link markiert werden.
        </p>
      </div>

      <div className="space-y-4">
        {blocks.map((block, bi) => (
          <div key={bi} className="bg-white rounded-xl border border-border shadow-sm p-5 space-y-3">
            {/* Block heading */}
            <div className="flex items-center gap-2">
              <input
                value={block.heading}
                onChange={(e) => updateHeading(bi, e.target.value)}
                placeholder="Überschrift (optional)"
                className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground font-medium placeholder:font-normal placeholder:text-muted-foreground/50"
              />
              <button
                onClick={() => removeBlock(bi)}
                className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-50"
                title="Block entfernen"
              >
                <Trash2 size={14} />
              </button>
            </div>

            {/* Lines */}
            {block.lines.map((line, li) => {
              const isLink = typeof line !== "string" && line.type === "link";
              const text = typeof line === "string" ? line : line.text || "";
              const url = typeof line !== "string" ? line.url || "" : "";

              return (
                <div key={li} className="flex items-start gap-2">
                  <div className="flex-1 space-y-1.5">
                    <input
                      value={text}
                      onChange={(e) => updateLine(bi, li, e.target.value)}
                      placeholder="Text eingeben..."
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                    />
                    {isLink && (
                      <input
                        value={url}
                        onChange={(e) => updateLineUrl(bi, li, e.target.value)}
                        placeholder="URL: https://... oder mailto:..."
                        className="w-full px-3 py-2 border border-blue-200 rounded-lg text-sm bg-blue-50/50 focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-blue-400 text-blue-700 placeholder:text-blue-300"
                      />
                    )}
                  </div>
                  <button
                    onClick={() => toggleLink(bi, li)}
                    className={`w-8 h-8 flex items-center justify-center rounded-lg transition-colors flex-shrink-0 ${
                      isLink
                        ? "bg-blue-100 text-blue-600 hover:bg-blue-200"
                        : "bg-muted text-muted-foreground hover:bg-muted/80"
                    }`}
                    title={isLink ? "Als Text" : "Als Link"}
                  >
                    {isLink ? <LinkIcon size={14} /> : <Type size={14} />}
                  </button>
                  <button
                    onClick={() => removeLine(bi, li)}
                    className="w-8 h-8 flex items-center justify-center text-muted-foreground/50 hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 flex-shrink-0"
                    title="Zeile entfernen"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              );
            })}

            <button
              onClick={() => addLine(bi)}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Plus size={14} /> Zeile hinzufügen
            </button>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={addBlock}
          className="flex items-center gap-1.5 px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground border border-border rounded-lg hover:bg-white transition-colors"
        >
          <Plus size={14} /> Block hinzufügen
        </button>
        <button
          onClick={save}
          className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
        >
          Speichern
        </button>
      </div>
    </div>
  );
};

export default AdminImpressum;
