export interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export interface Challenge {
  id: string;
  title: string;
  tasks: Task[];
  duration: {
    type: 'week' | 'month' | 'days';
    value: number;
  };
  startDate: Date;
  participants: string[];
}

export interface User {
  id: string;
  name: string;
  completedTasks: { [challengeId: string]: string[] };
}

export interface DailyProgress {
  userId: string;
  challengeId: string;
  date: Date;
  completedTasks: string[];
}

export interface LeaderboardEntry {
  userId: string;
  completedTasksCount: number;
}