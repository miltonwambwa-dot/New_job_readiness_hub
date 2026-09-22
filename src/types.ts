export type WorkMode = 'remote' | 'hybrid' | 'onsite';

export interface JobDetails {
  roleTitle: string;
  companyName: string;
  startDate: string; // YYYY-MM-DD
  workMode: WorkMode;
  locationOrAddress: string;
  managerName: string;
  teamName: string;
  notes: string;
}

export type ChecklistCategory = 'before_day_one' | 'day_one' | 'week_one';

export interface ChecklistItem {
  id: string;
  text: string;
  category: ChecklistCategory;
  completed: boolean;
  priority: 'high' | 'normal';
  tip?: string;
  isCustom?: boolean;
}

export type RoadmapPhase = '30' | '60' | '90';
export type GoalCategory = 'learning' | 'people' | 'execution';

export interface RoadmapGoal {
  id: string;
  phase: RoadmapPhase;
  title: string;
  description: string;
  completed: boolean;
  category: GoalCategory;
  isCustom?: boolean;
}

export type QuestionCategory = 'manager' | 'peers' | 'culture' | 'technical';

export interface CheatSheetQuestion {
  id: string;
  category: QuestionCategory;
  question: string;
  whyItMatters: string;
  userNotes: string;
}

export interface ElevatorPitchData {
  name: string;
  background: string;
  coreExcitement: string;
  personalFunFact: string;
}

export interface OnboardingNote {
  id: string;
  date: string;
  title: string;
  content: string;
  peopleMet: string;
  keyTakeaway: string;
}
