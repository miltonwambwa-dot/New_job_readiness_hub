import React from 'react';
import { Briefcase, Calendar, Sparkles, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { JobDetails } from '../types';

interface HeaderProps {
  job: JobDetails;
  onOpenEdit: () => void;
  readinessPercentage: number;
}

export const Header: React.FC<HeaderProps> = ({
  job,
  onOpenEdit,
  readinessPercentage,
}) => {
  return (
    <header className="border-b border-slate-200 bg-white/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white shadow-md shadow-indigo-100">
            <Briefcase className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-bold text-slate-900 tracking-tight">
                New Job Readiness Hub
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <Sparkles className="w-3 h-3 text-emerald-600" />
                First 90 Days
              </span>
            </div>
            <p className="text-xs text-slate-500 font-medium truncate max-w-[200px] sm:max-w-xs md:max-w-md">
              {job.roleTitle} at <span className="font-semibold text-slate-700">{job.companyName}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Readiness pill */}
          <div className="hidden md:flex items-center gap-2.5 bg-slate-50 border border-slate-200/80 px-3.5 py-1.5 rounded-full text-xs font-medium text-slate-700">
            <CheckCircle2 className={`w-4 h-4 ${readinessPercentage === 100 ? 'text-emerald-500' : 'text-indigo-600'}`} />
            <span>Readiness: <strong className="font-bold text-slate-900">{readinessPercentage}%</strong></span>
            <div className="w-16 h-2 bg-slate-200 rounded-full overflow-hidden">
              <div
                className="h-full bg-indigo-600 rounded-full transition-all duration-500"
                style={{ width: `${readinessPercentage}%` }}
              />
            </div>
          </div>

          {/* Edit Job Details Button */}
          <button
            id="edit-job-details-btn"
            onClick={onOpenEdit}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-slate-700 bg-white hover:bg-slate-50 border border-slate-200 rounded-lg shadow-xs hover:border-slate-300 transition-all cursor-pointer"
            title="Edit your role, company, and start date"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-slate-500" />
            <span className="hidden sm:inline">Role Settings</span>
          </button>
        </div>
      </div>
    </header>
  );
};
