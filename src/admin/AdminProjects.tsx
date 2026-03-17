import { useState } from "react";
import EditableField from "./EditableField";

const projectModules = import.meta.glob("../content/projects/*.json", { eager: true });

interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  images: string[];
  mainText: string;
  linkUrl?: string;
  linkLabel?: string;
  metaData: { label: string; value: string }[];
}

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

const AdminProjects = ({ saveFile }: Props) => {
  const [projects, setProjects] = useState<(ProjectData & { _file?: string })[]>(() => {
    return Object.entries(projectModules)
      .map(([path, mod]: [string, any]) => ({
        ...(mod.default || mod),
        _file: path.replace("../content/", "src/content/"),
      }))
      .sort((a, b) => b.id - a.id);
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  const updateProject = (id: number, field: string, value: any) => {
    setProjects((prev) =>
      prev.map((p) => (p.id === id ? { ...p, [field]: value } : p))
    );
  };

  const updateMeta = (id: number, index: number, field: string, value: string) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const newMeta = [...p.metaData];
        newMeta[index] = { ...newMeta[index], [field]: value };
        return { ...p, metaData: newMeta };
      })
    );
  };

  const addMeta = (id: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, metaData: [...p.metaData, { label: "", value: "" }] };
      })
    );
  };

  const removeMeta = (id: number, index: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        return { ...p, metaData: p.metaData.filter((_, i) => i !== index) };
      })
    );
  };

  const saveProject = async (project: ProjectData & { _file?: string }) => {
    const { _file, ...data } = project;
    const filePath = _file || `src/content/projects/${data.id}-${data.title.substring(0, 25).replace(/[^a-zA-Z0-9]/g, "-")}.json`;
    await saveFile(
      filePath,
      JSON.stringify(data, null, 2),
      `Update Projekt: ${data.title}`
    );
    setEditingId(null);
  };

  const addProject = () => {
    const maxId = Math.max(...projects.map((p) => p.id), 0);
    const newProject: ProjectData & { _file?: string } = {
      id: maxId + 1,
      title: "Neues Projekt",
      subtitle: "",
      year: new Date().getFullYear().toString(),
      images: [],
      mainText: "",
      linkUrl: "",
      linkLabel: "",
      metaData: [],
    };
    setProjects([newProject, ...projects]);
    setEditingId(newProject.id);
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold">Projekte</h2>
        <button
          onClick={addProject}
          className="px-4 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
        >
          + Neues Projekt
        </button>
      </div>

      {projects.map((project) => (
        <div
          key={project.id}
          className="border border-border rounded-lg overflow-hidden"
        >
          {/* Project Preview Header */}
          <div
            className="p-4 flex items-center justify-between cursor-pointer hover:bg-muted/50 transition-colors"
            onClick={() => setEditingId(editingId === project.id ? null : project.id)}
          >
            <div className="flex items-center space-x-4">
              {/* Thumbnail */}
              {project.images[0] && (
                <img
                  src={`/${project.images[0]}`}
                  alt=""
                  className="w-16 h-12 object-cover rounded grayscale"
                />
              )}
              <div>
                <h3 className="font-medium text-sm">{project.title}</h3>
                <p className="text-xs text-muted-foreground">{project.year} {project.subtitle && `\u2022 ${project.subtitle}`}</p>
              </div>
            </div>
            <span className="text-xs text-muted-foreground">
              {editingId === project.id ? "\u25B2 zuklappen" : "\u25BC bearbeiten"}
            </span>
          </div>

          {/* Expanded Edit Form */}
          {editingId === project.id && (
            <div className="border-t border-border p-6 space-y-6 bg-muted/20">
              <div className="grid md:grid-cols-2 gap-4">
                <EditableField
                  label="Titel"
                  value={project.title}
                  onChange={(v) => updateProject(project.id, "title", v)}
                />
                <EditableField
                  label="Jahr"
                  value={project.year}
                  onChange={(v) => updateProject(project.id, "year", v)}
                />
              </div>

              <EditableField
                label="Untertitel"
                value={project.subtitle}
                onChange={(v) => updateProject(project.id, "subtitle", v)}
              />

              <EditableField
                label="Beschreibung (Abs\u00e4tze mit doppelter Leerzeile trennen)"
                value={project.mainText}
                onChange={(v) => updateProject(project.id, "mainText", v)}
                multiline
              />

              <div className="grid md:grid-cols-2 gap-4">
                <EditableField
                  label="Link Text"
                  value={project.linkLabel || ""}
                  onChange={(v) => updateProject(project.id, "linkLabel", v)}
                  placeholder="z.B. Link zum Veranstalter"
                />
                <EditableField
                  label="Link URL"
                  value={project.linkUrl || ""}
                  onChange={(v) => updateProject(project.id, "linkUrl", v)}
                  placeholder="https://..."
                />
              </div>

              {/* Images */}
              <div className="space-y-2">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Bilder ({project.images.length})
                </span>
                <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
                  {project.images.map((img, i) => (
                    <div key={i} className="relative group">
                      <img
                        src={`/${img}`}
                        alt=""
                        className="w-full aspect-square object-cover rounded"
                      />
                      <button
                        onClick={() =>
                          updateProject(
                            project.id,
                            "images",
                            project.images.filter((_, j) => j !== i)
                          )
                        }
                        className="absolute top-1 right-1 w-5 h-5 bg-red-500 text-white rounded-full text-xs opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                      >
                        \u00d7
                      </button>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-muted-foreground">
                  Neue Bilder: Lade sie in den Ordner public/images/ hoch und f\u00fcge den Pfad hier hinzu
                </p>
                <input
                  type="text"
                  placeholder="Bildpfad hinzuf\u00fcgen, z.B. images/mein-bild.jpg"
                  className="w-full p-2 border border-border rounded text-xs"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val) {
                        updateProject(project.id, "images", [...project.images, val]);
                        (e.target as HTMLInputElement).value = "";
                      }
                    }
                  }}
                />
              </div>

              {/* Meta Data / Kenndaten */}
              <div className="space-y-3">
                <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
                  Kenndaten
                </span>
                {project.metaData.map((meta, i) => (
                  <div key={i} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={meta.label}
                      onChange={(e) => updateMeta(project.id, i, "label", e.target.value)}
                      placeholder="Bezeichnung"
                      className="flex-1 p-2 border border-border rounded text-xs"
                    />
                    <input
                      type="text"
                      value={meta.value}
                      onChange={(e) => updateMeta(project.id, i, "value", e.target.value)}
                      placeholder="Wert"
                      className="flex-1 p-2 border border-border rounded text-xs"
                    />
                    <button
                      onClick={() => removeMeta(project.id, i)}
                      className="text-red-400 hover:text-red-600 text-sm"
                    >
                      \u00d7
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addMeta(project.id)}
                  className="text-xs text-blue-500 hover:text-blue-700"
                >
                  + Kenndaten hinzuf\u00fcgen
                </button>
              </div>

              {/* Save Button */}
              <div className="flex justify-end pt-4">
                <button
                  onClick={() => saveProject(project)}
                  className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
                >
                  Projekt speichern
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default AdminProjects;
