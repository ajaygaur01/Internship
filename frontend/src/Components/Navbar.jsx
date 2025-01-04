
import { Link } from 'react-router-dom';
import { PlusCircle, User } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <h1 className="text-2xl font-bold text-gray-900">BlogSpace</h1>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="flex space-x-4">
            <Link 
              to="/create"
              className="inline-flex items-center px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700 transition-colors"
            >
              <PlusCircle className="w-5 h-5 mr-2" />
              Create Article
            </Link>
            
            <Link 
              to="/chat"
              className="inline-flex items-center px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <User className="w-5 h-5 mr-2" />
              AI asistant
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;