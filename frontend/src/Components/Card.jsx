import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Like from "./Like"; 

const Card = () => {
    const [post, setPost] = useState([]);

    const fetchData = async () => {
        try {
            const response = await axios.get("http://localhost:8000/post/allposts");
            setPost(response.data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="min-h-screen relative overflow-hidden">
            {/* Epic Animated Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-fuchsia-900">
                {/* Animated Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-800/40 via-cyan-600/30 to-emerald-500/40"></div>
                <div className="absolute inset-0 bg-gradient-to-bl from-pink-600/30 via-rose-500/20 to-orange-400/30 animate-pulse"></div>
                
                {/* Floating Orbs */}
                <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-r from-cyan-400/20 to-blue-500/20 rounded-full blur-3xl animate-float"></div>
                <div className="absolute top-40 right-20 w-80 h-80 bg-gradient-to-r from-pink-400/20 to-rose-500/20 rounded-full blur-3xl animate-float-delayed"></div>
                <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-gradient-to-r from-emerald-400/20 to-teal-500/20 rounded-full blur-3xl animate-float-slow"></div>
                <div className="absolute bottom-40 right-10 w-64 h-64 bg-gradient-to-r from-purple-400/20 to-indigo-500/20 rounded-full blur-3xl animate-bounce-slow"></div>
                
                {/* Mesh Gradient Blobs */}
                <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-yellow-300 via-pink-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob"></div>
                    <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-bl from-green-300 via-blue-300 to-purple-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-2000"></div>
                    <div className="absolute bottom-0 left-20 w-96 h-96 bg-gradient-to-tr from-orange-300 via-red-300 to-pink-400 rounded-full mix-blend-multiply filter blur-2xl animate-blob animation-delay-4000"></div>
                </div>
                
                {/* Sparkle Effects */}
                <div className="absolute inset-0">
                    <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-white rounded-full animate-ping"></div>
                    <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300 rounded-full animate-ping animation-delay-1000"></div>
                    <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-pink-300 rounded-full animate-ping animation-delay-2000"></div>
                    <div className="absolute bottom-1/3 right-1/3 w-1 h-1 bg-emerald-300 rounded-full animate-ping animation-delay-3000"></div>
                </div>
                
                {/* Grid Pattern Overlay */}
                <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    {/* Enhanced Header Section */}
                    <div className="text-center mb-20">
                        <div className="inline-block mb-6">
                            <div className="flex items-center justify-center space-x-2 px-6 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full text-white/80 text-sm font-medium mb-4">
                                <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-pulse"></div>
                                <span>Discover Amazing Content</span>
                            </div>
                        </div>
                        
                        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
                            <span className="bg-gradient-to-r from-white via-cyan-200 to-blue-200 bg-clip-text text-transparent">
                                Latest
                            </span>
                            <br />
                            <span className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-300 bg-clip-text text-transparent">
                                Articles
                            </span>
                        </h1>
                        
                        <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto leading-relaxed">
                            Explore our curated collection of inspiring stories, insights, and ideas from creative minds around the world
                        </p>
                        
                        <div className="flex justify-center">
                            <div className="w-32 h-1 bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 rounded-full shadow-lg shadow-purple-500/50"></div>
                        </div>
                    </div>

                    {/* Enhanced Cards Grid - Fixed Height */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 lg:gap-12">
                        {post.map((c, index) => (
                            <article
                                key={c._id || index}
                                className="group relative bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden hover:shadow-purple-500/25 hover:shadow-2xl hover:scale-[1.03] hover:-translate-y-2 transition-all duration-700 ease-out h-[700px] flex flex-col"
                            >
                                {/* Card Glow Effect */}
                                <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 rounded-3xl opacity-0 group-hover:opacity-20 blur transition-opacity duration-500"></div>
                                
                                {/* Dynamic Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
                                
                                {/* Image Container - Fixed Height */}
                                <div className="relative overflow-hidden h-64 flex-shrink-0">
                                    <img
                                        src={c.photo}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                                        alt={c.topic}
                                    />
                                    {/* Colorful Image Overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-purple-900/30 via-transparent to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                    
                                    {/* Enhanced Floating Badge */}
                                    <div className="absolute top-4 left-4 px-4 py-2 bg-gradient-to-r from-cyan-400 to-blue-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm border border-white/20">
                                        ✨ Featured
                                    </div>
                                    
                                    {/* Corner Accent */}
                                    <div className="absolute top-4 right-4 w-12 h-12 bg-gradient-to-br from-pink-400/20 to-purple-500/20 rounded-full backdrop-blur-sm border border-white/20 flex items-center justify-center">
                                        <div className="w-3 h-3 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Enhanced Content Section - Flexible Height */}
                                <div className="p-8 flex-1 flex flex-col">
                                    <h2 className="text-2xl md:text-3xl font-bold mb-4 leading-tight group-hover:bg-gradient-to-r group-hover:from-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                                        {c.topic}
                                    </h2>
                                    <p className="text-slate-600 leading-relaxed mb-6 text-lg line-clamp-4 flex-1">
                                        {c.description}
                                    </p>
                                    
                                    {/* Enhanced Metadata */}
                                    <div className="flex items-center space-x-6 mb-6 text-sm">
                                        <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-cyan-50 to-blue-50 rounded-full border border-cyan-100">
                                            <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
                                            <span className="text-cyan-700 font-medium">5 min read</span>
                                        </div>
                                        <div className="flex items-center space-x-2 px-3 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-100">
                                            <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full"></div>
                                            <span className="text-purple-700 font-medium">Tech</span>
                                        </div>
                                    </div>
                                </div>

                                {/* Enhanced Action Bar - Fixed Position at Bottom */}
                                <div className="px-8 pb-8 flex-shrink-0">
                                    <div className="flex items-center justify-between p-6 bg-gradient-to-r from-slate-50/80 to-blue-50/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-inner">
                                        {/* Like Component */}
                                        <div className="flex items-center space-x-4">
                                            <Like />
                                        </div>

                                        {/* Enhanced Read More Button */}
                                        <Link to={`/post/${c.slug}`} className="group/btn">
                                            <button className="relative px-8 py-4 font-bold text-white bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-orange-600 transform hover:scale-110 hover:rotate-1 transition-all duration-500 shadow-2xl hover:shadow-pink-500/50">
                                                <span className="relative z-10 flex items-center space-x-3">
                                                    <span>Read More</span>
                                                    <svg className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </span>
                                                {/* Enhanced Button Shine Effect */}
                                                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/30 to-transparent -skew-x-12 -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
                                                {/* Button Glow */}
                                                <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-500 rounded-2xl blur opacity-30 group-hover/btn:opacity-60 transition-opacity duration-300"></div>
                                            </button>
                                        </Link>
                                    </div>
                                </div>

                                {/* Enhanced Decorative Elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-cyan-400/10 via-purple-400/10 to-pink-400/10 rounded-full -translate-y-20 translate-x-20 group-hover:scale-150 group-hover:rotate-45 transition-all duration-700"></div>
                                <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-emerald-400/10 via-blue-400/10 to-purple-400/10 rounded-full translate-y-16 -translate-x-16 group-hover:scale-150 group-hover:-rotate-45 transition-all duration-700"></div>
                                
                                {/* Corner Sparkles */}
                                <div className="absolute top-6 left-6 w-1 h-1 bg-white rounded-full opacity-0 group-hover:opacity-100 animate-ping transition-opacity duration-300"></div>
                                <div className="absolute bottom-6 right-6 w-1 h-1 bg-cyan-300 rounded-full opacity-0 group-hover:opacity-100 animate-ping animation-delay-500 transition-opacity duration-300"></div>
                            </article>
                        ))}
                    </div>

                    {/* Enhanced Load More Section */}
                    <div className="text-center mt-20">
                        <button className="group relative px-12 py-6 font-bold text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl hover:from-indigo-700 hover:via-purple-700 hover:to-pink-700 transform hover:scale-105 transition-all duration-500 shadow-2xl hover:shadow-purple-500/50">
                            <span className="relative z-10 flex items-center space-x-3">
                                <span>Load More Articles</span>
                                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                            </span>
                            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 rounded-2xl blur opacity-40 group-hover:opacity-70 transition-opacity duration-300"></div>
                        </button>
                    </div>
                </div>
            </div>

            <style>{`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(5deg); }
                }
                
                @keyframes float-delayed {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-40px) rotate(-5deg); }
                }
                
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(3deg); }
                }
                
                @keyframes bounce-slow {
                    0%, 100% { transform: translateY(0px) scale(1); }
                    50% { transform: translateY(-25px) scale(1.1); }
                }
                
                @keyframes blob {
                    0% { transform: translate(0px, 0px) scale(1) rotate(0deg); }
                    33% { transform: translate(40px, -60px) scale(1.2) rotate(120deg); }
                    66% { transform: translate(-30px, 30px) scale(0.8) rotate(240deg); }
                    100% { transform: translate(0px, 0px) scale(1) rotate(360deg); }
                }
                
                .animate-float {
                    animation: float 8s ease-in-out infinite;
                }
                
                .line-clamp-4 {
                    display: -webkit-box;
                    -webkit-line-clamp: 4;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
                
                .animate-float-delayed {
                    animation: float-delayed 10s ease-in-out infinite;
                }
                
                .animate-float-slow {
                    animation: float-slow 12s ease-in-out infinite;
                }
                
                .animate-bounce-slow {
                    animation: bounce-slow 6s ease-in-out infinite;
                }
                
                .animate-blob {
                    animation: blob 15s infinite;
                }
                
                .animation-delay-1000 { animation-delay: 1s; }
                .animation-delay-2000 { animation-delay: 2s; }
                .animation-delay-3000 { animation-delay: 3s; }
                .animation-delay-4000 { animation-delay: 4s; }
                .animation-delay-500 { animation-delay: 0.5s; }
                
                .bg-grid-pattern {
                    background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.3) 1px, transparent 0);
                    background-size: 40px 40px;
                }
            `}</style>
        </div>
    );
};

export default Card;