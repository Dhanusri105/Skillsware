import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { api } from '../services/api';
import { Course } from '../types';
import {
  BookOpen,
  Clock,
  Star,
  Users,
  CheckCircle2,
  Play,
  ArrowLeft,
  Award,
  ShieldCheck,
  FileText,
} from 'lucide-react';

export const CourseDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [isEnrolled, setIsEnrolled] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadCourse() {
      if (!slug) return;
      try {
        const data = await api.getCourse(slug);
        setCourse(data);
        setIsEnrolled(!!data.isEnrolled);
      } catch (err) {
        console.error(err);
      }
    }
    loadCourse();
  }, [slug]);

  const handleEnroll = async () => {
    if (!course) return;
    setEnrolling(true);
    try {
      await api.enrollCourse(course.id);
      setIsEnrolled(true);
      // Navigate to first lesson
      if (course.lessons && course.lessons.length > 0) {
        navigate(`/courses/${course.slug}/lessons/${course.lessons[0].id}`);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setEnrolling(false);
    }
  };

  if (!course) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p>Loading course details...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-12">
      {/* Back Button */}
      <div>
        <Link
          to="/courses"
          className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 hover:text-indigo-600 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Course Catalog</span>
        </Link>
      </div>

      {/* Hero Header */}
      <div className="p-8 sm:p-10 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white space-y-6">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="purple" size="sm">{course.category}</Badge>
          <Badge variant={course.level.toLowerCase() as any} size="sm">{course.level}</Badge>
          <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
            <Star className="w-3.5 h-3.5 fill-amber-400" />
            {course.rating}
          </span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-black max-w-3xl leading-tight">{course.title}</h1>
        <p className="text-sm text-indigo-200 max-w-2xl leading-relaxed">{course.description}</p>

        <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-white/10 text-xs text-indigo-200">
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-indigo-400" />
            {course.durationHours} Hours Total Content
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-indigo-400" />
            {course.totalStudents} Active Students
          </span>
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            Verified Skill Certificate
          </span>
        </div>
      </div>

      {/* Main Grid: Curriculum & Enrollment Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Lessons Breakdown */}
        <div className="lg:col-span-2 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-slate-900">Curriculum Breakdown</h2>
            <p className="text-xs text-slate-500">Structured lessons with code snippets and interactive testing</p>
          </div>

          <div className="space-y-3">
            {course.lessons?.map((lesson, idx) => {
              const isCompleted = course.completedLessonIds?.includes(lesson.id);
              return (
                <div
                  key={lesson.id}
                  className="p-5 bg-white rounded-2xl border border-slate-200 hover:border-indigo-300 transition-all flex items-center justify-between gap-4"
                >
                  <div className="flex items-start gap-3.5">
                    <span className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-center shrink-0">
                      0{lesson.order}
                    </span>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-slate-900">{lesson.title}</h4>
                      <p className="text-[11px] text-slate-500">{lesson.description}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 shrink-0">
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {lesson.durationMinutes}m
                    </span>
                    <Link to={`/courses/${course.slug}/lessons/${lesson.id}`}>
                      <Button variant="outline" size="sm">
                        Start
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Enrollment Action Widget */}
        <div>
          <Card className="p-6 sticky top-20 space-y-6">
            <div className="space-y-2">
              <h3 className="text-base font-bold text-slate-900">Course Enrollment</h3>
              <p className="text-xs text-slate-500">Full lifetime access to interactive lessons and verified credentials.</p>
            </div>

            {isEnrolled ? (
              <div className="space-y-3">
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Enrolled in this course</span>
                </div>
                {course.lessons && course.lessons.length > 0 && (
                  <Link to={`/courses/${course.slug}/lessons/${course.lessons[0].id}`}>
                    <Button variant="purple" size="lg" className="w-full">
                      Continue Learning
                    </Button>
                  </Link>
                )}
              </div>
            ) : (
              <Button
                variant="purple"
                size="lg"
                className="w-full"
                onClick={handleEnroll}
                isLoading={enrolling}
              >
                Enroll Now Free
              </Button>
            )}

            <div className="space-y-2.5 pt-4 border-t border-slate-100 text-xs text-slate-600">
              <p className="font-bold text-slate-900">This Course Includes:</p>
              <div className="space-y-1.5">
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Complete hands-on tutorials
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Direct official documentation links
                </p>
                <p className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-indigo-600" /> Portfolio project additions
                </p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
