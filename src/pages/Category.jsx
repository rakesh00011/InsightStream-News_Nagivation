import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getArticles } from '../services/api';
import NewsCard from '../components/NewsCard';
import { FaTag } from 'react-icons/fa';

const Category = () => {
    const { category } = useParams();
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const allArticles = await getArticles();
            const filtered = allArticles.filter(a => a.category === category);
            setArticles(filtered);
            setLoading(false);
        };
        fetchNews();
    }, [category]);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading {category} news...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-600 rounded-lg">
                        <FaTag className="text-white text-xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white capitalize">
                        {category}
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Latest news and updates in {category}
                </p>
            </div>

            {/* Articles Grid */}
            {articles.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        No articles found in this category yet.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {articles.map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Category;
