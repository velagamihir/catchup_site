import React, { useEffect, useState } from "react";
import "../marque.css";
import "../output.css";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";

// --- Utility Constants (Mimicking Tailwind Theme) ---
const PRIMARY_COLOR_TEXT = "text-[#FF7F00]";
const PRIMARY_COLOR_BG = "bg-[#FF7F00]";
const LIGHT_BG = "bg-gray-50";
const DARK_TEXT = "text-gray-800";
const CARD_BG = "bg-white";
const LIGHT_TINT = "bg-[#FFF3E6]";

// --- Main.jsx React Component with Tailwind CSS Classes ---
const Main = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState([]);
  const [latestMedia, setLatestMedia] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false); // for mobile hamburger

  // Fetch latest media
  useEffect(() => {
    async function fetchLatestMedia() {
      const { data, error } = await supabase
        .from("catchup_media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      if (error) console.error("Error fetching media:", error);
      else
        setLatestMedia(
          data.map((item) => ({ ...item, thumbnail_url: item.thumbnail_url }))
        );
    }
    fetchLatestMedia();
  }, []);

  // Fetch testimonials
  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .order("id", { ascending: false })
        .limit(3);
      if (error) console.error("Error fetching testimonials: ", error);
      else setTestimonials(data || []);
    }
    fetchTestimonials();
  }, []);

  // Close mobile menu on navigation (helper)
  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (href && href.startsWith("/")) navigate(href);
    else if (href && href.startsWith("#")) {
      // hash navigation: smooth scroll
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className={`min-h-screen ${LIGHT_BG} font-sans ${DARK_TEXT}`}>
      {/* Fixed Side Button */}
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 w-12 ${PRIMARY_COLOR_BG} p-2 rounded-lg font-bold z-[1000] text-white`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        <a href="/recentUploads" className="hover:underline">
          View Recent Uploads
        </a>
      </div>

      {/* Header / Navigation Bar */}
      <header
        className={`sticky top-0 z-50 flex items-center justify-between ${CARD_BG} p-4 md:px-12 shadow-md border-b-2 border-[#FF7F00]`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="text-2xl font-bold">CatchUp</div>
          <div className={`text-4xl ${PRIMARY_COLOR_TEXT} font-bold`}>2.0</div>
        </div>

        {/* Desktop nav (md and up) */}
        <nav className="hidden md:flex items-center space-x-6 font-medium">
          <a href="#" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            About Us
          </a>
          <a href="/team" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            Team
          </a>
          <a href="#contact" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            Contact Us
          </a>
          <a
            href="/login"
            className={`ml-4 font-semibold ${PRIMARY_COLOR_TEXT} hover:opacity-80`}
          >
            News Upload
          </a>
        </nav>

        {/* Hamburger button (mobile only) */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF7F00]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {menuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <g>
                  <path d="M3 6h18" />
                  <path d="M3 12h18" />
                  <path d="M3 18h18" />
                </g>
              )}
            </svg>
          </button>
        </div>

        {/* Mobile sliding menu (only visible when menuOpen) */}
        <div
          className={`fixed top-0 right-0 h-full w-2/3 max-w-xs bg-white z-50 transform transition-transform duration-300 ease-in-out shadow-lg md:hidden
            ${menuOpen ? "translate-x-0" : "translate-x-full"}`}
          aria-hidden={!menuOpen}
        >
          <div className="p-6 flex flex-col h-full">
            {/* Close row */}
            <div className="flex items-center justify-between mb-6">
              <div className="text-xl font-bold">Menu</div>
              <button
                onClick={() => setMenuOpen(false)}
                aria-label="Close menu"
                className="p-1 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FF7F00]"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Links */}
            <div className="flex flex-col gap-4">
              <button
                onClick={() => handleNavClick("#")}
                className="text-left text-lg font-medium py-2"
              >
                About Us
              </button>

              <button
                onClick={() => handleNavClick("/team")}
                className="text-left text-lg font-medium py-2"
              >
                Team
              </button>

              <button
                onClick={() => handleNavClick("#contact")}
                className="text-left text-lg font-medium py-2"
              >
                Contact Us
              </button>

              <button
                onClick={() => handleNavClick("/login")}
                className={`text-left text-lg font-semibold py-2 ${PRIMARY_COLOR_TEXT}`}
              >
                News Upload
              </button>
            </div>

            {/* optional spacer + bottom content */}
            <div className="mt-auto text-sm text-gray-500">
              <p>CatchUp2.0 — stay informed, stay ahead.</p>
            </div>
          </div>
        </div>

        {/* Overlay to dim background when menu open (mobile) */}
        {menuOpen && (
          <button
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-40 md:hidden"
            aria-hidden="true"
          />
        )}
      </header>

      {/* Promotional Logo Section */}
      <div
        className={`flex justify-center flex-wrap gap-8 py-5 md:py-8 ${CARD_BG} border-b border-gray-200`}
      >
        <img src="/vvituLogo.jpg" className="h-20 w-30" alt="VVIT Logo" />
      </div>

      {/* Notifications Bar (Marquee) */}
      <div
        className={`py-2 px-4 md:px-12 ${PRIMARY_COLOR_BG} text-white text-sm overflow-hidden relative`}
      >
        <div className="flex">
          <div className="animate-marquee whitespace-nowrap">
            <span className="inline-block px-4">
              CatchUp Recruitment Drive for *Editors, Script Writers, Logistics,
              Anchors, and General Crew starts 01.11.2025! Register Now
            </span>
            <span className="inline-block px-4">
              📢 Stay updated with the latest campus news and events
            </span>
            <span className="inline-block px-4">
              🎥 New episode drops every week - Don't miss out!
            </span>
          </div>
          <div className="animate-marquee whitespace-nowrap" aria-hidden="true">
            <span className="inline-block px-4">
              CatchUp Recruitment Drive for *Editors, Script Writers, Logistics,
              Anchors, and General Crew starts 01.11.2025! Register Now
            </span>
            <span className="inline-block px-4">
              📢 Stay updated with the latest campus news and events
            </span>
            <span className="inline-block px-4">
              🎥 New episode drops every week - Don't miss out!
            </span>
          </div>
        </div>
      </div>

      {/* Hero */}
      <div
        className={`h-[500px] ${CARD_BG} border-b border-gray-200 flex justify-center items-center`}
      >
        <h1
          className={`text-5xl md:text-6xl font-extrabold ${PRIMARY_COLOR_TEXT} text-center px-4`}
        >
          CatchUp to the Future. Stay Ahead.
        </h1>
      </div>

      {/* Media Section */}
      <section className="py-16 md:py-20 px-4 md:px-12 text-center">
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 ${PRIMARY_COLOR_TEXT} border-b-4 border-[#FF7F00]`}
        >
          CatchUp Media 🎥
        </h2>
        <div className="flex items-center justify-around">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-left w-full">
            {latestMedia.map((item, idx) => (
              <a
                key={idx}
                href={item.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-lg overflow-hidden shadow-lg ${CARD_BG} transition duration-500 hover:shadow-2xl hover:translate-y-[-15px] border border-gray-200 delay-100`}
              >
                <div
                  className={`h-44 bg-gray-200 flex items-center justify-center text-xl font-bold ${PRIMARY_COLOR_TEXT}`}
                >
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-gray-500 block mb-2">
                    {item.date || "Recent"}
                  </span>
                  <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* The CatchUp Corner */}
      <section
        className={`py-16 md:py-20 px-4 md:px-4 text-center ${LIGHT_BG}`}
      >
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 ${PRIMARY_COLOR_TEXT} border-b-4 border-[#FF7F00]`}
        >
          The CatchUp Corner 📰
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-7xl mx-auto">
          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              Main News Bulletin 📣
            </h3>
            <ul className="list-none p-0 text-gray-700">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                Placement Alert: Major recruitment drive by TechCorp scheduled
                next month.
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                CatchUp Recruitment: Seeking Editors, Anchors, and Logistics for
                the new season!
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                Faculty Spotlight: Dr. Shruthi wins National Award for Robotics
                research.
              </li>
            </ul>
          </div>

          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              HonestByts (Student Voice) 🗣
            </h3>
            <ul className="list-none p-0 text-gray-700">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                "The recent soft skills training was really beneficial for
                interview prep." - Neha, MBA
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                "Library needs more late-night study access." - Anonymous, CSE
                3rd Year
              </li>
              <li className="py-2">
                "Mentorship program has been incredibly helpful." - Deepak,
                AI/DS
              </li>
            </ul>
          </div>

          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              TechByts (Innovation Snippets) 💡
            </h3>
            <ul className="list-none p-0 text-gray-700">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                AI for Placements: New AI-driven tool launched to help students
                refine their interview skills.
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                Code: Python 3.12 is the new standard for all first-year
                courses.
              </li>
              <li className="py-2">
                Security: Mandatory 2FA rolled out across all student portals.
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section
        className={`py-16 md:py-20 px-4 md:px-12 text-center bg-gray-50`}
      >
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 text-orange-500 border-b-4 border-[#FF7F00]`}
        >
          What Our Students Say
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((t) => (
            <div
              key={t.id}
              className={`p-6 rounded-lg bg-white shadow-md transition duration-300 hover:shadow-xl hover:-translate-y-1`}
            >
              <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-[#FF7F00] italic mb-4 text-gray-700">
                "{t.message}"
              </div>
              <div className="text-right font-bold text-orange-500">
                - {t.name} ({t.role})
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className={`mt-12 ${CARD_BG} p-10 md:p-12 border-t-2 border-[#FF7F00] flex flex-wrap justify-between`}
      >
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="text-2xl font-bold">
            CatchUp{" "}
            <span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            CatchUp2.0 continues to grow as a beacon of innovation and
            excellence, striving to empower the next generation of leaders.
          </p>
        </div>

        <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-3">CONTACT US</h4>
          <p className="text-sm">
            <strong>Email:</strong> catchup@vvit.net
          </p>
          <p className="text-sm">
            <strong>Phone:</strong> +91 91003 05306, +91 98894 04336
          </p>
          <p className="text-sm">Nambur (V), Pedakakani (M), Guntur (Dt)</p>
        </div>

        <div className="w-1/2 md:w-1/4">
          <h4 className="text-lg font-semibold mb-3">QUICK LINK</h4>
          {[
            "Our Programs",
            "Privacy Policy",
            "Terms & Conditions",
            "Public Notice",
            "Support",
          ].map((link, idx) => (
            <a
              key={idx}
              href="#"
              className={`block text-sm text-gray-600 hover:${PRIMARY_COLOR_TEXT} mb-1`}
            >
              {link}
            </a>
          ))}
        </div>

        <div className="w-full text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            Copyright &copy; 2025. CatchUp2.0. All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Main;
