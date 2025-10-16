import React, { useEffect, useState } from "react";
import { supabase } from "../SupabaseClient";
import { useNavigate } from "react-router-dom";
import "../output.css";

// --- Utility Constants (matching your Main.jsx theme) ---
const PRIMARY_COLOR_TEXT = "text-[#FF7F00]";
const PRIMARY_COLOR_BG = "bg-[#FF7F00]";
const LIGHT_BG = "bg-gray-50";
const CARD_BG = "bg-white";
const DARK_TEXT = "text-gray-800";

const RecentUploads = () => {
  const [uploads, setUploads] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchUploads() {
      const { data, error } = await supabase
        .from("catchup_media")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);

      if (error) console.error("Error fetching uploads:", error);
      else setUploads(data);
    }
    fetchUploads();
  }, []);

  const filteredUploads = uploads.filter(
    (item) =>
      item.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`min-h-screen ${LIGHT_BG} ${DARK_TEXT} font-sans`}>
      {/* Header */}
      <header
        className={`sticky top-0 z-50 flex justify-between items-center ${CARD_BG} p-4 md:px-12 shadow-md border-b-2 border-[#FF7F00]`}
      >
        <div
          className="text-2xl font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          CatchUp<span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
        </div>
        <nav className="hidden sm:flex space-x-6 font-medium">
          <a href="/" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            Home
          </a>
          <a href="/team" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            Team
          </a>
          <a href="/#contact" className={`hover:${PRIMARY_COLOR_TEXT}`}>
            Contact
          </a>
        </nav>
      </header>

      {/* Page Heading */}
      <div
        className={`text-center py-10 border-b border-gray-200 ${CARD_BG} shadow-sm`}
      >
        <h1
          className={`text-4xl md:text-5xl font-extrabold ${PRIMARY_COLOR_TEXT}`}
        >
          Recent Uploads 🎥
        </h1>
        <p className="text-gray-500 mt-2">
          Browse all our latest videos and campus stories
        </p>
      </div>

      {/* Search Bar */}
      <div className="flex justify-center mt-8 px-4">
        <input
          type="text"
          placeholder="Search by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`w-full max-w-md p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF7F00] ${CARD_BG} shadow-sm`}
        />
      </div>

      {/* Uploads Grid */}
      <section className="py-12 px-4 md:px-12">
        {filteredUploads.length === 0 ? (
          <div className="text-center text-gray-500 mt-12 text-lg">
            No uploads found 😕
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredUploads.map((item) => (
              <a
                key={item.id}
                href={item.video_link}
                target="_blank"
                rel="noopener noreferrer"
                className={`rounded-xl overflow-hidden shadow-lg ${CARD_BG} transition duration-300 hover:shadow-2xl hover:-translate-y-2`}
              >
                <div className="relative h-48 bg-gray-200">
                  <img
                    src={item.thumbnail_url}
                    alt={item.title}
                    className="h-full w-full object-cover"
                  />
                  <div
                    className={`absolute top-0 left-0 px-3 py-1 text-xs font-semibold text-white ${PRIMARY_COLOR_BG} rounded-br-lg`}
                  >
                    {new Date(item.created_at).toLocaleDateString()}
                  </div>
                </div>
                <div className="p-4">
                  <h3
                    className={`text-lg font-semibold mb-1 ${PRIMARY_COLOR_TEXT}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {item.description || "No description available."}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer
        className={`mt-12 ${CARD_BG} p-10 md:p-12 border-t-2 border-[#FF7F00] text-center`}
      >
        <div className="text-2xl font-bold">
          CatchUp<span className={`text-4xl ${PRIMARY_COLOR_TEXT}`}>2.0</span>
        </div>
        <p className="mt-3 text-sm text-gray-500">
          Powered by VVIT CatchUp Team — Innovation. Creativity. Connection.
        </p>
        <p className="text-xs text-gray-400 mt-2">
          &copy; 2025 CatchUp2.0. All Rights Reserved.
        </p>
      </footer>
    </div>
  );
};

export default RecentUploads;
