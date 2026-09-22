import {
  JobDetails,
  ChecklistItem,
  RoadmapGoal,
  CheatSheetQuestion,
  ElevatorPitchData,
  OnboardingNote,
} from '../types';

export function getDefaultNextMonday(): string {
  const now = new Date();
  const day = now.getDay(); // 0 is Sunday, 1 is Monday
  const daysUntilNextMonday = day === 0 ? 1 : 8 - day;
  const nextMonday = new Date(now.getTime() + daysUntilNextMonday * 24 * 60 * 60 * 1000);
  return nextMonday.toISOString().split('T')[0];
}

export const initialJobDetails: JobDetails = {
  roleTitle: 'Product Specialist',
  companyName: 'NextGen Technologies',
  startDate: getDefaultNextMonday(),
  workMode: 'hybrid',
  locationOrAddress: 'HQ Building & Home Office',
  managerName: 'Sarah Jenkins',
  teamName: 'Growth & Product Experience',
  notes: 'First day starts at 9:30 AM with the welcome orientation & IT kit collection.',
};

export const initialChecklist: ChecklistItem[] = [
  // Before Day 1
  {
    id: 'b1',
    category: 'before_day_one',
    text: 'Confirm start time, arrival instructions, or virtual meeting link',
    priority: 'high',
    completed: true,
    tip: 'Check your email inbox and spam folder for the formal welcome email from HR or your manager.',
  },
  {
    id: 'b2',
    category: 'before_day_one',
    text: 'Set up work computer, accounts & 2-factor authentication backup',
    priority: 'high',
    completed: false,
    tip: 'Ensure your personal phone has Google Authenticator or your company SSO app installed.',
  },
  {
    id: 'b3',
    category: 'before_day_one',
    text: 'Map your commute route (or test home office setup & camera lighting)',
    priority: 'normal',
    completed: false,
    tip: 'Factor in 20 minutes buffer for morning rush hour or unexpected desk badge delays.',
  },
  {
    id: 'b4',
    category: 'before_day_one',
    text: 'Pick out your Day 1 outfit aligned with the company dress code',
    priority: 'normal',
    completed: false,
    tip: 'When in doubt, dress one notch smarter than business casual for Day 1.',
  },
  {
    id: 'b5',
    category: 'before_day_one',
    text: 'Gather IDs, banking details for payroll & passport/driving license',
    priority: 'high',
    completed: false,
    tip: 'HR will need physical or scan proof for employment verification on Day 1.',
  },
  {
    id: 'b6',
    category: 'before_day_one',
    text: 'Prep a dedicated physical notebook & reliable pen',
    priority: 'normal',
    completed: false,
    tip: 'Writing notes by hand shows deep attentiveness and helps absorb unfamiliar names and systems.',
  },
  {
    id: 'b7',
    category: 'before_day_one',
    text: 'Practice your 30-second introduction pitch',
    priority: 'normal',
    completed: false,
    tip: 'Use the Elevator Pitch builder tab in this app to draft an effortless greeting!',
  },

  // Day 1
  {
    id: 'd1',
    category: 'day_one',
    text: 'Arrive or log in 15 minutes before the scheduled start time',
    priority: 'high',
    completed: false,
    tip: 'Gives you breathing room to grab a coffee, test audio, or settle in without rush.',
  },
  {
    id: 'd2',
    category: 'day_one',
    text: 'Complete HR compliance paperwork & security briefings',
    priority: 'high',
    completed: false,
    tip: 'Get these out of the way early so your mind is free for team orientations.',
  },
  {
    id: 'd3',
    category: 'day_one',
    text: 'Have Day 1 1:1 with your manager to align on Week 1 priorities',
    priority: 'high',
    completed: false,
    tip: 'Ask: "What does a fantastic first week look like from your perspective?"',
  },
  {
    id: 'd4',
    category: 'day_one',
    text: 'Create a personal "People & Acronyms" cheat sheet in your notes',
    priority: 'normal',
    completed: false,
    tip: 'Write down names, roles, and project code-names as you hear them mentioned.',
  },
  {
    id: 'd5',
    category: 'day_one',
    text: 'Send a warm "Hello!" in the team Slack/Teams general channel',
    priority: 'normal',
    completed: false,
    tip: 'Keep it brief: say you are excited to join and look forward to collaborating.',
  },
  {
    id: 'd6',
    category: 'day_one',
    text: 'End-of-day brief recap with your onboarding buddy or manager',
    priority: 'normal',
    completed: false,
    tip: 'Thank them for their guidance and confirm your start time for tomorrow.',
  },

  // Week 1
  {
    id: 'w1',
    category: 'week_one',
    text: 'Schedule 15-minute introductory coffee chats with 4 key cross-functional peers',
    priority: 'high',
    completed: false,
    tip: 'Ask about their current priorities and how your roles will interface.',
  },
  {
    id: 'w2',
    category: 'week_one',
    text: 'Bookmark core documentation, shared drives & project boards (Jira, Linear, Notion)',
    priority: 'normal',
    completed: false,
    tip: 'Organize a dedicated browser bookmarks folder named after your new company.',
  },
  {
    id: 'w3',
    category: 'week_one',
    text: 'Observe team rituals (daily standups, sprint reviews, team lunches)',
    priority: 'normal',
    completed: false,
    tip: 'Focus on listening to conversational norms and decision-making styles.',
  },
  {
    id: 'w4',
    category: 'week_one',
    text: 'Set up recurring 1:1 cadence with your direct manager',
    priority: 'high',
    completed: false,
    tip: 'Establish whether weekly or bi-weekly 30-minute syncs work best.',
  },
  {
    id: 'w5',
    category: 'week_one',
    text: 'Identify 1 minor quick fix or documentation update to contribute',
    priority: 'normal',
    completed: false,
    tip: 'New eyes are great for catching outdated setup guides or broken links!',
  },
  {
    id: 'w6',
    category: 'week_one',
    text: 'Friday Week 1 Reflection: log accomplishments & rest up over the weekend',
    priority: 'high',
    completed: false,
    tip: 'Onboarding is mentally taxing. Give yourself genuine credit for surviving week one!',
  },
];

export const initialRoadmap: RoadmapGoal[] = [
  // 30 Days: Learn & Absorb
  {
    id: 'r1',
    phase: '30',
    category: 'learning',
    title: 'Master Company Tools & Tech Ecosystem',
    description: 'Get proficient with internal systems, design repositories, codebase or client portals without stumbling.',
    completed: false,
  },
  {
    id: 'r2',
    phase: '30',
    category: 'people',
    title: 'Complete 10 Stakeholder Discovery Conversations',
    description: 'Understand what peers, partners, and downstream teams need and expect from your position.',
    completed: false,
  },
  {
    id: 'r3',
    phase: '30',
    category: 'execution',
    title: 'Deliver First Small Sprint Task / Quick Win',
    description: 'Complete your first contained deliverable to validate your local setup and shipping workflow.',
    completed: false,
  },

  // 60 Days: Contribute & Collaborate
  {
    id: 'r4',
    phase: '60',
    category: 'execution',
    title: 'Lead an Assigned Feature or Core Project',
    description: 'Take end-to-end accountability for an active workstream with minimal day-to-day oversight.',
    completed: false,
  },
  {
    id: 'r5',
    phase: '60',
    category: 'people',
    title: 'Solicit 60-Day Constructive Feedback',
    description: 'Hold a dedicated session with your manager: "What should I start, stop, or continue doing?"',
    completed: false,
  },
  {
    id: 'r6',
    phase: '60',
    category: 'learning',
    title: 'Map Key Customer Pain Points & Business Drivers',
    description: 'Connect your daily work directly with company revenue, OKRs, and customer satisfaction metrics.',
    completed: false,
  },

  // 90 Days: Own & Excel
  {
    id: 'r7',
    phase: '90',
    category: 'execution',
    title: 'Propose a High-Value Strategic Improvement',
    description: 'Present a data-backed recommendation for optimizing a workflow, feature, or process efficiency.',
    completed: false,
  },
  {
    id: 'r8',
    phase: '90',
    category: 'people',
    title: 'Mentor or Support Onboarding of New Team Members',
    description: 'Share your onboarding learnings and enhance the onboarding playbook for subsequent hires.',
    completed: false,
  },
  {
    id: 'r9',
    phase: '90',
    category: 'learning',
    title: 'Formal 90-Day Review & Future Career Roadmap',
    description: 'Review performance against onboarding goals and establish targets for the rest of the year.',
    completed: false,
  },
];

export const initialQuestions: CheatSheetQuestion[] = [
  {
    id: 'q1',
    category: 'manager',
    question: 'What does exceptional success look like for this role over the first 30, 60, and 90 days?',
    whyItMatters: 'Clarifies whether leadership expects immediate delivery, deep learning, or relationship building first.',
    userNotes: '',
  },
  {
    id: 'q2',
    category: 'manager',
    question: 'How do you prefer to communicate and receive progress updates (Slack, email, 1:1 agenda, bulleted digests)?',
    whyItMatters: 'Adapting to your manager’s preferred cadence builds trust faster than almost anything else.',
    userNotes: '',
  },
  {
    id: 'q3',
    category: 'manager',
    question: 'Who are the 3 to 5 people outside our immediate team that I should build strong relationships with early?',
    whyItMatters: 'Reveals the informal influence network and key cross-functional dependencies.',
    userNotes: '',
  },
  {
    id: 'q4',
    category: 'peers',
    question: 'What do you wish you had known when you first started on this team?',
    whyItMatters: 'Peers will share unwritten tribal knowledge, hidden pitfalls, and internal shortcuts.',
    userNotes: '',
  },
  {
    id: 'q5',
    category: 'peers',
    question: 'What is the biggest operational headache or bottleneck the team is currently dealing with?',
    whyItMatters: 'Highlights where you can eventually step up with solutions that genuinely relieve pressure.',
    userNotes: '',
  },
  {
    id: 'q6',
    category: 'culture',
    question: 'How does the team handle disagreements or conflicting priorities between departments?',
    whyItMatters: 'Provides insight into the company decision-making framework and emotional safety.',
    userNotes: '',
  },
  {
    id: 'q7',
    category: 'technical',
    question: 'Where is the single source of truth for architectural docs, design assets, and team conventions?',
    whyItMatters: 'Saves hours of hunting through scattered Slack threads and outdated Google Docs.',
    userNotes: '',
  },
];

export const initialPitch: ElevatorPitchData = {
  name: 'Alex Rivera',
  background: 'Background in product design and user research with a passion for intuitive web tools.',
  coreExcitement: 'Excited to dive into simplifying workflows and collaborating closely with engineering and marketing.',
  personalFunFact: 'Big fan of pour-over specialty coffee and hiking national parks on weekends!',
};

export const initialNotes: OnboardingNote[] = [
  {
    id: 'n1',
    date: new Date().toISOString().split('T')[0],
    title: 'Pre-Start Orientation Thoughts',
    content: 'Checked the welcome packet. Team seems super supportive. Scheduled my rest routines so I feel energetic on Monday!',
    peopleMet: 'Recruiter (Jordan), Hiring Manager (Sarah)',
    keyTakeaway: 'Focus on listening and absorbing context without putting pressure on myself to solve everything Day 1.',
  },
];
