import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  Circle,
  Plus,
  BookOpen,
  Users2,
  Rocket,
  Award,
  Sparkles,
  Trash2
} from 'lucide-react';
import { RoadmapGoal, RoadmapPhase, GoalCategory } from '../types';
import { triggerCelebration } from '../utils/confetti';

interface RoadmapSectionProps {
  goals: RoadmapGoal[];
  onToggleGoal: (id: string) => void;
  onAddGoal: (goal: Omit<RoadmapGoal, 'id' | 'completed'>) => void;
  onDeleteGoal: (id: string) => void;
}

export const RoadmapSection: React.FC<RoadmapSectionProps> = ({
  goals,
  onToggleGoal,
  onAddGoal,
  onDeleteGoal,
}) => {
  const [selectedPhase, setSelectedPhase] = useState<RoadmapPhase>('30');
  const [isAdding, setIsAdding] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCategory, setNewCategory] = useState<GoalCategory>('learning');

  const phaseMeta: Record<
    RoadmapPhase,
    {
      title: string;
      subtitle: string;
      tagline: string;
      focus: string;
    }
  > = {
    '30': {
      title: 'First 30 Days',
      subtitle: 'Absorb & Listen',
      tagline: 'Understand the business, build trust, and map workflows',
      focus: 'Primary focus: Be an active sponge. Meet 10+ people, absorb architecture, and deliver one safe quick-win.',
    },
    '60': {
      title: 'Days 31–60',
      subtitle: 'Contribute & Align',
      tagline: 'Take ownership of projects and actively invite feedback',
      focus: 'Primary focus: Lead first sprint tasks independently, identify friction points, and request a 60-day check-in.',
    },
    '90': {
      title: 'Days 61–90',
      subtitle: 'Own & Lead',
      tagline: 'Ship impactful initiatives and set long-term targets',
      focus: 'Primary focus: Propose strategic process improvements, mentor newer members, and prepare for your formal 90-day review.',
    },
  };

  const currentGoals = goals.filter((g) => g.phase === selectedPhase);
  const completedGoals = currentGoals.filter((g) => g.completed).length;
  const phasePercent =
    currentGoals.length > 0 ? Math.round((completedGoals / currentGoals.length) * 100) : 0;

  const handleCreateGoal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddGoal({
      phase: selectedPhase,
      title: newTitle.trim(),
      description: newDesc.trim() || 'Custom roadmap milestone.',
      category: newCategory,
      isCustom: true,
    });
    setNewTitle('');
    setNewDesc('');
    setIsAdding(false);
  };

  const handleToggle = (id: string) => {
    const goal = goals.find((g) => g.id === id);
    if (goal && !goal.completed) {
      triggerCelebration();
    }
    onToggleGoal(id);
  };

  const getCategoryBadge = (category: GoalCategory) => {
    switch (category) {
      case 'learning':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 border border-blue-200/60">
            <BookOpen className="w-3 h-3 text-blue-600" /> Learning & Systems
          </span>
        );
      case 'people':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-purple-50 text-purple-700 border border-purple-200/60">
            <Users2 className="w-3 h-3 text-purple-600" /> People & Culture
          </span>
        );
      case 'execution':
        return (
          <span className="inline-flex items-center gap-1 text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
            <Rocket className="w-3 h-3 text-emerald-600" /> Execution & Impact
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              30-60-90 Day Milestone Roadmap
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-violet-50 text-violet-700">
              Career Trajectory
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Structured benchmarks to impress your manager and transition smoothly into full autonomy.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-violet-600 hover:bg-violet-700 text-white shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Milestone
        </button>
      </div>

      {/* Phase Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-6">
        {(['30', '60', '90'] as RoadmapPhase[]).map((phase) => {
          const info = phaseMeta[phase];
          const isSelected = selectedPhase === phase;
          const pGoals = goals.filter((g) => g.phase === phase);
          const pDone = pGoals.filter((g) => g.completed).length;

          return (
            <button
              key={phase}
              onClick={() => setSelectedPhase(phase)}
              className={`p-4 rounded-2xl text-left border transition-all cursor-pointer relative ${
                isSelected
                  ? 'bg-violet-50/70 border-violet-300 ring-2 ring-violet-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-extrabold uppercase tracking-wider ${isSelected ? 'text-violet-900' : 'text-slate-700'}`}>
                  {info.title}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${isSelected ? 'bg-violet-200/70 text-violet-900' : 'bg-slate-200 text-slate-700'}`}>
                  {pDone}/{pGoals.length}
                </span>
              </div>
              <div className="font-bold text-sm text-slate-900 mt-0.5">
                {info.subtitle}
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {info.tagline}
              </p>
            </button>
          );
        })}
      </div>

      {/* Focus banner */}
      <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/80 mb-6 flex items-start gap-2.5">
        <Compass className="w-4 h-4 text-violet-600 shrink-0 mt-0.5" />
        <p className="text-xs text-slate-700 leading-relaxed font-medium">
          {phaseMeta[selectedPhase].focus}
        </p>
      </div>

      {/* Add custom milestone form */}
      {isAdding && (
        <form
          onSubmit={handleCreateGoal}
          className="mb-6 p-4 rounded-2xl bg-violet-50/50 border border-violet-200/80 animate-in fade-in duration-150"
        >
          <div className="text-xs font-bold text-violet-900 mb-2">
            New Goal for {phaseMeta[selectedPhase].title}
          </div>
          <div className="space-y-3">
            <input
              type="text"
              required
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Schedule recurring 1:1 with UX Research lead"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600"
            />
            <textarea
              rows={2}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Brief description or metric of success..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-600 resize-none text-slate-600"
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Category:</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as GoalCategory)}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
                >
                  <option value="learning">Learning & Systems</option>
                  <option value="people">People & Culture</option>
                  <option value="execution">Execution & Impact</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 text-xs font-semibold text-white bg-violet-600 hover:bg-violet-700 rounded-lg shadow-xs"
                >
                  Save Milestone
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Goal Cards */}
      <div className="space-y-3">
        {currentGoals.map((goal) => (
          <div
            key={goal.id}
            className={`p-4 rounded-2xl border transition-all ${
              goal.completed
                ? 'bg-slate-50/50 border-slate-200/60 opacity-80'
                : 'bg-white border-slate-200 hover:border-slate-300 shadow-xs'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3 flex-1">
                <button
                  onClick={() => handleToggle(goal.id)}
                  className="mt-0.5 text-slate-400 hover:text-violet-600 transition-colors cursor-pointer shrink-0"
                >
                  {goal.completed ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-400 hover:text-violet-600" />
                  )}
                </button>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    {getCategoryBadge(goal.category)}
                    {goal.isCustom && (
                      <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                        Custom
                      </span>
                    )}
                  </div>
                  <h4
                    className={`text-sm font-semibold ${
                      goal.completed ? 'line-through text-slate-400' : 'text-slate-900'
                    }`}
                  >
                    {goal.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {goal.description}
                  </p>
                </div>
              </div>

              {goal.isCustom && (
                <button
                  onClick={() => onDeleteGoal(goal.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete milestone"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
