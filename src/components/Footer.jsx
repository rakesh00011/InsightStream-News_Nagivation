import React from 'react';
import { Link } from 'react-router-dom';
import { FaNewspaper, FaGithub, FaTwitter, FaLinkedin, FaHeart, FaEnvelope, FaRss, FaArrowRight } from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="relative bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white mt-auto overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-15">
                <div className="absolute top-0 left-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
            </div>

            {/* Decorative top border */}
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-blue-500 to-transparent"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Main Footer Content */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 mb-4">
                    {/* Brand Section */}
                    <div className="lg:col-span-5">
                        <Link to="/" className="inline-flex items-center gap-2 mb-2 group">
                            <div className="relative">
                                <div className="absolute inset-0 bg-blue-500 rounded-lg blur-md opacity-40 group-hover:opacity-60 transition-opacity"></div>
                                <div className="relative p-1.5 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg">
                                    <FaNewspaper className="text-white text-base" />
                                </div>
                            </div>
                            <div>
                                <span className="text-base font-bold bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
                                    InsightStream
                                </span>
                                <p className="text-[9px] text-blue-300">Stay Informed, Stay Ahead</p>
                            </div>
                        </Link>
                        <p className="text-gray-300 mb-3 text-[11px] leading-relaxed">
                            Your trusted source for breaking news and curated stories from around the globe.
                        </p>

                        {/* Newsletter Signup */}
                        <div className="space-y-1">
                            <p className="text-[11px] font-semibold text-blue-200 flex items-center gap-1">
                                <FaEnvelope className="text-blue-400 text-[10px]" />
                                Subscribe to newsletter
                            </p>
                            <div className="flex gap-1.5">
                                <input
                                    type="email"
                                    placeholder="Your email"
                                    className="flex-1 px-2.5 py-1.5 text-[11px] bg-white/10 backdrop-blur-md border border-white/20 rounded-md focus:ring-1 focus:ring-blue-400 focus:border-transparent outline-none text-white placeholder-gray-400 transition-all"
                                />
                                <button className="px-2.5 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 rounded-md font-medium text-[11px] transition-all duration-200 shadow-md hover:shadow-blue-500/50 flex items-center gap-1 group">
                                    Subscribe
                                    <FaArrowRight className="text-[8px] group-hover:translate-x-0.5 transition-transform" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links Section */}
                    <div className="lg:col-span-7">
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                            {/* Categories */}
                            <div>
                                <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
                                    <div className="w-0.5 h-3 bg-gradient-to-b from-blue-400 to-blue-600 rounded-full"></div>
                                    <span className="bg-gradient-to-r from-blue-200 to-white bg-clip-text text-transparent">Categories</span>
                                </h3>
                                <ul className="space-y-1">
                                    {['technology', 'sports', 'entertainment', 'health', 'politics', 'invention'].map((category) => (
                                        <li key={category}>
                                            <Link
                                                to={`/category/${category}`}
                                                className="text-[11px] text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200 group"
                                            >
                                                <span className="w-0.5 h-0.5 bg-blue-400 rounded-full group-hover:bg-blue-300 group-hover:scale-125 transition-all"></span>
                                                <span className="capitalize">{category}</span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Quick Links */}
                            <div>
                                <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
                                    <div className="w-0.5 h-3 bg-gradient-to-b from-purple-400 to-purple-600 rounded-full"></div>
                                    <span className="bg-gradient-to-r from-purple-200 to-white bg-clip-text text-transparent">Quick Links</span>
                                </h3>
                                <ul className="space-y-1">
                                    {[
                                        { to: '/', label: 'Home' },
                                        { to: '/create', label: 'Create News' },
                                        { to: '/favorites', label: 'Favorites' },
                                        { to: '/search', label: 'Search' }
                                    ].map((link) => (
                                        <li key={link.to}>
                                            <Link to={link.to} className="text-[11px] text-gray-300 hover:text-white hover:translate-x-1 inline-flex items-center gap-1 transition-all duration-200 group">
                                                <span className="w-0.5 h-0.5 bg-purple-400 rounded-full group-hover:bg-purple-300 group-hover:scale-125 transition-all"></span>
                                                {link.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Connect */}
                            <div>
                                <h3 className="text-xs font-bold mb-2 flex items-center gap-1">
                                    <div className="w-0.5 h-3 bg-gradient-to-b from-pink-400 to-pink-600 rounded-full"></div>
                                    <span className="bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">Connect</span>
                                </h3>
                                <div className="flex flex-wrap gap-1.5 mb-2">
                                    <a href="#" className="group relative p-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md transition-all duration-300 hover:scale-110 border border-white/10 hover:border-blue-400/50" aria-label="Twitter">
                                        <FaTwitter className="text-xs text-gray-300 group-hover:text-blue-400 transition-colors" />
                                        <div className="absolute inset-0 bg-blue-500 rounded-md opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                                    </a>
                                    <a href="#" className="group relative p-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md transition-all duration-300 hover:scale-110 border border-white/10 hover:border-blue-500/50" aria-label="LinkedIn">
                                        <FaLinkedin className="text-xs text-gray-300 group-hover:text-blue-500 transition-colors" />
                                        <div className="absolute inset-0 bg-blue-600 rounded-md opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                                    </a>
                                    <a href="#" className="group relative p-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md transition-all duration-300 hover:scale-110 border border-white/10 hover:border-gray-400/50" aria-label="GitHub">
                                        <FaGithub className="text-xs text-gray-300 group-hover:text-white transition-colors" />
                                        <div className="absolute inset-0 bg-gray-500 rounded-md opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                                    </a>
                                    <a href="#" className="group relative p-1.5 bg-white/5 hover:bg-white/10 backdrop-blur-sm rounded-md transition-all duration-300 hover:scale-110 border border-white/10 hover:border-orange-400/50" aria-label="RSS">
                                        <FaRss className="text-xs text-gray-300 group-hover:text-orange-400 transition-colors" />
                                        <div className="absolute inset-0 bg-orange-500 rounded-md opacity-0 group-hover:opacity-20 blur transition-opacity"></div>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Divider */}
                <div className="relative h-px mb-3">
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/40 to-transparent"></div>
                </div>

                {/* Bottom Bar */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-2">
                    <p className="text-[9px] text-gray-400 flex items-center gap-1">
                        © {currentYear} InsightStream. Made with <FaHeart className="text-red-500 animate-pulse text-[9px]" /> for news enthusiasts.
                    </p>

                    <div className="flex items-center gap-2 text-[9px] text-gray-400">
                        <a href="#" className="hover:text-white transition-colors">Privacy</a>
                        <span className="text-gray-600">•</span>
                        <a href="#" className="hover:text-white transition-colors">Terms</a>
                        <span className="text-gray-600">•</span>
                        <a href="#" className="hover:text-white transition-colors">Contact</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
