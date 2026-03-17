import { useState, useRef, useEffect } from "react";
import ImageGallery from "@/components/ui/image-gallery";

interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  images: string[];
  mainText: string;
  link?: { url: string; label: string };
  metaData: {
    label: string;
    value: string;
  }[];
}

const projects: ProjectData[] = [
  {
    id: 26,
    title: "Impulsvortrag \u201EGesundheitsbauten der Zukunft\u201C",
    subtitle: "Referat 8: Architektur+Gesundheit",
    year: "Februar 2026",
    images: [
      "images/gesundheitsbauten/1_Plakat.jpg",
      "images/gesundheitsbauten/2_Ablauf.jpg",
      "images/gesundheitsbauten/3_Bestandsersfassung2.jpg",
      "images/gesundheitsbauten/4_qualifiziertes Raumprogramm.jpg",
      "images/gesundheitsbauten/5_Testentwurf1.jpg",
      "images/gesundheitsbauten/6_Testentwurf2.jpg",
    ],
    mainText: `Initiiert von Professorin Dr. Birgit Dietz, fand eine Dialogreihe zum aktuellen und zuk\u00fcnftigen Gesundheitsbau mit Impulsen aus Forschung und Praxis f\u00fcr Studierende der Architektur, Architekten, Planer und Praxispartner unter der Regie des AKG e.V. statt.\n\nDie vier kooperierenden Hochschulen sowie der Veranstalter waren mit jeweils einem Impulsvortrag vertreten, um mit aktuellen Themen aus Forschung und Praxis in den Dialog zu treten.\n\nAls Vertreter der RWTH Aachen University stellte Carsten Eiden die Zwischenergebnisse des Forschungsfeldes Architektur und Gesundheit zum Thema \u201EBauaufgabe MZEB\u201C aus dem Sommersemester 2024 vor und erl\u00e4uterte den weiteren Forschungsbedarf.\n\nEine gelungene Auftaktveranstaltung, die im Sommersemester ihre Fortf\u00fchrung finden soll.`,
    link: { url: "https://www.akg-architekten.de/event-page/575", label: "Link zum Veranstalter" },
    metaData: [
      { label: "Dr. Ing. Carsten Eiden", value: "" },
      { label: "Architekt | Wissenschaftlicher Mitarbeiter", value: "" },
      { label: "Lehrstuhl Baukonstruktion | RWTH Aachen", value: "" },
    ],
  },
  {
    id: 25,
    title: "Quartiershaus Redwitzstra\u00dfe, K\u00f6ln",
    subtitle: "Arge elm[a] Architektur mit Hellwig Architekten",
    year: "2015\u20132025",
    images: [
      "images/quartiershaus/1_Redwitzstra\u00dfe.jpg",
      "images/quartiershaus/2_Modell_gesamt.JPG",
      "images/quartiershaus/3_Grundriss EG.jpg",
      "images/quartiershaus/4_Grundriss 1.OG.jpg",
      "images/quartiershaus/5_Grundriss 2.-3.OG.jpg",
      "images/quartiershaus/6_Hofansicht.jpg",
      "images/quartiershaus/7_Ansicht Palanterstra\u00dfe.jpg",
      "images/quartiershaus/8_Ansicht Redwitzstra\u00dfe.jpg",
    ],
    mainText: `Im Rahmen einer Machbarkeitsstudie war die Nachverdichtung eines innerst\u00e4dtischen Grundst\u00fccks, mit seiner unbebauten Blockrand-Ecke, zu untersuchen. Mit dem Entwurf wird ein integratives und flexibles Wohnhaus mit vier Vollgeschossen und einem Staffelgeschoss vorgeschlagen. Die Geb\u00e4udestruktur erlaubt dabei einen Wohnungsmix f\u00fcr unterschiedliche Wohnformen und Nutzergenerationen.\n\nNeben zweigeschossigen Stadth\u00e4usern mit separatem Zugang und kleinem Garten k\u00f6nnen Geschosswohnungen mit 2-4 Zimmern sowie Penthouse-Wohnungen mit individuellen Dachterrassen angeboten werden. Zwei der Vollgeschosse sind dem Thema der ambulanten Pflege gewidmet.\n\nDas Erschlie\u00dfungskonzept kommt dabei fl\u00e4chenoptimiert mit nur einem inneren Treppenhaus aus. Im Erdgeschoss steht eine Gewerbeeinheit mit Au\u00dfenfl\u00e4chen zur Verf\u00fcgung, die im Sinne eines quartierintegrierten Wohnkonzeptes erg\u00e4nzende Nutzungen, wie einen Pflegest\u00fctzpunkt, oder ein Quartierscaf\u00e9 aufnehmen kann.\n\nMit dem Quartiershaus ist ein Geb\u00e4ude entstanden, das selbstverst\u00e4ndlicher Teil eines Ensembles wird und zugleich auf die Anforderungen einer sich \u00e4ndernden Gesellschaft reagiert.`,
    metaData: [
      { label: "Planung", value: "Arge elm[a] Architektur mit Hellwig Architekten" },
      { label: "Jahr", value: "2015\u20132025" },
      { label: "Auftraggeber", value: "kath. Kirchengemeinde" },
      { label: "Leistungsphasen", value: "1\u20139" },
    ],
  },
  {
    id: 22,
    title: "Dissertation",
    subtitle: "Kompendium, 2022",
    year: "2022",
    images: [
      "images/dissertation/1_Dissertation.jpg",
      "images/dissertation/2_Dissertation.jpg",
      "images/dissertation/3_Dissertation.jpg",
      "images/dissertation/4_Dissertation.jpg",
      "images/dissertation/5_Dissertation.jpg",
      "images/dissertation/6_Dissertation.jpg",
    ],
    mainText: `Quartiersbezogene Wohnformen f\u00fcr Menschen mit Pflege- und Betreuungsbedarf\nUntersuchungen zur Wirksamkeit adaptiver Geb\u00e4udekonzepte am Beispiel von Gro\u00dfwohnungen f\u00fcr Wohngemeinschaften\n\nQuartiersbezogene Wohnformen richten sich an Menschen, die in ihrem Alltag auf Unterst\u00fctzung in Form von Pflege- und Betreuungsleistungen oder einer Assistenz angewiesen sind. Ihr ambulantes Versorgungskonzept ist dabei als Gegenmodell zur klassischen Heimunterbringung zu verstehen, da es die Wohnung von den erforderlichen Dienstleistungen entkoppelt und somit eine gr\u00f6\u00dfere Wahlfreiheit schafft.\n\nWas sind die Faktoren einer baulichen Inklusionsf\u00e4higkeit im Wohnungsbau und welcher strukturellen Ordnung bedarf das Geb\u00e4ude, damit es sich an wandelnde Bedarfe der Nutzer:innen l\u00e4ngerfristig anpassen und auch im Sinne einer Versorgungssicherheit nachhaltig sein kann?\n\nEine besondere Herausforderung ergibt sich bei der Erstellung und Vorhaltung von Gro\u00dfwohnungen f\u00fcr Wohngemeinschaften mit Betreuungsleistungen, die eine Wohnfl\u00e4che von circa vierhundert Quadratmetern ben\u00f6tigen und dennoch baulich in generationengemischte Hausgemeinschaften eingebunden sein sollen. Der zentrale Teil der Dissertation widmet sich dieser Wohnform auf den Ebenen der Funktion und der konstruktiven Umsetzung.`,
    link: { url: "https://publications.rwth-aachen.de/record/849541", label: "Ver\u00f6ffentlichung auf RWTH Publications" },
    metaData: [
      { label: "", value: "Dr. Ing. Carsten Eiden" },
      { label: "", value: "RWTH Aachen University" },
    ],
  },
  {
    id: 23,
    title: "Inklusives Wohnprojekt f\u00fcr Menschen mit Autismus-Spektrum-St\u00f6rung, Aachen",
    subtitle: "Arge Carsten Eiden Architekt mit Aretz D\u00fcrr Architektur",
    year: "2020\u20132023",
    images: [
      "images/inklusives-wohnen/1_inklusives Wohnen.jpg",
      "images/inklusives-wohnen/1_inklusives Wohnen2.jpg",
      "images/inklusives-wohnen/1_inklusives Wohnen3.jpg",
      "images/inklusives-wohnen/2_Modell_gesamt1.jpeg",
      "images/inklusives-wohnen/3_Lageplan.jpg",
      "images/inklusives-wohnen/4_Grundriss-Erdgeschoss.jpg",
      "images/inklusives-wohnen/5_Grundriss-Obergeschoss.jpg",
      "images/inklusives-wohnen/6_Ansicht ost.jpg",
      "images/inklusives-wohnen/7_Modell_gesamt2.jpeg",
      "images/inklusives-wohnen/8_Modell-Hofseite.jpeg",
      "images/inklusives-wohnen/9_Rendering-Balkone.png",
      "images/inklusives-wohnen/10_Rendering-Balkone2.png",
      "images/inklusives-wohnen/11_Rendering-Laubeng\u00e4nge.png",
    ],
    mainText: `Als inklusives Wohnprojekt f\u00fcr Menschen mit Autismus-Spektrum-St\u00f6rung, gemischt mit Wohnungen, die dem Wohnungsmarkt frei zug\u00e4nglich sind, f\u00fcgt sich der Entwurf in den ma\u00dfgeblich durch Wohnnutzung gepr\u00e4gten Ortsteil s\u00fcdlich der J\u00fclicher Stra\u00dfe ein und bereichert diesen um einen gesellschaftlich wertvollen Baustein.\n\nNutzung: EG \u2013 gemeinschaftliches Wohnen in 2 anbieterverantworteten Wohngemeinschaften mit Betreuungsleistungen f\u00fcr Menschen mit Autismus-Spektrum-St\u00f6rung mit je 4 BewohnerInnen. Beide Wohngemeinschaften weisen einen identischen Grundriss auf und k\u00f6nnten \u00fcber eine bauliche Verbindung gekoppelt werden.\n\n1. und 2. OG \u2013 Wohnen mit erg\u00e4nzenden Angeboten. In den Obergeschossen befinden sich abgeschlossene Wohneinheiten mit ein bis drei Zimmern, die mit Angeboten f\u00fcr die gemeinschaftliche Tagesstruktur kombiniert werden.\n\nKonstruktion: Der nicht unterkellerte dreigeschossige Neubau wird als Holzbau in Modulbauweise ausgef\u00fchrt.`,
    metaData: [
      { label: "Planung", value: "Arge Carsten Eiden Architekt mit Aretz D\u00fcrr Architektur" },
      { label: "Jahr", value: "2020\u20132023" },
      { label: "Auftraggeber", value: "Privat" },
      { label: "Leistungsphasen", value: "1\u20135" },
    ],
  },
  {
    id: 18,
    title: "Barrierefreier Anbau Haus K, K\u00f6ln",
    subtitle: "Carsten Eiden Architekt",
    year: "2017\u20132018",
    images: [
      "images/anbau-haus-k/1_Anbau Haus K2.jpg",
      "images/anbau-haus-k/2_Bild Modell_Kr\u00f6ll.png",
      "images/anbau-haus-k/3_Haus Kr\u00f6ll_Plan Grundriss.jpg",
      "images/anbau-haus-k/4_Haus Kr\u00f6ll_Plan S\u00fcdseite.jpg",
      "images/anbau-haus-k/5_Haus Kr\u00f6ll_Plan Nordseite.jpg",
      "images/anbau-haus-k/6_Haus Kr\u00f6ll_Plan Westseite.jpg",
      "images/anbau-haus-k/7_Kr\u00f6ll-S\u00fcdseite.jpg",
    ],
    mainText: `Ein kleines Siedlungshaus aus den fr\u00fchen 1950-er Jahren soll f\u00fcr die folgende Generation erweitert werden. Um den Charakter des Hauses zu erhalten und das gro\u00dfz\u00fcgige Grundst\u00fcck besser auszunutzen, wird ein Neubau vorgeschlagen, der nur \u00fcber einen schmalen Gang mit dem Bestandsgeb\u00e4ude verbunden ist und einen gemeinsamen Hof als Zwischenraum aufspannt.\n\nDies erm\u00f6glicht sowohl den gew\u00fcnschten Umbau im bewohnten Zustand als auch eine Trennung der Wohnbereiche. Viele Kombinationen sind damit denkbar. Ein eigenes Haus f\u00fcr die Kinder, die G\u00e4ste, die Eltern; barrierefreies Wohnen im Garten.\n\nDer eingeschossige Anbau wird als Holzrahmenbau auf einer thermisch aktivierten Bodenplatte geplant, was zu einer deutlichen Bauzeitverk\u00fcrzung f\u00fchrt und damit die St\u00f6rungen aus dem Baubetrieb reduziert.\n\nMit seinem flach geneigten Satteldach und den einfachen Materialien transportiert der Neubau die unpr\u00e4tenti\u00f6se Formensprache der Nachkriegszeit in eine zeitgem\u00e4\u00dfe und nachhaltige Architektur.`,
    metaData: [
      { label: "Planung", value: "Carsten Eiden Architekt mit Roman Kr\u00fckel" },
      { label: "Jahr", value: "2017\u20132018" },
      { label: "Auftraggeber", value: "Privat" },
      { label: "Leistungsphasen", value: "1\u20134" },
    ],
  },
];

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const [showText, setShowText] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const [imageHeight, setImageHeight] = useState<number | null>(null);

  // Capture the height of the first image to keep gallery stable
  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.offsetWidth;
        const aspectRatio = img.naturalHeight / img.naturalWidth;
        setImageHeight(containerWidth * aspectRatio);
      }
    };
    img.src = `${import.meta.env.BASE_URL || '/'}${project.images[0]}`;
  }, [project.images]);

  return (
    <article className="space-y-0">
      {/* Image - right-aligned, same padding as header */}
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
        <div
          ref={containerRef}
          className="w-full max-w-[90%] md:max-w-[60%] group/project"
        >
          <div className="transition-all duration-500 grayscale group-hover/project:grayscale-0">
            <ImageGallery
              images={project.images}
              title={project.title}
              className="w-full"
            />
          </div>
        </div>
      </div>

      {/* Text toggle + expandable - aligned under the project image */}
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
        <div className="w-full max-w-[90%] md:max-w-[60%]">
          {!showText ? (
            <div className="flex justify-center py-3">
              <button
                onClick={() => setShowText(true)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer"
              >
                Text
              </button>
            </div>
          ) : (
            <div className="py-8 text-center space-y-6">
              <p>
                <span className="font-bold">{project.title}</span>
                {", "}
                <span>{project.year}</span>
              </p>

              <div className="body-small text-muted-foreground leading-relaxed space-y-3">
                {project.mainText.split("\n\n").map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}
              </div>

              {project.link && (
                <p className="text-xs">
                  <span>{project.link.label}: </span>
                  <a
                    href={project.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:opacity-70 transition-opacity"
                  >
                    {project.link.url}
                  </a>
                </p>
              )}

              <button
                onClick={() => setShowText(false)}
                className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer mt-4"
              >
                schlie&szlig;en
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
};

const Projekte = () => {
  return (
    <section id="projekte" className="pb-16">
      <div className="space-y-12 md:space-y-16">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
};

export default Projekte;
