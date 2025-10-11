import React, { useEffect, useState } from "react";
// Assuming ../output.css is your compiled Tailwind CSS
import "../output.css";
import { supabase } from "../SupabaseClient";
// --- Utility Constants (Mimicking Tailwind Theme) ---
const PRIMARY_COLOR_TEXT = "text-[#FF7F00]";
const PRIMARY_COLOR_BG = "bg-[#FF7F00]";
const LIGHT_BG = "bg-gray-50";
const DARK_TEXT = "text-gray-800";
const CARD_BG = "bg-white";
const LIGHT_TINT = "bg-[#FFF3E6]";
// --- Main.jsx React Component with Tailwind CSS Classes ---
const Main = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [latestMedia, setLatestMedia] = useState([]);

  useEffect(() => {
    async function fetchLatestMedia() {
      const { data, error } = await supabase
        .from("catchup_media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(4);
      console.log(data);
      if (error) {
        console.error("Error fetching media:", error);
      } else {
        // Construct thumbnail URLs from Supabase storage bucket
        const mediaWithUrls = data.map((item) => ({
          ...item,
          thumbnail_url: item.thumbnail_url,
        }));
        setLatestMedia(mediaWithUrls);
      }
    }

    fetchLatestMedia();
  }, []);

  useEffect(() => {
    async function fetchTestimonials() {
      const { data, error } = await supabase
        .from("testimonials")
        .select("*")
        .limit(3); // last 3 testimonials

      if (error) {
        console.error("Error fetching testimonials:", error);
      } else {
        setTestimonials(data);
      }
    }

    fetchTestimonials();
  }, []);
  return (
    // Corrected JSX String Interpolation
    <div className={`min-h-screen ${LIGHT_BG} font-sans ${DARK_TEXT}`}>
      {/* Sticky CTA Sidebar */}
      <div
        className={`fixed right-0 top-1/2 transform -translate-y-1/2 w-12 ${PRIMARY_COLOR_BG} p-2 rounded-r-bg rounded-t-bg font-bold z-[1000] text-white`}
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
          transform: "translateY(-50%) rotate(180deg)",
        }}
      >
        <a href="#contact" className="hover:underline">
          {" "}
          CONTACT US / LEARN MORE{" "}
        </a>
      </div>
      {/* Header / Sticky Navigation Bar */}
      <header
        className={`sticky top-0 z-50 flex justify-between items-center ${CARD_BG} p-4 md:px-12 shadow-md border-b-2 border-[#FF7F00]`}
      >
        <div className="text-2xl font-bold">
          {" "}
          CatchUp
          <span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
        </div>
        <nav className="hidden sm:flex space-x-6 font-medium">
          <a href="#" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            {" "}
            About Us{" "}
          </a>
          <a href="/team" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            {" "}
            Team{" "}
          </a>
          <a href="#contact" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            {" "}
            Contact Us{" "}
          </a>
        </nav>
        <div className="text-sm">
          <a
            href="/login"
            className={`ml-4 font-semibold ${PRIMARY_COLOR_TEXT} hover:opacity-80`}
          >
            {" "}
            News Upload{" "}
          </a>
        </div>
      </header>
      {/* Promotional Logos/Sponsors Section */}
      <div
        className={`flex justify-center flex-wrap gap-8 py-5 md:py-8 ${CARD_BG} border-b border-gray-200`}
      >
        <div>
          <img src="/vvituLogo.jpg" className="h-20 w-30" alt="VVIT Logo" />
        </div>
      </div>
      {/* Notifications Bar (Marquee) */}
      <div
        className={`py-2 px-4 md:px-12 ${PRIMARY_COLOR_BG} text-white text-sm overflow-hidden`}
      >
        <div className="animate-marquee whitespace-nowrap">
          <span>
            {" "}
            CatchUp Recruitment Drive for *Editors, Script Writers, Logistics,
            Anchors, and General Crew starts 01.11.2025! Register Now |{" "}
          </span>
        </div>
      </div>
      <div
        className={`h-[500px] ${CARD_BG} border-b border-gray-200 flex justify-center items-center`}
      >
        <h1
          className={`text-5xl md:text-6xl font-extrabold ${PRIMARY_COLOR_TEXT} text-center px-4`}
        >
          {" "}
          CatchUp to the Future. Stay Ahead.{" "}
        </h1>
      </div>
      <section>
        <div>
          <img src="./thumbnail.jpg" alt="Thumbnail" />
        </div>
      </section>
      <section className="py-16 md:py-20 px-4 md:px-12 text-center">
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 ${PRIMARY_COLOR_TEXT} border-b-4 border-[#FF7F00]`}
        >
          Latest from CatchUp Media 🎥
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-left">
          {latestMedia.map((item, idx) => (
            <a
              key={idx}
              href={item.video_link}
              target="_blank"
              rel="noopener noreferrer"
              className={`rounded-lg overflow-hidden shadow-lg ${CARD_BG} transition duration-300 hover:shadow-xl hover:translate-y-[-5px] border border-gray-200`}
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
      </section>
      <section
        className={`py-16 md:py-20 px-4 md:px-4 text-center ${LIGHT_BG}`}
      >
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 ${PRIMARY_COLOR_TEXT} border-b-4 border-[#FF7F00]`}
        >
          {" "}
          The CatchUp Corner 📰{" "}
        </h2>
        {/* FIX: Changed 'gap-12' to 'gap-8' to allow the three cards 
          to take up more horizontal space within the max-w-7xl container.
      */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-7xl mx-auto">
          {/* Main News Bulletin Card */}
          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              {" "}
              Main News Bulletin 📣{" "}
            </h3>
            <p className="italic text-gray-600 text-sm pb-2 mb-4 border-b border-[#FFAC52]">
              {" "}
              *Concise updates on leadership, careers, and major university
              milestones.{" "}
            </p>
            <ul className="list-none p-0">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                Placement Alert: Major recruitment drive by TechCorp scheduled
                next month.{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                CatchUp Recruitment: Seeking Editors, Anchors, and Logistics for
                the new season!{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                Faculty Spotlight: Dr. Shruthi wins National Award for Robotics
                research.{" "}
              </li>
              <li className="py-2">
                {" "}
                Event: Final preparations for the Annual Sports Meet announced.{" "}
              </li>
            </ul>
          </div>

          {/* HonestByts Card */}
          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              {" "}
              HonestByts (Student Voice) 🗣{" "}
            </h3>
            <p className="italic text-gray-600 text-sm pb-2 mb-4 border-b border-[#FFAC52]">
              {" "}
              *Candid student feedback on facilities, academics, and career
              support.{" "}
            </p>
            <ul className="list-none p-0">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                "The recent soft skills training was really beneficial for
                interview prep." - Neha, MBA{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                "Library needs more late-night study access." - Anonymous, CSE
                3rd Year{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                "The new cafeteria food is actually great!" - Ravi, Business
                School{" "}
              </li>
              <li className="py-2">
                {" "}
                "Mentorship program has been incredibly helpful." - Deepak,
                AI/DS{" "}
              </li>
            </ul>
          </div>

          {/* TechByts Card */}
          <div
            className={`p-6 rounded-lg ${LIGHT_TINT} border-l-4 border-[#FF7F00]`}
          >
            <h3 className={`text-xl font-bold mb-3 ${PRIMARY_COLOR_TEXT}`}>
              {" "}
              TechByts (Innovation Snippets) 💡{" "}
            </h3>
            <p className="italic text-gray-600 text-sm pb-2 mb-4 border-b border-[#FFAC52]">
              {" "}
              *Quick news on technology, infrastructure, and tools shaping
              future job readiness.{" "}
            </p>
            <ul className="list-none p-0">
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                AI for Placements: New AI-driven tool launched to help students
                refine their interview skills.{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                Code: Python 3.12 is the new standard for all first-year
                programming courses.{" "}
              </li>
              <li className="py-2 border-b border-dashed border-[#FFAC52]">
                {" "}
                Hardware: New high-speed cluster computing server acquired for
                Data Science.{" "}
              </li>
              <li className="py-2">
                {" "}
                Security: Mandatory 2FA rolled out across all student and
                faculty portals.{" "}
              </li>
            </ul>
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------- */}
      {/* --- End of The CatchUp Corner Section --- */}
      {/* ---------------------------------------------------- */}
      <section id="team" className="py-16 md:py-20 px-4 md:px-12 text-center">
        <h2
          className={`text-4xl font-bold inline-block pb-1 mb-10 ${PRIMARY_COLOR_TEXT} border-b-4 border-[#FF7F00]`}
        >
          {" "}
          Meet the CatchUp Team{" "}
        </h2>

        {/* --- MODIFIED FOR MOBILE RESPONSIVENESS --- */}
        {/* grid-cols-1 ensures stacking on mobile. sm:grid-cols-2 switches to side-by-side on small screens and up. */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 md:gap-20 max-w-xs sm:max-w-xl mx-auto mt-10">
          {/* Profile 1 */}
          <div className="text-center">
            {/* Image size is adjusted for standard Tailwind sizing and responsiveness (w-32/h-32 for mobile) */}
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${PRIMARY_COLOR_BG} border-8 border-white shadow-[0_0_0_5px_#FF7F00] mx-auto mb-4 flex items-center justify-center text-white text-sm font-semibold overflow-hidden`}
            >
              <img
                src="./princi.jpg"
                alt="Principal Sir"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="text-lg font-semibold mt-1">
              {" "}
              Dr. Y. Mallikarjuna Reddy{" "}
            </h4>
            <p className={`text-sm font-bold ${PRIMARY_COLOR_TEXT}`}>
              {" "}
              CatchUp Chief Editor{" "}
            </p>
          </div>

          {/* Profile 2 */}
          <div className="text-center">
            {/* Image size is adjusted for standard Tailwind sizing and responsiveness (w-32/h-32 for mobile) */}
            <div
              className={`w-32 h-32 md:w-40 md:h-40 rounded-full ${PRIMARY_COLOR_BG} border-8 border-white shadow-[0_0_0_5px_#FF7F00] mx-auto mb-4 flex items-center justify-center text-white text-sm font-semibold overflow-hidden`}
            >
              <img
                src="./raghuSir.jpg"
                alt="Raghavendra Sir"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <h4 className="text-lg font-semibold mt-1">Mr. Ch. Raghavendra</h4>
            <p className={`text-sm font-bold ${PRIMARY_COLOR_TEXT}`}>
              {" "}
              Faculty Coordinator{" "}
            </p>
          </div>
        </div>
      </section>
      {/* ---------------------------------------------------- */}
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
              <div className="bg-gray-100 p-4 rounded-lg border-l-4 border-[#FF7F00] italic mb-4 text-gray-700 hover:shadow-xl hover:-translate-y-1">
                "{t.message}"
              </div>
              <div className="text-right font-bold text-orange-500">
                - {t.name} ({t.role})
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* --- Footer --- */}
      <footer
        id="contact"
        className={`mt-12 ${CARD_BG} p-10 md:p-12 border-t-2 border-[#FF7F00] flex flex-wrap justify-between`}
      >
        <div className="w-full md:w-1/3 mb-6 md:mb-0">
          <div className="text-2xl font-bold">
            {" "}
            CatchUp
            <span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
          </div>
          <p className="mt-3 text-sm text-gray-500">
            {" "}
            CatchUp2.0 continues to grow as a beacon of innovation and
            excellence, striving to empower the next generation of leaders.{" "}
          </p>
        </div>
        <div className="w-1/2 md:w-1/4 mb-6 md:mb-0">
          <h4 className="text-lg font-semibold mb-3">CONTACT US</h4>
          <p className="text-sm">
            {" "}
            <strong>Email:</strong> catchup@vvit.net{" "}
          </p>
          <p className="text-sm">
            {" "}
            <strong>Phone:</strong> +91 91003 05306, +91 98894 04336{" "}
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
              {" "}
              {link}{" "}
            </a>
          ))}
        </div>
        <div className="w-full text-center mt-8 pt-4 border-t border-gray-200">
          <p className="text-xs text-gray-500">
            {" "}
            Copyright &copy; 2025. CatchUp2.0. All Rights Reserved.{" "}
          </p>
        </div>
      </footer>
      <style>
        {`
          @keyframes marquee {
            0% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-marquee {
            display: inline-block;
            animation: marquee 20s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default Main;
