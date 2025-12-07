import React, { useEffect, useState } from 'react';
import { getArticles } from '../services/api';
import NewsCard from '../components/NewsCard';
import Hero from '../components/Hero';

const Home = () => {
    const [articles, setArticles] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            const data = await getArticles();
            setArticles(data);
            setLoading(false);
        };
        fetchNews();
    }, []);

    if (loading) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <div className="flex flex-col items-center gap-4">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-blue-600 border-t-transparent"></div>
                    <p className="text-gray-600 dark:text-gray-400 font-medium">Loading latest news...</p>
                </div>
            </div>
        );
    }

    const featuredArticle = articles[0];
    const otherArticles = articles.slice(1);

    return (
        <div>
            {/* Hero Section */}
            {featuredArticle && <Hero article={featuredArticle} />}

            {/* Section Header */}
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    Latest Stories
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                    Stay updated with the most recent news from around the world
                </p>
            </div>

            {/* Articles Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {otherArticles.map((article) => (
                    <NewsCard key={article.id} article={article} />
                ))}
            </div>
        </div>
    );
};

export default Home;
