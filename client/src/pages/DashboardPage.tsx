import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { api } from '../services/api';
import { UserStats, Roadmap, Course } from '../types';
import {
  Flame,
  Award,
  Code2,
  BookOpen,
  Map,
  Dna,
  ArrowRight,
  CheckCircle2,
  Clock,
  Sparkles,
  TrendingUp,
  Target,
  Play,
} from 'lucide-react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
} from 'recharts';

export const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [roadmap, setRoadmap] = useState<Roadmap | null>(null);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadDashboardData() {
      try {
        const [statsData, roadmapsData, coursesData] = await Promise.all([
          api.getUserStats().catch(() => ({
            skillsLearned: 5,
            learningStreak: 8,
            problemsSolved: 7,
            coursesInProgress: 2,
            profileCompletion: 90,
          })),
          api.getRoadmaps().catch(() => []),
          api.getCourses().catch(() => []),
        ]);

        setStats(statsData);
        setRoadmap(roadmapsData[0] || null);
        setCourses(coursesData.slice(0, 3));
      } finally {
        setLoading(false);
      }
    }
    loadDashboardData();
  }, []);

  const activityData = [
    { day: 'Mon', hours: 2.5, problems: 2 },
    { day: 'Tue', hours: 3.0, problems: 3 },
    { day: 'Wed', hours: 1.5, problems: 1 },
    { day: 'Thu', hours: 4.0, problems: 4 },
    { day: 'Fri', hours: 3.5, problems: 2 },
    { day: 'Sat', hours: 5.0, problems: 5 },
    { day: 'Sun', hours: 2.0, problems: 2 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 rounded-3xl text-white shadow-xl shadow-indigo-500/10">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-indigo-200 text-xs font-semibold backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Welcome to your learning cockpit</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black">
            Hello, {user?.name || 'Developer'}! 👋
          </h1>
          <p className="text-xs sm:text-sm text-indigo-100 max-w-xl">
            Target Goal:{' '}
            <span className="font-bold text-white underline decoration-indigo-400">
              {user?.profile?.targetRole || 'Full Stack Developer'}
            </span>
            . You are making great progress towards internship & placement readiness.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link to="/skills">
            <Button
              variant="secondary"
              size="sm"
              className="bg-white/10 text-white hover:bg-white/20 border-white/20"
              leftIcon={<Dna className="w-4 h-4 text-indigo-300" />}
            >
              Skill DNA
            </Button>
          </Link>
          <Link to="/arena">
            <Button
              variant="purple"
              size="sm"
              className="shadow-md"
              leftIcon={<Code2 className="w-4 h-4 text-white" />}
            >
              Solve Problems
            </Button>
          </Link>
        </div>
      </div>

      {/* Top 4 Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-indigo-50 text-indigo-600">
            <Award className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Skills Learned</p>
            <p className="text-2xl font-black text-slate-900">{stats?.skillsLearned ?? 5}</p>
            <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded">
              +2 this week
            </span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-amber-50 text-amber-600">
            <Flame className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Learning Streak</p>
            <p className="text-2xl font-black text-slate-900">{stats?.learningStreak ?? 8} Days</p>
            <span className="text-[10px] font-bold text-amber-600 bg-amber-50 px-1.5 py-0.5 rounded">
              🔥 Keep it going!
            </span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-emerald-50 text-emerald-600">
            <Code2 className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">Problems Solved</p>
            <p className="text-2xl font-black text-slate-900">{stats?.problemsSolved ?? 7}</p>
            <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-1.5 py-0.5 rounded">
              Top 15% rank
            </span>
          </div>
        </Card>

        <Card className="p-5 flex items-center gap-4">
          <div className="p-3.5 rounded-2xl bg-purple-50 text-purple-600">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500">In-Progress Courses</p>
            <p className="text-2xl font-black text-slate-900">{stats?.coursesInProgress ?? 2}</p>
            <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-1.5 py-0.5 rounded">
              66% completed
            </span>
          </div>
        </Card>
      </div>

      {/* Center Section: Weekly Learning Activity & Active Roadmap */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Weekly Activity Chart */}
        <Card className="p-6 lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <h3 className="text-base font-bold text-slate-900 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-indigo-600" />
                Weekly Learning Analytics
              </h3>
              <p className="text-xs text-slate-500">Hours spent studying & coding problems solved</p>
            </div>
            <Badge variant="primary" size="sm">Last 7 Days</Badge>
          </div>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={activityData}>
                <defs>
                  <linearGradient id="colorHours" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} unit="h" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#1e293b',
                    borderRadius: '12px',
                    border: 'none',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="hours"
                  stroke="#6366f1"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorHours)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Active Roadmap Snapshot */}
        <Card className="p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-indigo-600 flex items-center gap-1.5">
                <Target className="w-4 h-4" />
                Active Roadmap
              </span>
              <Badge variant="purple" size="sm">
                {roadmap?.currentLevel || 'Beginner'}
              </Badge>
            </div>

            <h4 className="text-base font-bold text-slate-900">
              {roadmap?.title || 'Full Stack Developer Career Path'}
            </h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              {roadmap?.description || 'From modern frontend UI frameworks to resilient backend APIs, databases, authentication, and cloud deployment.'}
            </p>

            <div className="space-y-1.5 pt-2">
              <div className="flex justify-between text-xs font-semibold text-slate-700">
                <span>Phase Progress</span>
                <span className="text-indigo-600 font-bold">{roadmap?.progressPercentage ?? 35}%</span>
              </div>
              <ProgressBar progress={roadmap?.progressPercentage ?? 35} color="indigo" size="md" />
            </div>
          </div>

          <Link to="/roadmap" className="w-full pt-4">
            <Button variant="outline" size="sm" className="w-full" rightIcon={<ArrowRight className="w-4 h-4" />}>
              Open Roadmap Tracker
            </Button>
          </Link>
        </Card>
      </div>

      {/* Continue Learning Courses Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900">Continue Learning</h3>
            <p className="text-xs text-slate-500">Pick up right where you left off</p>
          </div>
          <Link to="/courses" className="text-xs font-bold text-indigo-600 hover:text-indigo-700">
            View All Courses →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <Card key={course.id} hover className="p-5 flex flex-col justify-between space-y-4">
              <div className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <Badge variant={course.level === 'BEGINNER' ? 'beginner' : course.level === 'INTERMEDIATE' ? 'intermediate' : 'advanced'} size="sm">
                    {course.level}
                  </Badge>
                  <span className="text-xs font-semibold text-amber-500 flex items-center gap-1">
                    ★ {course.rating}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-slate-900 line-clamp-1">{course.title}</h4>
                <p className="text-xs text-slate-600 line-clamp-2">{course.description}</p>
              </div>

              <div className="space-y-3 pt-2 border-t border-slate-100">
                <div className="flex items-center justify-between text-[11px] text-slate-500">
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    {course.durationHours}h estimated
                  </span>
                  <span>{course.totalStudents} students</span>
                </div>

                <Link to={`/courses/${course.slug}`}>
                  <Button variant="purple" size="sm" className="w-full" rightIcon={<Play className="w-3.5 h-3.5" />}>
                    Continue Lessons
                  </Button>
                </Link>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
