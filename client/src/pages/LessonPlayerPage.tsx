import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { ProgressBar } from '../components/common/ProgressBar';
import { api } from '../services/api';
import { Course, Lesson } from '../types';
import confetti from 'canvas-confetti';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Circle,
  Clock,
  ExternalLink,
  BookOpen,
  Copy,
  Check,
  Award,
} from 'lucide-react';

export const LessonPlayerPage: React.FC = () => {
  const { slug, lessonId } = useParams<{ slug: string; lessonId: string }>();
  const [course, setCourse] = useState<Course | null>(null);
  const [currentLesson, setCurrentLesson] = useState<Lesson | null>(null);
  const [completedLessonIds, setCompletedLessonIds] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    async function loadCourseAndLesson() {
      if (!slug) return;
      try {
        const data = await api.getCourse(slug);
        setCourse(data);
        setCompletedLessonIds(data.completedLessonIds || []);

        const targetLesson = data.lessons?.find((l) => l.id === lessonId) || data.lessons?.[0];
        if (targetLesson) setCurrentLesson(targetLesson);
      } catch (err) {
        console.error(err);
      }
    }
    loadCourseAndLesson();
  }, [slug, lessonId]);

  const handleToggleCompletion = async () => {
    if (!course || !currentLesson) return;
    setIsUpdating(true);

    const isCurrentlyCompleted = completedLessonIds.includes(currentLesson.id);
    const updated = isCurrentlyCompleted
      ? completedLessonIds.filter((id) => id !== currentLesson.id)
      : [...completedLessonIds, currentLesson.id];

    setCompletedLessonIds(updated);

    try {
      await api.updateLessonProgress(course.id, currentLesson.id, !isCurrentlyCompleted);

      // Trigger confetti if all lessons finished!
      if (updated.length === (course.lessons?.length || 0)) {
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }

      // Navigate to next lesson if advancing
      if (!isCurrentlyCompleted) {
        const currentIndex = course.lessons?.findIndex((l) => l.id === currentLesson.id) ?? -1;
        if (currentIndex >= 0 && currentIndex < (course.lessons?.length || 0) - 1) {
          const nextLesson = course.lessons![currentIndex + 1];
          navigate(`/courses/${course.slug}/lessons/${nextLesson.id}`);
        }
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsUpdating(false);
    }
  };

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!course || !currentLesson) {
    return (
      <div className="py-20 text-center text-slate-500">
        <p>Loading lesson classroom...</p>
      </div>
    );
  }

  const isCompleted = completedLessonIds.includes(currentLesson.id);
  const progressPercent =
    course.lessons && course.lessons.length > 0
      ? Math.round((completedLessonIds.length / course.lessons.length) * 100)
      : 0;

  return (
    <div className="space-y-6 pb-12 max-w-7xl mx-auto">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-200">
        <div className="flex items-center gap-3">
          <Link
            to={`/courses/${course.slug}`}
            className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
              {course.title}
            </span>
            <h1 className="text-lg font-black text-slate-900">{currentLesson.title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="w-32 hidden sm:block">
            <ProgressBar progress={progressPercent} color="indigo" size="sm" showLabel />
          </div>
          <Button
            variant={isCompleted ? 'secondary' : 'purple'}
            size="sm"
            onClick={handleToggleCompletion}
            isLoading={isUpdating}
            leftIcon={isCompleted ? <CheckCircle2 className="w-4 h-4 text-emerald-600" /> : undefined}
          >
            {isCompleted ? 'Completed' : 'Mark as Complete & Next'}
          </Button>
        </div>
      </div>

      {/* Main Classroom Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left 3 Cols: Lesson Content Reader */}
        <div className="lg:col-span-3 space-y-6">
          <Card className="p-6 sm:p-8 space-y-6">
            {/* Meta bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-100 text-xs text-slate-500">
              <span className="flex items-center gap-1.5 font-medium">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Estimated: {currentLesson.durationMinutes} minutes
              </span>
              {currentLesson.officialDocsUrl && (
                <a
                  href={currentLesson.officialDocsUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-600 hover:underline font-bold"
                >
                  <span>Official Reference Docs</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>

            {/* Markdown Text Body */}
            <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
              {currentLesson.content}
            </div>

            {/* Code Snippet Box if present */}
            {currentLesson.codeSnippet && (
              <div className="space-y-2 pt-4">
                <div className="flex items-center justify-between text-xs font-bold text-slate-700">
                  <span>Interactive Code Demonstration</span>
                  <button
                    onClick={() => copyCode(currentLesson.codeSnippet!)}
                    className="inline-flex items-center gap-1.5 text-indigo-600 hover:text-indigo-700 cursor-pointer"
                  >
                    {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'Copied!' : 'Copy Snippet'}</span>
                  </button>
                </div>
                <pre className="p-4 bg-slate-900 text-slate-100 rounded-2xl text-xs font-mono overflow-x-auto leading-relaxed border border-slate-800">
                  <code>{currentLesson.codeSnippet}</code>
                </pre>
              </div>
            )}
          </Card>
        </div>

        {/* Right Col: Course Syllabus Navigation */}
        <div>
          <Card className="p-5 space-y-4">
            <h3 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              Course Syllabus
            </h3>

            <div className="space-y-1.5">
              {course.lessons?.map((lesson, idx) => {
                const isSelected = lesson.id === currentLesson.id;
                const isLessonDone = completedLessonIds.includes(lesson.id);

                return (
                  <Link
                    key={lesson.id}
                    to={`/courses/${course.slug}/lessons/${lesson.id}`}
                    className={`p-3 rounded-xl flex items-center justify-between text-xs font-medium transition-all ${
                      isSelected
                        ? 'bg-indigo-50 border border-indigo-200 text-indigo-950 font-bold'
                        : 'text-slate-600 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      {isLessonDone ? (
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                      ) : (
                        <Circle className="w-4 h-4 text-slate-300 shrink-0" />
                      )}
                      <span className="line-clamp-1">{lesson.title}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 shrink-0">{lesson.durationMinutes}m</span>
                  </Link>
                );
              })}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};
