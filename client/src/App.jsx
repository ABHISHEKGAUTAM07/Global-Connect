import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import axios from "axios";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Chat from "./pages/Chat";
import Jobs from "./pages/Jobs";
import Feed from "./pages/Feed";
import Profile from "./pages/Profile";
import Notification from "./pages/Notification";

const ApplicantsList = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setApplicants(res.data))
      .catch(console.error);
  }, [jobId]);

  const respondApplicant = (applicantId, action) => {
    axios
      .post(
        `${API}/jobs/${jobId}/respond`,
        { applicantId, action },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        alert(`Applicant ${action}ed.`);
        setApplicants(applicants.filter((a) => a._id !== applicantId));
      })
      .catch(console.error);
  };

  return (
    <div className="mt-6 bg-white p-5 rounded-xl shadow-lg border">
      <h3 className="text-xl font-bold mb-4 text-gray-800">👥 Applicants</h3>
      {applicants.length === 0 && (
        <p className="text-gray-500 italic">No applicants yet.</p>
      )}
      <div className="space-y-4">
        {applicants.map((applicant) => (
          <div
            key={applicant._id}
            className="p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg shadow border hover:shadow-md transition"
          >
            <p className="font-semibold text-gray-800">{applicant.name}</p>
            <p className="text-sm text-gray-600">{applicant.email}</p>
            <p className="text-sm text-gray-600 mb-3">
              📞 {applicant.phone}
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => window.open(`tel:${applicant.phone}`)}
                className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
              >
                Call
              </button>
              <button
                onClick={() => respondApplicant(applicant._id, "accept")}
                className="px-3 py-1 rounded bg-green-500 text-white text-sm hover:bg-green-600 transition"
              >
                Accept
              </button>
              <button
                onClick={() => respondApplicant(applicant._id, "reject")}
                className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition"
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const JobDetails = ({ job }) => {
  const currentUserId = localStorage.getItem("userId");

  if (!job) return <p>Job not found.</p>;

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white rounded-xl shadow-lg border">
      <h1 className="text-3xl font-extrabold mb-3 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
        {job.title}
      </h1>
      <p className="text-gray-700 mb-4 leading-relaxed">{job.description}</p>
      <p className="text-sm text-gray-500 mb-4">📍 Location: {job.location}</p>

      {job.postedBy._id === currentUserId && (
        <ApplicantsList jobId={job._id} />
      )}
    </div>
  );
};

const JobDetailsWrapper = () => {
  const { jobId } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem("token");
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchJob = async () => {
      try {
        const res = await axios.get(`${API}/jobs/${jobId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setJob(res.data);
      } catch (err) {
        setError("Failed to load job");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, token, API]);

  if (loading)
    return (
      <p className="text-center text-gray-600 mt-10">Loading job details...</p>
    );
  if (error)
    return <p className="text-center text-red-500 mt-10">{error}</p>;

  return <JobDetails job={job} />;
};

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/jobs/:jobId" element={<JobDetailsWrapper />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/notifications" element={<Notification />} />
        <Route
          path="*"
          element={
            <div className="p-6 text-red-500 text-xl text-center">
              404: Page Not Found
            </div>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
