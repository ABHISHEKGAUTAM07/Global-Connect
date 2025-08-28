import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Phone, CheckCircle, XCircle, Users } from 'lucide-react';

const ApplicantsList = ({ jobId }) => {
  const [applicants, setApplicants] = useState([]);
  const token = localStorage.getItem('token');
  const API = import.meta.env.VITE_API_URL;

  useEffect(() => {
    axios
      .get(`${API}/jobs/${jobId}/applicants`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      .then(res => setApplicants(res.data))
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
        setApplicants(applicants.filter(a => a._id !== applicantId));
      })
      .catch(console.error);
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-full max-w-3xl mx-auto">
      <div className="flex items-center gap-2 mb-6 border-b pb-3">
        <Users className="text-blue-600" size={22} />
        <h3 className="text-xl font-bold text-gray-800">Applicants</h3>
      </div>

      {applicants.length === 0 ? (
        <p className="text-gray-500 text-center italic">No applicants yet.</p>
      ) : (
        <div className="grid gap-4">
          {applicants.map(applicant => (
            <div
              key={applicant._id}
              className="bg-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border"
            >
              <p className="text-lg font-semibold text-gray-800">
                {applicant.name}
              </p>
              <p className="text-sm text-gray-600">📧 {applicant.email}</p>
              <p className="text-sm text-gray-600">📞 {applicant.phone}</p>

              <div className="flex gap-3 mt-4">
                <button
                  onClick={() => window.open(`tel:${applicant.phone}`)}
                  className="flex items-center gap-2 bg-yellow-100 text-yellow-700 px-3 py-2 rounded-lg hover:bg-yellow-200 transition"
                >
                  <Phone size={16} /> Call
                </button>

                <button
                  onClick={() => respondApplicant(applicant._id, 'accept')}
                  className="flex items-center gap-2 bg-green-100 text-green-700 px-3 py-2 rounded-lg hover:bg-green-200 transition"
                >
                  <CheckCircle size={16} /> Accept
                </button>

                <button
                  onClick={() => respondApplicant(applicant._id, 'reject')}
                  className="flex items-center gap-2 bg-red-100 text-red-700 px-3 py-2 rounded-lg hover:bg-red-200 transition"
                >
                  <XCircle size={16} /> Reject
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ApplicantsList;
