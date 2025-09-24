import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <header className="bg-white border-b border-gray-200 fixed w-full top-0 z-50">
        <div className="px-4">
          <div className="flex justify-between items-center h-14">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-[#008350] rounded-lg flex items-center justify-center text-white font-bold text-sm">
                NH
              </div>
              <span className="text-lg font-bold text-[#008350]">Land Bridge</span>
            </Link>
            
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </header>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-white z-40 pt-14">
          <nav className="flex flex-col">
            <Link 
              to="/" 
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            >
              홈
            </Link>
            <Link 
              to="/senior/dashboard" 
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            >
              시니어 농부
            </Link>
            <Link 
              to="/youth/dashboard" 
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            >
              청년 농부
            </Link>
            <Link 
              to="/community" 
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            >
              커뮤니티
            </Link>
            <Link 
              to="/finance" 
              onClick={() => setIsMenuOpen(false)}
              className="px-6 py-4 text-gray-700 border-b border-gray-100 hover:bg-gray-50"
            >
              금융상품
            </Link>
            <div className="p-6">
              <button className="w-full py-3 bg-[#008350] text-white rounded-lg font-semibold">
                로그인
              </button>
            </div>
          </nav>
        </div>
      )}
    </>
  );
};

export default Header;