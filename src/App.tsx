import React, { useState } from 'react';
import ChallengeForm from './components/ChallengeForm';
import ChallengeList from './components/ChallengeList';
import ChallengeDetails from './components/ChallengeDetails';
import Leaderboard from './components/Leaderboard';
import { Challenge, DailyProgress, LeaderboardEntry } from './types';
import { Trophy } from 'lucide-react';

function App() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [selectedChallenge, setSelectedChallenge] = useState<Challenge | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  const handleCreateChallenge = (newChallenge: Omit<Challenge, 'id'>) => {
    const challenge: Challenge = {
      ...newChallenge,
      id: `challenge-${challenges.length + 1}`,
    };
    setChallenges([...challenges, challenge]);
  };

  const handleSelectChallenge = (challenge: Challenge) => {
    setSelectedChallenge(challenge);
  };

  const handleUpdateProgress = (progress: DailyProgress) => {
    // Update the leaderboard
    setLeaderboard((prev) => {
      const existingEntry = prev.find((entry) => entry.userId === progress.userId);
      if (existingEntry) {
        return prev.map((entry) =>
          entry.userId === progress.userId
            ? { ...entry, completedTasksCount: entry.completedTasksCount + progress.completedTasks.length }
            : entry
        );
      } else {
        return [
          ...prev,
          { userId: progress.userId, completedTasksCount: progress.completedTasks.length },
        ];
      }
    });

    // You would typically send this progress to a backend server here
    console.log('Progress updated:', progress);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-3xl font-bold">Challenger App</h1>
      </header>
      <main className="container mx-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-bold mb-4">Create New Challenge</h2>
            <ChallengeForm onSubmit={handleCreateChallenge} />
          </div>
          <div>
            <ChallengeList challenges={challenges} onSelectChallenge={handleSelectChallenge} />
          </div>
        </div>
        {selectedChallenge && (
          <div className="mt-8">
            <ChallengeDetails challenge={selectedChallenge} onUpdateProgress={handleUpdateProgress} />
          </div>
        )}
        {leaderboard.length > 0 && (
          <div className="mt-8">
            <Leaderboard entries={leaderboard} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;