import React from 'react';
import { useNews } from '../context/NewsContext';
import NewsCard from '../components/NewsCard';
import { FaHeart, FaInbox } from 'react-icons/fa';

const Favorites = () => {
    const { savedArticles } = useNews();

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-red-500 rounded-lg">
                        <FaHeart className="text-white text-xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Your Favorites
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    {savedArticles.length} saved {savedArticles.length === 1 ? 'article' : 'articles'}
                </p>
            </div>

            {/* Articles Grid or Empty State */}
            {savedArticles.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <FaInbox className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        No saved articles yet
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        Start saving articles by clicking the heart icon on any story. They'll appear here for easy access.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {savedArticles.map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Favorites;
