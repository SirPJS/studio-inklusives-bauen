import { useState, useEffect } from "react";
import impressumData from "../../content/impressum.json";

interface LineItem {
  type?: string;
  text?: string;
  url?: string;
}

const renderLine = (line: string | LineItem, i: number) => {
  if (typeof line === "string") {
    return <p key={i}>{line}</p>;
  }
  if (line.type === "link" && line.url && line.text) {
    return (
      <p key={i}>
        <a
          href={line.url}
          target={line.url.startsWith("mailto:") ? undefined : "_blank"}
          rel="noopener noreferrer"
          className="text-link hover:underline"
        >
          {line.text}
        </a>
      </p>
    );
  }
  return null;
};

const Footer = () => {
  const [showImpressum, setShowImpressum] = useState(false);

  useEffect(() => {
    if (showImpressum) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [showImpressum]);

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

      {showImpressum && (
        <div className="fixed inset-0 z-[100] bg-background overflow-y-auto" style={{ overscrollBehavior: 'contain' }}>
          <div className="py-8 md:py-12" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
            <div className="flex items-start justify-between">
              {/* Logo - same layout as main Header */}
              <div className="flex-1">
                <button
                  onClick={() => setShowImpressum(false)}
                  className="group block"
                  style={{ marginLeft: 'clamp(5vw, calc(40% - 24vw), 35%)' }}
                >
                  <div className="flex flex-col items-end leading-[1.3]">
                    <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide pl-[0.3em]">Studio</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide">inklusives</span>
                    <span className="text-2xl md:text-3xl lg:text-4xl font-light tracking-wide pl-[0.3em]">Bauen</span>
                  </div>
                </button>
              </div>
              <nav className="hidden md:flex flex-col items-end space-y-1 pt-2 flex-shrink-0">
                <button onClick={() => setShowImpressum(false)} className="nav-link text-base lg:text-lg text-foreground cursor-pointer">Projekte</button>
                <button onClick={() => setShowImpressum(false)} className="nav-link text-base lg:text-lg text-foreground cursor-pointer">&uuml;ber</button>
              </nav>
            </div>
          </div>

          {/* Impressum content - aligned with Studio/CV text on main page */}
          <div className="flex justify-end pb-20" style={{ paddingRight: '5vw' }}>
            <div className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center">
            <div className="max-w-lg w-full">
              <div className="text-xs text-muted-foreground space-y-5 leading-relaxed">
                {impressumData.blocks.map((block, bi) => (
                  <div key={bi}>
                    {block.heading && (
                      <p className="font-bold text-foreground text-sm mb-1">{block.heading}</p>
                    )}
                    {block.lines.map((line, li) => renderLine(line as string | LineItem, li))}
                  </div>
                ))}
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
