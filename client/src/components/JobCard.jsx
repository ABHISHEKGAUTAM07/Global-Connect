import React from 'react';
import { Briefcase, MapPin, Clock } from 'lucide-react';

const JobCard = ({ job }) => {
  return (
    <div className="bg-white/70 backdrop-blur-lg border border-gray-200 hover:border-blue-500 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 cursor-pointer group">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-2xl font-extrabold text-gray-800 group-hover:text-blue-700 transition">{job.title}</h3>
          <p className="text-sm text-gray-500 mt-1">{job.company}</p>
        </div>
        <span className="text-xs text-gray-400">#{job._id.slice(-6)}</span>
      </div>

      <div className="flex flex-wrap gap-4 text-sm text-gray-600 mt-4">
        <span className="flex items-center gap-1">
          <MapPin className="text-blue-500" size={16} /> {job.location}
        </span>
        <span className="flex items-center gap-1">
          <Briefcase className="text-green-500" size={16} /> {job.type}
        </span>
        <span className="flex items-center gap-1">
          <Clock className="text-purple-500" size={16} /> Posted {job.postedAgo}
        </span>
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300">
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobCard;
