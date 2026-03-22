import { useState } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const navItems = [
    { label: "Projekte", href: "#projekte" },
    { label: "\u00fcber", href: "#ueber" },
  ];

  const scrollTo = (href: string) => {
    setIsMobileMenuOpen(false);
    if (href === "#projekte") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  // The nav must align with the right edge of the project images.
  // Projects use: justify-end + pr-[5vw] + max-w-[60%] of remaining space.
  // So the right edge of projects = 5vw from viewport right.
  // We use the same 5vw right padding here.

  return (
    <header className="w-full bg-background sticky top-0 z-50">
      <div className="flex items-start justify-between py-8 md:py-12" style={{ paddingLeft: '5vw', paddingRight: '5vw' }}>
        {/* Logo - right-aligned block, positioned closer to project containers */}
        <div className="flex-1">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="group block ml-auto"
            style={{ marginRight: 'max(40%, calc(100% - 60% - 2vw))' }}
          >
            <div className="flex flex-col items-end leading-[1.3]">
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
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex flex-col items-end space-y-1 pt-2 flex-shrink-0">
          {navItems.map((item) => (
            <button
              key={item.href}
              onClick={() => scrollTo(item.href)}
              className="nav-link text-base lg:text-lg text-foreground cursor-pointer"
            >
              {item.label}
            </button>
          ))}
        </nav>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle mobile menu"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={
                isMobileMenuOpen
                  ? "M6 18L18 6M6 6l12 12"
                  : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobile && (
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <nav className="px-6 pt-2 pb-4">
            <ul className="space-y-3 text-right">
              {navItems.map((item) => (
                <li key={item.href}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="nav-link text-base text-foreground cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
