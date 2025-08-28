import React from 'react';
import { useSelector } from 'react-redux';
import ApplicantsList from '../components/ApplicantsList';
import { Briefcase, MapPin, FileText, Users } from 'lucide-react';

const JobDetails = ({ job }) => {
  const currentUserId = useSelector((state) => state.auth.user?._id);

  return (
    <div className="max-w-4xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-lg border border-gray-100 transition-all duration-300 hover:shadow-xl">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-3xl font-bold text-blue-600 flex items-center gap-2">
          <Briefcase className="w-7 h-7" /> {job.title}
        </h1>
        <span className="px-4 py-1 text-sm bg-blue-100 text-blue-700 rounded-full font-medium shadow-sm">
          {job.type || 'Full-Time'}
        </span>
      </div>

      {/* Description */}
      <div className="mb-4">
        <p className="text-gray-700 leading-relaxed flex items-start gap-2">
          <FileText className="w-5 h-5 mt-1 text-gray-500" /> {job.description}
        </p>
      </div>

      {/* Location */}
      {job.location && (
        <div className="mb-4 flex items-center gap-2 text-gray-600">
          <MapPin className="w-5 h-5 text-red-500" /> {job.location}
        </div>
      )}

      {/* Skills */}
      {job.skills && job.skills.length > 0 && (
        <div className="mb-4">
          <h2 className="text-lg font-semibold mb-2 text-gray-800">Required Skills:</h2>
          <div className="flex flex-wrap gap-2">
            {job.skills.map((skill, idx) => (
              <span
                key={idx}
                className="px-3 py-1 text-sm bg-gradient-to-r from-blue-50 to-blue-100 text-blue-700 rounded-full shadow-sm"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Applicants Section */}
      {job.postedBy === currentUserId && (
        <div className="mt-6">
          <h2 className="text-lg font-semibold flex items-center gap-2 text-gray-800">
            <Users className="w-5 h-5 text-green-500" /> Applicants
          </h2>
          <ApplicantsList jobId={job._id} />
        </div>
      )}
    </div>
  );
};

export default JobDetails;
