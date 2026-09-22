import React, { useState } from 'react';
import {
  CheckCircle2,
  Circle,
  Plus,
  Info,
  ChevronDown,
  ChevronUp,
  Sparkles,
  Trash2,
  Filter,
  CheckCheck
} from 'lucide-react';
import { ChecklistItem, ChecklistCategory } from '../types';
import { triggerCelebration, triggerMilestoneCelebration } from '../utils/confetti';

interface ChecklistSectionProps {
  items: ChecklistItem[];
  onToggleItem: (id: string) => void;
  onAddItem: (item: Omit<ChecklistItem, 'id' | 'completed'>) => void;
  onDeleteItem: (id: string) => void;
}

export const ChecklistSection: React.FC<ChecklistSectionProps> = ({
  items,
  onToggleItem,
  onAddItem,
  onDeleteItem,
}) => {
  const [activeTab, setActiveTab] = useState<ChecklistCategory>('before_day_one');
  const [expandedTips, setExpandedTips] = useState<Record<string, boolean>>({});
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed'>('all');
  const [isAddingNew, setIsAddingNew] = useState(false);
  const [newText, setNewText] = useState('');
  const [newTip, setNewTip] = useState('');
  const [newPriority, setNewPriority] = useState<'normal' | 'high'>('normal');

  const categories: { key: ChecklistCategory; label: string; description: string }[] = [
    {
      key: 'before_day_one',
      label: 'Before Day 1',
      description: 'Prep, equipment, wardrobe & logistics',
    },
    {
      key: 'day_one',
      label: 'Day 1 Survival',
      description: 'Arrival, IT setup & manager alignment',
    },
    {
      key: 'week_one',
      label: 'Week 1 Foundation',
      description: 'Meet peers, observe cadence & set goals',
    },
  ];

  const currentCategoryItems = items.filter((item) => item.category === activeTab);
  const totalCount = currentCategoryItems.length;
  const completedCount = currentCategoryItems.filter((item) => item.completed).length;
  const percent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const filteredItems = currentCategoryItems.filter((item) => {
    if (filter === 'pending') return !item.completed;
    if (filter === 'completed') return item.completed;
    return true;
  });

  const toggleTip = (id: string) => {
    setExpandedTips((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleToggle = (id: string) => {
    const item = items.find((i) => i.id === id);
    if (item && !item.completed) {
      // Check if this action makes the current tab 100%
      const remainingUncompleted = currentCategoryItems.filter(
        (i) => !i.completed && i.id !== id
      ).length;
      if (remainingUncompleted === 0) {
        triggerMilestoneCelebration();
      } else {
        triggerCelebration();
      }
    }
    onToggleItem(id);
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newText.trim()) return;
    onAddItem({
      text: newText.trim(),
      category: activeTab,
      priority: newPriority,
      tip: newTip.trim() || undefined,
      isCustom: true,
    });
    setNewText('');
    setNewTip('');
    setNewPriority('normal');
    setIsAddingNew(false);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Onboarding Readiness Checklist
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700">
              Interactive
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Carefully curated step-by-step actions to eliminate first-week stress and set you up for confidence.
          </p>
        </div>

        <button
          id="add-checklist-item-btn"
          onClick={() => setIsAddingNew(!isAddingNew)}
          className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs transition-all cursor-pointer self-start sm:self-auto"
        >
          <Plus className="w-3.5 h-3.5" />
          Add Custom Item
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-3 my-6">
        {categories.map((cat) => {
          const catItems = items.filter((i) => i.category === cat.key);
          const catDone = catItems.filter((i) => i.completed).length;
          const isSelected = activeTab === cat.key;
          const catPercent = catItems.length ? Math.round((catDone / catItems.length) * 100) : 0;

          return (
            <button
              key={cat.key}
              onClick={() => setActiveTab(cat.key)}
              className={`p-3.5 sm:p-4 rounded-2xl text-left border transition-all cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-indigo-50/60 border-indigo-300 ring-2 ring-indigo-500/20 shadow-xs'
                  : 'bg-slate-50/70 border-slate-200/80 hover:bg-slate-100/60 text-slate-600'
              }`}
            >
              <div className="flex items-center justify-between">
                <span className={`text-xs font-bold ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                  {cat.label}
                </span>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    catPercent === 100
                      ? 'bg-emerald-100 text-emerald-800'
                      : isSelected
                      ? 'bg-indigo-200/70 text-indigo-900'
                      : 'bg-slate-200 text-slate-700'
                  }`}
                >
                  {catDone}/{catItems.length}
                </span>
              </div>
              <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                {cat.description}
              </p>
              {/* Mini progress line */}
              <div className="w-full bg-slate-200/80 h-1.5 rounded-full mt-3 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-300 ${
                    catPercent === 100 ? 'bg-emerald-500' : 'bg-indigo-600'
                  }`}
                  style={{ width: `${catPercent}%` }}
                />
              </div>
            </button>
          );
        })}
      </div>

      {/* Filter and stats row */}
      <div className="flex items-center justify-between pb-3 text-xs text-slate-500 font-medium">
        <div className="flex items-center gap-2">
          <span>Filter:</span>
          <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
            <button
              onClick={() => setFilter('all')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                filter === 'all' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              All ({currentCategoryItems.length})
            </button>
            <button
              onClick={() => setFilter('pending')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                filter === 'pending' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Pending ({totalCount - completedCount})
            </button>
            <button
              onClick={() => setFilter('completed')}
              className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all cursor-pointer ${
                filter === 'completed' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Done ({completedCount})
            </button>
          </div>
        </div>

        <div className="text-right">
          <span className="font-semibold text-slate-700">{percent}%</span> category completed
        </div>
      </div>

      {/* Add new task panel */}
      {isAddingNew && (
        <form
          onSubmit={handleCreate}
          className="mb-6 p-4 rounded-2xl bg-indigo-50/50 border border-indigo-200/80 animate-in fade-in duration-150"
        >
          <div className="text-xs font-bold text-indigo-900 mb-2">
            Add task to: {categories.find((c) => c.key === activeTab)?.label}
          </div>
          <div className="space-y-3">
            <input
              type="text"
              required
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              placeholder="e.g. Test audio headset & dual monitor setup"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600"
            />
            <input
              type="text"
              value={newTip}
              onChange={(e) => setNewTip(e.target.value)}
              placeholder="Optional pro-tip or context (e.g. Keep adapter nearby in case of port differences)"
              className="w-full px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 text-slate-600"
            />
            <div className="flex items-center justify-between pt-1">
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-600 font-medium">Priority:</span>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as 'normal' | 'high')}
                  className="text-xs px-2.5 py-1 bg-white border border-slate-300 rounded-lg text-slate-700 cursor-pointer"
                >
                  <option value="normal">Normal</option>
                  <option value="high">High Priority</option>
                </select>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddingNew(false)}
                  className="px-3 py-1 text-xs font-medium text-slate-600 hover:text-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-3.5 py-1 text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg shadow-xs"
                >
                  Save Item
                </button>
              </div>
            </div>
          </div>
        </form>
      )}

      {/* Checklist items list */}
      <div className="space-y-2.5">
        {filteredItems.length === 0 ? (
          <div className="text-center py-10 px-4 rounded-2xl border border-dashed border-slate-200 bg-slate-50/50">
            <CheckCheck className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
            <p className="text-sm font-semibold text-slate-800">
              {filter === 'completed'
                ? 'No completed tasks yet in this section.'
                : 'All caught up! Every task in this section is marked done.'}
            </p>
            <p className="text-xs text-slate-500 mt-1">
              {filter === 'completed' ? 'Check off items as you prepare.' : 'Great job preparing for your new role!'}
            </p>
          </div>
        ) : (
          filteredItems.map((item) => {
            const hasTip = Boolean(item.tip);
            const isTipExpanded = Boolean(expandedTips[item.id]);

            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 ${
                  item.completed
                    ? 'bg-slate-50/50 border-slate-200/60'
                    : 'bg-white border-slate-200/90 hover:border-slate-300 shadow-xs'
                }`}
              >
                <div className="p-3.5 sm:p-4 flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1">
                    <button
                      onClick={() => handleToggle(item.id)}
                      className="mt-0.5 text-slate-400 hover:text-indigo-600 transition-colors cursor-pointer shrink-0"
                      title={item.completed ? 'Mark uncompleted' : 'Mark completed'}
                    >
                      {item.completed ? (
                        <CheckCircle2 className="w-5 h-5 text-emerald-600 fill-emerald-50" />
                      ) : (
                        <Circle className="w-5 h-5 text-slate-400 hover:text-indigo-600" />
                      )}
                    </button>

                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span
                          className={`text-sm font-medium ${
                            item.completed ? 'line-through text-slate-400 font-normal' : 'text-slate-800'
                          }`}
                        >
                          {item.text}
                        </span>

                        {item.priority === 'high' && !item.completed && (
                          <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 border border-rose-200/60">
                            High Priority
                          </span>
                        )}

                        {item.isCustom && (
                          <span className="text-[10px] font-medium px-2 py-0.2 rounded-full bg-slate-100 text-slate-600">
                            Custom
                          </span>
                        )}
                      </div>

                      {/* Expandable Tip preview or trigger */}
                      {hasTip && (
                        <div className="mt-1">
                          <button
                            onClick={() => toggleTip(item.id)}
                            className="inline-flex items-center gap-1 text-[11px] font-medium text-indigo-600 hover:text-indigo-700 transition-colors cursor-pointer"
                          >
                            <Info className="w-3 h-3" />
                            <span>{isTipExpanded ? 'Hide context' : 'Why this helps'}</span>
                            {isTipExpanded ? (
                              <ChevronUp className="w-3 h-3" />
                            ) : (
                              <ChevronDown className="w-3 h-3" />
                            )}
                          </button>

                          {isTipExpanded && (
                            <div className="mt-2 p-2.5 rounded-xl bg-slate-50 border border-slate-200/70 text-xs text-slate-600 font-normal leading-relaxed">
                              {item.tip}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {item.isCustom && (
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors cursor-pointer"
                      title="Delete custom task"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
