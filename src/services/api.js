import axios from 'axios';

const API_URL = 'http://localhost:3001';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getArticles = async () => {
    try {
        const response = await api.get('/articles');
        return response.data;
    } catch (error) {
        console.error("Error fetching articles:", error);
        return [];
    }
};

export const getArticleById = async (id) => {
    try {
        const response = await api.get(`/articles/${id}`);
        return response.data;
    } catch (error) {
        console.error(`Error fetching article ${id}:`, error);
        throw error;
    }
};


export const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return [];
    }
};

export const getSavedArticles = async () => {
    try {
        const response = await api.get('/savedArticles');
        return response.data;
    } catch (error) {
        // Offline fallback or error handling
        console.error("Error fetching saved articles:", error);
        return JSON.parse(localStorage.getItem('savedArticles') || '[]');
    }
};

export const saveArticle = async (article) => {
    try {
        // Check if already saved in backend
        const saved = await getSavedArticles();
        if (saved.find(a => a.id === article.id)) return;

        const response = await api.post('/savedArticles', article);
        return response.data;
    } catch (error) {
        console.error("Error saving article:", error);
        // Local fallback if offline
        const localSaved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        if (!localSaved.find(a => a.id === article.id)) {
            localSaved.push(article);
            localStorage.setItem('savedArticles', JSON.stringify(localSaved));
        }
    }
};

export const removeSavedArticle = async (id) => {
    try {
        await api.delete(`/savedArticles/${id}`);
    } catch (error) {
        console.error("Error removing article:", error);
        // Local fallback
        const localSaved = JSON.parse(localStorage.getItem('savedArticles') || '[]');
        const updated = localSaved.filter(a => a.id !== id);
        localStorage.setItem('savedArticles', JSON.stringify(updated));
    }
};

export const getProfile = async () => {
    try {
        const response = await api.get('/profile');
        return response.data;
    } catch (error) {
        console.error("Error fetching profile:", error);
        return {};
    }
};

export const updateProfile = async (profileData) => {
    try {
        // JSON-Server profile object update
        const response = await api.put('/profile', profileData);
        return response.data;
    } catch (error) {
        console.error("Error updating profile:", error);
        throw error;
    }
};

export const updateArticle = async (id, articleData) => {
    try {
        const response = await api.put(`/articles/${id}`, articleData);
        return response.data;
    } catch (error) {
        console.error(`Error updating article ${id}:`, error);
        throw error;
    }
};

export default api;
