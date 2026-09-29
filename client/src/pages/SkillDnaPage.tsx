import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ProgressBar } from '../components/common/ProgressBar';
import { api } from '../services/api';
import { Skill, SkillAssessment, AssessmentResult } from '../types';
import {
  Dna,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Sparkles,
  ArrowRight,
  TrendingUp,
  Award,
  Terminal,
  Layers,
  Server,
  Database,
  Binary,
  GitBranch,
  Lightbulb,
  MessageSquare,
  Cpu,
  Layout,
  Code2,
} from 'lucide-react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from 'recharts';

export const SkillDnaPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [profileData, setProfileData] = useState<{
    results: AssessmentResult[];
    radarData: Array<{ skill: string; proficiency: number; level: string }>;
  } | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedAssessment, setSelectedAssessment] = useState<SkillAssessment | null>(null);
  const [isTestModalOpen, setIsTestModalOpen] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
  const [testCompleted, setTestCompleted] = useState(false);
  const [lastResult, setLastResult] = useState<AssessmentResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900);

  useEffect(() => {
    async function loadSkillsAndProfile() {
      const [skillsData, profData] = await Promise.all([
        api.getSkills().catch(() => []),
        api.getSkillProfile().catch(() => null),
      ]);
      setSkills(skillsData);
      setProfileData(profData);
    }
    loadSkillsAndProfile();
  }, []);

  useEffect(() => {
    let timer: any;
    if (isTestModalOpen && !testCompleted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isTestModalOpen, testCompleted, timeLeft]);

  const startAssessment = async (skillSlug: string) => {
    try {
      const assessment = await api.getAssessment(skillSlug);
      setSelectedAssessment(assessment);
      setCurrentQuestionIndex(0);
      setUserAnswers({});
      setTestCompleted(false);
      setLastResult(null);
      setTimeLeft(assessment.durationMinutes * 60 || 900);
      setIsTestModalOpen(true);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectOption = (optionIndex: number) => {
    if (!selectedAssessment) return;
    const currentQ = selectedAssessment.questions[currentQuestionIndex];
    setUserAnswers((prev) => ({
      ...prev,
      [currentQ.id]: optionIndex,
    }));
  };

  const handleNextQuestion = () => {
    if (!selectedAssessment) return;
    if (currentQuestionIndex < selectedAssessment.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmitAssessment = async () => {
    if (!selectedAssessment) return;
    setIsSubmitting(true);
    try {
      const result = await api.submitAssessment(selectedAssessment.id, userAnswers);
      setLastResult(result);
      setTestCompleted(true);

      const updatedProfile = await api.getSkillProfile().catch(() => null);
      if (updatedProfile) setProfileData(updatedProfile);
    } finally {
      setIsSubmitting(false);
    }
  };

  const getSkillIcon = (name: string) => {
    const map: Record<string, any> = {
      Python: Terminal,
      JavaScript: Code2,
      React: Layers,
      'Node.js': Server,
      SQL: Database,
      PostgreSQL: Database,
      'Data Structures and Algorithms': Binary,
      'Git & GitHub': GitBranch,
      'Problem Solving': Lightbulb,
      'Communication & Teamwork': MessageSquare,
      'C and C++': Cpu,
      'HTML and CSS': Layout,
    };
    return map[name] || Code2;
  };

  const categories = ['All', 'Backend & Data', 'Frontend', 'Databases', 'Computer Science', 'DevOps & Tooling'];

  const filteredSkills = skills.filter((s) => {
    if (activeCategory === 'All') return true;
    return s.category.includes(activeCategory);
  });

  const radarChartData = profileData?.radarData || [
    { skill: 'Python', proficiency: 85 },
    { skill: 'JavaScript', proficiency: 78 },
    { skill: 'React', proficiency: 80 },
    { skill: 'SQL', proficiency: 75 },
    { skill: 'DSA', proficiency: 65 },
    { skill: 'Git & GitHub', proficiency: 90 },
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-50 text-indigo-600">
              <Dna className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Skill DNA Diagnostic</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Quantify your technical strengths, identify engineering gaps, and track your competency evolution.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">Adaptive Evaluation Engine</Badge>
        </div>
      </div>

      {/* Radar Chart & Diagnostic Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Radar Visualizer */}
        <Card className="p-6 flex flex-col items-center justify-center space-y-4">
          <div className="w-full flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900 flex items-center gap-1.5">
              <TrendingUp className="w-4 h-4 text-indigo-600" />
              Skill DNA Radar
            </h3>
            <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded-md">
              Live Map
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart data={radarChartData}>
                <PolarGrid stroke="#e2e8f0" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: '#475569', fontSize: 11 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#cbd5e1" />
                <Radar
                  name="Proficiency"
                  dataKey="proficiency"
                  stroke="#6366f1"
                  fill="#6366f1"
                  fillOpacity={0.45}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-[11px] text-slate-500 text-center">
            Scores dynamically recalibrate after every verified assessment.
          </p>
        </Card>

        {/* Diagnostic Breakdown */}
        <Card className="p-6 lg:col-span-2 space-y-6">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-slate-900">Verified Strengths & Gaps</h3>
            <p className="text-xs text-slate-500">Based on your recent diagnostic problem evaluations</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Strengths */}
            <div className="p-4 rounded-2xl bg-emerald-50/60 border border-emerald-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Top Verified Strengths
              </div>
              <ul className="space-y-2 text-xs text-emerald-950 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Python List Comprehensions & Idioms (95%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Modern ES6+ Syntax & Scopes (88%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Relational SQL Joins & Schema 3NF (85%)
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                  Git Branching & PR Workflows (90%)
                </li>
              </ul>
            </div>

            {/* Gaps to Improve */}
            <div className="p-4 rounded-2xl bg-amber-50/60 border border-amber-100 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-amber-800">
                <AlertTriangle className="w-4 h-4 text-amber-600" />
                Key Focus Gaps (Recommended)
              </div>
              <ul className="space-y-2 text-xs text-amber-950 font-medium">
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Dynamic Programming & Memoization Patterns
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  Custom Python Decorators & Metaclasses
                </li>
                <li className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span>
                  PostgreSQL B-Tree Indexing Optimization
                </li>
              </ul>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 flex items-center justify-between">
            <div className="space-y-0.5">
              <p className="text-xs font-bold text-indigo-950">Recommended Action Plan</p>
              <p className="text-[11px] text-indigo-700">Practice 3 medium algorithm problems on Code Arena to improve your graph & recursion score.</p>
            </div>
            <Button
              variant="purple"
              size="sm"
              onClick={() => startAssessment('dsa')}
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Take DSA Check
            </Button>
          </div>
        </Card>
      </div>

      {/* Skill Cards Catalog */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900">Skill Competency Tests</h3>
            <p className="text-xs text-slate-500">Select any engineering subject to launch a timed diagnostic</p>
          </div>

          <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200/60">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  activeCategory === cat
                    ? 'bg-white text-indigo-600 shadow-2xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredSkills.map((skill) => {
            const Icon = getSkillIcon(skill.name);
            return (
              <Card key={skill.id} hover className="p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="p-2.5 rounded-xl bg-indigo-50 text-indigo-600">
                      <Icon className="w-5 h-5" />
                    </div>
                    <Badge variant={skill.difficulty.toLowerCase() as any} size="sm">
                      {skill.difficulty}
                    </Badge>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-900">{skill.name}</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">{skill.description}</p>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[11px] font-semibold text-slate-500 flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" />
                    15 mins • 5-10 Qs
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => startAssessment(skill.slug)}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Start Test
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
      </div>

      {/* Interactive Assessment Modal */}
      {selectedAssessment && (
        <Modal
          isOpen={isTestModalOpen}
          onClose={() => setIsTestModalOpen(false)}
          title={testCompleted ? 'Assessment Results' : `${selectedAssessment.title}`}
          maxWidth="2xl"
        >
          {testCompleted && lastResult ? (
            <div className="space-y-6 py-2 text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600 text-white flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/20">
                <Award className="w-8 h-8" />
              </div>

              <div className="space-y-1">
                <h3 className="text-2xl font-black text-slate-900">
                  {lastResult.percentage >= 70 ? 'Competency Verified! 🎉' : 'Assessment Completed'}
                </h3>
                <p className="text-xs text-slate-500">
                  You scored <strong className="text-indigo-600">{lastResult.percentage}%</strong> ({lastResult.score}/{lastResult.maxScore} points).
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 text-left">
                <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-100 space-y-2">
                  <p className="text-xs font-bold text-emerald-800 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    Key Strengths
                  </p>
                  <ul className="text-xs text-emerald-900 space-y-1">
                    {lastResult.strengths.slice(0, 3).map((st, idx) => (
                      <li key={idx}>• {st}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl bg-amber-50 border border-amber-100 space-y-2">
                  <p className="text-xs font-bold text-amber-800 flex items-center gap-1.5">
                    <AlertTriangle className="w-4 h-4 text-amber-600" />
                    Knowledge Gaps
                  </p>
                  <ul className="text-xs text-amber-900 space-y-1">
                    {lastResult.skillGaps.length > 0 ? (
                      lastResult.skillGaps.slice(0, 3).map((gp, idx) => (
                        <li key={idx}>• {gp}</li>
                      ))
                    ) : (
                      <li>No critical gaps found! Perfect performance.</li>
                    )}
                  </ul>
                </div>
              </div>

              <Button
                variant="purple"
                size="md"
                className="w-full"
                onClick={() => setIsTestModalOpen(false)}
              >
                Return to Skill DNA Dashboard
              </Button>
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center justify-between text-xs font-bold text-slate-600 pb-3 border-b border-slate-100">
                <span>
                  Question {currentQuestionIndex + 1} of {selectedAssessment.questions.length}
                </span>
                <span className="flex items-center gap-1.5 text-indigo-600 bg-indigo-50 px-2.5 py-1 rounded-lg">
                  <Clock className="w-3.5 h-3.5" />
                  {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
                </span>
              </div>

              <ProgressBar
                progress={((currentQuestionIndex + 1) / selectedAssessment.questions.length) * 100}
                color="indigo"
                size="sm"
              />

              {selectedAssessment.questions[currentQuestionIndex] && (
                <div className="space-y-4">
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                      {selectedAssessment.questions[currentQuestionIndex].topic || 'Knowledge Evaluation'}
                    </span>
                    <h4 className="text-base font-bold text-slate-900 leading-snug">
                      {selectedAssessment.questions[currentQuestionIndex].question}
                    </h4>
                  </div>

                  <div className="space-y-2.5 pt-2">
                    {selectedAssessment.questions[currentQuestionIndex].options.map((option, idx) => {
                      const isSelected = userAnswers[selectedAssessment.questions[currentQuestionIndex].id] === idx;
                      return (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSelectOption(idx)}
                          className={`w-full text-left p-3.5 rounded-xl border text-xs font-medium transition-all cursor-pointer flex items-center justify-between ${
                            isSelected
                              ? 'bg-indigo-50/90 border-indigo-500 text-indigo-950 font-bold ring-2 ring-indigo-500/20'
                              : 'bg-white border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50'
                          }`}
                        >
                          <span>{option}</span>
                          <span
                            className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 ${
                              isSelected ? 'border-indigo-600 bg-indigo-600 text-white' : 'border-slate-300'
                            }`}
                          >
                            {isSelected && <span className="w-1.5 h-1.5 bg-white rounded-full"></span>}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handlePrevQuestion}
                  disabled={currentQuestionIndex === 0}
                >
                  Previous
                </Button>

                {currentQuestionIndex < selectedAssessment.questions.length - 1 ? (
                  <Button
                    variant="purple"
                    size="sm"
                    onClick={handleNextQuestion}
                    rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
                  >
                    Next Question
                  </Button>
                ) : (
                  <Button
                    variant="purple"
                    size="sm"
                    onClick={handleSubmitAssessment}
                    isLoading={isSubmitting}
                  >
                    Submit Assessment
                  </Button>
                )}
              </div>
            </div>
          )}
        </Modal>
      )}
    </div>
  );
};
