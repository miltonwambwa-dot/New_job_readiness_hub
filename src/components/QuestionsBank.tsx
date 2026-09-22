import React, { useState } from 'react';
import {
  HelpCircle,
  MessageSquare,
  Users,
  Building,
  Terminal,
  ChevronDown,
  ChevronUp,
  Save,
  Check,
  Plus,
  Trash2
} from 'lucide-react';
import { CheatSheetQuestion, QuestionCategory } from '../types';

interface QuestionsBankProps {
  questions: CheatSheetQuestion[];
  onUpdateQuestionNote: (id: string, note: string) => void;
  onAddQuestion: (q: Omit<CheatSheetQuestion, 'id'>) => void;
  onDeleteQuestion?: (id: string) => void;
}

export const QuestionsBank: React.FC<QuestionsBankProps> = ({
  questions,
  onUpdateQuestionNote,
  onAddQuestion,
  onDeleteQuestion,
}) => {
  const [selectedCat, setSelectedCat] = useState<QuestionCategory | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [savedStatus, setSavedStatus] = useState<Record<string, boolean>>({});
  const [isAdding, setIsAdding] = useState(false);
  const [newQuestion, setNewQuestion] = useState('');
  const [newWhy, setNewWhy] = useState('');
  const [newCategory, setNewCategory] = useState<QuestionCategory>('manager');

  const categories: { key: QuestionCategory | 'all'; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All Questions', icon: <HelpCircle className="w-3.5 h-3.5" /> },
    { key: 'manager', label: 'For Manager', icon: <MessageSquare className="w-3.5 h-3.5" /> },
    { key: 'peers', label: 'For Teammates', icon: <Users className="w-3.5 h-3.5" /> },
    { key: 'culture', label: 'Culture & Norms', icon: <Building className="w-3.5 h-3.5" /> },
    { key: 'technical', label: 'Systems & Tools', icon: <Terminal className="w-3.5 h-3.5" /> },
  ];

  const filteredQuestions =
    selectedCat === 'all'
      ? questions
      : questions.filter((q) => q.category === selectedCat);

  const handleNoteChange = (id: string, text: string) => {
    onUpdateQuestionNote(id, text);
    setSavedStatus((prev) => ({ ...prev, [id]: true }));
    setTimeout(() => {
      setSavedStatus((prev) => ({ ...prev, [id]: false }));
    }, 1500);
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newQuestion.trim()) return;
    onAddQuestion({
      question: newQuestion.trim(),
      whyItMatters: newWhy.trim() || 'Custom question to clarify onboarding context.',
      category: newCategory,
      userNotes: '',
    });
    setNewQuestion('');
    setNewWhy('');
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Smart Questions Cheat Sheet
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-50 text-amber-700">
              High Impact
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Top questions recommended by onboarding advisors to ask in your 1:1s, with space to take meeting notes.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-amber-600 hover:bg-amber-700 text-white shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Question
        </button>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto py-4 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat.key}
            onClick={() => setSelectedCat(cat.key)}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
              selectedCat === cat.key
                ? 'bg-amber-100/70 text-amber-900 border border-amber-300 shadow-xs'
                : 'bg-slate-100/70 text-slate-600 hover:bg-slate-200/60 border border-transparent'
            }`}
          >
            {cat.icon}
            {cat.label}
          </button>
        ))}
      </div>

      {/* Add form */}
      {isAdding && (
        <form
          onSubmit={handleAddSubmit}
          className="mb-6 p-4 rounded-2xl bg-amber-50/50 border border-amber-200/70 animate-in fade-in duration-150"
        >
          <div className="text-xs font-bold text-amber-900 mb-2">
            Add Custom Question
          </div>
          <div className="space-y-3">
            <input
              type="text"
              required
              value={newQuestion}
              onChange={(e) => setNewQuestion(e.target.value)}
              placeholder="e.g. What is the biggest priority for the upcoming quarter?"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600"
            />
            <input
              type="text"
              value={newWhy}
              onChange={(e) => setNewWhy(e.target.value)}
              placeholder="Why this question is helpful..."
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 text-slate-600"
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Category:</span>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as QuestionCategory)}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
                >
                  <option value="manager">For Manager</option>
                  <option value="peers">For Teammates</option>
                  <option value="culture">Culture & Norms</option>
                  <option value="technical">Systems & Tools</option>
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
                  className="px-3.5 py-1 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 rounded-lg shadow-xs"
                >
                  Save Question
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Questions list */}
      <div className="space-y-3.5 mt-2">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedId === q.id;
          const hasNotes = Boolean(q.userNotes && q.userNotes.trim().length > 0);

          return (
            <div
              key={q.id}
              className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-xs hover:border-slate-300 transition-all"
            >
              <div
                onClick={() => setExpandedId(isExpanded ? null : q.id)}
                className="p-4 flex items-start justify-between gap-3 cursor-pointer hover:bg-slate-50/50 transition-colors"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                      {q.category}
                    </span>
                    {hasNotes && (
                      <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/50 flex items-center gap-1">
                        <Check className="w-2.5 h-2.5" /> Notes recorded
                      </span>
                    )}
                  </div>
                  <h4 className="text-sm font-semibold text-slate-900 leading-snug">
                    "{q.question}"
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    <strong className="text-slate-700 font-medium">Why ask this:</strong> {q.whyItMatters}
                  </p>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    className="p-1 rounded text-slate-400 hover:text-slate-700"
                    title={isExpanded ? 'Collapse notes' : 'Expand notes'}
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Note Taking Area */}
              {isExpanded && (
                <div className="px-4 pb-4 pt-2 border-t border-slate-100 bg-slate-50/60 animate-in fade-in duration-100">
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-xs font-bold text-slate-700">
                      Meeting Notes & Answer:
                    </label>
                    {savedStatus[q.id] && (
                      <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 animate-pulse">
                        <Check className="w-3 h-3" /> Auto-saved!
                      </span>
                    )}
                  </div>
                  <textarea
                    rows={3}
                    value={q.userNotes}
                    onChange={(e) => handleNoteChange(q.id, e.target.value)}
                    placeholder="Type what your manager or teammate said here..."
                    className="w-full p-3 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-600 leading-relaxed text-slate-800 placeholder:text-slate-400"
                  />
                  <p className="text-[11px] text-slate-400 mt-1">
                    Your answers are saved in your local workspace for easy reference during your first 90 days.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
