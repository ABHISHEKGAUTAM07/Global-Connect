// pages/CreateJob.jsx
import React, { useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { FaBriefcase, FaMapMarkerAlt, FaListUl, FaAlignLeft } from "react-icons/fa";

const CreateJob = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const { user } = useSelector((state) => state.auth);

  const API = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API}/jobs`,
        {
          title,
          description,
          skills: skills.split(",").map((s) => s.trim()),
          location,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("✅ Job created successfully!");
      setTitle("");
      setDescription("");
      setSkills("");
      setLocation("");
    } catch (err) {
      console.error("Error creating job:", err);
      alert("❌ Failed to create job.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6">
        <h2 className="text-3xl font-bold text-white flex items-center gap-2">
          📝 Create a Job
        </h2>
        <p className="text-blue-100 text-sm mt-1">Post your job and find the right talent</p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {/* Job Title */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FaBriefcase className="text-gray-500" />
          <input
            type="text"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full bg-transparent outline-none"
            required
          />
        </div>

        {/* Description */}
        <div className="flex items-start gap-3 bg-gray-50 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FaAlignLeft className="mt-2 text-gray-500" />
          <textarea
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full bg-transparent outline-none resize-none"
            rows={4}
            required
          />
        </div>

        {/* Skills */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FaListUl className="text-gray-500" />
          <input
            type="text"
            placeholder="Required Skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Location */}
        <div className="flex items-center gap-3 bg-gray-50 border rounded-lg px-4 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FaMapMarkerAlt className="text-gray-500" />
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full bg-transparent outline-none"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300"
        >
          🚀 Post Job
        </button>
      </form>
    </div>
  );
};

export default CreateJob;
