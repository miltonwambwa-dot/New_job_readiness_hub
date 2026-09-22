import React, { useState } from 'react';
import {
  BookMarked,
  Plus,
  Calendar,
  Users,
  Award,
  HelpCircle,
  Trash2,
  CheckCircle2,
  FileText
} from 'lucide-react';
import { OnboardingNote } from '../types';

interface DailyLogSectionProps {
  notes: OnboardingNote[];
  onAddNote: (note: Omit<OnboardingNote, 'id'>) => void;
  onDeleteNote: (id: string) => void;
}

export const DailyLogSection: React.FC<DailyLogSectionProps> = ({
  notes,
  onAddNote,
  onDeleteNote,
}) => {
  const [isAdding, setIsAdding] = useState(false);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [peopleMet, setPeopleMet] = useState('');
  const [content, setContent] = useState('');
  const [keyTakeaway, setKeyTakeaway] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onAddNote({
      date,
      title: title.trim(),
      peopleMet: peopleMet.trim(),
      content: content.trim(),
      keyTakeaway: keyTakeaway.trim(),
    });

    setTitle('');
    setPeopleMet('');
    setContent('');
    setKeyTakeaway('');
    setIsAdding(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              First Week Reflection & People Log
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
              Clarity & Memory
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Capture names, daily wins, and takeaways to conquer information overload during week one.
          </p>
        </div>

        <button
          onClick={() => setIsAdding(!isAdding)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          New Daily Entry
        </button>
      </div>

      {/* New Entry Form */}
      {isAdding && (
        <form
          onSubmit={handleSubmit}
          className="my-6 p-5 rounded-2xl bg-blue-50/50 border border-blue-200/80 animate-in fade-in duration-150 space-y-4"
        >
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-blue-900">Add Daily Onboarding Note</h4>
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="text-xs text-slate-500 hover:text-slate-800"
            >
              Cancel
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Title / Day Summary
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Day 1: IT Setup, Team Welcome Lunch & First 1:1"
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Date
              </label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              People Met & Roles (Helps remember faces and names!)
            </label>
            <input
              type="text"
              value={peopleMet}
              onChange={(e) => setPeopleMet(e.target.value)}
              placeholder="e.g. Maya (Eng Lead), Chris (Data Analyst), Priya (Design)"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              What Went Well & Notes
            </label>
            <textarea
              rows={2}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Got access to Github, joined Slack channels, attended first sprint standup..."
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 resize-none"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Key Takeaway or Question for Tomorrow
            </label>
            <input
              type="text"
              value={keyTakeaway}
              onChange={(e) => setKeyTakeaway(e.target.value)}
              placeholder="e.g. Remember to ask Sarah about deployment permissions tomorrow"
              className="w-full px-3 py-2 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-blue-200/50">
            <button
              type="button"
              onClick={() => setIsAdding(false)}
              className="px-3 py-1.5 text-xs text-slate-600 hover:text-slate-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs"
            >
              Save Log
            </button>
          </div>
        </form>
      )}

      {/* Notes list */}
      <div className="space-y-3.5 mt-6">
        {notes.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <FileText className="w-8 h-8 text-slate-400 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-700">No notes logged yet</p>
            <p className="text-xs text-slate-500 mt-1">
              Use this section during your first days to log who you met, systems accessed, and key highlights.
            </p>
          </div>
        ) : (
          notes.map((note) => (
            <div
              key={note.id}
              className="p-4 sm:p-5 rounded-2xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2 mb-1.5">
                    <span className="inline-flex items-center gap-1 text-[11px] font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-full">
                      <Calendar className="w-3 h-3 text-slate-500" />
                      {note.date}
                    </span>
                    {note.peopleMet && (
                      <span className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-700 bg-indigo-50 border border-indigo-100 px-2.5 py-0.5 rounded-full">
                        <Users className="w-3 h-3 text-indigo-500" />
                        {note.peopleMet}
                      </span>
                    )}
                  </div>

                  <h4 className="text-sm font-bold text-slate-900">{note.title}</h4>
                  {note.content && (
                    <p className="text-xs text-slate-600 mt-1.5 leading-relaxed">
                      {note.content}
                    </p>
                  )}

                  {note.keyTakeaway && (
                    <div className="mt-2.5 p-2 rounded-xl bg-amber-50/60 border border-amber-200/50 flex items-start gap-1.5 text-xs text-amber-900">
                      <Award className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                      <div>
                        <strong>Key Takeaway:</strong> {note.keyTakeaway}
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => onDeleteNote(note.id)}
                  className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                  title="Delete note"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
