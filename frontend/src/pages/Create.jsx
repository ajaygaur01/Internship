import { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Camera, Eye, FileText, User, Link, Image, Sparkles, CheckCircle, XCircle, Star, BookOpen, PenTool, Zap, TrendingUp, Heart } from "lucide-react";

const CreatePost = () => {
  const token = localStorage.getItem("token");

  let userId = "";
  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId = decoded.id; // or decoded._id based on your backend
    } catch (err) {
      console.error("Invalid token:", err);
    }
  }

  const [formData, setFormData] = useState({
    author: "",
    topic: "",
    slug: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [message, setMessage] = useState("");
  const [showPreview, setShowPreview] = useState(false);
  //const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  useEffect(() => {
    const generateSlug = (text) =>
      text.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    if (!formData.slug && formData.topic) {
      setFormData((prev) => ({
        ...prev,
        slug: generateSlug(prev.topic),
      }));
    }
  }, [formData.topic, formData.slug]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("author", formData.author);
    formDataToSend.append("topic", formData.topic);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("slug", formData.slug);
    formDataToSend.append("photo", image);
    formDataToSend.append("userId", userId); // ✅ Add userId

    try {
      const res = await axios.post("https://internship-angj.onrender.com/post/create", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setMessage(`✅ Post created! View at /articles/${res.data.slug}`);
      setFormData({ author: "", topic: "", slug: "", description: "" });
      setImage(null);
      setImagePreview(null);
    } catch (err) {
      console.error(err);
      setMessage("❌ Failed to create post. Please try again.");
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-violet-900 via-purple-900 to-indigo-900">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_50%,rgba(120,119,198,0.3),transparent)] animate-pulse"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,119,198,0.2),transparent)] animate-pulse delay-1000"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_40%_80%,rgba(139,92,246,0.3),transparent)] animate-pulse delay-2000"></div>
      </div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full opacity-20 animate-bounce delay-300"></div>
      <div className="absolute top-40 right-20 w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full opacity-20 animate-bounce delay-700"></div>
      <div className="absolute bottom-40 left-20 w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full opacity-20 animate-bounce delay-1000"></div>
      <div className="absolute bottom-20 right-40 w-24 h-24 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full opacity-20 animate-bounce delay-500"></div>

      <div className="relative z-10 py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Enhanced Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-3xl mb-8 shadow-2xl animate-pulse">
              <PenTool className="w-12 h-12 text-white" />
            </div>
            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
              <span className="bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent">
                Create Epic
              </span>
              <br />
              <span className="bg-gradient-to-r from-yellow-300 via-pink-300 to-purple-300 bg-clip-text text-transparent">
                Articles
              </span>
            </h1>
            <p className="text-xl text-purple-100 max-w-3xl mx-auto leading-relaxed">
              Transform your ideas into captivating stories that inspire, educate, and engage readers worldwide
            </p>
          </div>

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-3">
              <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 overflow-hidden hover:shadow-3xl transition-all duration-500">
                <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 p-8 relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                  <h2 className="text-3xl font-bold text-white flex items-center gap-4">
                    <BookOpen className="w-8 h-8" />
                    Article Studio
                  </h2>
                  <p className="text-purple-100 mt-2">Where great content comes to life</p>
                </div>
                
                <div className="p-10">
                  {message && (
                    <div className={`mb-8 p-6 rounded-2xl border-2 flex items-center gap-4 transform transition-all duration-300 hover:scale-105 ${
                      message.startsWith("✅") 
                        ? "bg-emerald-500/20 border-emerald-400 text-emerald-100 shadow-lg shadow-emerald-500/25" 
                        : "bg-red-500/20 border-red-400 text-red-100 shadow-lg shadow-red-500/25"
                    }`}>
                      {message.startsWith("✅") ? 
                        <CheckCircle className="w-6 h-6 text-emerald-400" /> : 
                        <XCircle className="w-6 h-6 text-red-400" />
                      }
                      <span className="font-semibold text-lg">{message}</span>
                    </div>
                  )}

                  <div className="space-y-10">
                    {/* Author Field */}
                    <div className="group transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
                          <User className="w-5 h-5 text-white" />
                        </div>
                        Author Name
                      </label>
                      <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleChange}
                        required
                        className="w-full px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-purple-200 text-lg font-medium hover:bg-white/15"
                        placeholder="Your creative name"
                      />
                    </div>

                    {/* Topic Field */}
                    <div className="group transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-rose-500 rounded-lg flex items-center justify-center">
                          <Star className="w-5 h-5 text-white" />
                        </div>
                        Article Title
                      </label>
                      <input
                        type="text"
                        name="topic"
                        value={formData.topic}
                        onChange={handleChange}
                        required
                        className="w-full px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-purple-200 text-lg font-medium hover:bg-white/15"
                        placeholder="An irresistible headline"
                      />
                    </div>

                    {/* Slug Field */}
                    <div className="group transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-emerald-500 rounded-lg flex items-center justify-center">
                          <Link className="w-5 h-5 text-white" />
                        </div>
                        URL Magic
                        <span className="text-sm text-purple-200 font-normal">(auto-crafted)</span>
                      </label>
                      <div className="relative">
                        <input
                          type="text"
                          name="slug"
                          value={formData.slug}
                          onChange={handleChange}
                          className="w-full px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 text-white placeholder-purple-200 text-lg font-medium hover:bg-white/15"
                          placeholder="perfect-article-slug"
                        />
                        <div className="absolute inset-y-0 right-0 flex items-center pr-6">
                          <span className="text-sm text-purple-200 bg-white/10 px-4 py-2 rounded-xl backdrop-blur-sm">
                            /articles/{formData.slug || 'your-slug'}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Image Upload */}
                    <div className="group transform transition-all duration-300 hover:scale-[1.02]">
                      <label className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg flex items-center justify-center">
                          <Image className="w-5 h-5 text-white" />
                        </div>
                        Hero Image
                      </label>
                      <div className="relative">
                        <input
                          type="file"
                          name="photo"
                          accept="image/*"
                          onChange={handleImageChange}
                          required
                          className="hidden"
                          id="image-upload"
                        />
                        <label
                          htmlFor="image-upload"
                          className="w-full h-40 border-3 border-dashed border-purple-300/50 rounded-3xl flex flex-col items-center justify-center cursor-pointer hover:border-purple-400 hover:bg-white/10 transition-all duration-500 group backdrop-blur-sm transform hover:scale-105"
                        >
                          <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-4 group-hover:animate-bounce">
                            <Camera className="w-8 h-8 text-white" />
                          </div>
                          <span className="text-lg font-bold text-white group-hover:text-purple-200 mb-2">
                            Drop your stunning image here
                          </span>
                          <span className="text-sm text-purple-200">PNG, JPG, GIF up to 10MB</span>
                        </label>
                        
                        {imagePreview && (
                          <div className="mt-6 relative inline-block w-full">
                            <img
                              src={imagePreview}
                              alt="Preview"
                              className="w-full h-64 object-cover rounded-3xl shadow-2xl border-4 border-white/20"
                            />
                            <div className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full p-3 shadow-lg animate-pulse">
                              <CheckCircle className="w-6 h-6 text-white" />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Description Field */}
                    <div className="group transform transition-all duration-300 hover:scale-[1.01]">
                      <label className="text-lg font-bold text-white mb-4 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-lg flex items-center justify-center">
                          <FileText className="w-5 h-5 text-white" />
                        </div>
                        Your Masterpiece
                      </label>
                      <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows="16"
                        required
                        className="w-full px-8 py-6 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-3xl focus:outline-none focus:border-purple-400 focus:bg-white/20 transition-all duration-300 resize-none text-white placeholder-purple-200 leading-relaxed text-lg font-medium hover:bg-white/15"
                        placeholder="Begin your story... Paint with words, create magic with sentences, and build worlds with paragraphs. Your readers are waiting for something extraordinary."
                      />
                      <div className="mt-4 flex justify-between items-center bg-white/5 rounded-2xl p-4 backdrop-blur-sm">
                        <div className="flex items-center gap-6">
                          <span className="text-sm text-purple-200 flex items-center gap-2">
                            <Zap className="w-4 h-4" />
                            {formData.description.length} characters
                          </span>
                          <span className="text-sm text-purple-200 flex items-center gap-2">
                            <TrendingUp className="w-4 h-4" />
                            {formData.description.split(' ').filter(word => word.length > 0).length} words
                          </span>
                        </div>
                        <span className="text-sm text-purple-200 flex items-center gap-2">
                          <Heart className="w-4 h-4" />
                          ~{Math.max(1, Math.ceil(formData.description.split(' ').filter(word => word.length > 0).length / 200))} min read
                        </span>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-6 pt-8">
                      <button
                        type="button"
                        onClick={() => setShowPreview(true)}
                        className="flex-1 bg-gradient-to-r from-slate-600 via-slate-700 to-slate-800 text-white py-6 px-8 rounded-2xl hover:from-slate-700 hover:via-slate-800 hover:to-slate-900 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-white/20"
                      >
                        <Eye className="w-6 h-6" />
                        Preview Magic
                      </button>

                      <button
                        type="submit"
                        onClick={handleSubmit}
                        className="flex-1 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white py-6 px-8 rounded-2xl hover:from-purple-700 hover:via-pink-700 hover:to-indigo-700 transition-all duration-300 font-bold text-lg flex items-center justify-center gap-3 shadow-2xl hover:shadow-3xl transform hover:scale-105 border border-white/20 relative overflow-hidden"
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent animate-shimmer"></div>
                        <Sparkles className="w-6 h-6" />
                        Publish Masterpiece
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Sidebar */}
            <div className="space-y-8">
              {/* Writing Tips */}
              <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-3xl border border-white/20 p-8 transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  Pro Tips
                </h3>
                <ul className="space-y-4 text-purple-100">
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="w-3 h-3 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">Hook readers with a compelling opening line</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">Use short paragraphs for mobile readers</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">Add personal stories and examples</span>
                  </li>
                  <li className="flex items-start gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                    <div className="w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm leading-relaxed">End with a powerful call-to-action</span>
                  </li>
                </ul>
              </div>

              {/* Progress Indicator */}
              <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 backdrop-blur-xl border border-purple-300/30 rounded-3xl p-8 transform hover:scale-105 transition-all duration-300">
                <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  Progress
                </h3>
                <div className="space-y-4">
                  {[
                    { label: 'Author', completed: !!formData.author, icon: User },
                    { label: 'Title', completed: !!formData.topic, icon: Star },
                    { label: 'Image', completed: !!imagePreview, icon: Image },
                    { label: 'Content', completed: formData.description.length > 50, icon: FileText }
                  ].map((item, index) => {
                    const Icon = item.icon;
                    return (
                      <div key={index} className="flex items-center gap-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all duration-200">
                        <div className={`w-8 h-8 rounded-xl flex items-center justify-center transition-all duration-300 ${
                          item.completed 
                            ? 'bg-gradient-to-r from-green-500 to-emerald-500 shadow-lg' 
                            : 'bg-white/20'
                        }`}>
                          <Icon className={`w-4 h-4 ${item.completed ? 'text-white' : 'text-purple-300'}`} />
                        </div>
                        <span className={`font-medium ${
                          item.completed ? 'text-green-300' : 'text-purple-200'
                        }`}>
                          {item.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
                
                {/* Progress Bar */}
                <div className="mt-6">
                  <div className="flex justify-between text-sm text-purple-200 mb-2">
                    <span>Completion</span>
                    <span>{Math.round(([formData.author, formData.topic, imagePreview, formData.description.length > 50].filter(Boolean).length / 4) * 100)}%</span>
                  </div>
                  <div className="w-full bg-white/10 rounded-full h-3">
                    <div 
                      className="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500 shadow-lg"
                      style={{ width: `${([formData.author, formData.topic, imagePreview, formData.description.length > 50].filter(Boolean).length / 4) * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Modal Preview */}
      {showPreview && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-6">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-6xl max-h-[95vh] overflow-hidden border-4 border-purple-500/20">
            {/* Modal Header */}
            <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 sticky top-0 z-10">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center">
                    <Eye className="w-7 h-7 text-white" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">Live Preview</h2>
                    <p className="text-white/80">Your article as readers will see it</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowPreview(false)}
                  className="text-white/70 hover:text-white hover:bg-white/20 text-2xl w-12 h-12 flex items-center justify-center rounded-2xl transition-all duration-200 font-bold"
                >
                  ×
                </button>
              </div>
            </div>
            
            {/* Modal Content */}
            <div className="bg-gray-50 overflow-hidden flex-1">
              <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-t-3xl mt-6 min-h-[calc(95vh-160px)]">
                <div className="overflow-y-auto max-h-[calc(95vh-160px)] custom-scrollbar">
                  <article className="p-12">
                    {/* Featured Image */}
                    {imagePreview && (
                      <div className="mb-10 -mx-8">
                        <img
                          src={imagePreview}
                          alt="Article Preview"
                          className="w-full h-80 md:h-96 object-cover shadow-2xl rounded-3xl"
                        />
                      </div>
                    )}
                    
                    {/* Article Title */}
                    <header className="mb-10">
                      <h1 className="text-4xl md:text-6xl font-black text-gray-900 mb-8 leading-tight break-words">
                        {formData.topic || "Your Incredible Article Title Goes Here"}
                      </h1>
                      
                      {/* Article Meta */}
                      <div className="flex flex-wrap items-center gap-8 text-gray-600 pb-8 border-b-2 border-gray-200">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-bold text-gray-800 text-lg">
                            {formData.author || "Author Name"}
                          </span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="font-medium">{new Date().toLocaleDateString('en-US', { 
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric' 
                          })}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="font-medium">
                            {Math.max(1, Math.ceil(formData.description.split(' ').filter(word => word.length > 0).length / 200))} min read
                          </span>
                        </div>
                      </div>
                    </header>
                    
                    {/* Article Content */}
                    <div className="prose prose-xl max-w-none">
                      <div className="text-gray-800 leading-relaxed space-y-8">
                        {formData.description ? 
                          formData.description.split('\n').map((paragraph, index) => (
                            <p key={index} className="text-xl leading-9 break-words">
                              {paragraph.trim() || <br />}
                            </p>
                          )) : 
                          <div className="text-center py-16">
                            <div className="w-20 h-20 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                              <FileText className="w-10 h-10 text-purple-400" />
                            </div>
                            <p className="text-gray-400 italic text-xl mb-4">
                              Your masterpiece will appear here...
                            </p>
                            <p className="text-gray-400 text-lg">
                              Start writing to see the magic happen!
                            </p>
                          </div>
                        }
                      </div>
                    </div>
                    
                    {/* Article Footer */}
                    {formData.description && (
                      <footer className="mt-16 pt-10 border-t-2 border-gray-200">
                        <div className="flex items-center justify-between bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-2xl">
                          <div className="text-gray-600 font-medium">
                            Published on {new Date().toLocaleDateString()}
                          </div>
                          <div className="flex items-center gap-4 text-gray-600">
                            <span className="font-medium">{formData.description.length} characters</span>
                            <span>•</span>
                            <span className="font-medium">{formData.description.split(' ').filter(word => word.length > 0).length} words</span>
                          </div>
                        </div>
                      </footer>
                    )}
                  </article>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      
       <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f5f9;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, #8b5cf6, #ec4899);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, #7c3aed, #db2777);
        }
        
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        
        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        
        .hover:shadow-3xl:hover {
          box-shadow: 0 35px 60px -12px rgba(0, 0, 0, 0.25);
        }
        
        .border-3 {
          border-width: 3px;
        }
      `}

      </style>
    </div>
  );
};  
export default CreatePost;