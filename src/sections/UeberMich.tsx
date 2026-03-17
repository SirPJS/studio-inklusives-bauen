import cvData from "../content/cv.json";

const TimelineEntry = ({ year, text }: { year: string; text: string }) => (
  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 items-baseline text-left">
    <span className="body-small font-medium text-foreground">{year}</span>
    <div className="body-small text-muted-foreground whitespace-pre-line">{text}</div>
  </div>
);

const TimelineSection = ({ title, entries }: { title: string; entries: { year: string; text: string }[] }) => (
  <div className="space-y-3">
    <h3 className="font-bold text-sm">{title}</h3>
    <div className="space-y-2">
      {entries.map((entry, i) => (
        <TimelineEntry key={i} year={entry.year} text={entry.text} />
      ))}
    </div>
  </div>
);

const UeberMich = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
      <div className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center">
      <div className="max-w-lg text-left space-y-12">
        <h2 className="font-bold text-base">{cvData.name}</h2>

        {cvData.ausbildung.length > 0 && (
          <TimelineSection title="Ausbildung" entries={cvData.ausbildung} />
        )}
        {cvData.taetigkeiten.length > 0 && (
          <TimelineSection title="T&auml;tigkeiten" entries={cvData.taetigkeiten} />
        )}
        {cvData.forschung.length > 0 && (
          <TimelineSection title="Forschung" entries={cvData.forschung} />
        )}
        {cvData.vortraege.length > 0 && (
          <TimelineSection title="Vortr&auml;ge, Workshops, architektonische Beratungen" entries={cvData.vortraege} />
        )}
      </div>
      </div>
      </div>
    </section>
  );
};

export default UeberMich;
