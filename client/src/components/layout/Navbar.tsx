import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import {
  Bell,
  Search,
  User as UserIcon,
  LogOut,
  Settings,
  Briefcase,
  Compass,
  Sparkles,
  Menu,
  X,
} from 'lucide-react';

interface NavbarProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleSidebar, isSidebarOpen }) => {
  const { user, isAuthenticated, logout, loginAsDemo } = useAuth();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 w-full bg-white/90 backdrop-blur-md border-b border-slate-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left section: Logo & Sidebar Toggle */}
          <div className="flex items-center gap-3">
            {isAuthenticated && onToggleSidebar && (
              <button
                onClick={onToggleSidebar}
                className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors"
                aria-label="Toggle Navigation"
              >
                {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            )}
            <Logo size="md" />
          </div>

          {/* Center navigation for Public/Landing */}
          {!isAuthenticated && (
            <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
              <Link to="/courses" className="hover:text-indigo-600 transition-colors">
                Courses
              </Link>
              <Link to="/skills" className="hover:text-indigo-600 transition-colors">
                Skill DNA
              </Link>
              <Link to="/roadmap" className="hover:text-indigo-600 transition-colors">
                Roadmaps
              </Link>
              <Link to="/arena" className="hover:text-indigo-600 transition-colors">
                Code Arena
              </Link>
            </nav>
          )}

          {/* Right section: Auth / User Profile */}
          <div className="flex items-center gap-3">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-2 sm:gap-4">
                {/* Search Bar Preview */}
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-100/80 rounded-xl text-xs text-slate-500 border border-slate-200/60">
                  <Search className="w-3.5 h-3.5" />
                  <span>Search skills, problems...</span>
                  <kbd className="px-1.5 py-0.5 bg-white border border-slate-200 rounded text-[10px] text-slate-400 font-mono">⌘K</kbd>
                </div>

                {/* Notification Bell */}
                <button className="relative p-2 rounded-xl text-slate-500 hover:text-indigo-600 hover:bg-slate-100 transition-colors">
                  <Bell className="w-4 h-4" />
                  <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-indigo-600 rounded-full"></span>
                </button>

                {/* User Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center gap-2.5 p-1.5 rounded-xl hover:bg-slate-100 transition-colors cursor-pointer"
                  >
                    <img
                      src={
                        user.avatar ||
                        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user.name)}`
                      }
                      alt={user.name}
                      className="w-8 h-8 rounded-lg object-cover ring-2 ring-indigo-500/20"
                    />
                    <div className="hidden md:block text-left">
                      <p className="text-xs font-bold text-slate-800 leading-none">{user.name}</p>
                      <p className="text-[10px] text-indigo-600 font-medium capitalize mt-0.5">{user.role.toLowerCase()}</p>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <div
                      className="absolute right-0 mt-2 w-56 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                      onClick={() => setShowProfileMenu(false)}
                    >
                      <div className="px-4 py-2 border-b border-slate-100">
                        <p className="text-xs font-bold text-slate-900">{user.name}</p>
                        <p className="text-[11px] text-slate-500 truncate">{user.email}</p>
                      </div>

                      <div className="py-1">
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Compass className="w-4 h-4 text-indigo-500" />
                          Dashboard
                        </Link>
                        <Link
                          to="/portfolio"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Briefcase className="w-4 h-4 text-purple-500" />
                          Portfolio Builder
                        </Link>
                        <Link
                          to="/profile"
                          className="flex items-center gap-2.5 px-4 py-2 text-xs font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 transition-colors"
                        >
                          <Settings className="w-4 h-4 text-slate-500" />
                          Profile & Settings
                        </Link>
                      </div>

                      <div className="border-t border-slate-100 pt-1">
                        <button
                          onClick={() => {
                            logout();
                            navigate('/');
                          }}
                          className="flex items-center gap-2.5 w-full px-4 py-2 text-xs font-medium text-rose-600 hover:bg-rose-50 transition-colors text-left"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 sm:gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={async () => {
                    await loginAsDemo();
                    navigate('/dashboard');
                  }}
                  leftIcon={<Sparkles className="w-3.5 h-3.5 text-indigo-600" />}
                >
                  Demo Student
                </Button>
                <Link to="/login">
                  <Button variant="ghost" size="sm">
                    Log In
                  </Button>
                </Link>
                <Link to="/register">
                  <Button variant="purple" size="sm">
                    Get Started Free
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
