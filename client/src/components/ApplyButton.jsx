import { useDispatch } from 'react-redux';
import { applyToJob } from '../features/job/jobSlice';
import { CheckCircle, Send } from 'lucide-react';

const ApplyButton = ({ jobId, applied }) => {
  const dispatch = useDispatch();

  const handleApply = () => {
    dispatch(applyToJob(jobId))
      .unwrap()
      .then(() => alert("Application submitted!"))
      .catch(err => alert(err?.response?.data?.error || "Failed to apply"));
  };

  return (
    <button
      onClick={handleApply}
      disabled={applied}
      className={`group relative px-6 py-2 rounded-full text-sm font-semibold transition-all duration-300 shadow-md ${
        applied
          ? 'bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed shadow-none'
          : 'bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 hover:from-green-600 hover:to-emerald-600 text-white hover:shadow-lg hover:scale-105'
      }`}
    >
      <span className="flex items-center gap-2">
        {applied ? (
          <>
            <CheckCircle size={18} className="text-white" />
            Applied
          </>
        ) : (
          <>
            <Send size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
            Apply Now
          </>
        )}
      </span>

      {/* Subtle glow effect on hover */}
      {!applied && (
        <span className="absolute inset-0 rounded-full bg-green-400 opacity-0 group-hover:opacity-20 blur-lg transition-opacity"></span>
      )}
    </button>
  );
};

export default ApplyButton;
