import React, { useState } from 'react';
import {
  Mic,
  Copy,
  Check,
  Sparkles,
  Volume2,
  VolumeX,
  RefreshCw,
  Lightbulb
} from 'lucide-react';
import { ElevatorPitchData, JobDetails } from '../types';

interface ElevatorPitchBuilderProps {
  pitchData: ElevatorPitchData;
  job: JobDetails;
  onUpdatePitch: (data: ElevatorPitchData) => void;
}

export const ElevatorPitchBuilder: React.FC<ElevatorPitchBuilderProps> = ({
  pitchData,
  job,
  onUpdatePitch,
}) => {
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const presets = [
    {
      label: 'Design & UX',
      background: 'product design and user research with a passion for intuitive web tools',
      excitement: 'simplifying complex workflows and building cohesive customer experiences',
      funFact: 'a big fan of specialty pour-over coffee and hiking on weekends',
    },
    {
      label: 'Software Engineering',
      background: 'full-stack software development building distributed, reliable cloud services',
      excitement: 'shipping high-leverage features, clean APIs, and collaborating with product',
      funFact: 'an avid mechanical keyboard builder and sci-fi book reader',
    },
    {
      label: 'Product / Project Lead',
      background: 'cross-functional product strategy, agile roadmapping, and data analytics',
      excitement: 'unblocking the team, delivering tangible customer value, and driving growth',
      funFact: 'a marathon runner and amateur sourdough baker',
    },
    {
      label: 'Operations & Business',
      background: 'scaling operational workflows, customer success, and partner enablement',
      excitement: 'optimizing efficiency, smoothing out onboarding, and supporting our teams',
      funFact: 'love board games, visiting local farmers markets, and photography',
    },
  ];

  const applyPreset = (preset: typeof presets[0]) => {
    onUpdatePitch({
      ...pitchData,
      background: preset.background,
      coreExcitement: preset.excitement,
      personalFunFact: preset.funFact,
    });
  };

  const generatedScript = `Hi everyone, I'm ${pitchData.name || 'there'}! I'm joining as the new ${
    job.roleTitle
  } on the ${job.teamName || 'team'}. My background is in ${
    pitchData.background || 'my field'
  }. Here at ${job.companyName}, I'm really excited to focus on ${
    pitchData.coreExcitement || 'contributing to our collective goals'
  }. Outside of work, I'm ${
    pitchData.personalFunFact || 'always excited to learn new things'
  }. Really thrilled to be here and look forward to working with all of you!`;

  const wordCount = generatedScript.split(/\s+/).filter(Boolean).length;
  const estimatedSeconds = Math.round((wordCount / 130) * 60); // approx 130 words per minute speaking pace

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedScript);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleReadAloud = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(generatedScript);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-6 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <h3 className="text-xl font-bold text-slate-900 tracking-tight">
              Day 1 "Elevator Pitch" Builder
            </h3>
            <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700">
              Confidence Booster
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Nail your 30-second introduction when you meet the team or say hello in team standups.
          </p>
        </div>

        {/* Preset quick buttons */}
        <div className="flex flex-wrap items-center gap-1.5">
          <span className="text-xs font-medium text-slate-400 mr-1 flex items-center gap-1">
            <Lightbulb className="w-3 h-3 text-amber-500" /> Presets:
          </span>
          {presets.map((p) => (
            <button
              key={p.label}
              onClick={() => applyPreset(p)}
              className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-slate-200/80 text-slate-700 font-medium transition-colors cursor-pointer"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-6">
        {/* Left: Input Form */}
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              Your Preferred Name
            </label>
            <input
              type="text"
              value={pitchData.name}
              onChange={(e) => onUpdatePitch({ ...pitchData, name: e.target.value })}
              placeholder="e.g. Alex"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              1. Professional Background / Superpower
            </label>
            <textarea
              rows={2}
              value={pitchData.background}
              onChange={(e) => onUpdatePitch({ ...pitchData, background: e.target.value })}
              placeholder="e.g. 5 years in UX design focusing on responsive web & design systems"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              2. What You're Excited to Tackle Here
            </label>
            <textarea
              rows={2}
              value={pitchData.coreExcitement}
              onChange={(e) => onUpdatePitch({ ...pitchData, coreExcitement: e.target.value })}
              placeholder="e.g. diving into our new design system & streamlining developer handoff"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600 resize-none text-slate-800"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">
              3. A Fun Personal Fact or Hobby (Icebreaker)
            </label>
            <input
              type="text"
              value={pitchData.personalFunFact}
              onChange={(e) => onUpdatePitch({ ...pitchData, personalFunFact: e.target.value })}
              placeholder="e.g. huge coffee nerd, board gamer, or dog parent"
              className="w-full px-3.5 py-2 text-sm bg-white border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-600"
            />
          </div>
        </div>

        {/* Right: Live Script Preview */}
        <div className="flex flex-col justify-between p-6 rounded-2xl bg-gradient-to-br from-slate-900 to-indigo-950 text-white shadow-md border border-slate-800">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <Mic className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">
                  Your Day 1 Script
                </span>
              </div>
              <div className="text-xs text-slate-400 font-medium">
                ~{estimatedSeconds}s spoken ({wordCount} words)
              </div>
            </div>

            <div className="text-sm sm:text-base leading-relaxed text-slate-100 font-normal italic relative">
              "{generatedScript}"
            </div>
          </div>

          {/* Action buttons */}
          <div className="pt-6 border-t border-white/10 mt-6 flex flex-wrap items-center justify-between gap-3">
            <button
              onClick={handleReadAloud}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium bg-white/10 hover:bg-white/20 text-slate-200 border border-white/10 transition-colors cursor-pointer"
            >
              {isSpeaking ? (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-rose-400" /> Stop Listening
                </>
              ) : (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-emerald-400" /> Listen to Delivery
                </>
              )}
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold bg-emerald-500 hover:bg-emerald-600 text-slate-950 transition-all cursor-pointer shadow-sm hover:scale-102 active:scale-98"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-slate-950" /> Copied to Clipboard!
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" /> Copy Introduction
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
