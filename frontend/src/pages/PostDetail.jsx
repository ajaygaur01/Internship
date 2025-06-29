import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ArrowLeft, Clock, User, Share2, Bookmark, Eye, ThumbsUp, Heart, MessageCircle, Sparkles } from "lucide-react";

const PostDetail = () => {
  const { slug } = useParams(); // ✅ Use slug, not id
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/post/${slug}`);
        setPost(response.data);
      } catch (error) {
        console.error("Error fetching post details:", error);
      }
    };

    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex justify-center items-center relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0">
          <div className="absolute top-20 left-20 w-72 h-72 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-r from-pink-400/20 to-violet-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-cyan-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
        
        <div className="text-center relative z-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-lg rounded-3xl shadow-2xl mb-6 animate-pulse border border-white/20">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-spin"></div>
          </div>
          <div className="text-2xl font-bold text-white mb-3 bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent">Loading Article...</div>
          <div className="text-white/70 text-lg">Preparing something amazing for you</div>
        </div>
      </div>
    );
  }
  console.log("Post details:", post);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Enhanced Background with animated elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        {/* Primary gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 via-purple-900/30 to-pink-900/50"></div>
        
        {/* Animated floating elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-10 w-6 h-6 bg-gradient-to-r from-blue-400/30 to-cyan-400/30 rounded-full animate-ping"></div>
          <div className="absolute top-1/3 right-20 w-4 h-4 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full animate-ping" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-1/4 left-1/3 w-5 h-5 bg-gradient-to-r from-indigo-400/30 to-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-1/3 right-1/3 w-3 h-3 bg-gradient-to-r from-pink-400/30 to-rose-400/30 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
          <div className="absolute top-1/2 left-1/4 w-4 h-4 bg-gradient-to-r from-cyan-400/30 to-blue-400/30 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute top-3/4 right-1/4 w-5 h-5 bg-gradient-to-r from-violet-400/30 to-purple-400/30 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
        </div>

        {/* Large decorative blurs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 w-72 h-72 bg-gradient-to-r from-indigo-500/10 to-violet-500/10 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2"></div>
      </div>

      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-16 relative z-10">
        {/* Enhanced Article Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-full px-6 py-3 border border-white/10 mb-8 shadow-2xl">
            <Sparkles className="w-5 h-5 text-blue-300" />
            <span className="bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-transparent text-sm font-semibold tracking-wide">FEATURED ARTICLE</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent mb-8 leading-tight tracking-tight">
            {post.topic}
          </h1>

          <div className="flex items-center justify-center flex-wrap gap-6 text-white/80 mb-12">
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
              <User className="w-5 h-5 text-blue-300" />
              <span className="font-medium">Editorial Team</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
              <Clock className="w-5 h-5 text-purple-300" />
              <span>8 min read</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/5 backdrop-blur-sm rounded-full px-4 py-2">
              <Eye className="w-5 h-5 text-pink-300" />
              <span>2.4k views</span>
            </div>
          </div>
        </div>

        {/* Enhanced Article Image */}
        <div className="mb-16">
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border border-white/10">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 z-10"></div>
            <img
              src={post.photo}
              alt={post.topic}
              className="w-full h-[600px] object-cover transform hover:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-20"></div>
            
            {/* Floating engagement stats */}
            <div className="absolute top-6 right-6 flex space-x-3 z-30">
              <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center space-x-2 text-white">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm font-medium">142</span>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-xl rounded-full px-4 py-2 border border-white/20">
                <div className="flex items-center space-x-2 text-white">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium">28</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Main Content */}
        <div className="bg-white/5 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/10 mb-16">
          {/* Enhanced Article Actions Bar */}
          <div className="border-b border-white/10 px-8 py-6 bg-gradient-to-r from-white/5 to-white/10">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center space-x-4">
                <div className="text-sm text-white/70 font-medium">Share this article:</div>
                <div className="flex items-center space-x-3">
                  <button className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg">
                    <span className="text-sm font-bold">f</span>
                  </button>
                  <button className="w-10 h-10 bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-600 hover:to-sky-700 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg">
                    <span className="text-sm font-bold">t</span>
                  </button>
                  <button className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-full flex items-center justify-center transition-all duration-200 transform hover:scale-110 shadow-lg">
                    <span className="text-sm font-bold">in</span>
                  </button>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <button className="flex items-center space-x-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-xl transition-all duration-200 text-white border border-white/10 hover:border-white/20">
                  <Bookmark className="w-4 h-4" />
                  <span className="text-sm font-medium">Save</span>
                </button>
                <button className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30 backdrop-blur-sm text-white rounded-xl transition-all duration-200 border border-blue-400/20">
                  <Share2 className="w-4 h-4" />
                  <span className="text-sm font-medium">Share</span>
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Article Body */}
          <div className="px-8 py-16">
            <div className="prose prose-xl prose-invert max-w-none">
              <div className="text-xl leading-relaxed text-white/90 font-light whitespace-pre-line tracking-wide">
                {post.description}
              </div>
            </div>
          </div>

          {/* Enhanced Article Footer */}
          <div className="border-t border-white/10 px-8 py-10 bg-gradient-to-r from-white/5 to-white/10">
            <div className="flex items-center justify-center">
              <div className="text-center">
                <div className="text-sm text-white/70 mb-6 font-medium">Was this article helpful?</div>
                <div className="flex items-center justify-center space-x-4">
                  <button className="px-8 py-4 bg-gradient-to-r from-green-500/20 to-emerald-500/20 hover:from-green-500/30 hover:to-emerald-500/30 text-green-300 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 border border-green-400/20 backdrop-blur-sm transform hover:scale-105">
                    <ThumbsUp className="w-4 h-4" />
                    <span>Yes, helpful</span>
                  </button>
                  <button className="px-8 py-4 bg-gradient-to-r from-red-500/20 to-pink-500/20 hover:from-red-500/30 hover:to-pink-500/30 text-red-300 rounded-xl text-sm font-medium transition-all duration-200 flex items-center space-x-3 border border-red-400/20 backdrop-blur-sm transform hover:scale-105">
                    <span>👎</span>
                    <span>Not helpful</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Newsletter Signup */}
        <div className="bg-gradient-to-r from-blue-600/90 via-purple-600/90 to-pink-600/90 backdrop-blur-xl rounded-3xl p-12 text-white text-center mb-16 border border-white/10 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20"></div>
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="absolute top-4 right-12 w-2 h-2 bg-white/30 rounded-full animate-pulse"></div>
            <div className="absolute bottom-8 left-16 w-3 h-3 bg-white/20 rounded-full animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white/25 rounded-full animate-pulse" style={{ animationDelay: '2s' }}></div>
          </div>
          
          <div className="relative z-10">
            <div className="inline-flex items-center space-x-2 mb-4">
              <Sparkles className="w-6 h-6 text-yellow-300" />
              <h3 className="text-3xl font-bold">Stay Updated</h3>
              <Sparkles className="w-6 h-6 text-yellow-300" />
            </div>
            <p className="text-white/80 mb-8 text-lg">Get the latest articles delivered straight to your inbox.</p>
            <div className="max-w-lg mx-auto flex space-x-4">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 rounded-xl text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white/50 bg-white/95 backdrop-blur-sm font-medium"
              />
              <button className="bg-white text-purple-600 font-bold px-8 py-4 rounded-xl hover:bg-gray-50 transition-all duration-200 transform hover:scale-105 shadow-lg">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Back Button - Fixed Position */}
      <div className="fixed bottom-8 left-8 z-50">
        <button
          onClick={() => window.history.back()}
          className="group flex items-center space-x-3 bg-white/10 hover:bg-white/20 backdrop-blur-xl text-white px-8 py-5 rounded-2xl shadow-2xl border border-white/20 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
        >
          <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
          <span className="font-semibold">Go Back</span>
        </button>
      </div>
    </div>
  );
};

export default PostDetail;