import studioData from "../content/studio.json";

const Studio = () => {
  return (
    <section id="ueber" className="py-16 md:py-24">
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
      <div className="w-full max-w-[90%] md:max-w-[60%] flex flex-col items-center">
      <div className="max-w-lg text-left space-y-6">
        <div className="body-small text-muted-foreground leading-relaxed space-y-4">
          {studioData.paragraphs.map((p, i) => (
            <p key={i} dangerouslySetInnerHTML={{
              __html: p.replace(/\*\*(.*?)\*\*/g, '<span class="font-bold text-foreground">$1</span>')
            }} />
          ))}
        </div>

        {/* Zitat */}
        <div className="pt-4">
          <p className="body-small font-bold text-foreground">
            {studioData.quote}
          </p>
          <p className="body-small text-muted-foreground">{studioData.quoteAuthor}</p>
        </div>

        {/* Social Links as buttons */}
        <div className="flex items-center space-x-4 pt-6">
          {studioData.linkedinUrl && (
            <a
              href={studioData.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
            >
              LinkedIn
            </a>
          )}
          {studioData.instagramUrl && (
            <a
              href={studioData.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 bg-foreground text-background text-xs font-medium hover:opacity-80 transition-opacity"
            >
              Instagram
            </a>
          )}
        </div>
      </div>
      </div>
      </div>
    </section>
  );
};

export default Studio;
