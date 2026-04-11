import { useState, useRef, DragEvent, ChangeEvent } from "react";
import { Upload, Trash2, ChevronLeft, ChevronRight, ChevronDown, ChevronUp, Plus, GripVertical } from "lucide-react";

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
  uploadFile: (path: string, base64Content: string, message: string) => Promise<void>;
  showMessage: (msg: string, type?: "success" | "error") => void;
}

/** Derive folder slug from existing images or project title */
const getProjectSlug = (project: ProjectData): string => {
  if (project.images.length > 0) {
    const parts = project.images[0].split("/");
    if (parts.length >= 2) return parts[1];
  }
  return project.title
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "projekt";
};

/** Read file as base64 (without the data: prefix) */
const readFileAsBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve((reader.result as string).split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });

const AdminProjects = ({ saveFile, uploadFile, showMessage }: Props) => {
  const [projects, setProjects] = useState<(ProjectData & { _file?: string })[]>(() =>
    Object.entries(projectModules)
      .map(([path, mod]: [string, any]) => ({
        ...(mod.default || mod),
        _file: path.replace("../content/", "src/content/"),
      }))
      .sort((a, b) => b.id - a.id)
  );
  const [editingId, setEditingId] = useState<number | null>(null);
  const [uploading, setUploading] = useState<string[]>([]);
  const [dragOver, setDragOver] = useState<number | null>(null);
  const fileInputRefs = useRef<Record<number, HTMLInputElement | null>>({});
  // Track local blob previews for just-uploaded images
  const [localPreviews, setLocalPreviews] = useState<Record<string, string>>({});

  // --- Project helpers ---
  const updateProject = (id: number, field: string, value: any) => {
    setProjects((prev) => prev.map((p) => (p.id === id ? { ...p, [field]: value } : p)));
  };

  const moveImage = (id: number, from: number, to: number) => {
    setProjects((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p;
        const imgs = [...p.images];
        const [moved] = imgs.splice(from, 1);
        imgs.splice(to, 0, moved);
        return { ...p, images: imgs };
      })
    );
  };

  const removeImage = (id: number, index: number) => {
    setProjects((prev) =>
      prev.map((p) => (p.id !== id ? p : { ...p, images: p.images.filter((_, i) => i !== index) }))
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

  // --- Image upload ---
  const handleFiles = async (files: FileList | File[], project: ProjectData & { _file?: string }) => {
    const slug = getProjectSlug(project);
    const imageFiles = Array.from(files).filter((f) => f.type.startsWith("image/"));
    if (!imageFiles.length) return;

    for (const file of imageFiles) {
      const cleanName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_");
      setUploading((prev) => [...prev, cleanName]);

      try {
        // Create a local blob preview immediately
        const blobUrl = URL.createObjectURL(file);
        const imagePath = `images/${slug}/${cleanName}`;
        setLocalPreviews((prev) => ({ ...prev, [imagePath]: blobUrl }));

        const base64 = await readFileAsBase64(file);
        const path = `public/${imagePath}`;
        await uploadFile(path, base64, `Bild hochladen: ${cleanName}`);

        // Also upload WebP version
        try {
          // We can't do WebP conversion in the browser easily, so just upload the original
          // The next build will handle optimization
        } catch { /* ignore */ }

        updateProject(project.id, "images", [...project.images, imagePath]);
        showMessage(`${cleanName} hochgeladen`);
      } catch (err: any) {
        showMessage(`Fehler bei ${cleanName}: ${err.message}`, "error");
      } finally {
        setUploading((prev) => prev.filter((n) => n !== cleanName));
      }
    }
  };

  const onDrop = (e: DragEvent, project: ProjectData & { _file?: string }) => {
    e.preventDefault();
    setDragOver(null);
    if (e.dataTransfer.files.length) handleFiles(e.dataTransfer.files, project);
  };

  const onFileSelect = (e: ChangeEvent<HTMLInputElement>, project: ProjectData & { _file?: string }) => {
    if (e.target.files?.length) handleFiles(e.target.files, project);
    e.target.value = "";
  };

  // --- Save ---
  const saveProject = async (project: ProjectData & { _file?: string }) => {
    const { _file, ...data } = project;
    const filePath = _file || `src/content/projects/${data.id}-${data.title.substring(0, 25).replace(/[^a-zA-Z0-9]/g, "-")}.json`;
    await saveFile(filePath, JSON.stringify(data, null, 2), `Update Projekt: ${data.title}`);
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

  /** Resolve image src: prefer local blob preview, fall back to server path */
  const imgSrc = (path: string) => localPreviews[path] || `/${path}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Projekte</h2>
          <p className="text-sm text-muted-foreground mt-1">
            Klicke auf ein Projekt um es zu bearbeiten. Bilder per Drag & Drop hochladen.
          </p>
        </div>
        <button
          onClick={addProject}
          className="flex items-center gap-2 px-4 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
        >
          <Plus size={16} />
          Neues Projekt
        </button>
      </div>

      {/* Project list */}
      {projects.map((project) => {
        const isOpen = editingId === project.id;
        return (
          <div key={project.id} className="bg-white rounded-xl border border-border shadow-sm overflow-hidden">
            {/* Collapsed header */}
            <button
              className="w-full p-4 flex items-center gap-4 hover:bg-muted/30 transition-colors text-left"
              onClick={() => setEditingId(isOpen ? null : project.id)}
            >
              {/* Thumbnail */}
              {project.images[0] ? (
                <img
                  src={imgSrc(project.images[0])}
                  alt=""
                  className="w-20 h-14 object-cover rounded-lg bg-muted flex-shrink-0"
                />
              ) : (
                <div className="w-20 h-14 bg-muted rounded-lg flex items-center justify-center flex-shrink-0">
                  <Upload size={16} className="text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-sm truncate">{project.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {project.year}
                  {project.images.length > 0 && ` · ${project.images.length} Bilder`}
                </p>
              </div>
              {isOpen ? <ChevronUp size={18} className="text-muted-foreground" /> : <ChevronDown size={18} className="text-muted-foreground" />}
            </button>

            {/* Expanded edit form */}
            {isOpen && (
              <div className="border-t border-border p-6 space-y-8">
                {/* Section: General */}
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Allgemein</h4>
                  <div className="grid sm:grid-cols-[1fr_120px] gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Titel</label>
                      <input
                        type="text"
                        value={project.title}
                        onChange={(e) => updateProject(project.id, "title", e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Jahr</label>
                      <input
                        type="text"
                        value={project.year}
                        onChange={(e) => updateProject(project.id, "year", e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Untertitel</label>
                    <input
                      type="text"
                      value={project.subtitle}
                      onChange={(e) => updateProject(project.id, "subtitle", e.target.value)}
                      placeholder="Optional"
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                    />
                  </div>
                </section>

                {/* Section: Images */}
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    Bilder {project.images.length > 0 && `(${project.images.length})`}
                  </h4>

                  {/* Image grid */}
                  {project.images.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                      {project.images.map((img, i) => (
                        <div
                          key={`${img}-${i}`}
                          className="relative group aspect-[4/3] bg-muted rounded-lg overflow-hidden"
                        >
                          <img
                            src={imgSrc(img)}
                            alt=""
                            className="w-full h-full object-cover"
                          />
                          {/* "Titelbild" badge */}
                          {i === 0 && (
                            <span className="absolute top-1.5 left-1.5 bg-foreground text-background text-[9px] font-medium px-1.5 py-0.5 rounded">
                              Titelbild
                            </span>
                          )}
                          {/* Hover overlay with actions */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-end justify-center gap-1 pb-2">
                            {i > 0 && (
                              <button
                                onClick={() => moveImage(project.id, i, i - 1)}
                                className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                                title="Nach vorne"
                              >
                                <ChevronLeft size={14} />
                              </button>
                            )}
                            <button
                              onClick={() => removeImage(project.id, i)}
                              className="w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center hover:bg-red-600"
                              title="Entfernen"
                            >
                              <Trash2 size={12} />
                            </button>
                            {i < project.images.length - 1 && (
                              <button
                                onClick={() => moveImage(project.id, i, i + 1)}
                                className="w-7 h-7 bg-white rounded-full flex items-center justify-center hover:bg-gray-100"
                                title="Nach hinten"
                              >
                                <ChevronRight size={14} />
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Upload zone */}
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-colors ${
                      dragOver === project.id
                        ? "border-foreground bg-foreground/5"
                        : "border-border hover:border-foreground/40"
                    }`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(project.id); }}
                    onDragLeave={() => setDragOver(null)}
                    onDrop={(e) => onDrop(e, project)}
                    onClick={() => fileInputRefs.current[project.id]?.click()}
                  >
                    <Upload className="mx-auto mb-3 text-muted-foreground" size={28} />
                    <p className="text-sm text-foreground font-medium">
                      Bilder hierher ziehen
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      oder klicken zum Auswählen · JPG, PNG
                    </p>
                    <input
                      ref={(el) => { fileInputRefs.current[project.id] = el; }}
                      type="file"
                      multiple
                      accept="image/jpeg,image/png,image/webp"
                      className="hidden"
                      onChange={(e) => onFileSelect(e, project)}
                    />
                  </div>

                  {/* Upload progress */}
                  {uploading.length > 0 && (
                    <div className="space-y-1.5">
                      {uploading.map((name) => (
                        <div key={name} className="flex items-center gap-2 text-xs text-muted-foreground">
                          <div className="w-3 h-3 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                          <span>{name} wird hochgeladen...</span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>

                {/* Section: Description */}
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Beschreibung</h4>
                  <div>
                    <label className="block text-sm font-medium mb-1.5">Projektbeschreibung</label>
                    <textarea
                      value={project.mainText}
                      onChange={(e) => updateProject(project.id, "mainText", e.target.value)}
                      placeholder="Beschreibe das Projekt..."
                      rows={6}
                      className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground resize-y placeholder:text-muted-foreground/50"
                    />
                    <p className="text-xs text-muted-foreground mt-1">Absätze mit einer Leerzeile trennen.</p>
                  </div>
                </section>

                {/* Section: Link */}
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Link (optional)</h4>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-1.5">Link-Text</label>
                      <input
                        type="text"
                        value={project.linkLabel || ""}
                        onChange={(e) => updateProject(project.id, "linkLabel", e.target.value)}
                        placeholder="z.B. Zur Veranstaltung"
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5">URL</label>
                      <input
                        type="url"
                        value={project.linkUrl || ""}
                        onChange={(e) => updateProject(project.id, "linkUrl", e.target.value)}
                        placeholder="https://..."
                        className="w-full px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                      />
                    </div>
                  </div>
                </section>

                {/* Section: Metadata */}
                <section className="space-y-4">
                  <h4 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Kenndaten</h4>
                  {project.metaData.length > 0 && (
                    <div className="space-y-2">
                      {project.metaData.map((meta, i) => (
                        <div key={i} className="flex items-center gap-2">
                          <GripVertical size={14} className="text-muted-foreground/40 flex-shrink-0" />
                          <input
                            type="text"
                            value={meta.label}
                            onChange={(e) => updateMeta(project.id, i, "label", e.target.value)}
                            placeholder="Bezeichnung"
                            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                          />
                          <input
                            type="text"
                            value={meta.value}
                            onChange={(e) => updateMeta(project.id, i, "value", e.target.value)}
                            placeholder="Wert"
                            className="flex-1 px-3 py-2 border border-border rounded-lg text-sm bg-white focus:outline-none focus:ring-2 focus:ring-foreground/20 focus:border-foreground placeholder:text-muted-foreground/50"
                          />
                          <button
                            onClick={() => updateProject(project.id, "metaData", project.metaData.filter((_, j) => j !== i))}
                            className="w-8 h-8 flex items-center justify-center text-muted-foreground hover:text-red-500 transition-colors rounded-lg hover:bg-red-50 flex-shrink-0"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => updateProject(project.id, "metaData", [...project.metaData, { label: "", value: "" }])}
                    className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Plus size={14} /> Kenndaten hinzufügen
                  </button>
                </section>

                {/* Save bar */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                  <button
                    onClick={() => setEditingId(null)}
                    className="px-4 py-2.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    Abbrechen
                  </button>
                  <button
                    onClick={() => saveProject(project)}
                    className="px-6 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-80 transition-opacity"
                  >
                    Projekt speichern
                  </button>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default AdminProjects;
