import React from "react";

const heads = [
  { name: "Head 1 Name", role: "Chief Editor", img: "head1.jpg" },
  { name: "Head 2 Name", role: "Managing Editor", img: "head2.jpg" },
  { name: "Head 3 Name", role: "Operations Lead", img: "head3.jpg" },
];

const crew = Array.from({ length: 22 }, (_, i) => ({
  name: `Crew Member ${i + 1}`,
  role: [
    "Reporter",
    "Writer",
    "Designer",
    "Photographer",
    "Assistant Editor",
    "Visuals Team",
    "Marketing",
    "Social Media",
    "Video Editor",
    "Researcher",
  ][i % 10],
  img: `crew${i + 1}.jpg`,
}));

export default function Team() {
  const PRIMARY_COLOR_TEXT = "text-orange-500";
  const PRIMARY_COLOR_BG = "bg-orange-500";
  const PRIMARY_COLOR_HEX = "#FF7F00";

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* ---------------------------------------------------- */}
      {/* 1. Navigation Bar */}
      {/* ---------------------------------------------------- */}
      <header
        className={`sticky top-0 z-50 flex justify-between items-center bg-white p-4 md:px-12 shadow-md border-b-2 border-orange-500`}
      >
        <div className="text-2xl font-extrabold">
          CatchUp
          <span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
        </div>
        <nav className="hidden sm:flex space-x-6 font-medium text-gray-700">
          <a href="/" className={`hover:${PRIMARY_COLOR_TEXT} transition`}>
            Home
          </a>
          <a href="/team" className={`font-semibold ${PRIMARY_COLOR_TEXT}`}>
            Team
          </a>
        </nav>
        <div className="text-sm">
          <a
            href="/login"
            className={`ml-4 font-semibold ${PRIMARY_COLOR_TEXT} hover:opacity-80 transition`}
          >
            News Upload
          </a>
        </div>
      </header>

      {/* ---------------------------------------------------- */}
      {/* Header */}
      {/* ---------------------------------------------------- */}
      <section className="text-center py-16 px-4">
        <h1
          className={`text-5xl font-extrabold ${PRIMARY_COLOR_TEXT} uppercase tracking-tight md:tracking-wider`}
        >
          Meet the CatchUp 2.0 Team 💡
        </h1>
        <div className="w-24 h-1 bg-orange-500 mx-auto my-4 rounded-full"></div>
        <p className="text-gray-600 text-xl mt-4 max-w-2xl mx-auto">
          The brilliant minds, passionate writers, and talented visual artists
          behind VVIT’s Catch-Up News Channel.
        </p>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Heads Section — Upgraded with Gradient Glows */}
      {/* ---------------------------------------------------- */}
      <section className="flex flex-wrap justify-center gap-12 mb-28 px-4">
        {heads.map((head, index) => (
          <div
            key={index}
            className="group relative bg-white rounded-2xl shadow-xl w-72 md:w-80 p-8 text-center overflow-hidden
                 border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/40 
                 transition-all duration-700 ease-in-out cursor-pointer transform hover:-translate-y-2"
          >
            {/* 🔶 Semi-Circle Top-Left Accent */}
            <div
              className="absolute top-0 left-0 w-40 h-40 opacity-0 group-hover:opacity-60 transition-all duration-700 ease-in-out blur-md"
              style={{
                backgroundColor: "#FF7F00",
                borderRadius: "0 0 100% 0", // makes the semi-circle corner
                zIndex: 0,
                transform: "scale(1.2)", // slightly extend beyond corner for natural glow
              }}
            ></div>

            {/* 🖼️ Image */}
            <div className="relative mx-auto mb-6 z-10">
              <div className="w-40 h-40 mx-auto rounded-full border-4 border-orange-500 shadow-xl overflow-hidden transform transition-all duration-700 group-hover:scale-110 group-hover:shadow-orange-200">
                <img
                  src={head.img}
                  alt={head.name}
                  className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                />
              </div>
            </div>

            {/* 🧾 Info */}
            <h2 className="text-2xl font-bold text-gray-900 relative z-10 group-hover:text-orange-600 transition-colors duration-500">
              {head.name}
            </h2>
            <p className="text-lg text-gray-500 mb-3 relative z-10">
              {head.role}
            </p>
            <span className="inline-block bg-orange-500 text-white text-xs px-4 py-1 rounded-full tracking-wide font-medium relative z-10 group-hover:bg-orange-600 transition">
              Leadership Board
            </span>

            {/* ✨ Border Glow Ring */}
            <div className="absolute inset-0 rounded-2xl border border-transparent group-hover:border-orange-400/40 transition-all duration-700 ease-in-out"></div>
          </div>
        ))}
      </section>

      {/* ---------------------------------------------------- */}
      {/* Crew Section */}
      {/* ---------------------------------------------------- */}
      <section className="px-6 md:px-16 mb-24">
        <h2
          className={`text-3xl font-bold text-center mb-12 ${PRIMARY_COLOR_TEXT} border-b-2 border-orange-200 inline-block pb-2`}
        >
          Core Crew Members ({crew.length})
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 lg:gap-8 max-w-7xl mx-auto">
          {crew.map((member, index) => (
            <div
              key={index}
              className="bg-gray-50 border border-gray-200 rounded-xl shadow-sm text-center p-4 md:p-6 
                         hover:shadow-lg transition-all duration-300 hover:bg-white hover:border-orange-300"
            >
              <div className="w-24 h-24 mx-auto mb-4 rounded-full border-2 border-orange-500 overflow-hidden">
                <img
                  src={member.img}
                  alt={member.name}
                  className="w-full h-full object-cover rounded-full transform hover:scale-110 transition-all duration-500"
                />
              </div>
              <h3 className="font-semibold text-base text-gray-800 truncate">
                {member.name}
              </h3>
              <p className={`text-gray-500 text-sm italic`}>{member.role}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------------------------------------------- */}
      {/* Footer */}
      {/* ---------------------------------------------------- */}
      <footer className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm bg-gray-50">
        © 2025 CatchUp 2.0 — VVIT | Designed with 💡 and Tailwind CSS
      </footer>
    </div>
  );
}
