import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../services/api';
import { Portfolio } from '../types';
import { Logo } from '../components/common/Logo';
import { Badge } from '../components/common/Badge';
import { Button } from '../components/common/Button';
import {
  Globe,
  ExternalLink,
  Award,
  Sparkles,
  MapPin,
  GraduationCap,
  Mail,
  ShieldCheck,
  GitBranch,
  Share2,
} from 'lucide-react';

export const PublicPortfolioPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPublicPortfolio() {
      if (!slug) return;
      try {
        const data = await api.getPublicPortfolio(slug);
        setPortfolio(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadPublicPortfolio();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 text-slate-500">
        <p>Loading developer portfolio...</p>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center space-y-4">
        <h2 className="text-2xl font-black text-slate-900">Portfolio Not Found</h2>
        <p className="text-xs text-slate-500 max-w-sm">
          The requested portfolio slug is either private or does not exist.
        </p>
        <Link to="/">
          <Button variant="purple" size="sm">
            Explore Skillsware
          </Button>
        </Link>
      </div>
    );
  }

  const isDark = portfolio.themeTemplate === 'cyber-dark';
  const user = portfolio.user;
  const profile = user?.profile;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-slate-950 text-white' : 'bg-slate-50 text-slate-900'}`}>
      {/* Top Navbar */}
      <header className={`border-b ${isDark ? 'border-slate-800 bg-slate-900/80' : 'border-slate-200 bg-white/80'} backdrop-blur-md sticky top-0 z-30`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          <Logo size="sm" />
          <div className="flex items-center gap-3">
            <span className="text-[11px] font-bold text-emerald-500 flex items-center gap-1">
              <ShieldCheck className="w-4 h-4" />
              Verified Skillsware Engineer
            </span>
            <Link to="/register">
              <Button variant="purple" size="sm">
                Build Yours Free
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12 space-y-12">
        {/* Profile Bio Hero */}
        <div className={`p-8 sm:p-10 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-sm space-y-6`}>
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <img
              src={
                user?.avatar ||
                `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(user?.name || 'Engineer')}`
              }
              alt={user?.name}
              className="w-24 h-24 rounded-2xl object-cover ring-4 ring-indigo-500/20 shadow-md shrink-0"
            />

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                <h1 className="text-2xl sm:text-3xl font-black">{user?.name}</h1>
                <Badge variant="purple" size="sm">{profile?.targetRole || 'Full Stack Developer'}</Badge>
              </div>

              <p className="text-xs sm:text-sm font-semibold text-indigo-500">{portfolio.headline}</p>

              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 text-xs text-slate-500 pt-1">
                {profile?.college && (
                  <span className="flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4 text-indigo-500" />
                    {profile.college} ({profile.graduationYear || '2027'})
                  </span>
                )}
                {profile?.location && (
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-indigo-500" />
                    {profile.location}
                  </span>
                )}
              </div>
            </div>
          </div>

          <p className={`text-xs sm:text-sm leading-relaxed ${isDark ? 'text-slate-300' : 'text-slate-600'}`}>
            {portfolio.summary}
          </p>

          {/* Social Links */}
          <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-slate-100">
            {profile?.githubUrl && (
              <a href={profile.githubUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" leftIcon={<GitBranch className="w-4 h-4" />}>
                  GitHub
                </Button>
              </a>
            )}
            {profile?.linkedinUrl && (
              <a href={profile.linkedinUrl} target="_blank" rel="noreferrer">
                <Button variant="secondary" size="sm" leftIcon={<Share2 className="w-4 h-4" />}>
                  LinkedIn
                </Button>
              </a>
            )}
            {user?.email && (
              <a href={`mailto:${user.email}`}>
                <Button variant="outline" size="sm" leftIcon={<Mail className="w-4 h-4" />}>
                  Contact Developer
                </Button>
              </a>
            )}
          </div>
        </div>

        {/* Featured Projects */}
        <div className="space-y-6">
          <h2 className="text-xl font-black">Featured Projects ({portfolio.projects.length})</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {portfolio.projects.map((proj, idx) => (
              <div
                key={idx}
                className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} shadow-2xs space-y-4 flex flex-col justify-between`}
              >
                <div className="space-y-3">
                  <h3 className="text-base font-bold">{proj.title}</h3>
                  <p className={`text-xs leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-600'}`}>{proj.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {proj.technologies.map((t, tIdx) => (
                      <span
                        key={tIdx}
                        className={`px-2.5 py-0.5 rounded-md text-[11px] font-semibold ${
                          isDark ? 'bg-slate-800 text-indigo-300' : 'bg-indigo-50 text-indigo-700'
                        }`}
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-slate-100">
                  {proj.liveUrl && (
                    <a href={proj.liveUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="purple" size="sm" className="w-full" rightIcon={<ExternalLink className="w-3.5 h-3.5" />}>
                        Live Demo
                      </Button>
                    </a>
                  )}
                  {proj.githubUrl && (
                    <a href={proj.githubUrl} target="_blank" rel="noreferrer" className="flex-1">
                      <Button variant="secondary" size="sm" className="w-full" leftIcon={<GitBranch className="w-3.5 h-3.5" />}>
                        Source
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Verified Certifications */}
        {portfolio.certifications && portfolio.certifications.length > 0 && (
          <div className="space-y-6">
            <h2 className="text-xl font-black">Verified Credentials ({portfolio.certifications.length})</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {portfolio.certifications.map((cert, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'} flex items-center justify-between gap-4`}
                >
                  <div className="flex items-center gap-3.5">
                    <div className="p-3 rounded-xl bg-indigo-50 text-indigo-600 shrink-0">
                      <Award className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold">{cert.title}</h4>
                      <p className="text-[11px] text-slate-500">{cert.issuer} • ID: {cert.credentialId}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};
