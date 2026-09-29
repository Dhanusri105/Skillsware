import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ProgressBar } from '../components/common/ProgressBar';
import { api } from '../services/api';
import { Roadmap, RoadmapPhase, RoadmapTask } from '../types';
import {
  Map,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  Calendar,
  Layers,
  ChevronDown,
  ChevronUp,
  Target,
  Plus,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';

export const RoadmapPage: React.FC = () => {
  const [roadmaps, setRoadmaps] = useState<Roadmap[]>([]);
  const [activeRoadmap, setActiveRoadmap] = useState<Roadmap | null>(null);
  const [isGenerateModalOpen, setIsGenerateModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [collapsedPhases, setCollapsedPhases] = useState<Record<string, boolean>>({});

  const [careerGoal, setCareerGoal] = useState('Full Stack Developer');
  const [currentLevel, setCurrentLevel] = useState('BEGINNER');
  const [targetLevel, setTargetLevel] = useState('ADVANCED');
  const [weeklyHours, setWeeklyHours] = useState(12);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    async function fetchRoadmaps() {
      try {
        const data = await api.getRoadmaps();
        setRoadmaps(data);
        if (data.length > 0) setActiveRoadmap(data[0]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchRoadmaps();
  }, []);

  const handleToggleTask = async (phaseId: string, task: RoadmapTask) => {
    if (!activeRoadmap) return;
    const newStatus = !task.isCompleted;

    const updatedPhases = activeRoadmap.phases.map((phase) => {
      if (phase.id === phaseId) {
        return {
          ...phase,
          tasks: phase.tasks.map((t) =>
            t.id === task.id ? { ...t, isCompleted: newStatus, completedAt: newStatus ? new Date().toISOString() : null } : t
          ),
        };
      }
      return phase;
    });

    let totalTasks = 0;
    let completedTasks = 0;
    updatedPhases.forEach((p) =>
      p.tasks.forEach((t) => {
        totalTasks++;
        if (t.isCompleted) completedTasks++;
      })
    );
    const newProgress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    setActiveRoadmap({
      ...activeRoadmap,
      phases: updatedPhases,
      progressPercentage: newProgress,
    });

    try {
      await api.toggleRoadmapTask(activeRoadmap.id, task.id, newStatus);
    } catch (err) {
      console.error('Failed to sync task state with server:', err);
    }
  };

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    try {
      const generated = await api.generateRoadmap({
        careerGoal,
        currentLevel,
        targetLevel,
        weeklyHours,
      });
      setRoadmaps((prev) => [generated, ...prev]);
      setActiveRoadmap(generated);
      setIsGenerateModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePhaseCollapse = (phaseId: string) => {
    setCollapsedPhases((prev) => ({ ...prev, [phaseId]: !prev[phaseId] }));
  };

  const careerOptions = [
    'Full Stack Developer',
    'Python Developer',
    'Frontend Developer',
    'Backend Developer',
    'Java Developer',
    'Software Engineer',
    'Data Analyst',
  ];

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Map className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Personalized Learning Roadmap</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured milestone phases designed to systematically transition you from beginner to job-ready.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            variant="purple"
            size="sm"
            onClick={() => setIsGenerateModalOpen(true)}
            leftIcon={<Plus className="w-4 h-4" />}
          >
            Create New Career Path
          </Button>
        </div>
      </div>

      {/* Career Path Selector Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {roadmaps.map((r) => (
          <button
            key={r.id}
            onClick={() => setActiveRoadmap(r)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-2 ${
              activeRoadmap?.id === r.id
                ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/25'
                : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300 hover:bg-indigo-50/50'
            }`}
          >
            <span>{r.careerGoal}</span>
            <span
              className={`px-1.5 py-0.5 rounded text-[10px] ${
                activeRoadmap?.id === r.id ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-600'
              }`}
            >
              {r.progressPercentage}%
            </span>
          </button>
        ))}
      </div>

      {/* Active Roadmap Hero Card */}
      {activeRoadmap && (
        <Card className="p-6 sm:p-8 space-y-6 bg-gradient-to-br from-white to-indigo-50/30">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <Badge variant="purple" size="sm">{activeRoadmap.careerGoal}</Badge>
                <Badge variant="neutral" size="sm">{activeRoadmap.weeklyHours} hrs/week</Badge>
              </div>
              <h2 className="text-2xl font-black text-slate-900">{activeRoadmap.title}</h2>
              <p className="text-xs text-slate-600 max-w-2xl">{activeRoadmap.description}</p>
            </div>

            <div className="p-4 bg-white rounded-2xl border border-indigo-100 shadow-xs min-w-[200px] text-center space-y-2">
              <div className="flex justify-between items-center text-xs font-bold text-slate-700">
                <span>Overall Completion</span>
                <span className="text-indigo-600 text-base">{activeRoadmap.progressPercentage}%</span>
              </div>
              <ProgressBar progress={activeRoadmap.progressPercentage} color="purple" size="md" />
              <p className="text-[10px] text-slate-400 font-medium">Estimated completion: ~8 weeks</p>
            </div>
          </div>

          {/* Timeline Phases */}
          <div className="space-y-6 pt-4 border-t border-slate-200/60">
            {activeRoadmap.phases.map((phase) => {
              const isCollapsed = collapsedPhases[phase.id];
              const completedCount = phase.tasks.filter((t) => t.isCompleted).length;
              const phaseProgress = phase.tasks.length > 0 ? Math.round((completedCount / phase.tasks.length) * 100) : 0;

              return (
                <div key={phase.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-2xs">
                  {/* Phase Header */}
                  <div
                    onClick={() => togglePhaseCollapse(phase.id)}
                    className="p-5 flex items-center justify-between bg-slate-50/70 hover:bg-slate-100/70 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-indigo-600 text-white text-xs font-black flex items-center justify-center shadow-xs">
                        0{phase.order}
                      </span>
                      <div>
                        <h3 className="text-sm font-bold text-slate-900">{phase.title}</h3>
                        <p className="text-xs text-slate-500 mt-0.5">{phase.description}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-2 text-xs font-bold text-slate-600">
                        <span>{completedCount}/{phase.tasks.length} tasks</span>
                        <span className="text-indigo-600">({phaseProgress}%)</span>
                      </div>
                      <button className="p-1 text-slate-400">
                        {isCollapsed ? <ChevronDown className="w-5 h-5" /> : <ChevronUp className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>

                  {/* Tasks List */}
                  {!isCollapsed && (
                    <div className="p-5 space-y-3 divide-y divide-slate-100">
                      {phase.tasks.map((task) => (
                        <div
                          key={task.id}
                          className={`pt-3 first:pt-0 flex items-start justify-between gap-4 group transition-all ${
                            task.isCompleted ? 'opacity-80' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <button
                              type="button"
                              onClick={() => handleToggleTask(phase.id, task)}
                              className="mt-0.5 text-indigo-600 hover:scale-110 transition-transform cursor-pointer"
                            >
                              {task.isCompleted ? (
                                <CheckCircle2 className="w-5 h-5 text-emerald-500 fill-emerald-50" />
                              ) : (
                                <Circle className="w-5 h-5 text-slate-300 hover:text-indigo-600" />
                              )}
                            </button>

                            <div className="space-y-1">
                              <h4
                                className={`text-xs font-bold text-slate-900 ${
                                  task.isCompleted ? 'line-through text-slate-400' : ''
                                }`}
                              >
                                {task.title}
                              </h4>
                              <p className="text-[11px] text-slate-500">{task.description}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-2 shrink-0">
                            <Badge variant={task.type === 'PROJECT' ? 'purple' : task.type === 'PRACTICE' ? 'success' : 'neutral'} size="sm">
                              {task.type}
                            </Badge>
                            <span className="text-[11px] text-slate-400 font-medium flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {task.durationHours}h
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      )}

      {/* Generate Roadmap Modal */}
      <Modal
        isOpen={isGenerateModalOpen}
        onClose={() => setIsGenerateModalOpen(false)}
        title="Generate Personalized Roadmap"
        maxWidth="lg"
      >
        <form onSubmit={handleGenerate} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Select Career Goal
            </label>
            <select
              value={careerGoal}
              onChange={(e) => setCareerGoal(e.target.value)}
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900 focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            >
              {careerOptions.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Current Level
              </label>
              <select
                value={currentLevel}
                onChange={(e) => setCurrentLevel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              >
                <option value="BEGINNER">Beginner</option>
                <option value="INTERMEDIATE">Intermediate</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Target Level
              </label>
              <select
                value={targetLevel}
                onChange={(e) => setTargetLevel(e.target.value)}
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              >
                <option value="ADVANCED">Job Ready / Advanced</option>
                <option value="INTERMEDIATE">Intermediate</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Weekly Study Commitment: <span className="text-indigo-600 font-bold">{weeklyHours} Hours</span>
            </label>
            <input
              type="range"
              min={5}
              max={30}
              step={1}
              value={weeklyHours}
              onChange={(e) => setWeeklyHours(parseInt(e.target.value, 10))}
              className="w-full accent-indigo-600"
            />
          </div>

          <div className="pt-2">
            <Button
              type="submit"
              variant="purple"
              size="lg"
              className="w-full"
              isLoading={isGenerating}
            >
              Generate Customized Learning Path
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
