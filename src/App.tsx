import React, { useState, useEffect } from 'react';
import {
  CheckSquare,
  Compass,
  HelpCircle,
  Mic,
  FileText,
  Sparkles,
  PartyPopper,
  Calendar,
  Briefcase,
  ShieldCheck,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

import {
  JobDetails,
  ChecklistItem,
  RoadmapGoal,
  CheatSheetQuestion,
  ElevatorPitchData,
  OnboardingNote,
} from './types';

import {
  initialJobDetails,
  initialChecklist,
  initialRoadmap,
  initialQuestions,
  initialPitch,
  initialNotes,
} from './data/defaultData';

import { loadFromStorage, saveToStorage } from './utils/storage';
import { triggerCelebration, triggerMilestoneCelebration } from './utils/confetti';

import { Header } from './components/Header';
import { CountdownHero } from './components/CountdownHero';
import { JobDetailsModal } from './components/JobDetailsModal';
import { ChecklistSection } from './components/ChecklistSection';
import { RoadmapSection } from './components/RoadmapSection';
import { QuestionsBank } from './components/QuestionsBank';
import { ElevatorPitchBuilder } from './components/ElevatorPitchBuilder';
import { DailyLogSection } from './components/DailyLogSection';

type ActiveView = 'checklist' | 'roadmap' | 'questions' | 'pitch' | 'log';

export default function App() {
  // State with localStorage persistence
  const [job, setJob] = useState<JobDetails>(() =>
    loadFromStorage('job_details', initialJobDetails)
  );

  const [checklist, setChecklist] = useState<ChecklistItem[]>(() =>
    loadFromStorage('job_checklist', initialChecklist)
  );

  const [roadmap, setRoadmap] = useState<RoadmapGoal[]>(() =>
    loadFromStorage('job_roadmap', initialRoadmap)
  );

  const [questions, setQuestions] = useState<CheatSheetQuestion[]>(() =>
    loadFromStorage('job_questions', initialQuestions)
  );

  const [pitch, setPitch] = useState<ElevatorPitchData>(() =>
    loadFromStorage('job_pitch', initialPitch)
  );

  const [notes, setNotes] = useState<OnboardingNote[]>(() =>
    loadFromStorage('job_notes', initialNotes)
  );

  const [activeView, setActiveView] = useState<ActiveView>('checklist');
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  // Sync to storage
  useEffect(() => {
    saveToStorage('job_details', job);
  }, [job]);

  useEffect(() => {
    saveToStorage('job_checklist', checklist);
  }, [checklist]);

  useEffect(() => {
    saveToStorage('job_roadmap', roadmap);
  }, [roadmap]);

  useEffect(() => {
    saveToStorage('job_questions', questions);
  }, [questions]);

  useEffect(() => {
    saveToStorage('job_pitch', pitch);
  }, [pitch]);

  useEffect(() => {
    saveToStorage('job_notes', notes);
  }, [notes]);

  // Overall readiness score calculation
  const totalChecklist = checklist.length;
  const completedChecklist = checklist.filter((i) => i.completed).length;
  const readinessPercentage =
    totalChecklist > 0 ? Math.round((completedChecklist / totalChecklist) * 100) : 0;

  // Handlers for Checklist
  const handleToggleChecklistItem = (id: string) => {
    setChecklist((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const handleAddChecklistItem = (
    itemData: Omit<ChecklistItem, 'id' | 'completed'>
  ) => {
    const newItem: ChecklistItem = {
      ...itemData,
      id: 'custom-' + Date.now(),
      completed: false,
    };
    setChecklist((prev) => [newItem, ...prev]);
  };

  const handleDeleteChecklistItem = (id: string) => {
    setChecklist((prev) => prev.filter((item) => item.id !== id));
  };

  // Handlers for Roadmap
  const handleToggleRoadmapGoal = (id: string) => {
    setRoadmap((prev) =>
      prev.map((g) => (g.id === id ? { ...g, completed: !g.completed } : g))
    );
  };

  const handleAddRoadmapGoal = (
    goalData: Omit<RoadmapGoal, 'id' | 'completed'>
  ) => {
    const newGoal: RoadmapGoal = {
      ...goalData,
      id: 'goal-' + Date.now(),
      completed: false,
    };
    setRoadmap((prev) => [newGoal, ...prev]);
  };

  const handleDeleteRoadmapGoal = (id: string) => {
    setRoadmap((prev) => prev.filter((g) => g.id !== id));
  };

  // Handlers for Questions
  const handleUpdateQuestionNote = (id: string, userNotes: string) => {
    setQuestions((prev) =>
      prev.map((q) => (q.id === id ? { ...q, userNotes } : q))
    );
  };

  const handleAddQuestion = (qData: Omit<CheatSheetQuestion, 'id'>) => {
    const newQ: CheatSheetQuestion = {
      ...qData,
      id: 'q-' + Date.now(),
    };
    setQuestions((prev) => [newQ, ...prev]);
  };

  // Handlers for Daily Log
  const handleAddNote = (noteData: Omit<OnboardingNote, 'id'>) => {
    const newNote: OnboardingNote = {
      ...noteData,
      id: 'note-' + Date.now(),
    };
    setNotes((prev) => [newNote, ...prev]);
    triggerCelebration();
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  const navigationTabs: {
    id: ActiveView;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
  }[] = [
    {
      id: 'checklist',
      label: 'Readiness Checklist',
      icon: <CheckSquare className="w-4 h-4" />,
      badge: `${completedChecklist}/${totalChecklist}`,
    },
    {
      id: 'roadmap',
      label: '30-60-90 Day Plan',
      icon: <Compass className="w-4 h-4" />,
    },
    {
      id: 'questions',
      label: 'Smart 1:1 Questions',
      icon: <HelpCircle className="w-4 h-4" />,
      badge: `${questions.filter((q) => q.userNotes.trim().length > 0).length} noted`,
    },
    {
      id: 'pitch',
      label: '30-Sec Elevator Intro',
      icon: <Mic className="w-4 h-4" />,
    },
    {
      id: 'log',
      label: 'First Week Log',
      icon: <FileText className="w-4 h-4" />,
      badge: notes.length > 0 ? notes.length : undefined,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-900 pb-16">
      {/* Top Header */}
      <Header
        job={job}
        onOpenEdit={() => setIsEditModalOpen(true)}
        readinessPercentage={readinessPercentage}
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 w-full space-y-8 flex-1">
        {/* Countdown & Role Overview Banner */}
        <CountdownHero
          job={job}
          onEditClick={() => setIsEditModalOpen(true)}
        />

        {/* Feature Navigation Tabs */}
        <div className="bg-white p-1.5 rounded-2xl border border-slate-200 shadow-xs flex items-center gap-1 overflow-x-auto scrollbar-none">
          {navigationTabs.map((tab) => {
            const isActive = activeView === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-${tab.id}`}
                onClick={() => setActiveView(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer whitespace-nowrap ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100/70'
                }`}
              >
                {tab.icon}
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                      isActive
                        ? 'bg-indigo-700 text-white'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active View Container */}
        <div className="transition-all duration-200">
          {activeView === 'checklist' && (
            <ChecklistSection
              items={checklist}
              onToggleItem={handleToggleChecklistItem}
              onAddItem={handleAddChecklistItem}
              onDeleteItem={handleDeleteChecklistItem}
            />
          )}

          {activeView === 'roadmap' && (
            <RoadmapSection
              goals={roadmap}
              onToggleGoal={handleToggleRoadmapGoal}
              onAddGoal={handleAddRoadmapGoal}
              onDeleteGoal={handleDeleteRoadmapGoal}
            />
          )}

          {activeView === 'questions' && (
            <QuestionsBank
              questions={questions}
              onUpdateQuestionNote={handleUpdateQuestionNote}
              onAddQuestion={handleAddQuestion}
            />
          )}

          {activeView === 'pitch' && (
            <ElevatorPitchBuilder
              pitchData={pitch}
              job={job}
              onUpdatePitch={setPitch}
            />
          )}

          {activeView === 'log' && (
            <DailyLogSection
              notes={notes}
              onAddNote={handleAddNote}
              onDeleteNote={handleDeleteNote}
            />
          )}
        </div>

        {/* Motivational Footer Card */}
        <div className="bg-gradient-to-r from-indigo-50 via-slate-50 to-emerald-50 rounded-2xl p-5 border border-indigo-100/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-center sm:text-left">
            <div className="w-10 h-10 rounded-xl bg-white border border-indigo-100 flex items-center justify-center text-indigo-600 shadow-xs shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-slate-900">
                You were hired because they believe in your potential!
              </h4>
              <p className="text-xs text-slate-600 mt-0.5">
                Remember: No one expects you to know everything on Day 1. Ask great questions, take good notes, and celebrate small wins.
              </p>
            </div>
          </div>
          <button
            onClick={triggerMilestoneCelebration}
            className="px-4 py-2 text-xs font-semibold text-indigo-700 bg-white hover:bg-indigo-50 border border-indigo-200 rounded-xl shadow-xs transition-all cursor-pointer whitespace-nowrap shrink-0 flex items-center gap-1.5"
          >
            <PartyPopper className="w-3.5 h-3.5 text-indigo-600" />
            Give Me a Boost!
          </button>
        </div>
      </main>

      {/* Edit Job Details Modal */}
      <JobDetailsModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        job={job}
        onSave={setJob}
      />
    </div>
  );
}
