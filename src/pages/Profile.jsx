import React, { useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/api';
import { toast } from 'react-toastify';
import { FaUser, FaEdit, FaSave, FaTimes, FaBriefcase, FaCode } from 'react-icons/fa';

const Profile = () => {
    const [profile, setProfile] = useState({
        name: '',
        title: '',
        summary: '',
        skills: [],
        experience: []
    });
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);

    useEffect(() => {
        loadProfile();
    }, []);

    const loadProfile = async () => {
        setLoading(true);
        const data = await getProfile();
        setProfile(data);
        setLoading(false);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
    };

    const handleSkillsChange = (e) => {
        const skillsString = e.target.value;
        setProfile(prev => ({ ...prev, skills: skillsString.split(',').map(s => s.trim()) }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateProfile(profile);
            toast.success("Profile updated successfully!");
            setIsEditing(false);
        } catch (error) {
            toast.error("Failed to update profile.");
        }
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading profile...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            {/* Profile Card */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
                {/* Header */}
                <div className="relative bg-gradient-to-r from-blue-600 to-blue-700 p-8 text-white">
                    <div className="flex justify-between items-start">
                        <div className="flex items-center gap-4">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                                <FaUser className="text-4xl" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold mb-1">{profile.name || 'Your Name'}</h1>
                                <p className="text-blue-100 text-lg">{profile.title || 'Your Title'}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setIsEditing(!isEditing)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-lg transition-colors"
                        >
                            {isEditing ? (
                                <>
                                    <FaTimes /> Cancel
                                </>
                            ) : (
                                <>
                                    <FaEdit /> Edit Profile
                                </>
                            )}
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-8">
                    {isEditing ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Full Name
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        value={profile.name}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="John Doe"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                        Job Title
                                    </label>
                                    <input
                                        type="text"
                                        name="title"
                                        value={profile.title}
                                        onChange={handleChange}
                                        className="input-field"
                                        placeholder="Software Engineer"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Professional Summary
                                </label>
                                <textarea
                                    name="summary"
                                    rows="4"
                                    value={profile.summary}
                                    onChange={handleChange}
                                    className="input-field resize-none"
                                    placeholder="Tell us about yourself..."
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                                    Skills (comma separated)
                                </label>
                                <input
                                    type="text"
                                    value={profile.skills?.join(', ')}
                                    onChange={handleSkillsChange}
                                    className="input-field"
                                    placeholder="React, JavaScript, Node.js"
                                />
                            </div>

                            <button
                                type="submit"
                                className="btn-primary w-full flex items-center justify-center gap-2"
                            >
                                <FaSave /> Save Changes
                            </button>
                        </form>
                    ) : (
                        <div className="space-y-8">
                            {/* About Section */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <FaUser className="text-blue-600" />
                                    About
                                </h3>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                    {profile.summary || 'No summary added yet. Click "Edit Profile" to add information about yourself.'}
                                </p>
                            </section>

                            {/* Skills Section */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <FaCode className="text-blue-600" />
                                    Skills
                                </h3>
                                {profile.skills && profile.skills.length > 0 ? (
                                    <div className="flex flex-wrap gap-2">
                                        {profile.skills.map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-4 py-2 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 rounded-lg text-sm font-medium border border-blue-200 dark:border-blue-800"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No skills listed yet.</p>
                                )}
                            </section>

                            {/* Experience Section */}
                            <section>
                                <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
                                    <FaBriefcase className="text-blue-600" />
                                    Experience
                                </h3>
                                {profile.experience && profile.experience.length > 0 ? (
                                    <div className="space-y-4">
                                        {profile.experience.map((exp) => (
                                            <div key={exp.id} className="p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                                <h4 className="font-semibold text-lg text-gray-900 dark:text-white">{exp.role}</h4>
                                                <p className="text-gray-600 dark:text-gray-300">{exp.company}</p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{exp.duration}</p>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p className="text-gray-500 dark:text-gray-400">No experience listed yet.</p>
                                )}
                            </section>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Profile;
