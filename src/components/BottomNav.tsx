import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Users, Sprout, MessageSquare, Wallet } from 'lucide-react';

const BottomNav: React.FC = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', icon: Home, label: '홈' },
    { path: '/senior/dashboard', icon: Users, label: '시니어' },
    { path: '/youth/dashboard', icon: Sprout, label: '청년' },
    { path: '/community', icon: MessageSquare, label: '커뮤니티' },
    { path: '/finance', icon: Wallet, label: '금융' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40">
      <div className="flex justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
                isActive ? 'text-[#008350]' : 'text-gray-500'
              }`}
            >
              <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
};

export default BottomNav;