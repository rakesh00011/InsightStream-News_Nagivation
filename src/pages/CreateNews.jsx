import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaNewspaper, FaImage, FaTag, FaFileAlt, FaSave, FaTimes } from 'react-icons/fa';
import { toast } from 'react-toastify';
import axios from 'axios';

const CreateNews = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'technology',
        source: '',
        urlToImage: '',
        publishedAt: new Date().toISOString()
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    const categories = ['technology', 'sports', 'entertainment', 'health', 'politics', 'invention', 'general'];

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        } else if (formData.title.length < 10) {
            newErrors.title = 'Title must be at least 10 characters';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        } else if (formData.description.length < 50) {
            newErrors.description = 'Description must be at least 50 characters';
        }

        if (!formData.source.trim()) {
            newErrors.source = 'Source is required';
        }

        if (formData.urlToImage && !isValidUrl(formData.urlToImage)) {
            newErrors.urlToImage = 'Please enter a valid URL';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const isValidUrl = (string) => {
        try {
            new URL(string);
            return true;
        } catch (_) {
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validate()) {
            toast.error('Please fix the errors in the form');
            return;
        }

        setIsSubmitting(true);

        try {
            const response = await axios.post('http://localhost:3001/articles', {
                ...formData,
                id: Date.now(), // Simple ID generation
                publishedAt: new Date().toISOString()
            });

            toast.success('Article created successfully!');
            navigate('/');
        } catch (error) {
            console.error('Error creating article:', error);
            toast.error('Failed to create article. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleCancel = () => {
        if (window.confirm('Are you sure you want to cancel? All changes will be lost.')) {
            navigate(-1);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg">
                        <FaNewspaper className="text-white text-2xl" />
                    </div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create News Article</h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400">
                    Share your story with the world. Fill in the details below to create a new article.
                </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-lg p-8">
                {/* Title */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <FaFileAlt className="text-blue-600" />
                        Article Title *
                    </label>
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter a compelling title for your article"
                        className={`input-field ${errors.title ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.title && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.title}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.title.length}/200 characters
                    </p>
                </div>

                {/* Category & Source Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    {/* Category */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <FaTag className="text-blue-600" />
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className="input-field"
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat} className="capitalize">
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Source */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                            <FaNewspaper className="text-blue-600" />
                            Source *
                        </label>
                        <input
                            type="text"
                            name="source"
                            value={formData.source}
                            onChange={handleChange}
                            placeholder="e.g., TechCrunch, BBC News"
                            className={`input-field ${errors.source ? 'border-red-500 focus:ring-red-500' : ''}`}
                        />
                        {errors.source && (
                            <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.source}</p>
                        )}
                    </div>
                </div>

                {/* Image URL */}
                <div className="mb-6">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <FaImage className="text-blue-600" />
                        Image URL (Optional)
                    </label>
                    <input
                        type="url"
                        name="urlToImage"
                        value={formData.urlToImage}
                        onChange={handleChange}
                        placeholder="https://example.com/image.jpg"
                        className={`input-field ${errors.urlToImage ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.urlToImage && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.urlToImage}</p>
                    )}
                    {formData.urlToImage && !errors.urlToImage && (
                        <div className="mt-3 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
                            <img
                                src={formData.urlToImage}
                                alt="Preview"
                                className="w-full h-48 object-cover"
                                onError={(e) => {
                                    e.target.style.display = 'none';
                                    setErrors(prev => ({ ...prev, urlToImage: 'Failed to load image' }));
                                }}
                            />
                        </div>
                    )}
                </div>

                {/* Description */}
                <div className="mb-8">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                        <FaFileAlt className="text-blue-600" />
                        Article Description *
                    </label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="6"
                        placeholder="Write a detailed description of your article..."
                        className={`input-field resize-none ${errors.description ? 'border-red-500 focus:ring-red-500' : ''}`}
                    />
                    {errors.description && (
                        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.description}</p>
                    )}
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        {formData.description.length}/1000 characters
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-4 pt-6 border-t border-gray-200 dark:border-gray-700">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <FaSave />
                        {isSubmitting ? 'Publishing...' : 'Publish Article'}
                    </button>
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="px-6 py-2.5 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center gap-2"
                    >
                        <FaTimes />
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default CreateNews;
