import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleById } from '../services/api';
import { useNews } from '../context/NewsContext';
import { FaArrowLeft, FaHeart, FaRegHeart, FaClock, FaTag, FaExternalLinkAlt, FaEdit } from 'react-icons/fa';

const ArticleDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { isFavorite, addToFavorites, removeFromFavorites } = useNews();
    const [article, setArticle] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchArticle = async () => {
            setLoading(true);
            try {
                const data = await getArticleById(id);
                setArticle(data);
            } catch (error) {
                console.error("Error fetching article:", error);
            }
            setLoading(false);
        };
        fetchArticle();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading article...</p>
                </div>
            </div>
        );
    }

    if (!article) {
        return (
            <div className="text-center py-20">
                <p className="text-xl text-gray-500 dark:text-gray-400">Article not found</p>
                <button onClick={() => navigate('/')} className="btn-primary mt-4">
                    Go Home
                </button>
            </div>
        );
    }

    const isFav = isFavorite(article.id);

    const handleFavoriteClick = () => {
        if (isFav) {
            removeFromFavorites(article.id);
        } else {
            addToFavorites(article);
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <button
                onClick={() => navigate(-1)}
                className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 mb-6 transition-colors"
            >
                <FaArrowLeft />
                <span>Back</span>
            </button>

            {/* Article Header */}
            <article className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 shadow-lg">
                {/* Featured Image */}
                <div className="relative h-96 overflow-hidden bg-gray-100 dark:bg-gray-700">
                    <img
                        src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                        alt={article.title}
                        className="w-full h-full object-cover"
                    />
                    <div className="absolute top-4 right-4">
                        <button
                            onClick={handleFavoriteClick}
                            className={`p-3 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${isFav
                                ? 'bg-red-500 text-white hover:bg-red-600'
                                : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                                }`}
                        >
                            {isFav ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                        </button>
                    </div>
                </div>

                {/* Article Content */}
                <div className="p-8">
                    {/* Meta Info */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-semibold rounded-full uppercase tracking-wide">
                            <FaTag className="text-xs" />
                            {article.category || 'News'}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 text-sm">
                            <FaClock className="text-xs" />
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                month: 'long',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                        <span className="text-gray-500 dark:text-gray-400 text-sm">
                            By <span className="font-medium text-gray-700 dark:text-gray-300">{article.source}</span>
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-6 leading-tight">
                        {article.title}
                    </h1>

                    {/* Description */}
                    <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
                        {article.description}
                    </p>

                    {/* Article Body (simulated) */}
                    <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            {article.description}
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                            This is a demonstration article from the InsightStream aggregator. In a real application, this would contain the full article content fetched from the news source.
                        </p>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            The article discusses important developments in {article.category} and provides insights into recent trends and future predictions.
                        </p>
                    </div>

                    {/* External Link */}
                    <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                            <a
                                href="#"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                            >
                                Read full article on {article.source}
                                <FaExternalLinkAlt className="text-sm" />
                            </a>

                            <button
                                onClick={() => navigate(`/edit/${article.id}`)}
                                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                            >
                                <FaEdit />
                                Edit Article
                            </button>
                        </div>
                    </div>
                </div>
            </article>
        </div>
    );
};

export default ArticleDetail;
