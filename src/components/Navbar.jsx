import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaNewspaper, FaHeart, FaSearch, FaBars, FaTimes, FaPlus } from 'react-icons/fa';

const Navbar = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const navLinkClass = ({ isActive }) =>
        `px-3 py-2 text-sm font-medium rounded-md transition-colors ${isActive
            ? 'text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
            : 'text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-gray-50 dark:hover:bg-gray-800'
        }`;

    return (
        <nav className="sticky top-0 z-50 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-2 group">
                        <div className="p-2 bg-blue-600 rounded-lg group-hover:bg-blue-700 transition-colors">
                            <FaNewspaper className="text-white text-xl" />
                        </div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                            InsightStream
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-1">
                        <NavLink to="/" className={navLinkClass} end>
                            Home
                        </NavLink>
                        <NavLink to="/category/technology" className={navLinkClass}>
                            Technology
                        </NavLink>
                        <NavLink to="/category/sports" className={navLinkClass}>
                            Sports
                        </NavLink>
                        <NavLink to="/category/entertainment" className={navLinkClass}>
                            Entertainment
                        </NavLink>
                        <NavLink to="/category/health" className={navLinkClass}>
                            Health
                        </NavLink>
                        <NavLink to="/category/politics" className={navLinkClass}>
                            Politics
                        </NavLink>
                        <NavLink to="/category/invention" className={navLinkClass}>
                            Invention
                        </NavLink>
                        <NavLink to="/favorites" className={navLinkClass}>
                            <FaHeart className="inline mr-1" />
                            Favorites
                        </NavLink>
                        <NavLink to="/search" className={navLinkClass}>
                            <FaSearch className="inline mr-1" />
                            Search
                        </NavLink>
                        <NavLink to="/create" className="ml-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg flex items-center gap-2">
                            <FaPlus />
                            Create News
                        </NavLink>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                    >
                        {mobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900">
                    <div className="px-4 py-3 space-y-1">
                        <NavLink to="/" className={navLinkClass} end onClick={() => setMobileMenuOpen(false)}>
                            Home
                        </NavLink>
                        <NavLink to="/category/technology" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Technology
                        </NavLink>
                        <NavLink to="/category/sports" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Sports
                        </NavLink>
                        <NavLink to="/category/entertainment" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Entertainment
                        </NavLink>
                        <NavLink to="/category/health" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Health
                        </NavLink>
                        <NavLink to="/category/politics" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Politics
                        </NavLink>
                        <NavLink to="/category/invention" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            Invention
                        </NavLink>
                        <NavLink to="/favorites" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <FaHeart className="inline mr-1" />
                            Favorites
                        </NavLink>
                        <NavLink to="/search" className={navLinkClass} onClick={() => setMobileMenuOpen(false)}>
                            <FaSearch className="inline mr-1" />
                            Search
                        </NavLink>
                        <NavLink to="/create" className="px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white text-sm font-medium rounded-lg flex items-center gap-2 justify-center" onClick={() => setMobileMenuOpen(false)}>
                            <FaPlus />
                            Create News
                        </NavLink>
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
