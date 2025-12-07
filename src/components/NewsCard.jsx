import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeart, FaRegHeart, FaClock, FaArrowRight } from 'react-icons/fa';
import { useNews } from '../context/NewsContext';

const NewsCard = ({ article }) => {
    const { isFavorite, addToFavorites, removeFromFavorites } = useNews();
    const isFav = isFavorite(article.id);

    const handleFavoriteClick = (e) => {
        e.preventDefault();
        if (isFav) {
            removeFromFavorites(article.id);
        } else {
            addToFavorites(article);
        }
    };

    return (
        <article className="group bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 card-hover">
            {/* Image Container */}
            <div className="relative aspect-video overflow-hidden bg-gray-100 dark:bg-gray-700">
                <img
                    src={article.urlToImage || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c'}
                    alt={article.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Category Badge */}
                <div className="absolute top-3 left-3">
                    <span className="inline-block px-3 py-1 bg-blue-600 text-white text-xs font-semibold rounded-full uppercase tracking-wide shadow-lg">
                        {article.category || 'News'}
                    </span>
                </div>

                {/* Favorite Button */}
                <button
                    onClick={handleFavoriteClick}
                    className={`absolute top-3 right-3 p-2.5 rounded-full shadow-lg backdrop-blur-sm transition-all duration-200 ${isFav
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white/90 dark:bg-gray-800/90 text-gray-700 dark:text-gray-300 hover:bg-white dark:hover:bg-gray-800'
                        }`}
                >
                    {isFav ? <FaHeart size={16} /> : <FaRegHeart size={16} />}
                </button>
            </div>

            {/* Content */}
            <div className="p-5">
                {/* Meta Info */}
                <div className="flex items-center gap-3 mb-3 text-xs text-gray-500 dark:text-gray-400">
                    <span className="font-medium text-gray-700 dark:text-gray-300">{article.source}</span>
                    <span className="flex items-center gap-1">
                        <FaClock className="text-xs" />
                        {new Date(article.publishedAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric'
                        })}
                    </span>
                </div>

                {/* Title */}
                <h3 className="text-lg font-semibold mb-2 line-clamp-2 leading-snug text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                    {article.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {article.description}
                </p>

                {/* Read More Link */}
                <Link
                    to={`/article/${article.id}`}
                    className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:gap-3 transition-all duration-200"
                >
                    Read More
                    <FaArrowRight className="text-xs" />
                </Link>
            </div>
        </article>
    );
};

export default NewsCard;
