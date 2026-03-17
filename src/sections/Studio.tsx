const Studio = () => {
  return (
    <section id="ueber" className="py-16 md:py-24 border-t border-border">
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
      <div className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center">
      <div className="max-w-lg text-left space-y-6">
        <div className="body-small text-muted-foreground leading-relaxed space-y-4">
          <p>
            Das <span className="font-bold text-foreground">Studio inklusives Bauen</span> wurde 2026 von Carsten Eiden gegr&uuml;ndet
            und bearbeitet neben architektonischen Planungen auch
            Forschungsprojekte. Zugleich engagiert sich Studio inklusives Bauen
            in unterschiedlichen Formaten der Wissensvermittlung, gr&uuml;ndet
            Arbeitsgemeinschaften, ber&auml;t, h&auml;lt Vortr&auml;ge und
            veranstaltet Workshops oder Tagungen.
          </p>
          <p>
            Durch die langj&auml;hrige Lehr- und Forschungst&auml;tigkeit von
            Carsten Eiden kann das Studio inklusives Bauen auf ein breites
            Netzwerk aus Forschungs- und Praxispartnern zur&uuml;ckgreifen, das
            projektbezogene Kooperationen und das Arbeiten in
            interdisziplin&auml;ren Teams erm&ouml;glicht.
          </p>
          <p>
            Inklusives Bauen beinhaltet weit mehr als Barrierefreiheit und zielt
            darauf ab unsere gebaute Umwelt f&uuml;r alle Personen nutzbar und
            komfortabel zu machen. Inklusives Bauen steht damit f&uuml;r
            gleichberechtigte Teilhabe von Menschen mit
            Unterst&uuml;tzungsbedarf sowie eine qualit&auml;tvolle Architektur
            f&uuml;r alle.
          </p>
        </div>

        {/* Zitat */}
        <div className="pt-4">
          <p className="body-small font-bold text-foreground">
            &laquo;Es gibt zwei Dinge in der Architektur, Menschlichkeit oder keine&raquo;.
          </p>
          <p className="body-small text-muted-foreground">[Alvar Aalto]</p>
        </div>

        {/* Social Links as buttons */}
        <div className="flex items-center justify-center space-x-4 pt-6">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
          >
            LinkedIn
          </a>
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
          >
            Instagram
          </a>
        </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default Studio;
