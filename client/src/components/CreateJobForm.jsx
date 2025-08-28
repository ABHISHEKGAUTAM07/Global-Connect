import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createJob } from '../features/job/jobSlice';
import { Briefcase, MapPin, Code, FileText, PlusCircle } from 'lucide-react';

const CreateJobForm = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    location: '',
    skills: ''
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    const jobData = {
      ...formData,
      skills: formData.skills.split(',').map(s => s.trim())
    };
    dispatch(createJob(jobData))
      .unwrap()
      .then(() => {
        alert("✅ Job posted successfully!");
        setFormData({ title: '', description: '', location: '', skills: '' });
      })
      .catch(err => alert(err?.response?.data?.error || "Failed to post job"));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white shadow-lg rounded-2xl p-6 border border-gray-100 transition-all duration-300 hover:shadow-xl"
    >
      <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-blue-600">
        <Briefcase className="w-6 h-6" /> Post a Job
      </h3>

      {/* Job Title */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Job Title</label>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <FileText className="text-gray-400 w-5 h-5" />
          <input
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Enter job title"
            className="w-full outline-none"
            required
          />
        </div>
      </div>

      {/* Job Description */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Job Description</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Write a short description"
          className="w-full border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-blue-400 min-h-[100px]"
          required
        />
      </div>

      {/* Location */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Location</label>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <MapPin className="text-gray-400 w-5 h-5" />
          <input
            name="location"
            value={formData.location}
            onChange={handleChange}
            placeholder="Enter location"
            className="w-full outline-none"
            required
          />
        </div>
      </div>

      {/* Skills */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Skills</label>
        <div className="flex items-center gap-2 border rounded-lg px-3 py-2 focus-within:ring-2 focus-within:ring-blue-400">
          <Code className="text-gray-400 w-5 h-5" />
          <input
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="E.g. React, Node.js, Tailwind"
            className="w-full outline-none"
          />
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 text-white px-5 py-2.5 rounded-lg font-semibold shadow-md hover:shadow-lg hover:scale-[1.02] transition-all duration-300"
      >
        <PlusCircle className="w-5 h-5" />
        Post Job
      </button>
    </form>
  );
};

export default CreateJobForm;
