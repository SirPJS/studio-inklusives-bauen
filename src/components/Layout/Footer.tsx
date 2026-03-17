import { useState } from "react";

const Footer = () => {
  const [showImpressum, setShowImpressum] = useState(false);

  return (
    <>
      <footer className="bg-background">
        <div className="container mx-auto px-6 py-12">
          <div className="flex items-center justify-center">
            <button
              onClick={() => setShowImpressum(true)}
              className="text-xs text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
            >
              Impressum
            </button>
          </div>
        </div>
      </footer>

      {/* Impressum Overlay - shows header + content like in PDF */}
      {showImpressum && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto">
          {/* Same header as main page */}
          <div className="py-8 md:py-12" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
            <div className="flex items-start justify-between">
              <button
                onClick={() => setShowImpressum(false)}
                className="group text-left"
              >
                <div className="flex flex-col items-end leading-[1.1]">
                  <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    Studio
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide -mr-[0.3em]">
                    inklusives
                  </span>
                  <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">
                    Bauen
                  </span>
                </div>
              </button>

              <nav className="hidden md:flex flex-col items-end space-y-1 pt-2">
                <button
                  onClick={() => setShowImpressum(false)}
                  className="nav-link text-base lg:text-lg text-foreground cursor-pointer"
                >
                  Projekte
                </button>
                <button
                  onClick={() => setShowImpressum(false)}
                  className="nav-link text-base lg:text-lg text-foreground cursor-pointer"
                >
                  &uuml;ber
                </button>
              </nav>
            </div>
          </div>

          {/* Impressum Content */}
          <div className="max-w-xl mx-auto px-6 pb-20">
            <h2 className="font-bold text-sm mb-6">Impressum</h2>

            <div className="text-xs text-muted-foreground space-y-5 leading-relaxed">
              <p>Angaben gem. &sect;5 TMG:</p>

              <div>
                <p>Studio inklusives Bauen</p>
                <p>Dr.-Ing. Architekt Carsten Eiden (AKNW 34141)</p>
                <p>L&uuml;tticher Stra&szlig;e 56</p>
                <p>50674 K&ouml;ln</p>
                <p>
                  USt.-ID Nr. Gem&auml;&szlig; &sect;27a UStG:{" "}
                  <span className="text-red-500">
                    DE311248173 (kl&auml;ren, ob weiterhin g&uuml;ltig)
                  </span>
                </p>
              </div>

              <div>
                <p>Kontakt: +49 179 1312534</p>
                <p>
                  <a
                    href="mailto:mail@studioinklusivesbauen.de"
                    className="text-red-500 hover:underline"
                  >
                    mail@studioinklusivesbauen.de
                  </a>{" "}
                  <span className="text-red-500">(Domain noch nicht gesichert)</span>
                </p>
                <p>
                  <a
                    href="mailto:mail@carsteneiden-architekt.de"
                    className="text-red-500 hover:underline"
                  >
                    mail@carsteneiden-architekt.de
                  </a>{" "}
                  <span className="text-red-500">?</span>
                </p>
              </div>

              <div>
                <p className="font-medium text-foreground">
                  Berufsbezeichnung und berufsrechtliche Regelungen:
                </p>
                <p>Berufsbezeichnung: Architekt</p>
                <p>
                  Zust&auml;ndige Kammer: Architektenkammer Nordrhein Westfalen,
                </p>
                <p>K&ouml;rperschaft des &ouml;ffentlichen Rechts</p>
                <p>Zollhof 1</p>
                <p>40221 D&uuml;sseldorf</p>
              </div>

              <div>
                <p>Es gelten folgende berufsrechtliche Regelungen:</p>
                <p>Baukammerngesetz NRW BauKaG NW</p>
                <p>Durchf&uuml;hrungsverordnung DVO BauKaG NW</p>
                <p>Hauptsatzung der Architektenkammer Nordrhein-Westfalen</p>
                <p>
                  Regelungen einsehbar unter:{" "}
                  <a
                    href="https://aknw.de"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-link hover:underline"
                  >
                    aknw.de
                  </a>
                </p>
              </div>

              <div>
                <p>Angaben zur Berufshaftpflichtversicherung</p>
                <p>Name und Sitz des Versicherers: Markel International</p>
                <p>Luisenstra&szlig;e 14</p>
                <p>80333 M&uuml;nchen</p>
              </div>

              <div>
                <p>
                  Webdesign:{" "}
                  <span className="text-red-500">
                    Paul Jakob Scheffler (kl&auml;ren, ob Nennung gew&uuml;nscht)
                  </span>
                </p>
              </div>

              <div>
                <p>
                  Datenschutz: Diese Website erhebt keine nutzerbezogenen Daten
                  bei Ihrem Besuch und verwendet keine Cookies.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
