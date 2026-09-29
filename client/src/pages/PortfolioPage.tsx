import React, { useState, useEffect } from 'react';
import { Card } from '../components/common/Card';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { useAuth } from '../contexts/AuthContext';
import { api } from '../services/api';
import { Portfolio, PortfolioProject, Certification } from '../types';
import {
  Briefcase,
  Plus,
  Trash2,
  ExternalLink,
  Award,
  Globe,
  Share2,
  Printer,
  Sparkles,
  CheckCircle2,
  Copy,
  Eye,
  GitBranch,
} from 'lucide-react';

export const PortfolioPage: React.FC = () => {
  const { user } = useAuth();
  const [portfolio, setPortfolio] = useState<Portfolio | null>(null);
  const [headline, setHeadline] = useState('');
  const [summary, setSummary] = useState('');
  const [customSlug, setCustomSlug] = useState('smily');
  const [themeTemplate, setThemeTemplate] = useState('modern-indigo');
  const [isPublished, setIsPublished] = useState(true);
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // New Project modal state
  const [isProjectModalOpen, setIsProjectModalOpen] = useState(false);
  const [newProjectTitle, setNewProjectTitle] = useState('');
  const [newProjectDesc, setNewProjectDesc] = useState('');
  const [newProjectTech, setNewProjectTech] = useState('');
  const [newProjectLiveUrl, setNewProjectLiveUrl] = useState('');
  const [newProjectGithubUrl, setNewProjectGithubUrl] = useState('');

  // New Certification modal state
  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [newCertTitle, setNewCertTitle] = useState('');
  const [newCertIssuer, setNewCertIssuer] = useState('Skillsware Academy');
  const [newCertUrl, setNewCertUrl] = useState('');
  const [newCertId, setNewCertId] = useState('');

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await api.getPortfolio();
        setPortfolio(data);
        setHeadline(data.headline || 'B.Tech Student & Aspiring Full Stack Engineer');
        setSummary(data.summary || 'Building scalable web applications, algorithm systems, and developer tools.');
        setCustomSlug(data.customSlug || 'smily');
        setThemeTemplate(data.themeTemplate || 'modern-indigo');
        setIsPublished(data.isPublished ?? true);
        setProjects(data.projects || []);
        setCertifications(data.certifications || []);
      } catch (err) {
        console.error(err);
      }
    }
    loadPortfolio();
  }, []);

  const handleSavePortfolio = async () => {
    setIsSaving(true);
    setSaveSuccess(false);
    try {
      const updated = await api.updatePortfolio({
        headline,
        summary,
        customSlug,
        themeTemplate,
        isPublished,
        projects,
        certifications,
      });
      setPortfolio(updated);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleAddProject = (e: React.FormEvent) => {
    e.preventDefault();
    const techArray = newProjectTech.split(',').map((t) => t.trim()).filter(Boolean);
    const newProj: PortfolioProject = {
      title: newProjectTitle,
      description: newProjectDesc,
      technologies: techArray.length > 0 ? techArray : ['React', 'TypeScript'],
      liveUrl: newProjectLiveUrl,
      githubUrl: newProjectGithubUrl,
      featured: true,
    };
    setProjects((prev) => [...prev, newProj]);
    setIsProjectModalOpen(false);
    setNewProjectTitle('');
    setNewProjectDesc('');
    setNewProjectTech('');
    setNewProjectLiveUrl('');
    setNewProjectGithubUrl('');
  };

  const handleAddCert = (e: React.FormEvent) => {
    e.preventDefault();
    const newCert: Certification = {
      title: newCertTitle,
      issuer: newCertIssuer,
      credentialUrl: newCertUrl || 'https://skillsware.dev/verify',
      credentialId: newCertId || `SW-2026-${Math.floor(Math.random() * 9000 + 1000)}`,
      issueDate: new Date(),
    };
    setCertifications((prev) => [...prev, newCert]);
    setIsCertModalOpen(false);
    setNewCertTitle('');
    setNewCertUrl('');
    setNewCertId('');
  };

  const removeProject = (index: number) => {
    setProjects((prev) => prev.filter((_, idx) => idx !== index));
  };

  const removeCert = (index: number) => {
    setCertifications((prev) => prev.filter((_, idx) => idx !== index));
  };

  const copyPublicLink = () => {
    const url = `${window.location.origin}/p/${customSlug}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-8 pb-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-purple-50 text-purple-600">
              <Briefcase className="w-5 h-5" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-slate-900">Portfolio Builder</h1>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Build, customize, and publish your professional engineering portfolio.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button
            variant="secondary"
            size="sm"
            onClick={copyPublicLink}
            leftIcon={<Share2 className="w-4 h-4 text-slate-600" />}
          >
            {copiedLink ? 'Link Copied!' : 'Share Public Link'}
          </Button>
          <a href={`/p/${customSlug}`} target="_blank" rel="noreferrer">
            <Button
              variant="outline"
              size="sm"
              leftIcon={<Eye className="w-4 h-4" />}
            >
              Live Preview
            </Button>
          </a>
          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            leftIcon={<Printer className="w-4 h-4" />}
          >
            Print / PDF
          </Button>
          <Button
            variant="purple"
            size="sm"
            onClick={handleSavePortfolio}
            isLoading={isSaving}
          >
            {saveSuccess ? 'Changes Saved ✓' : 'Save Portfolio'}
          </Button>
        </div>
      </div>

      {/* Main Form & Settings */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left 2 Cols: Content Editor */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="p-6 space-y-4">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Profile Headline & Summary
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Professional Headline
                </label>
                <input
                  type="text"
                  value={headline}
                  onChange={(e) => setHeadline(e.target.value)}
                  placeholder="e.g. B.Tech Computer Science Student | Aspiring Full Stack Engineer"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Professional Summary
                </label>
                <textarea
                  rows={3}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Summarize your engineering expertise, favorite tech stacks, and career ambitions..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
                />
              </div>
            </div>
          </Card>

          {/* Projects Manager */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Showcase Projects ({projects.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsProjectModalOpen(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Project
              </Button>
            </div>

            <div className="space-y-3">
              {projects.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No projects added yet.</p>
              ) : (
                projects.map((proj, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-start justify-between gap-4"
                  >
                    <div className="space-y-1.5">
                      <h4 className="text-xs font-bold text-slate-900">{proj.title}</h4>
                      <p className="text-[11px] text-slate-600">{proj.description}</p>
                      <div className="flex flex-wrap gap-1 pt-1">
                        {proj.technologies.map((t, tIdx) => (
                          <span
                            key={tIdx}
                            className="px-2 py-0.5 rounded bg-white border border-slate-200 text-[10px] font-medium text-slate-700"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => removeProject(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Certifications Manager */}
          <Card className="p-6 space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Certifications & Achievements ({certifications.length})
              </h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsCertModalOpen(true)}
                leftIcon={<Plus className="w-3.5 h-3.5" />}
              >
                Add Certificate
              </Button>
            </div>

            <div className="space-y-3">
              {certifications.length === 0 ? (
                <p className="text-xs text-slate-400 py-4 text-center">No certifications added yet.</p>
              ) : (
                certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-4"
                  >
                    <div className="flex items-center gap-3">
                      <Award className="w-5 h-5 text-indigo-600 shrink-0" />
                      <div>
                        <h4 className="text-xs font-bold text-slate-900">{cert.title}</h4>
                        <p className="text-[10px] text-slate-500">{cert.issuer} • ID: {cert.credentialId}</p>
                      </div>
                    </div>

                    <button
                      onClick={() => removeCert(idx)}
                      className="p-1 text-slate-400 hover:text-rose-600 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
          </Card>
        </div>

        {/* Right Col: Theme & Publish Settings */}
        <div className="space-y-6">
          <Card className="p-6 space-y-5">
            <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
              Portfolio Settings
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Custom Shareable Handle
                </label>
                <div className="flex items-center gap-1 text-xs">
                  <span className="text-slate-400">skillsware.dev/p/</span>
                  <input
                    type="text"
                    value={customSlug}
                    onChange={(e) => setCustomSlug(e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, ''))}
                    className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-xs font-bold text-indigo-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                  Visual Theme Template
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { id: 'modern-indigo', label: 'Modern Indigo', color: 'bg-indigo-600' },
                    { id: 'cyber-dark', label: 'Cyber Dark', color: 'bg-slate-900' },
                    { id: 'emerald-clean', label: 'Emerald Clean', color: 'bg-emerald-600' },
                    { id: 'royal-purple', label: 'Royal Purple', color: 'bg-purple-600' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setThemeTemplate(t.id)}
                      className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
                        themeTemplate === t.id
                          ? 'border-indigo-600 bg-indigo-50/50 text-indigo-950 font-bold'
                          : 'border-slate-200 text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${t.color}`}></span>
                      <span>{t.label}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-900">Public Visibility</p>
                  <p className="text-[10px] text-slate-500">Allow recruiters to view your public link</p>
                </div>
                <input
                  type="checkbox"
                  checked={isPublished}
                  onChange={(e) => setIsPublished(e.target.checked)}
                  className="w-4 h-4 rounded text-indigo-600 focus:ring-indigo-500"
                />
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Add Project Modal */}
      <Modal
        isOpen={isProjectModalOpen}
        onClose={() => setIsProjectModalOpen(false)}
        title="Add Showcase Project"
        maxWidth="lg"
      >
        <form onSubmit={handleAddProject} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Project Title</label>
            <input
              type="text"
              value={newProjectTitle}
              onChange={(e) => setNewProjectTitle(e.target.value)}
              placeholder="e.g. Distributed Task Scheduler"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Description</label>
            <textarea
              rows={3}
              value={newProjectDesc}
              onChange={(e) => setNewProjectDesc(e.target.value)}
              placeholder="Describe what you built, key engineering problems solved, and impact..."
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Technologies (comma separated)
            </label>
            <input
              type="text"
              value={newProjectTech}
              onChange={(e) => setNewProjectTech(e.target.value)}
              placeholder="React, TypeScript, Node.js, PostgreSQL"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Live Demo URL</label>
              <input
                type="url"
                value={newProjectLiveUrl}
                onChange={(e) => setNewProjectLiveUrl(e.target.value)}
                placeholder="https://myproject.dev"
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">GitHub Repository</label>
              <input
                type="url"
                value={newProjectGithubUrl}
                onChange={(e) => setNewProjectGithubUrl(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              />
            </div>
          </div>

          <Button type="submit" variant="purple" size="lg" className="w-full">
            Add to Portfolio
          </Button>
        </form>
      </Modal>

      {/* Add Certification Modal */}
      <Modal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        title="Add Certification"
        maxWidth="md"
      >
        <form onSubmit={handleAddCert} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Certificate Name</label>
            <input
              type="text"
              value={newCertTitle}
              onChange={(e) => setNewCertTitle(e.target.value)}
              placeholder="e.g. Full Stack Web Development Specialist"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Issuer</label>
            <input
              type="text"
              value={newCertIssuer}
              onChange={(e) => setNewCertIssuer(e.target.value)}
              placeholder="Skillsware Academy"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Credential ID</label>
            <input
              type="text"
              value={newCertId}
              onChange={(e) => setNewCertId(e.target.value)}
              placeholder="SW-2026-XXXX"
              className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-medium text-slate-900"
            />
          </div>

          <Button type="submit" variant="purple" size="lg" className="w-full">
            Save Certification
          </Button>
        </form>
      </Modal>
    </div>
  );
};
