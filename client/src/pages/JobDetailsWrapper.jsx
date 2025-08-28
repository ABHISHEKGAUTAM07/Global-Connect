// src/pages/JobDetailsWrapper.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import JobDetails from "./JobDetails";
import { Loader2, AlertTriangle } from "lucide-react";

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
        setError("Failed to load job. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchJob();
  }, [jobId, token, API]);

  if (loading)
    return (
      <div className="flex flex-col items-center justify-center h-64">
        <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-2" />
        <p className="text-gray-500">Loading job details...</p>
      </div>
    );

  if (error)
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-red-50 p-6 rounded-lg shadow-md">
        <AlertTriangle className="text-red-500 w-10 h-10 mb-2" />
        <p className="text-red-600 font-semibold">{error}</p>
      </div>
    );

  if (!job)
    return (
      <div className="flex flex-col items-center justify-center h-64 text-gray-500">
        <AlertTriangle className="text-yellow-500 w-10 h-10 mb-2" />
        <p>No job found.</p>
      </div>
    );

  return (
    <div className="animate-fadeIn p-4 md:p-6 max-w-5xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-6 md:p-8 transition-all duration-300 hover:shadow-xl">
        <JobDetails job={job} />
      </div>
    </div>
  );
};

export default JobDetailsWrapper;
