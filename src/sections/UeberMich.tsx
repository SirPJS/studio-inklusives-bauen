const TimelineEntry = ({
  year,
  text,
}: {
  year: string;
  text: React.ReactNode;
}) => (
  <div className="grid grid-cols-[100px_1fr] md:grid-cols-[120px_1fr] gap-4 items-baseline text-left">
    <span className="body-small font-medium text-foreground">{year}</span>
    <div className="body-small text-muted-foreground">{text}</div>
  </div>
);

const UeberMich = () => {
  return (
    <section className="py-16 md:py-24">
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
      <div className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center">
      <div className="max-w-lg text-left space-y-12">
        {/* Name */}
        <h2 className="font-bold text-base">
          Dr. Ing. Architekt Carsten Eiden
        </h2>

        {/* Ausbildung */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm">Ausbildung</h3>
          <div className="space-y-2">
            <TimelineEntry
              year="2022"
              text={
                <>
                  Promotion an der RWTH Aachen University
                  <br />
                  Erstberichter Univ.-Prof. Hartwig Schneider
                </>
              }
            />
            <TimelineEntry
              year="1998"
              text={
                <>
                  Diplom am Lehrstuhl Geb&auml;udelehre, Univ.-Prof. Klaus Kada
                  <br />
                  [Auszeichnung beim Euregionalen Architekturpreis - EAP]
                </>
              }
            />
            <TimelineEntry
              year="1991&ndash;1998"
              text="Architekturstudium an der RWTH Aachen"
            />
          </div>
        </div>

        {/* T&auml;tigkeiten */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm">T&auml;tigkeiten</h3>
          <div className="space-y-2">
            <TimelineEntry
              year="seit 2026"
              text="Studio inklusives Bauen, K&ouml;ln"
            />
            <TimelineEntry
              year="seit 2017"
              text={
                <>
                  Carsten Eiden Architekt, K&ouml;ln
                  <br />
                  [Einzelunternehmer, Projektpartner der Arbeitsgemeinschaft mit
                  Aretz D&uuml;rr Architektur BDA, K&ouml;ln]
                </>
              }
            />
            <TimelineEntry
              year="2012&ndash;2017"
              text={
                <>
                  elm[a] eidenlenznermathow Architektur, K&ouml;ln
                  <br />
                  [Partner der Architekten-PartGmbB]
                </>
              }
            />
            <TimelineEntry
              year="seit 2012"
              text={
                <>
                  Wissenschaftlicher Mitarbeiter am Lehrstuhl Baukonstruktion,
                  Univ.-Prof. Hartwig Schneider, RWTH Aachen University
                </>
              }
            />
            <TimelineEntry
              year="2002&ndash;2012"
              text={
                <>
                  Eiden + Lenzner Architekten, K&ouml;ln
                  <br />
                  [Partner der GbR]
                </>
              }
            />
            <TimelineEntry
              year="seit 2001"
              text="Mitglied der Architektenkammer Nordrhein-Westfalen"
            />
            <TimelineEntry
              year="1998&ndash;2001"
              text={
                <>
                  Mitarbeiter bei
                  <br />
                  Steves &amp; Borsum Architekten, K&ouml;ln [Projektleitung]
                  <br />
                  FWW - Prof. Fuhrmann Wallrath Weinert Architekten, K&ouml;ln
                  <br />
                  Heiermann Architekten, K&ouml;ln
                </>
              }
            />
          </div>
        </div>

        {/* Forschung */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm">Forschung</h3>
          <div className="space-y-2">
            <TimelineEntry
              year="2022"
              text={
                <>
                  Herausgabe eines Kompendiums der 2022 erschienenen
                  Dissertation als Planungsleitfaden f&uuml;r Architektinnen und
                  Wohnungswirtschaft
                </>
              }
            />
            <TimelineEntry
              year="2017&ndash;2022"
              text={
                <>
                  Dissertation &bdquo;Quartiersbezogene Wohnformen f&uuml;r
                  Menschen mit Pflege- und Betreuungsbedarf - Untersuchungen zur
                  Wirksamkeit adaptiver Geb&auml;udekonzepte am Beispiel von
                  Gro&szlig;wohnungen f&uuml;r Wohngemeinschaften&ldquo;
                </>
              }
            />
            <TimelineEntry
              year="seit 2021"
              text={
                <>
                  Gr&uuml;ndungspartner im interdisziplin&auml;ren
                  Forschungsteam &bdquo;Architektur und Gesundheit&ldquo; in
                  Kooperation mit dem Universit&auml;tsklinikum Aachen, Prof.
                  Dr. med. Cornelius Bollheimer und Prof. Dr. Marcel Schweiker
                </>
              }
            />
            <TimelineEntry
              year="seit 2019"
              text={
                <>
                  Partner im interdisziplin&auml;ren Forschungsnetzwerk Wohnen
                  an der RWTH Aachen University
                </>
              }
            />
            <TimelineEntry
              year="2017"
              text={
                <>
                  Forschungsprojekt &bdquo;Die Integration quartiersbezogener
                  Wohnkonzepte in den Wohnungsbestand der Nachkriegsmoderne -
                  Fallstudien zu Siedlungen an den Standorten K&ouml;ln-Deutz
                  und Bonn-Castell&ldquo;
                  <br />
                  Laufzeit: 6 Monate
                  <br />
                  Auftraggeber: Rheinische Beamten-Baugesellschaft mbH, K&ouml;ln
                  <br />
                  Kooperationspartner: Lebenshilfe K&ouml;ln e.V. / empirica ag,
                  Berlin
                </>
              }
            />
            <TimelineEntry
              year="2015&ndash;2016"
              text={
                <>
                  Forschungsprojekt &bdquo;Quartierspflegekern&ldquo; -
                  Entwicklung von quartiersbezogenen Wohnkonzepten mit
                  Pflegekern
                  <br />
                  Laufzeit: 12 Monate
                  <br />
                  F&ouml;rdergeber: GKV Spitzenverband im Auftrag des BMG
                  <br />
                  Forschungspartner: empirica ag, Berlin
                </>
              }
            />
          </div>
        </div>

        {/* Vortr&auml;ge, Workshops */}
        <div className="space-y-3">
          <h3 className="font-bold text-sm">
            Vortr&auml;ge, Workshops, architektonische Beratungen
          </h3>
          <div className="space-y-2">
            <TimelineEntry
              year="2026"
              text={
                <>
                  Online-Impulsvortrag im Rahmen der Reihe
                  &bdquo;Gesundheitsbauten der Zukunft&ldquo; / AKG e.V.{" "}
                  Referat 8: Architektur + Gesundheit - Bauaufgabe MZEB |
                  Fallbeispiele aus NRW - zwischen Wunsch und Wirklichkeit
                </>
              }
            />
            <TimelineEntry
              year="2025"
              text={
                <>
                  Online-Gastvortrag &bdquo;Wohnen +&ldquo; an der TU
                  M&uuml;nchen im Rahmen der Reihe Impulse to go: Architektur
                  und Medizin im Dialog
                </>
              }
            />
            <TimelineEntry
              year="2025"
              text={
                <>
                  Architektonische Beratung bei der Entwicklung eines inklusiven
                  Wohnangebotes von Wohnprojekt e.V., Bergisch Gladbach
                </>
              }
            />
            <TimelineEntry
              year="2024/25"
              text={
                <>
                  Architektonische Beratung bei der Realisierung eines inklusiven
                  Familienhauses der Stegerwald Stiftung, Leverkusen
                </>
              }
            />
          </div>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default UeberMich;
