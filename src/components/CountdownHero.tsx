import React, { useState, useEffect } from 'react';
import {
  Calendar,
  Clock,
  MapPin,
  Laptop,
  Building2,
  Users,
  UserCheck,
  Sparkles,
  PartyPopper,
  Edit3
} from 'lucide-react';
import { JobDetails } from '../types';
import { triggerCelebration } from '../utils/confetti';

interface CountdownHeroProps {
  job: JobDetails;
  onEditClick: () => void;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isStarted: boolean;
  totalHours: number;
}

export const CountdownHero: React.FC<CountdownHeroProps> = ({ job, onEditClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeRemaining>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    isStarted: false,
    totalHours: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      // Parse start date, assuming 9:00 AM on the start date in local time
      const target = new Date(`${job.startDate}T09:00:00`);
      const now = new Date();
      const diff = target.getTime() - now.getTime();

      if (diff <= 0) {
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          isStarted: true,
          totalHours: 0,
        });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((diff / 1000 / 60) % 60);
      const seconds = Math.floor((diff / 1000) % 60);
      const totalHours = Math.floor(diff / (1000 * 60 * 60));

      setTimeLeft({
        days,
        hours,
        minutes,
        seconds,
        isStarted: false,
        totalHours,
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [job.startDate]);

  const formattedDate = new Date(`${job.startDate}T00:00:00`).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

  const getWorkModeBadge = () => {
    switch (job.workMode) {
      case 'remote':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-200">
            <Laptop className="w-3.5 h-3.5" /> Remote
          </span>
        );
      case 'hybrid':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-violet-50 text-violet-700 border border-violet-200">
            <Building2 className="w-3.5 h-3.5" /> Hybrid
          </span>
        );
      case 'onsite':
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
            <Building2 className="w-3.5 h-3.5" /> On-site
          </span>
        );
    }
  };

  return (
    <div className="relative overflow-hidden bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-950 text-white rounded-3xl p-6 sm:p-8 md:p-10 shadow-xl border border-indigo-900/40">
      {/* Background ambient decorative glow */}
      <div className="absolute top-0 right-0 -mr-24 -mt-24 w-96 h-96 rounded-full bg-indigo-500/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 -ml-24 -mb-24 w-96 h-96 rounded-full bg-violet-500/10 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        {/* Left Column: Context & excitement banner */}
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold mb-4 backdrop-blur-sm">
            <Sparkles className="w-3.5 h-3.5 text-indigo-300 animate-pulse" />
            <span>New Career Milestone</span>
          </div>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Next chapter at <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-200 via-sky-200 to-indigo-100">{job.companyName}</span>
          </h2>

          <p className="mt-2 text-base sm:text-lg text-indigo-200/90 font-medium">
            Starting as <span className="text-white font-semibold underline decoration-indigo-400/50 decoration-2 underline-offset-4">{job.roleTitle}</span>
          </p>

          {/* Quick metadata grid */}
          <div className="mt-6 flex flex-wrap items-center gap-y-3 gap-x-5 text-xs text-indigo-200/80 font-medium">
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-indigo-400" />
              <span className="text-white font-medium">{formattedDate}</span>
            </div>
            {job.teamName && (
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4 text-indigo-400" />
                <span>Team: <strong className="text-white">{job.teamName}</strong></span>
              </div>
            )}
            {job.managerName && (
              <div className="flex items-center gap-1.5">
                <UserCheck className="w-4 h-4 text-indigo-400" />
                <span>Manager: <strong className="text-white">{job.managerName}</strong></span>
              </div>
            )}
            <div>
              {getWorkModeBadge()}
            </div>
          </div>

          <div className="mt-6 flex items-center gap-3">
            <button
              id="celebrate-btn"
              onClick={triggerCelebration}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold bg-white/10 hover:bg-white/20 text-white border border-white/20 backdrop-blur-xs transition-all cursor-pointer hover:scale-102 active:scale-98"
            >
              <PartyPopper className="w-4 h-4 text-amber-300" />
              Celebrate Excitement!
            </button>
            <button
              id="quick-edit-job-btn"
              onClick={onEditClick}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-medium text-indigo-200 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
            >
              <Edit3 className="w-3.5 h-3.5" />
              Customize Info
            </button>
          </div>
        </div>

        {/* Right Column: High-contrast Countdown Cards */}
        <div className="flex flex-col items-center sm:items-start lg:items-end">
          <div className="text-xs font-semibold uppercase tracking-wider text-indigo-300 mb-2 flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {timeLeft.isStarted ? 'Status' : 'Countdown to Day 1'}
          </div>

          {timeLeft.isStarted ? (
            <div className="bg-emerald-500/20 border border-emerald-400/40 rounded-2xl p-5 text-center sm:text-left backdrop-blur-md">
              <div className="flex items-center gap-2 text-emerald-300 font-bold text-lg">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                You're in your first week!
              </div>
              <p className="text-xs text-emerald-100/90 mt-1 max-w-xs">
                Welcome to your journey at {job.companyName}! Focus on absorbing information and meeting your peers.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-2.5 sm:gap-3 w-full sm:w-auto">
              {/* Days */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md min-w-[70px] sm:min-w-[84px] shadow-inner">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-indigo-200 uppercase tracking-wider mt-1">
                  Days
                </span>
              </div>

              {/* Hours */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md min-w-[70px] sm:min-w-[84px] shadow-inner">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-indigo-200 uppercase tracking-wider mt-1">
                  Hours
                </span>
              </div>

              {/* Minutes */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md min-w-[70px] sm:min-w-[84px] shadow-inner">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-white font-display tracking-tight">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-indigo-200 uppercase tracking-wider mt-1">
                  Mins
                </span>
              </div>

              {/* Seconds */}
              <div className="flex flex-col items-center justify-center p-3 sm:p-4 rounded-2xl bg-white/10 border border-white/15 backdrop-blur-md min-w-[70px] sm:min-w-[84px] shadow-inner">
                <span className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-indigo-300 font-display tracking-tight">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] sm:text-xs font-semibold text-indigo-200 uppercase tracking-wider mt-1">
                  Secs
                </span>
              </div>
            </div>
          )}

          {!timeLeft.isStarted && (
            <p className="text-[11px] text-indigo-300/80 mt-3 text-center sm:text-right font-medium">
              Target start time: 9:00 AM on {formattedDate}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
