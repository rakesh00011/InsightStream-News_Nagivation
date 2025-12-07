import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Category from './pages/Category';
import Favorites from './pages/Favorites';
import Search from './pages/Search';
import ArticleDetail from './pages/ArticleDetail';
import CreateNews from './pages/CreateNews';
import EditNews from './pages/EditNews';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="category/:category" element={<Category />} />
        <Route path="article/:id" element={<ArticleDetail />} />
        <Route path="create" element={<CreateNews />} />
        <Route path="edit/:id" element={<EditNews />} />
        <Route path="favorites" element={<Favorites />} />
        <Route path="search" element={<Search />} />
      </Route>
    </Routes>
  );
}

export default App;
