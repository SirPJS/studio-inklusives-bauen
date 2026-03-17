import { useState } from "react";
import EditableField from "./EditableField";
import initialData from "../content/impressum.json";

interface Props {
  saveFile: (path: string, content: string, message: string) => Promise<void>;
}

const AdminImpressum = ({ saveFile }: Props) => {
  const [data, setData] = useState(initialData);

  const update = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  const save = () => {
    saveFile("src/content/impressum.json", JSON.stringify(data, null, 2), "Update Impressum");
  };

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-bold">Impressum</h2>

      <div className="border border-border rounded-lg p-6 space-y-4 bg-muted/20">
        <EditableField label="Firmenname" value={data.firmenname} onChange={(v) => update("firmenname", v)} />
        <EditableField label="Inhaber" value={data.inhaber} onChange={(v) => update("inhaber", v)} />
        <EditableField label="Stra&szlig;e" value={data.strasse} onChange={(v) => update("strasse", v)} />
        <div className="grid grid-cols-2 gap-4">
          <EditableField label="PLZ" value={data.plz} onChange={(v) => update("plz", v)} />
          <EditableField label="Ort" value={data.ort} onChange={(v) => update("ort", v)} />
        </div>
        <EditableField label="USt-ID" value={data.ustId} onChange={(v) => update("ustId", v)} />

        <hr className="border-border" />
        <EditableField label="Telefon" value={data.telefon} onChange={(v) => update("telefon", v)} />
        <EditableField label="E-Mail 1" value={data.email1} onChange={(v) => update("email1", v)} />
        <EditableField label="E-Mail 2" value={data.email2} onChange={(v) => update("email2", v)} />

        <hr className="border-border" />
        <EditableField label="Kammer" value={data.kammer} onChange={(v) => update("kammer", v)} />
        <EditableField label="Kammer Adresse" value={data.kammerAdresse} onChange={(v) => update("kammerAdresse", v)} />

        <hr className="border-border" />
        <EditableField label="Versicherer" value={data.versicherer} onChange={(v) => update("versicherer", v)} />
        <EditableField label="Versicherer Adresse" value={data.versichererAdresse} onChange={(v) => update("versichererAdresse", v)} />

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

export default AdminImpressum;
