import React from "react";

// --- REVISED TEAM DATA HIERARCHY ---

// 1. Chief Editor (New Highest Level) - NAME UPDATED
const chiefEditor = {
  name: "Dr. Y. Mallikarjuna Reddy",
  role: "Chief Editor",
  img: "/dr_mallikarjuna_reddy.jpg", // Placeholder
};

// 2. Faculty Coordinator - NAME/ROLE UPDATED
const facultyCoordinator = {
  name: "Mr. Ch. Raghavendra",
  role: "Concept Head",
  img: "/ch_raghavendra.jpg", // Placeholder
};

// 3. Executive Leadership
const executiveHeads = [
  { name: "Sujeeth", role: "Executive Chief", img: "/sujeeth.jpg" }, // Placeholder
  { name: "Yamini", role: "Managing Chief", img: "/yamini.jpg" }, // Placeholder
  { name: "Bharath", role: "Operations Chief", img: "/bharath.jpg" }, // Placeholder
];

// 4. Organizing Head
const organizingHead = {
  name: "Anil",
  role: "Organizing Head",
  img: "/anil.jpg", // Placeholder
};

// 5. Bulletin Heads (rendered beside SPOC)
const bulletinHeads = [
  { name: "Priya", role: "Main News Bulletin Head", img: "/priya.jpg" }, // Placeholder
  { name: "Kiran", role: "Honest Bytes Head", img: "/kiran.jpg" }, // Placeholder
  { name: "Sai", role: "Short Bytes Head", img: "/sai.jpg" }, // Placeholder
];

// 5. Single Point of Contact (SPOC) - Non-Faculty, rendered beside Bulletin Heads
const spoc = {
  name: "Raghav Sharma",
  role: "Team SPOC",
  img: "/raghav.jpg", // Placeholder
  phone: "+91 99887 76655", // Placeholder
  email: "raghav.sharma@catchup.in", // Placeholder
};

// --- INTEGRATED CLUSTER DATA (Leads/Co-Leads retain specific roles; others are "Member") ---
const allClusterRoles = [
  { name: "Ravi", role: "Editing Lead Member", img: "/ravi.jpg" }, // Placeholder
  { name: "Teja", role: "Editing Co-Lead Member", img: "/teja.jpg" }, // Placeholder
  { name: "Mounika", role: "Scripting Lead Member", img: "/mounika.jpg" }, // Placeholder
  { name: "Ganesh", role: "Scripting Co-Lead Member", img: "/ganesh.jpg" }, // Placeholder
  { name: "Swathi", role: "Logistics Lead Member", img: "/swathi.jpg" }, // Placeholder
  { name: "Vamsi", role: "Logistics Co-Lead Member", img: "/vamsi.jpg" }, // Placeholder
  { name: "Hemanth", role: "Anchoring Lead Member", img: "/hemanth.jpg" }, // Placeholder
  { name: "Deepika", role: "Anchoring Co-Lead Member", img: "/deepika.jpg" }, // Placeholder
];

// Total 12 General Members (3 per cluster) - Role is just "Member"
const generalMembersData = Array.from({ length: 12 }, (_, i) => ({
  name: `Cluster Member ${i + 1}`,
  role: "Member",
  img: `/general_members/member_${i + 1}.jpg`, // Placeholder - assume path for general members
}));

// Function to create clusters with 1 Lead, 1 Co-Lead, and 3 General Members (Total 5)
const createClusters = (clusterNames, allLeads, members) => {
  const clusters = [];
  const membersPerCluster = 3;
  for (let i = 0; i < clusterNames.length; i++) {
    const leadStartIdx = i * 2;
    const memberStartIdx = i * membersPerCluster;
    clusters.push({
      clusterName: clusterNames[i],
      members: [
        allLeads[leadStartIdx],
        allLeads[leadStartIdx + 1],
        ...members.slice(memberStartIdx, memberStartIdx + membersPerCluster),
      ],
    });
  }
  return clusters;
};

const clusters = createClusters(
  ["Editing", "Scripting", "Logistics", "Anchoring"],
  allClusterRoles,
  generalMembersData
);

const totalClusterCount = clusters.reduce(
  (acc, curr) => acc + curr.members.length,
  0
);

// --- COMPONENT START ---
export default function Team() {
  const PRIMARY_COLOR_TEXT = "text-orange-500";

  // Reusable component for a simple member card (used for non-cluster roles)
  const MemberCard = ({
    member,
    sizeClass = "w-40 h-40",
    imageBorder = "border-4",
  }) => (
    <div
      className="group relative bg-white rounded-2xl shadow-xl w-60 p-6 text-center
            border border-gray-100 hover:shadow-2xl hover:shadow-orange-100/40
            transition-all duration-700 ease-in-out transform hover:-translate-y-1 cursor-pointer"
    >
      <div className="relative mx-auto mb-4 z-10">
        <div
          className={`${sizeClass} mx-auto rounded-full ${imageBorder} border-orange-500 shadow-xl overflow-hidden transform transition-all duration-700 group-hover:scale-105`}
        >
          {/* Note: In a real app, you'd ensure these placeholder image paths exist or use a fallback */}
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      {/* TRUNCATE CLASS REMOVED HERE to prevent names from being cut off */}
      <h3 className="text-xl font-bold text-gray-900 relative z-10 group-hover:text-orange-600 transition-colors duration-500">
        {member.name}
      </h3>
      <p className="text-md text-gray-500 relative z-10">{member.role}</p>
    </div>
  );

  // Custom SPOC Card component for the specific layout
  const SpocCard = ({ member }) => (
    <div className="w-full md:w-auto flex justify-center items-center py-4 md:py-0">
      <div className="bg-orange-50 border-4 border-orange-500 rounded-xl shadow-lg p-6 max-w-sm text-center">
        <div className="w-28 h-28 mx-auto mb-4 rounded-full border-4 border-orange-500 overflow-hidden">
          <img
            src={member.img}
            alt={member.name}
            className="w-full h-full object-cover"
          />
        </div>
        <h3 className="text-xl font-extrabold text-orange-600 mb-2">
          {member.name}
        </h3>
        <p className="text-lg text-gray-800 font-medium mb-4">{member.role}</p>
        <div className="space-y-2 text-left text-sm">
          <p className="text-gray-700 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              ></path>
            </svg>
            <span className="font-mono">{member.phone}</span>
          </p>
          <p className="text-gray-700 flex items-center justify-center">
            <svg
              className="w-5 h-5 mr-2 text-orange-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8m-2 4v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
              ></path>
            </svg>
            <span className="font-mono">{member.email}</span>
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Header (Kept original) */}
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

      {/* Title (Kept original) */}
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

      {/* 1. Chief Editor */}
      <section className="text-center py-8 mb-16 px-4 border-b border-orange-100">
        <h2 className={`text-4xl font-extrabold mb-12 text-gray-900 uppercase`}>
          Chief Editor
        </h2>
        <div className="flex justify-center">
          <MemberCard member={chiefEditor} sizeClass="w-36 h-36" />
        </div>
      </section>

      {/* 2. Faculty Coordinator */}
      <section className="text-center py-8 mb-16 px-4 border-b border-orange-100">
        <h2 className={`text-4xl font-extrabold mb-12 text-gray-700 uppercase`}>
          Concept Head
        </h2>
        <div className="flex justify-center">
          <MemberCard member={facultyCoordinator} sizeClass="w-36 h-36" />
        </div>
      </section>

      {/* 3. Executive Leadership */}
      <section className="text-center py-8 mb-16 px-4 border-b border-orange-100">
        <h2
          className={`text-4xl font-extrabold mb-12 ${PRIMARY_COLOR_TEXT} uppercase`}
        >
          Executive Chiefs
        </h2>
        <div className="flex flex-wrap justify-center gap-8">
          {executiveHeads.map((head, index) => (
            <MemberCard key={index} member={head} sizeClass="w-32 h-32" />
          ))}
        </div>
      </section>

      {/* 4. Organizing Head */}
      <section className="text-center py-8 mb-16 px-4 border-b border-orange-100">
        <h2
          className={`text-4xl font-extrabold mb-12 ${PRIMARY_COLOR_TEXT} uppercase`}
        >
          Organizing Head
        </h2>
        <div className="flex justify-center">
          <MemberCard member={organizingHead} sizeClass="w-32 h-32" />
        </div>
      </section>

      {/* 5. Bulletin Heads and SPOC (Rendered Beside Each Other) */}
      <section className="text-center py-8 mb-24 px-4">
        <h2
          className={`text-4xl font-extrabold mb-12 ${PRIMARY_COLOR_TEXT} uppercase`}
        >
          Program Leads & Communication
        </h2>
        <div className="flex flex-wrap justify-center gap-8 items-stretch">
          {/* Bulletin Heads */}
          <div className="flex flex-wrap justify-center gap-8 max-w-4xl border-r border-gray-200 pr-8">
            {bulletinHeads.map((head, index) => (
              <MemberCard key={index} member={head} sizeClass="w-32 h-32" />
            ))}
          </div>

          {/* SPOC - Using the custom SpocCard */}
          <SpocCard member={spoc} />
        </div>
      </section>

      {/* 6. Clusters (5 members total: Lead, Co-Lead, and 3 General Members) */}
      <section className="text-center py-8 mb-24 px-4">
        <h2
          className={`text-4xl font-extrabold mb-12 ${PRIMARY_COLOR_TEXT} uppercase`}
        >
          Core Clusters
        </h2>
        <div className="space-y-16">
          {clusters.map((cluster, clusterIndex) => (
            <div
              key={clusterIndex}
              className="bg-gray-50 p-6 rounded-xl shadow-lg"
            >
              <h3 className="text-3xl font-bold mb-8 text-gray-800 border-b-2 border-orange-300 inline-block pb-1">
                {cluster.clusterName} Cluster
              </h3>
              {/* Flex container set to justify-center for 5 members */}
              <div className="flex flex-wrap justify-center gap-x-6 gap-y-10">
                {cluster.members.map((member, memberIndex) => (
                  <div
                    key={memberIndex}
                    className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/5 xl:w-1/5"
                  >
                    <div
                      className={`bg-white border-2 rounded-xl shadow-sm text-center p-4 h-full flex flex-col items-center justify-between transition-all duration-300 hover:shadow-lg ${
                        memberIndex < 2
                          ? "border-orange-500 hover:bg-orange-50/50" // Leads/Co-Leads
                          : "border-gray-200 hover:bg-white/50" // General Members
                      }`}
                    >
                      <div className="w-20 h-20 mx-auto mb-3 rounded-full border-2 border-orange-400 overflow-hidden">
                        <img
                          src={member.img}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {/* TRUNCATE CLASS REMOVED HERE */}
                      <h4 className="font-semibold text-base text-gray-800">
                        {member.name}
                      </h4>
                      <p
                        className={`text-sm italic ${
                          memberIndex < 2 ? PRIMARY_COLOR_TEXT : "text-gray-500"
                        }`}
                      >
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer (Kept original) */}
      <footer className="border-t border-gray-200 py-6 text-center text-gray-500 text-sm bg-gray-50">
        © 2025 CatchUp 2.0 — VVIT
      </footer>
    </div>
  );
}
