import { useState } from "react";
import ImageGallery from "@/components/ui/image-gallery";

// Import all project JSON files from content/projects/
const projectModules = import.meta.glob("../content/projects/*.json", { eager: true });

interface ProjectData {
  id: number;
  title: string;
  subtitle: string;
  year: string;
  images: string[];
  mainText: string;
  linkUrl?: string;
  linkLabel?: string;
  metaData: {
    label: string;
    value: string;
  }[];
}

// Load and sort projects by ID descending (newest first)
const projects: ProjectData[] = Object.values(projectModules)
  .map((mod: any) => mod.default || mod)
  .sort((a: ProjectData, b: ProjectData) => b.id - a.id);

const ProjectCard = ({ project }: { project: ProjectData }) => {
  const [showText, setShowText] = useState(false);

  return (
    <article className="space-y-0">
      {/* Image - right-aligned, same padding as header */}
      <div className="flex justify-end" style={{ paddingRight: '5vw' }}>
        <div className="w-full max-w-[90%] md:max-w-[60%] group/project">
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
            <div className="py-8 space-y-6">
              <div className="max-w-md text-left">
                <p>
                  <span className="font-bold">{project.title}</span>
                  {", "}
                  <span>{project.year}</span>
                </p>

                <div className="body-small text-muted-foreground leading-relaxed space-y-3 mt-4">
                  {project.mainText.split("\n\n").map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                {project.linkUrl && (
                  <p className="text-xs mt-4">
                    <span>{project.linkLabel}: </span>
                    <a
                      href={project.linkUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-link hover:opacity-70 transition-opacity"
                    >
                      {project.linkUrl}
                    </a>
                  </p>
                )}
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowText(false)}
                  className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300 cursor-pointer mt-4"
                >
                  schlie&szlig;en
                </button>
              </div>
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
