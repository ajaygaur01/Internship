import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, User, Mail, Lock, BookOpen, Sparkles, CheckCircle } from 'lucide-react';

const Register = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:8000/auth/signup', formData);
      localStorage.setItem('token', res.data.token);
      navigate('/home');
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setError(msg);
    }
  };

  // Additional UI state (doesn't affect original logic)
  const [showPassword, setShowPassword] = useState(false);
  const [focusedField, setFocusedField] = useState('');

  const getPasswordStrength = (password) => {
    if (password.length < 6) return { strength: 'weak', color: 'bg-red-500', text: 'Weak' };
    if (password.length < 10) return { strength: 'medium', color: 'bg-yellow-500', text: 'Medium' };
    return { strength: 'strong', color: 'bg-green-500', text: 'Strong' };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-pulse animation-delay-4000"></div>
      </div>

      {/* Floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full opacity-10 animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 3}s`
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 w-full max-w-md">
        {/* Main card */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 relative overflow-hidden">
          {/* Glass effect overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent rounded-3xl"></div>
          
          <div className="relative z-10">
            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-4 shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-white mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">Register</h2>
              <p className="text-purple-200 text-sm flex items-center justify-center gap-1">
                <Sparkles className="w-4 h-4" />
                Join our article community
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username field */}
              <div className="relative">
                <div className={`relative rounded-2xl transition-all duration-300 ${
                  focusedField === 'username' 
                    ? 'bg-white/20 shadow-lg shadow-purple-500/25' 
                    : 'bg-white/10 hover:bg-white/15'
                }`}>
                  <User className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'username' ? 'text-purple-300' : 'text-purple-400'
                  }`} />
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    required
                    value={formData.username}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('username')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-transparent rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Email field */}
              <div className="relative">
                <div className={`relative rounded-2xl transition-all duration-300 ${
                  focusedField === 'email' 
                    ? 'bg-white/20 shadow-lg shadow-purple-500/25' 
                    : 'bg-white/10 hover:bg-white/15'
                }`}>
                  <Mail className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'email' ? 'text-purple-300' : 'text-purple-400'
                  }`} />
                  <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-4 py-4 bg-transparent border-2 border-transparent rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="relative">
                <div className={`relative rounded-2xl transition-all duration-300 ${
                  focusedField === 'password' 
                    ? 'bg-white/20 shadow-lg shadow-purple-500/25' 
                    : 'bg-white/10 hover:bg-white/15'
                }`}>
                  <Lock className={`absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors ${
                    focusedField === 'password' ? 'text-purple-300' : 'text-purple-400'
                  }`} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    onFocus={() => setFocusedField('password')}
                    onBlur={() => setFocusedField('')}
                    className="w-full pl-12 pr-12 py-4 bg-transparent border-2 border-transparent rounded-2xl text-white placeholder-purple-300 focus:outline-none focus:border-purple-400 transition-all duration-300"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-purple-400 hover:text-purple-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                
                {/* Password strength indicator */}
                {formData.password && (
                  <div className="mt-2 px-1">
                    <div className="flex items-center gap-2 mb-1">
                      <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${passwordStrength.color} transition-all duration-300`}
                          style={{ width: passwordStrength.strength === 'weak' ? '33%' : passwordStrength.strength === 'medium' ? '66%' : '100%' }}
                        ></div>
                      </div>
                      <span className={`text-xs ${passwordStrength.strength === 'weak' ? 'text-red-400' : passwordStrength.strength === 'medium' ? 'text-yellow-400' : 'text-green-400'}`}>
                        {passwordStrength.text}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="group relative w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white py-4 rounded-2xl font-semibold transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-[1.02] active:scale-[0.98]"
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  Register
                </div>
                <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>

            {/* Show error message */}
            {error && (
              <div className="mt-6 p-4 bg-red-500/20 border border-red-500/30 rounded-2xl backdrop-blur-sm">
                <p className="text-red-200 text-center text-sm font-medium">{error}</p>
              </div>
            )}

            {/* Already have an account button */}
            <div className="mt-8 text-center">
              <p className="text-purple-200 text-sm mb-3">Already have an account?</p>
              <Link
                to="/login"
                className="group inline-flex items-center gap-2 text-white font-medium bg-white/10 hover:bg-white/20 px-6 py-3 rounded-xl transition-all duration-300 border border-white/20 hover:border-white/30 backdrop-blur-sm"
              >
                <span>Login here</span>
                <div className="w-5 h-5 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center transition-transform group-hover:scale-110">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              </Link>
            </div>

            {/* Features section */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-1">📚</div>
                  <p className="text-purple-200 text-xs">Premium Articles</p>
                </div>
                <div className="p-3 bg-white/5 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl mb-1">🎯</div>
                  <p className="text-purple-200 text-xs">Personalized Feed</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Additional decorative elements */}
        <div className="absolute -top-4 -right-4 w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full opacity-60 blur-sm"></div>
        <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-40 blur-sm"></div>
      </div>
    </div>
  );
};

export default Register;