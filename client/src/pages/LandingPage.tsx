import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Card } from '../components/common/Card';
import { useAuth } from '../contexts/AuthContext';
import {
  Sparkles,
  ArrowRight,
  Dna,
  Map,
  BookOpen,
  Code2,
  Briefcase,
  CheckCircle2,
  TrendingUp,
  Award,
  Zap,
  Star,
  Users,
  Terminal,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { isAuthenticated, loginAsDemo } = useAuth();
  const navigate = useNavigate();

  const handleDemoStart = async () => {
    await loginAsDemo();
    navigate('/dashboard');
  };

  const featureCards = [
    {
      title: 'Skill DNA Profiling',
      description: 'Take adaptive diagnostic tests to map strengths, detect knowledge gaps, and benchmark proficiency on a live radar chart.',
      icon: Dna,
      badge: 'Assessment',
      color: 'from-indigo-500 to-purple-500',
    },
    {
      title: 'Personalized Career Roadmaps',
      description: 'Generate phase-by-phase learning plans tailored to your target engineering roles with weekly task milestones and estimated completions.',
      icon: Map,
      badge: 'Roadmaps',
      color: 'from-purple-500 to-pink-500',
    },
    {
      title: 'Structured Course Catalog',
      description: 'Learn full-stack architectures, algorithms, databases, and DevOps with real explanatory lessons and official docs integration.',
      icon: BookOpen,
      badge: 'Courses',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      title: 'Real-Time Code Arena',
      description: 'Solve 20+ interview-grade coding problems in Python and JavaScript with test suite execution, memory analysis, and complexity metrics.',
      icon: Code2,
      badge: 'Practice',
      color: 'from-emerald-500 to-teal-500',
    },
    {
      title: 'Automated Portfolio Builder',
      description: 'Showcase projects, GitHub repositories, and verified Skillsware certifications with responsive templates and shareable public links.',
      icon: Briefcase,
      badge: 'Career Ready',
      color: 'from-amber-500 to-orange-500',
    },
    {
      title: 'Internship & Job Readiness',
      description: 'Track daily streaks, problem counts, and profile scores designed to meet enterprise hiring standards for students and freshers.',
      icon: TrendingUp,
      badge: 'Hiring',
      color: 'from-rose-500 to-red-500',
    },
  ];

  const careerTracks = [
    { title: 'Full Stack Developer', roles: 'React, Node.js, PostgreSQL, TypeScript', popular: true },
    { title: 'Python Engineer', roles: 'Core Python, FastAPI, Algorithmic Optimization', popular: true },
    { title: 'Frontend UI Specialist', roles: 'React 19, Tailwind CSS, Performance CWV', popular: false },
    { title: 'Backend Systems Architect', roles: 'REST APIs, Caching, Database Indexing', popular: false },
    { title: 'Software Engineer', roles: 'Data Structures, System Design, Algorithms', popular: true },
    { title: 'Data Analyst', roles: 'Advanced SQL, Pandas, Business Intelligence', popular: false },
  ];

  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 pb-8 overflow-hidden text-center max-w-4xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 border border-indigo-200/80 text-xs font-semibold text-indigo-700 shadow-2xs">
          <Sparkles className="w-4 h-4 text-indigo-600 animate-pulse" />
          <span>The Next-Gen Skill Development & Career Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.15]">
          Master In-Demand Tech Skills. <br />
          <span className="gradient-text">Build Your Engineering Career.</span>
        </h1>

        <p className="text-base sm:text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
          From diagnostic <strong>Skill DNA assessments</strong> and <strong>dynamic roadmaps</strong> to the interactive <strong>Code Arena</strong> and <strong>portfolio builder</strong>—everything B.Tech students and freshers need to land dream jobs.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
          {isAuthenticated ? (
            <Link to="/dashboard">
              <Button size="lg" variant="purple" rightIcon={<ArrowRight className="w-5 h-5" />}>
                Go to My Dashboard
              </Button>
            </Link>
          ) : (
            <>
              <Link to="/register">
                <Button size="lg" variant="purple" rightIcon={<ArrowRight className="w-5 h-5" />}>
                  Start Learning Free
                </Button>
              </Link>
              <Button size="lg" variant="secondary" onClick={handleDemoStart} leftIcon={<Sparkles className="w-4 h-4 text-indigo-600" />}>
                Explore as Demo Student
              </Button>
            </>
          )}
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-12 max-w-3xl mx-auto border-t border-slate-200/80">
          <div>
            <p className="text-2xl font-black text-slate-900">20+</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Coding Problems</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">13</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Skill Categories</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">6</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Structured Courses</p>
          </div>
          <div>
            <p className="text-2xl font-black text-slate-900">100%</p>
            <p className="text-xs text-slate-500 font-medium mt-0.5">Hands-On & Free</p>
          </div>
        </div>
      </section>

      {/* Feature Grid */}
      <section className="space-y-8">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="purple" size="md">Core Architecture</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Designed for Practical Mastery</h2>
          <p className="text-sm text-slate-600">No passive video bingeing. SKILLSWARE focuses on actionable evaluation, guided tasks, and verified project outcomes.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featureCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <Card key={idx} hover className="p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`p-3 rounded-2xl bg-gradient-to-tr ${card.color} text-white shadow-sm`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <Badge variant="primary" size="sm">{card.badge}</Badge>
                </div>
                <h3 className="text-lg font-bold text-slate-900">{card.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{card.description}</p>
              </Card>
            );
          })}
        </div>
      </section>

      {/* Career Tracks Section */}
      <section className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-950 text-white space-y-8">
        <div className="max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Zap className="w-3.5 h-3.5 text-amber-400" />
            Curated Career Paths
          </div>
          <h2 className="text-3xl font-black">Choose Your Target Engineering Role</h2>
          <p className="text-sm text-indigo-200">Personalized phases, weekly milestones, and required skill benchmarks.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {careerTracks.map((track, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-indigo-400/50 transition-all flex flex-col justify-between space-y-4">
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-sm text-white">{track.title}</h4>
                  {track.popular && <span className="text-[10px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full">Popular</span>}
                </div>
                <p className="text-xs text-slate-300">{track.roles}</p>
              </div>
              <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-300 hover:text-white transition-colors">
                <span>View Roadmap</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="space-y-10">
        <div className="text-center space-y-2 max-w-2xl mx-auto">
          <Badge variant="primary" size="md">How It Works</Badge>
          <h2 className="text-3xl font-extrabold text-slate-900">Your 4-Step Journey to Job Readiness</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative">
            <span className="text-4xl font-black text-indigo-100">01</span>
            <h4 className="font-bold text-slate-900">Assess Skill DNA</h4>
            <p className="text-xs text-slate-600">Take quick diagnostic evaluations to pinpoint your exact strengths and knowledge gaps.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative">
            <span className="text-4xl font-black text-purple-100">02</span>
            <h4 className="font-bold text-slate-900">Follow Roadmap</h4>
            <p className="text-xs text-slate-600">Execute structured weekly phases and complete targeted course lessons.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative">
            <span className="text-4xl font-black text-emerald-100">03</span>
            <h4 className="font-bold text-slate-900">Code in the Arena</h4>
            <p className="text-xs text-slate-600">Sharpen algorithmic problem-solving with instant automated test suite evaluations.</p>
          </div>
          <div className="p-6 rounded-2xl bg-white border border-slate-200/80 space-y-3 relative">
            <span className="text-4xl font-black text-amber-100">04</span>
            <h4 className="font-bold text-slate-900">Publish Portfolio</h4>
            <p className="text-xs text-slate-600">Generate a live, responsive engineering portfolio to share with recruiters and peers.</p>
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="p-10 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-600 text-white text-center space-y-6 shadow-xl shadow-indigo-500/20">
        <h2 className="text-3xl sm:text-4xl font-black">Ready to Accelerate Your Career?</h2>
        <p className="text-sm sm:text-base text-indigo-100 max-w-xl mx-auto">
          Join Skillsware today and experience structured, career-driven engineering preparation.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link to="/register">
            <Button size="lg" className="bg-white text-indigo-700 hover:bg-indigo-50 font-bold shadow-md">
              Create Free Account
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="border-white/40 text-white hover:bg-white/10" onClick={handleDemoStart}>
            Try Demo Mode
          </Button>
        </div>
      </section>
    </div>
  );
};
