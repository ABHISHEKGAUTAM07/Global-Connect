import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs } from "../features/job/jobSlice";
import ApplyButton from "../components/ApplyButton";
import CreateJobForm from "../components/CreateJobForm";
import { MapPin, Briefcase, Loader2 } from "lucide-react";

const Jobs = () => {
  const dispatch = useDispatch();
  const { jobs, loading } = useSelector((state) => state.job);

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch]);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 flex items-center gap-2">
        🚀 Job Board
      </h2>

      {/* Job Posting Form */}
      <div className="mb-8">
        <CreateJobForm />
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col items-center justify-center h-40">
          <Loader2 className="animate-spin text-blue-600 w-10 h-10 mb-2" />
          <p className="text-gray-500">Loading jobs...</p>
        </div>
      ) : jobs.length === 0 ? (
        <p className="text-gray-500 text-center">No jobs available right now.</p>
      ) : (
        <div className="grid sm:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <div
              key={job._id}
              className="bg-white rounded-xl shadow-md p-6 hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
            >
              {/* Job Title */}
              <div>
                <h3 className="text-xl font-semibold flex items-center gap-2 text-blue-700">
                  <Briefcase className="w-5 h-5" />
                  {job.title}
                </h3>
                <p className="text-gray-600 mt-2">{job.description}</p>
              </div>

              {/* Location */}
              <div className="flex items-center gap-2 mt-4 text-sm text-gray-500">
                <MapPin className="w-4 h-4" />
                {job.location || "Location not specified"}
              </div>

              {/* Apply Button */}
              <div className="mt-6">
                <ApplyButton jobId={job._id} applied={job.applied} />
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Jobs;
