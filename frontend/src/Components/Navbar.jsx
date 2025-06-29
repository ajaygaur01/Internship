import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { PlusCircle, User, Search, Sparkles, BookOpen } from 'lucide-react';
import { jwtDecode } from "jwt-decode";
import axios from "axios";

const Navbar = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  let userId;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }

  // Debounce + fetch suggestions
  useEffect(() => {
    if (!query.trim()) return setSuggestions([]);

    const timeout = setTimeout(async () => {
      try {
        const res = await axios.get(`http://localhost:8000/look/search?query=${query}`);
        setSuggestions(res.data);
        setShowDropdown(true);
      } catch (err) {
        console.error("Search error:", err);
      }
    }, 300);

    return () => clearTimeout(timeout);
  }, [query]);

  // Hide dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Navbar */}
      <nav className="relative bg-white/80 backdrop-blur-xl border-b border-white/20 shadow-2xl">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-4 -left-4 w-24 h-24 bg-gradient-to-r from-blue-400/10 to-purple-400/10 rounded-full blur-2xl animate-pulse"></div>
          <div className="absolute -top-2 right-10 w-16 h-16 bg-gradient-to-r from-cyan-400/10 to-blue-400/10 rounded-full blur-xl animate-pulse animation-delay-1000"></div>
          <div className="absolute top-0 left-1/2 w-32 h-8 bg-gradient-to-r from-purple-400/5 to-pink-400/5 rounded-full blur-xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* Logo */}
            <div className="flex-shrink-0 group">
              <Link to="/" className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-500/25 transition-all duration-300 group-hover:scale-110">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full animate-ping opacity-75"></div>
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black bg-gradient-to-r from-slate-800 to-blue-800 bg-clip-text text-transparent">
                    BlogSpace
                  </span>
                  <span className="text-xs text-slate-500 -mt-1">Premium Articles</span>
                </div>
              </Link>
            </div>

            {/* Enhanced Search Input */}
            <div className="relative w-1/2 max-w-lg" ref={dropdownRef}>
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center">
                  <Search className="absolute left-4 w-5 h-5 text-slate-400 group-focus-within:text-blue-500 transition-colors duration-300" />
                  <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search amazing articles..."
                    className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-white/30 rounded-2xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all duration-300 text-slate-700 placeholder-slate-400 shadow-lg"
                    onFocus={() => setShowDropdown(true)}
                  />
                  <div className="absolute right-3 flex items-center space-x-1">
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">⌘</kbd>
                    <kbd className="px-2 py-1 text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 rounded">K</kbd>
                  </div>
                </div>
              </div>
              
              {showDropdown && suggestions.length > 0 && (
                <div className="absolute z-50 mt-2 w-full">
                  <div className="bg-white/90 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl overflow-hidden">
                    <div className="p-2">
                      <div className="text-xs font-semibold text-slate-500 px-3 py-2 uppercase tracking-wide">
                        Search Results
                      </div>
                      {suggestions.map((post) => (
                        <div
                          key={post._id}
                          onClick={() => {
                            navigate(`/post/${post.slug}`);
                            setQuery("");
                            setSuggestions([]);
                            setShowDropdown(false);
                          }}
                          className="group flex items-center px-3 py-3 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 cursor-pointer rounded-xl transition-all duration-200 border border-transparent hover:border-blue-100"
                        >
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform duration-200">
                            <span className="text-white text-sm font-bold">
                              {post.topic.charAt(0).toUpperCase()}
                            </span>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-slate-800 group-hover:text-blue-800 transition-colors">
                              {post.topic}
                            </div>
                            <div className="text-xs text-slate-500 truncate">
                              Click to read article
                            </div>
                          </div>
                          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                            <svg className="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Enhanced Action Buttons */}
            <div className="flex items-center space-x-3">
              {/* Create Article Button */}
              <Link
                to="/create"
                className="group relative inline-flex items-center px-6 py-3 font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <PlusCircle className="w-5 h-5" />
                  <span>Create</span>
                  <Sparkles className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </Link>

              {/* Profile Button */}
              <Link
                to={`/${userId}`}
                className="group relative inline-flex items-center px-6 py-3 font-semibold text-slate-700 bg-white/60 backdrop-blur-sm border border-white/30 rounded-2xl hover:bg-white/80 hover:border-blue-200 transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 to-purple-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="relative flex items-center space-x-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                  <span>Profile</span>
                </div>
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Border Gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
      </nav>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
};

export default Navbar;