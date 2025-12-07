import React, { createContext, useState, useEffect, useContext } from 'react';
import { getSavedArticles, saveArticle, removeSavedArticle } from '../services/api';
import { toast } from 'react-toastify';

const NewsContext = createContext();

export const useNews = () => useContext(NewsContext);

export const NewsProvider = ({ children }) => {
    const [savedArticles, setSavedArticles] = useState([]);
    const [theme, setTheme] = useState('dark'); // Default to dark mode for premium feel

    useEffect(() => {
        // Load initial saved articles
        loadSavedArticles();
    }, []);

    const loadSavedArticles = async () => {
        try {
            const articles = await getSavedArticles();
            setSavedArticles(articles);
        } catch (error) {
            console.error("Failed to load saved articles", error);
        }
    };

    const addToFavorites = async (article) => {
        try {
            await saveArticle(article);
            setSavedArticles(prev => [...prev, article]);
            toast.success("Article saved to favorites!");
        } catch (error) {
            toast.error("Failed to save article.");
        }
    };

    const removeFromFavorites = async (id) => {
        try {
            await removeSavedArticle(id);
            setSavedArticles(prev => prev.filter(a => a.id !== id));
            toast.info("Article removed from favorites.");
        } catch (error) {
            toast.error("Failed to remove article.");
        }
    };

    const isFavorite = (id) => {
        return savedArticles.some(a => a.id === id);
    };

    const toggleTheme = () => {
        setTheme(prev => prev === 'dark' ? 'light' : 'dark');
    };

    return (
        <NewsContext.Provider value={{
            savedArticles,
            addToFavorites,
            removeFromFavorites,
            isFavorite,
            theme,
            toggleTheme
        }}>
            <div className={theme === 'dark' ? 'dark' : ''}>
                <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300">
                    {children}
                </div>
            </div>
        </NewsContext.Provider>
    );
};
