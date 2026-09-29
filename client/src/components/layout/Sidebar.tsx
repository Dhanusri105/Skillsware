import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Dna,
  Map,
  BookOpen,
  Code2,
  Briefcase,
  User,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const { user } = useAuth();

  const navItems = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/skills', label: 'Skill DNA', icon: Dna, badge: 'Assess' },
    { to: '/roadmap', label: 'Learning Roadmap', icon: Map },
    { to: '/courses', label: 'Course Catalog', icon: BookOpen },
    { to: '/arena', label: 'Code Arena', icon: Code2, badge: 'Practice' },
    { to: '/portfolio', label: 'Portfolio Builder', icon: Briefcase },
    { to: '/profile', label: 'Profile & Settings', icon: User },
  ];

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-xs lg:hidden animate-in fade-in"
        />
      )}

      {/* Sidebar Drawer */}
      <aside
        className={`fixed top-16 bottom-0 left-0 z-40 w-64 bg-white border-r border-slate-200/80 transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } flex flex-col justify-between`}
      >
        <div className="p-4 space-y-6 overflow-y-auto">
          {/* Target Role Pill */}
          {user?.profile?.targetRole && (
            <div className="p-3 bg-gradient-to-br from-indigo-50/80 to-purple-50/50 border border-indigo-100 rounded-xl">
              <div className="flex items-center gap-1.5 text-[11px] font-bold text-indigo-700 tracking-wide uppercase">
                <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
                Target Career Goal
              </div>
              <p className="text-xs font-bold text-slate-900 mt-1">{user.profile.targetRole}</p>
              <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2">
                <span>Experience:</span>
                <span className="font-semibold text-indigo-600 capitalize">
                  {user.profile.experienceLevel?.toLowerCase() || 'Beginner'}
                </span>
              </div>
            </div>
          )}

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  onClick={onClose}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all group ${
                      isActive
                        ? 'bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-sm shadow-indigo-500/25'
                        : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/80'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <div className="flex items-center gap-3">
                        <Icon
                          className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                            isActive ? 'text-white' : 'text-slate-400 group-hover:text-indigo-600'
                          }`}
                        />
                        <span>{item.label}</span>
                      </div>
                      {item.badge && (
                        <span
                          className={`px-1.5 py-0.5 rounded-md text-[10px] font-bold ${
                            isActive
                              ? 'bg-white/20 text-white'
                              : 'bg-indigo-50 text-indigo-600 border border-indigo-100'
                          }`}
                        >
                          {item.badge}
                        </span>
                      )}
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>
        </div>

        {/* Public Portfolio Quick Link */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50">
          <NavLink
            to="/portfolio"
            className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-slate-200/80 text-xs font-medium text-slate-700 hover:border-indigo-300 hover:text-indigo-600 transition-all shadow-2xs"
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>Live Public Portfolio</span>
            </div>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </NavLink>
        </div>
      </aside>
    </>
  );
};
