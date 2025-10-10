import React, { useState, useEffect } from "react";
import { supabase } from "../SupabaseClient";
import { signOut } from "firebase/auth";
import { app, auth } from "../firebase"; // <-- Adjust the path to your firebase.js file
import { useNavigate } from "react-router-dom";
export default function ContentSubmission() {
  const navigate = useNavigate();
  const logout = () => {
    signOut(auth).then(() => {
      console.log("User signed out!");
      navigate("/");
    });
  };

  const [branch, setBranch] = useState("");
  const [designation, setDesignation] = useState("");
  const [uploading, setUploading] = useState(false);

  const handleBranchChange = (e) => setBranch(e.target.value);
  const handleDesignationChange = (e) => setDesignation(e.target.value);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    const form = e.target;
    const formData = new FormData(form);

    const contributor_name = formData.get("contributor_name");
    const upload_date = formData.get("upload_date");
    const description = formData.get("description");
    const custom_branch = formData.get("custom_branch");
    const custom_designation = formData.get("custom_designation");
    const files = formData.getAll("content_files[]");

    try {
      // ---- Step 1: Upload files to Supabase Storage ----
      const fileUrls = [];

      for (const file of files) {
        const uniqueName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage
          .from("news")
          .upload(uniqueName, file);

        if (error) throw error;

        const { data: publicUrlData } = supabase.storage
          .from("catchup_uploads")
          .getPublicUrl(uniqueName);

        fileUrls.push(publicUrlData.publicUrl);
      }

      // ---- Step 2: Insert form data into Supabase table ----
      const { error: insertError } = await supabase
        .from("news_uploads")
        .insert([
          {
            contributor_name,
            branch,
            custom_branch,
            designation,
            custom_designation,
            upload_date,
            description,
            file_urls: fileUrls,
          },
        ]);

      if (insertError) throw insertError;

      alert("✅ Submission successful!");
      form.reset();
      setBranch("");
      setDesignation("");
    } catch (err) {
      console.error("Error uploading content:", err);
      alert("❌ Error: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 text-gray-800 font-sans">
      {/* Header */}
      <header className="bg-white px-8 py-4 flex justify-between items-center border-b-2 border-[#FF7F00] shadow-sm">
        <div className="text-2xl font-bold">
          CatchUp<span className="text-[#FF7F00] text-3xl">2.0</span>
        </div>
        <div>
          <p>Welcome! {window.sessionStorage.getItem("username")}</p>
        </div>
        <button
          className="hover:text-[#FF7F00] hover:bg-gray-100 px-4 py-2 rounded-md"
          onClick={logout}
        >
          Logout
        </button>
      </header>

      {/* Main Content */}
      <main className="flex-grow py-12 px-6 md:px-12 lg:px-24">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-xl shadow-xl border-t-4 border-[#FF7F00]">
          <h2 className="text-3xl font-bold text-center text-[#FF7F00] mb-2">
            CatchUp 2.0 Content Submission 📤
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div>
              <label className="block mb-2 font-semibold">Your Full Name</label>
              <input
                type="text"
                name="contributor_name"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
              />
            </div>

            {/* Branch */}
            <div>
              <label className="block mb-2 font-semibold">
                Academic Branch
              </label>
              <select
                name="branch"
                value={branch}
                onChange={handleBranchChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
              >
                <option value="">-- Select Branch --</option>
                <option value="CSE">CSE</option>
                <option value="ECE">ECE</option>
                <option value="EEE">EEE</option>
                <option value="CIVIL">Civil</option>
                <option value="MECH">Mechanical</option>
                <option value="MBA">MBA / Business</option>
                <option value="CSM">CSM (CS & ML)</option>
                <option value="AIML">AIML (AI & ML)</option>
                <option value="Other">Other / Custom Entry...</option>
              </select>

              {branch === "Other" && (
                <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                  <label className="block mb-1 font-semibold">
                    Other Branch (Optional)
                  </label>
                  <input
                    type="text"
                    name="custom_branch"
                    placeholder="Enter custom branch name"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Designation */}
            <div>
              <label className="block mb-2 font-semibold">
                Designation / Role
              </label>
              <select
                name="designation"
                value={designation}
                onChange={handleDesignationChange}
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
              >
                <option value="">-- Select Designation --</option>
                <option value="Faculty">Faculty</option>
                <option value="Editor">Editor</option>
                <option value="Script_Writer">Script Writer</option>
                <option value="Anchor">Anchor</option>
                <option value="Logistics">Logistics</option>
                <option value="General_Crew">General Crew</option>
                <option value="Final_Year">Final Year Student</option>
                <option value="Third_Year">Third Year Student</option>
                <option value="Second_Year">Second Year Student</option>
                <option value="First_Year">First Year Student</option>
                <option value="Other">Other / Custom Entry...</option>
              </select>

              {designation === "Other" && (
                <div className="mt-3 bg-gray-100 p-3 rounded-lg">
                  <label className="block mb-1 font-semibold">
                    Other Designation (Optional)
                  </label>
                  <input
                    type="text"
                    name="custom_designation"
                    placeholder="Enter custom role/designation"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
                  />
                </div>
              )}
            </div>

            {/* Date */}
            <div>
              <label className="block mb-2 font-semibold">Date</label>
              <input
                type="date"
                name="upload_date"
                required
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none"
              />
            </div>

            {/* Description */}
            <div>
              <label className="block mb-2 font-semibold">
                Description / Notes
              </label>
              <textarea
                name="description"
                placeholder="Briefly describe the content..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:border-[#FF7F00] focus:outline-none min-h-[120px]"
              ></textarea>
            </div>

            {/* File Upload */}
            <div>
              <label className="block mb-2 font-semibold">
                Upload Files (Select multiple files)
              </label>
              <input
                type="file"
                name="content_files[]"
                multiple
                required
                className="w-full p-3 border border-gray-300 rounded-lg cursor-pointer focus:border-[#FF7F00] focus:outline-none"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={uploading}
              className={`w-full bg-[#FF7F00] text-white py-3 rounded-lg text-lg font-bold hover:bg-orange-600 transition-transform ${
                uploading
                  ? "opacity-70 cursor-not-allowed"
                  : "hover:-translate-y-0.5"
              }`}
            >
              {uploading ? "Uploading..." : "Submit Content for Review"}
            </button>
          </form>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white text-center text-gray-600 py-4 border-t-2 border-[#FF7F00]">
        © 2025 CatchUp2.0. All Rights Reserved.
      </footer>
    </div>
  );
}
