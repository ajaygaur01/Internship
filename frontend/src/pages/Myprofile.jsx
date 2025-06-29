import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { User, Mail,Eye, ArrowRight, BookOpen, Star, Award, TrendingUp } from "lucide-react";

const UserPosts = () => {
  const { userId } = useParams();
  const [posts, setPosts] = useState([]);
  const [userInfo, setUserInfo] = useState({ name: "", email: "" });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserInfo({
          name: decoded.username || "User",
          email: decoded.email || "Not provided",
        });
      } catch (err) {
        console.error("Token decode failed:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get(`https://internship-angj.onrender.com/post/user/${userId}`);
        setPosts(res.data);
      } catch (err) {
        console.error("Failed to fetch posts:", err);
      }
    };

    fetchPosts();
  }, [userId]);

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900"></div>
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/20 via-transparent to-purple-900/20"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,119,198,0.1),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,rgba(147,51,234,0.1),transparent_50%)]"></div>
      </div>

      {/* Floating Particles */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-20 left-20 w-2 h-2 bg-blue-400/30 rounded-full animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
        <div className="absolute top-40 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
        <div className="absolute top-60 left-1/4 w-1.5 h-1.5 bg-pink-400/30 rounded-full animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
        <div className="absolute bottom-40 right-20 w-2 h-2 bg-indigo-400/30 rounded-full animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
        <div className="absolute bottom-60 left-32 w-1 h-1 bg-cyan-400/40 rounded-full animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '4.5s' }}></div>
      </div>

      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-violet-600/10 via-purple-600/10 to-fuchsia-600/10"></div>
        
        {/* Enhanced Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-20 -left-20 w-80 h-80 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute top-40 -right-10 w-60 h-60 bg-gradient-to-br from-pink-500/10 to-violet-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-20 left-1/3 w-40 h-40 bg-gradient-to-br from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
          <div className="text-center">
            {/* Enhanced Avatar */}
            <div className="relative inline-block mb-8">
              <div className="w-28 h-28 bg-gradient-to-br from-violet-500 to-purple-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-purple-500/25 border border-white/10 backdrop-blur-sm">
                <User className="w-14 h-14 text-white" />
              </div>
              <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-lg">
                <Award className="w-4 h-4 text-white" />
              </div>
            </div>

            {/* Enhanced Title */}
            <h1 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-purple-200 to-pink-200 mb-6 tracking-tight leading-tight">
              Articles by
            </h1>
            <h2 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-violet-300 via-purple-300 to-pink-300 mb-8 tracking-tight">
              {userInfo.name}
            </h2>

            {/* Enhanced User Info */}
            <div className="flex items-center justify-center space-x-3 mb-8">
              <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2 border border-white/10">
                <Mail className="w-5 h-5 text-purple-300" />
                <span className="text-lg font-medium text-purple-200">{userInfo.email}</span>
              </div>
            </div>

            {/* Enhanced Stats */}
            <div className="flex items-center justify-center space-x-8 text-white/90">
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{posts.length}</div>
                  <div className="text-sm text-purple-200">Articles</div>
                </div>
              </div>
              
              <div className="w-1 h-12 bg-gradient-to-b from-transparent via-white/20 to-transparent"></div>
              
              <div className="flex items-center space-x-3 bg-white/5 backdrop-blur-sm rounded-2xl px-6 py-3 border border-white/10">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">Pro</div>
                  <div className="text-sm text-purple-200">Author</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {posts.length === 0 ? (
          <div className="text-center py-24">
            <div className="inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-gray-700 to-gray-800 rounded-3xl mb-8 shadow-2xl border border-white/10">
              <BookOpen className="w-16 h-16 text-gray-300" />
            </div>
            <h3 className="text-3xl font-bold text-white mb-4">No Articles Found</h3>
            <p className="text-xl text-gray-300 max-w-md mx-auto leading-relaxed">
              This author hasn&#39;t published any articles yet. Check back later for new content.
            </p>
          </div>
        ) : (
          <>
            {/* Enhanced Section Header */}
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-purple-200 mb-6">
                Latest Articles
              </h2>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-12 h-1 bg-gradient-to-r from-transparent to-violet-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                <div className="w-4 h-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                <div className="w-8 h-1 bg-gradient-to-r from-pink-500 to-violet-500 rounded-full"></div>
                <div className="w-12 h-1 bg-gradient-to-r from-violet-500 to-transparent rounded-full"></div>
              </div>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover insightful articles and expert perspectives from our featured author
              </p>
            </div>

            {/* Enhanced Articles Grid */}
            <div className="grid gap-10 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post, index) => (
                <article
                  key={post._id}
                  className="group relative bg-gradient-to-br from-white/5 to-white/2 backdrop-blur-sm rounded-3xl overflow-hidden shadow-2xl hover:shadow-purple-500/25 transition-all duration-700 transform hover:-translate-y-3 border border-white/10 hover:border-purple-400/30"
                  style={{
                    animation: `fadeInUp 0.6s ease-out ${index * 150}ms both`,
                  }}
                >
                  {/* Premium Badge */}
                  <div className="absolute top-4 left-4 z-10 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full px-3 py-1 flex items-center space-x-1 shadow-lg">
                    <Star className="w-3 h-3 text-white" />
                    <span className="text-xs font-bold text-white">PREMIUM</span>
                  </div>

                  {/* Enhanced Image Container */}
                  <div className="relative overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900 group-hover:from-purple-900/20 group-hover:to-blue-900/20 transition-all duration-700">
                    <img
                      src={post.photo}
                      alt={post.topic}
                      className="w-full h-72 object-cover transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 via-transparent to-blue-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                    
                    {/* Enhanced Read Time Badge */}
                    <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm rounded-2xl px-4 py-2 flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-2 group-hover:translate-y-0">
                      <Eye className="w-4 h-4 text-purple-300" />
                      <span className="text-sm font-semibold text-white">5 min read</span>
                    </div>
                  </div>

                  {/* Enhanced Content */}
                  <div className="p-8">
                    <div className="flex items-center space-x-3 mb-5">
                      <div className="w-3 h-3 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full animate-pulse"></div>
                      <span className="text-sm font-bold text-purple-300 uppercase tracking-wider">
                        Featured Article
                      </span>
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-4 line-clamp-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-300 group-hover:to-pink-300 transition-all duration-300 leading-tight">
                      {post.topic}
                    </h3>

                    <p className="text-gray-300 leading-relaxed mb-8 line-clamp-3 text-lg">
                      {post.description}
                    </p>

                    {/* Enhanced Read More Button */}
                    <a
                      href={`/post/${post.slug}`}
                      className="group/button inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-6 py-3 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover/button:translate-x-2" />
                    </a>
                  </div>

                  {/* Enhanced Bottom Gradient */}
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-purple-500 to-pink-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-700 origin-left"></div>
                  
                  {/* Glow Effect */}
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-violet-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
                </article>
              ))}
            </div>

            {/* Enhanced Load More Section */}
            {posts.length > 6 && (
              <div className="text-center mt-20">
                <button className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-violet-600 via-purple-600 to-pink-600 text-white px-12 py-5 rounded-3xl font-bold text-lg hover:from-violet-500 hover:via-purple-500 hover:to-pink-500 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/30 border border-white/10">
                  <span>Load More Articles</span>
                  <ArrowRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-2" />
                  <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {/* Custom Keyframes */}
      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default UserPosts;