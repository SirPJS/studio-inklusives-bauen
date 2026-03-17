import { useState, useEffect } from "react";
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
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on("init", (u: any) => setUser(u));
      window.netlifyIdentity.on("login", (u: any) => setUser(u));
      window.netlifyIdentity.on("logout", () => setUser(null));
      window.netlifyIdentity.init();
    }
  }, []);

  const handleLogin = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.open("login");
    }
  };

  const handleLogout = () => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.logout();
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    setTimeout(() => setMessage(""), 3000);
  };

  // Save file to GitHub via Netlify Git Gateway
  const saveFile = async (path: string, content: string, commitMessage: string) => {
    setSaving(true);
    try {
      const token = user?.token?.access_token;
      if (!token) throw new Error("Nicht eingeloggt");

      // Get current file SHA
      const getResp = await fetch(
        `https://api.github.com/repos/SirPJS/studio-inklusives-bauen/contents/${path}`,
        { headers: { Authorization: `token ${token}` } }
      );

      let sha = "";
      if (getResp.ok) {
        const data = await getResp.json();
        sha = data.sha;
      }

      // Use Git Gateway instead of direct GitHub API
      const gwResp = await fetch("/.netlify/git/github/contents/" + path, {
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

      if (!gwResp.ok) {
        const err = await gwResp.text();
        throw new Error(err);
      }

      showMessage("Gespeichert! Die Seite wird in ca. 1-2 Minuten aktualisiert.");
    } catch (err: any) {
      showMessage("Fehler beim Speichern: " + err.message);
    } finally {
      setSaving(false);
    }
  };

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
    { id: "projekte", label: "Projekte" },
    { id: "studio", label: "Studio-Text" },
    { id: "cv", label: "Lebenslauf" },
    { id: "impressum", label: "Impressum" },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Admin Header */}
      <header className="bg-foreground text-background px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-6">
          <span className="font-medium text-sm">Admin: Studio inklusives Bauen</span>
          <nav className="flex space-x-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-2 text-xs rounded transition-colors ${
                  activeTab === tab.id
                    ? "bg-background text-foreground"
                    : "text-background/70 hover:text-background"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>
        <div className="flex items-center space-x-4">
          {saving && <span className="text-xs text-background/70">Speichert...</span>}
          {message && (
            <span className="text-xs text-green-300">{message}</span>
          )}
          <span className="text-xs text-background/50">{user.email}</span>
          <button
            onClick={handleLogout}
            className="text-xs text-background/70 hover:text-background"
          >
            Ausloggen
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="max-w-4xl mx-auto px-6 py-8">
        {activeTab === "projekte" && <AdminProjects saveFile={saveFile} />}
        {activeTab === "studio" && <AdminStudio saveFile={saveFile} />}
        {activeTab === "cv" && <AdminCV saveFile={saveFile} />}
        {activeTab === "impressum" && <AdminImpressum saveFile={saveFile} />}
      </main>
    </div>
  );
};

export default AdminApp;
