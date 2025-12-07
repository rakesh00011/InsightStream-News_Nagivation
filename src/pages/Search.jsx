import React, { useState, useEffect } from 'react';
import { getArticles } from '../services/api';
import NewsCard from '../components/NewsCard';
import { FaSearch } from 'react-icons/fa';

const Search = () => {
    const [query, setQuery] = useState('');
    const [articles, setArticles] = useState([]);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchAll = async () => {
            const data = await getArticles();
            setArticles(data);
        };
        fetchAll();
    }, []);

    useEffect(() => {
        if (!query) {
            setResults([]);
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filtered = articles.filter(article =>
            article.title.toLowerCase().includes(lowerQuery) ||
            article.description.toLowerCase().includes(lowerQuery) ||
            article.category.toLowerCase().includes(lowerQuery)
        );
        setResults(filtered);
    }, [query, articles]);

    return (
        <div>
            {/* Page Header */}
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-3">
                    <div className="p-3 bg-blue-600 rounded-lg">
                        <FaSearch className="text-white text-xl" />
                    </div>
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
                        Search News
                    </h1>
                </div>
                <p className="text-gray-600 dark:text-gray-400 text-lg">
                    Find articles by keyword, topic, or category
                </p>
            </div>

            {/* Search Input */}
            <div className="mb-8">
                <div className="relative max-w-2xl">
                    <input
                        type="text"
                        placeholder="Search for topics, keywords, categories..."
                        className="input-field pl-12 text-lg"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        autoFocus
                    />
                    <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl" />
                </div>

                {query && (
                    <p className="mt-3 text-gray-600 dark:text-gray-400">
                        Found <span className="font-semibold text-blue-600 dark:text-blue-400">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for "{query}"
                    </p>
                )}
            </div>

            {/* Results or Empty State */}
            {!query ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <FaSearch className="mx-auto text-6xl text-gray-300 dark:text-gray-600 mb-4" />
                    <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                        Start searching
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400 max-w-md mx-auto">
                        Enter keywords above to find relevant news articles across all categories
                    </p>
                </div>
            ) : results.length === 0 ? (
                <div className="text-center py-20 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
                    <p className="text-xl text-gray-500 dark:text-gray-400">
                        No articles found matching "{query}"
                    </p>
                    <p className="text-sm text-gray-400 dark:text-gray-500 mt-2">
                        Try different keywords or browse by category
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {results.map(article => (
                        <NewsCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Search;
