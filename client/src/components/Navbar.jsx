import { useState, useEffect, useRef } from "react";
import { User2, Moon, Sun, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { Link } from "react-router-dom";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SunIcon } from "./ui/sun";
import { MoonIcon } from "./ui/moon";
import { ClubsIcon } from "./ui/clube";
const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const toggleDarkMode = () => setDarkMode(!darkMode);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  // Dark mode toggle
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Responsive menu
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && menuOpen) {
        setMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [menuOpen]);

  // Scroll listener
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      const scrolled = window.scrollY > 10;

      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled((prev) => {
            if (prev !== scrolled) return scrolled;
            return prev;
          });
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Clubs", href: "/clubs" },
    { label: "Events", href: "/events" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact", href: "/contact" },
  ];
  gsap.registerPlugin(ScrollTrigger);
  const navRef = useRef([]);
  navRef.current = [];

  return (
    <nav
      className={`
        fixed z-50 left-1/2 -translate-x-1/2
        transition-all duration-300 ease-in-out 
       
        ${
          isScrolled
            ? "top-8 w-[80%] rounded-4xl shadow-xl bg-white/70 dark:bg-gray-900/80 border border-white/30 dark:border-gray-700/30  backdrop-blur-md "
            : "top-0 w-full rounded-none shadow-none bg-white/70 dark:bg-gray-900/70 border-b border-white/20 dark:border-gray-700/30"
        }
      `}
      ref={navRef}
    >
      <div
        className={`
          flex items-center justify-between 
          transition-all duration-300 ease-in-out    
          ${isScrolled ? "px-[4vw]" : "px-[10vw]"} 
        `}
      >
        {/* Logo + Brand */}
        <div className="flex items-center gap-3">
          <img
            src={logo}
            alt="NextEdge"
            className={`transition-transform duration-300 ease-in-out ${
              isScrolled ? "scale-75" : "scale-100"
            }`}
            width="70"
            height="70"
          />
          <span
            className={`text-lg md:text-xl font-semibold text-gray-900 dark:text-white select-none transition-transform duration-300 ease-in-out origin-left ${
              isScrolled ? "scale-90" : "scale-100"
            }`}
          >
            NextEdge Society
          </span>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8 font-medium text-gray-900 dark:text-white">
          {navLinks.map(({ label, href }) => (
            <Link
              key={label}
              to={href}
              className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              onClick={() => setMenuOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-4">
          {/* Dark mode toggle */}
          <button
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            className="rounded-full p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition focus:outline-none"
          >
            {darkMode ? (
              <SunIcon className="text-yellow-400" />
            ) : (
              <div className="flex gap-4">
                <MoonIcon className="text-gray-700 dark:text-gray-300" />
                <ClubsIcon />
              </div>
            )}
          </button>

          {/* User Icon */}
          <User2 className="w-6 h-6 text-gray-900 dark:text-white" />

          {/* Hamburger menu */}
          <button
            onClick={toggleMenu}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            className="md:hidden rounded p-2 hover:bg-gray-200/50 dark:hover:bg-gray-700/50 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {menuOpen ? (
              <X className="w-6 h-6 text-gray-900 dark:text-white" />
            ) : (
              <Menu className="w-6 h-6 text-gray-900 dark:text-white" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 shadow-lg">
          <div className="flex flex-col px-6 py-4 space-y-4 font-medium text-gray-900 dark:text-white">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
