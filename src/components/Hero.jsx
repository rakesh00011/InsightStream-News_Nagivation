import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaClock, FaTag } from 'react-icons/fa';
import { useNews } from '../context/NewsContext';

const Hero = ({ article }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useNews();

    if (!article) return null;

    const isFav = isFavorite(article.id);

    const handleFavoriteClick = () => {
        if (isFav) {
            removeFromFavorites(article.id);
        } else {
            addToFavorites(article);
        }
    };

    return (
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 mb-12 group">
            <div className="absolute inset-0">
                <img
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                    alt={article.title}
                    className="w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent"></div>
            </div>

            <div className="relative px-8 py-12 md:py-16 lg:py-20">
                <div className="max-w-4xl">
                    {/* Category Badge */}
                    <div className="flex items-center gap-3 mb-4">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide">
                            <FaTag className="text-xs" />
                            {article.category || 'Featured'}
                        </span>
                        <span className="flex items-center gap-1.5 text-gray-300 text-sm">
                            <FaClock className="text-xs" />
                            {new Date(article.publishedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                                year: 'numeric'
                            })}
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 leading-tight text-balance">
                        {article.title}
                    </h1>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed max-w-3xl">
                        {article.description}
                    </p>

                    {/* Actions */}
                    <div className="flex items-center gap-4">
                        <Link to={`/article/${article.id}`} className="btn-primary">
                            Read Full Story
                        </Link>
                        <button
                            onClick={handleFavoriteClick}
                            className={`p-3 rounded-lg transition-all duration-200 ${isFav
                                ? 'bg-red-500 hover:bg-red-600 text-white'
                                : 'bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm'
                                }`}
                        >
                            {isFav ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
                        </button>
                    </div>

                    {/* Source */}
                    <div className="mt-6 pt-6 border-t border-white/10">
                        <p className="text-sm text-gray-400">
                            Source: <span className="text-white font-medium">{article.source}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Hero;
