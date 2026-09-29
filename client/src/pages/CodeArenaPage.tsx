import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { api } from '../services/api';
import { CodingProblem, CodeSubmission, CodeExecutionResult } from '../types';
import Editor from '@monaco-editor/react';
import confetti from 'canvas-confetti';
import {
  Code2,
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  Cpu,
  Search,
  History,
  Terminal,
  ChevronRight,
  Sparkles,
  AlertCircle,
  FileCode,
} from 'lucide-react';

export const CodeArenaPage: React.FC = () => {
  const [problems, setProblems] = useState<CodingProblem[]>([]);
  const [selectedProblem, setSelectedProblem] = useState<CodingProblem | null>(null);
  const [language, setLanguage] = useState<'python' | 'javascript'>('python');
  const [code, setCode] = useState<string>('');
  const [search, setSearch] = useState('');
  const [difficultyFilter, setDifficultyFilter] = useState('All');
  const [isRunning, setIsRunning] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [activeTab, setActiveTab] = useState<'description' | 'submissions'>('description');
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [submissions, setSubmissions] = useState<CodeSubmission[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProblems() {
      try {
        const data = await api.getProblems();
        setProblems(data);
        if (data.length > 0) {
          loadProblemDetails(data[0].slug);
        }
      } finally {
        setLoading(false);
      }
    }
    loadProblems();
  }, []);

  const loadProblemDetails = async (slug: string) => {
    try {
      const details = await api.getProblem(slug);
      setSelectedProblem(details);
      setCode(details.starterCode[language] || details.starterCode.python || '');
      setExecutionResult(null);

      // Load previous submissions for this problem
      const subs = await api.getSubmissions(details.id).catch(() => []);
      setSubmissions(subs);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLanguageChange = (newLang: 'python' | 'javascript') => {
    setLanguage(newLang);
    if (selectedProblem) {
      setCode(selectedProblem.starterCode[newLang] || '');
    }
  };

  const handleRunCode = async () => {
    if (!selectedProblem) return;
    setIsRunning(true);
    try {
      const result = await api.runCode(selectedProblem.id, language, code);
      setExecutionResult(result);
    } catch (err: any) {
      setExecutionResult({
        status: 'RUNTIME_ERROR',
        runtimeMs: 0,
        memoryKb: 0,
        testCasesPassed: 0,
        totalTestCases: 0,
        errorOutput: err.message,
      });
    } finally {
      setIsRunning(false);
    }
  };

  const handleSubmitSolution = async () => {
    if (!selectedProblem) return;
    setIsSubmitting(true);
    try {
      const { submission, result } = await api.submitCode(selectedProblem.id, language, code);
      setExecutionResult(result);
      setSubmissions((prev) => [submission, ...prev]);

      if (result.status === 'ACCEPTED') {
        confetti({
          particleCount: 80,
          spread: 60,
          origin: { y: 0.7 },
        });
      }
    } catch (err: any) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const filteredProblems = problems.filter((p) => {
    if (difficultyFilter !== 'All' && p.difficulty !== difficultyFilter) return false;
    if (search && !p.title.toLowerCase().includes(search.toLowerCase()) && !p.category.toLowerCase().includes(search.toLowerCase()))
      return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-600">
              <Code2 className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Code Arena</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            20+ technical interview algorithms with live sandboxed test-case verification and submission logs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Badge variant="purple" size="md">Judge0 Sandbox Verified</Badge>
        </div>
      </div>

      {/* Main Split Interface */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left Column (4 cols): Problem Selector & Problem Statement */}
        <div className="lg:col-span-5 space-y-4">
          {/* Quick Problem Selector Accordion / Drawer */}
          <Card className="p-4 space-y-3">
            <div className="flex items-center justify-between gap-2">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Filter 20+ problems..."
                  className="w-full pl-8 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-medium focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <select
                value={difficultyFilter}
                onChange={(e) => setDifficultyFilter(e.target.value)}
                className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-slate-700"
              >
                <option value="All">All Levels</option>
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>

            {/* Scrollable Problem List */}
            <div className="max-h-48 overflow-y-auto space-y-1 pr-1">
              {filteredProblems.map((p) => {
                const isCurrent = p.id === selectedProblem?.id;
                return (
                  <button
                    key={p.id}
                    onClick={() => loadProblemDetails(p.slug)}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs flex items-center justify-between transition-all cursor-pointer ${
                      isCurrent
                        ? 'bg-indigo-50 font-bold text-indigo-900 border border-indigo-200'
                        : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                    }`}
                  >
                    <span className="truncate">{p.title}</span>
                    <Badge variant={p.difficulty.toLowerCase() as any} size="sm">
                      {p.difficulty}
                    </Badge>
                  </button>
                );
              })}
            </div>
          </Card>

          {/* Problem Statement Card */}
          {selectedProblem && (
            <Card className="p-6 space-y-5">
              {/* Tab Header */}
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setActiveTab('description')}
                    className={`text-xs font-bold pb-1 transition-all cursor-pointer ${
                      activeTab === 'description'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    Problem Statement
                  </button>
                  <button
                    onClick={() => setActiveTab('submissions')}
                    className={`text-xs font-bold pb-1 transition-all cursor-pointer ${
                      activeTab === 'submissions'
                        ? 'text-indigo-600 border-b-2 border-indigo-600'
                        : 'text-slate-500 hover:text-slate-900'
                    }`}
                  >
                    My Submissions ({submissions.length})
                  </button>
                </div>

                <Badge variant={selectedProblem.difficulty.toLowerCase() as any} size="sm">
                  {selectedProblem.difficulty}
                </Badge>
              </div>

              {activeTab === 'description' ? (
                <div className="space-y-4 max-h-[500px] overflow-y-auto pr-1">
                  <div>
                    <h3 className="text-lg font-black text-slate-900">{selectedProblem.title}</h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5">
                      Category: {selectedProblem.category} • Acceptance: {selectedProblem.acceptanceRate}%
                    </p>
                  </div>

                  <div className="text-xs text-slate-700 whitespace-pre-line leading-relaxed">
                    {selectedProblem.description}
                  </div>

                  {/* Examples */}
                  <div className="space-y-3 pt-2">
                    <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Examples</h4>
                    {selectedProblem.examples.map((ex, idx) => (
                      <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-200/70 text-xs font-mono space-y-1">
                        <p><strong className="text-slate-600">Input:</strong> {ex.input}</p>
                        <p><strong className="text-slate-600">Output:</strong> {ex.output}</p>
                        {ex.explanation && (
                          <p className="text-[11px] text-slate-500 font-sans mt-1">
                            <em>Explanation:</em> {ex.explanation}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Constraints */}
                  {selectedProblem.constraints && selectedProblem.constraints.length > 0 && (
                    <div className="space-y-2 pt-2">
                      <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Constraints</h4>
                      <ul className="list-disc list-inside text-xs text-slate-600 space-y-1 font-mono">
                        {selectedProblem.constraints.map((c, idx) => (
                          <li key={idx}>{c}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              ) : (
                /* Submissions History Tab */
                <div className="space-y-2 max-h-[500px] overflow-y-auto pr-1">
                  {submissions.length === 0 ? (
                    <p className="text-xs text-slate-500 text-center py-8">No submissions yet for this problem.</p>
                  ) : (
                    submissions.map((sub) => (
                      <div
                        key={sub.id}
                        className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between"
                      >
                        <div className="flex items-center gap-2.5">
                          {sub.status === 'ACCEPTED' ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-rose-500" />
                          )}
                          <div>
                            <span className="font-bold text-slate-900 capitalize">{sub.status.replace(/_/g, ' ')}</span>
                            <p className="text-[10px] text-slate-400 font-mono capitalize">{sub.language}</p>
                          </div>
                        </div>

                        <div className="text-right text-[11px] text-slate-500">
                          <span>{sub.runtimeMs}ms</span> • <span>{sub.testCasesPassed}/{sub.totalTestCases} passed</span>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              )}
            </Card>
          )}
        </div>

        {/* Right Column (7 cols): Code Editor & Execution Results */}
        <div className="lg:col-span-7 space-y-4">
          <Card className="overflow-hidden border-slate-200 shadow-sm flex flex-col">
            {/* Editor Top Bar */}
            <div className="px-4 py-2.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <FileCode className="w-4 h-4 text-indigo-400" />
                <span className="text-xs font-bold text-slate-200">Solution Code</span>
                <div className="flex items-center gap-1 bg-slate-800 p-1 rounded-lg">
                  <button
                    onClick={() => handleLanguageChange('python')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      language === 'python' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Python 3
                  </button>
                  <button
                    onClick={() => handleLanguageChange('javascript')}
                    className={`px-2 py-0.5 rounded text-[11px] font-bold transition-all cursor-pointer ${
                      language === 'javascript' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    JavaScript
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleRunCode}
                  isLoading={isRunning}
                  leftIcon={<Play className="w-3.5 h-3.5" />}
                  className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700 text-xs py-1"
                >
                  Run Code
                </Button>
                <Button
                  variant="purple"
                  size="sm"
                  onClick={handleSubmitSolution}
                  isLoading={isSubmitting}
                  leftIcon={<Send className="w-3.5 h-3.5" />}
                  className="text-xs py-1 shadow-xs"
                >
                  Submit
                </Button>
              </div>
            </div>

            {/* Monaco Code Editor */}
            <div className="h-96 w-full bg-[#1e1e1e]">
              <Editor
                height="100%"
                language={language}
                theme="vs-dark"
                value={code}
                onChange={(val) => setCode(val || '')}
                options={{
                  minimap: { enabled: false },
                  fontSize: 13,
                  lineNumbers: 'on',
                  scrollBeyondLastLine: false,
                  automaticLayout: true,
                  tabSize: 4,
                }}
              />
            </div>

            {/* Execution Test Cases Results Panel */}
            {executionResult && (
              <div className="p-5 border-t border-slate-200 bg-white space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {executionResult.status === 'ACCEPTED' ? (
                      <Badge variant="success" size="md">Accepted</Badge>
                    ) : (
                      <Badge variant="danger" size="md">{executionResult.status.replace(/_/g, ' ')}</Badge>
                    )}
                    <span className="text-xs text-slate-500">
                      {executionResult.testCasesPassed}/{executionResult.totalTestCases} Test Suites Passed
                    </span>
                  </div>

                  <div className="flex items-center gap-3 text-xs text-slate-500">
                    <span className="flex items-center gap-1 font-mono">
                      <Clock className="w-3 h-3 text-slate-400" />
                      {executionResult.runtimeMs} ms
                    </span>
                    <span className="flex items-center gap-1 font-mono">
                      <Cpu className="w-3 h-3 text-slate-400" />
                      {(executionResult.memoryKb / 1024).toFixed(1)} MB
                    </span>
                  </div>
                </div>

                {executionResult.errorOutput && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs font-mono text-rose-700 whitespace-pre-line">
                    {executionResult.errorOutput}
                  </div>
                )}

                {executionResult.details && executionResult.details.length > 0 && (
                  <div className="space-y-2 pt-1">
                    {executionResult.details.map((d, idx) => (
                      <div
                        key={idx}
                        className={`p-3 rounded-xl border text-xs font-mono flex items-center justify-between ${
                          d.passed ? 'bg-emerald-50/50 border-emerald-100 text-emerald-950' : 'bg-rose-50/50 border-rose-100 text-rose-950'
                        }`}
                      >
                        <div>
                          <span>Case {d.testCaseIndex}: </span>
                          <span className="text-slate-600">Input: {d.input}</span>
                        </div>
                        <span className="font-bold">{d.passed ? 'Passed ✓' : 'Failed ✗'}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};
