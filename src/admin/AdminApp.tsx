import { useState, useEffect, useCallback } from "react";
import { Image, FileText, User, Scale } from "lucide-react";
import AdminProjects from "./AdminProjects";
import AdminStudio from "./AdminStudio";
import AdminCV from "./AdminCV";
import AdminImpressum from "./AdminImpressum";

declare global {
  interface Window {
    netlifyIdentity: any;
  }
}

const AdminApp = () => {
  const [user, setUser] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<string>("projekte");
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (u: any) => setUser(u));
      window.netlifyIdentity.on("login", (u: any) => setUser(u));
      window.netlifyIdentity.on("logout", () => setUser(null));
      window.netlifyIdentity.init();
    }
  }, []);

  const handleLogin = () => window.netlifyIdentity?.open("login");
  const handleLogout = () => window.netlifyIdentity?.logout();

  const showMessage = useCallback((text: string, type: "success" | "error" = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 4000);
  }, []);

  /** Get a fresh auth token (auto-refreshes if expired) */
  const getToken = useCallback(async (): Promise<string> => {
    if (!user) throw new Error("Nicht eingeloggt");
    // user.jwt() refreshes the token automatically if expired
    if (typeof user.jwt === "function") {
      return await user.jwt();
    }
    const token = user.token?.access_token;
    if (!token) throw new Error("Nicht eingeloggt");
    return token;
  }, [user]);

  /** Get SHA for an existing file (returns empty string for new files) */
  const getFileSha = useCallback(async (path: string, token: string): Promise<string> => {
    try {
      const resp = await fetch("/.netlify/git/github/contents/" + path, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (resp.ok) {
        const data = await resp.json();
        return data.sha;
      }
    } catch { /* new file */ }
    return "";
  }, []);

  /** Save a text file (JSON) via Git Gateway */
  const saveFile = useCallback(async (path: string, content: string, commitMessage: string) => {
    setSaving(true);
    try {
      const token = await getToken();
      const sha = await getFileSha(path, token);

      const resp = await fetch("/.netlify/git/github/contents/" + path, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: commitMessage,
          content: btoa(unescape(encodeURIComponent(content))),
          ...(sha ? { sha } : {}),
        }),
      });

      if (!resp.ok) throw new Error(await resp.text());
      showMessage("Gespeichert! Seite wird in 1-2 Min. aktualisiert.");
    } catch (err: any) {
      showMessage("Fehler: " + err.message, "error");
    } finally {
      setSaving(false);
    }
  }, [getToken, getFileSha, showMessage]);

  /** Upload a binary file (image) via Git Gateway */
  const uploadFile = useCallback(async (path: string, base64Content: string, commitMessage: string) => {
    const token = await getToken();

    const resp = await fetch("/.netlify/git/github/contents/" + path, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message: commitMessage,
        content: base64Content,
      }),
    });

    if (!resp.ok) throw new Error(await resp.text());
  }, [getToken]);

  // Login screen
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-6">
          <div className="flex flex-col items-end leading-[1.1] mx-auto w-fit">
            <span className="text-3xl font-light tracking-wide">Studio</span>
            <span className="text-3xl font-light tracking-wide -mr-[0.3em]">inklusives</span>
            <span className="text-3xl font-light tracking-wide">Bauen</span>
          </div>
          <p className="text-sm text-muted-foreground">Admin-Bereich</p>
          <button
            onClick={handleLogin}
            className="px-8 py-3 bg-foreground text-background text-sm font-medium hover:opacity-80 transition-opacity"
          >
            Einloggen
          </button>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "projekte", label: "Projekte", icon: Image },
    { id: "studio", label: "Studio-Text", icon: FileText },
    { id: "cv", label: "Lebenslauf", icon: User },
    { id: "impressum", label: "Impressum", icon: Scale },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f7]">
      {/* Header */}
      <header className="bg-white border-b border-border px-6 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-8">
          <span className="font-medium text-sm text-foreground">Admin</span>
          <nav className="flex gap-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 text-sm rounded-lg transition-colors ${
                    activeTab === tab.id
                      ? "bg-foreground text-background font-medium"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  <Icon size={16} />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-muted-foreground hidden md:inline">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            Ausloggen
          </button>
        </div>
      </header>

      {/* Toast message */}
      {(message || saving) && (
        <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50">
          <div className={`px-5 py-2.5 rounded-lg shadow-lg text-sm font-medium ${
            saving
              ? "bg-foreground text-background"
              : message?.type === "error"
              ? "bg-red-500 text-white"
              : "bg-green-600 text-white"
          }`}>
            {saving ? "Speichert..." : message?.text}
          </div>
        </div>
      )}

      {/* Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        {activeTab === "projekte" && (
          <AdminProjects saveFile={saveFile} uploadFile={uploadFile} showMessage={showMessage} />
        )}
        {activeTab === "studio" && <AdminStudio saveFile={saveFile} />}
        {activeTab === "cv" && <AdminCV saveFile={saveFile} />}
        {activeTab === "impressum" && <AdminImpressum saveFile={saveFile} />}
      </main>
    </div>
  );
};

export default AdminApp;
