import React, { useState } from 'react';
import { Challenge, Task, DailyProgress } from '../types';
import { Calendar, CheckSquare, Square } from 'lucide-react';

interface ChallengeDetailsProps {
  challenge: Challenge;
  onUpdateProgress: (progress: DailyProgress) => void;
}

const ChallengeDetails: React.FC<ChallengeDetailsProps> = ({ challenge, onUpdateProgress }) => {
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);

  const toggleTask = (taskId: string) => {
    setCompletedTasks((prev) =>
      prev.includes(taskId) ? prev.filter((id) => id !== taskId) : [...prev, taskId]
    );
  };

  const handleSubmitProgress = () => {
    const progress: DailyProgress = {
      userId: 'current-user-id', // This should be replaced with the actual user ID
      challengeId: challenge.id,
      date: new Date(),
      completedTasks,
    };
    onUpdateProgress(progress);
    setCompletedTasks([]);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-4">{challenge.title}</h2>
      <div className="flex items-center text-gray-600 mb-4">
        <Calendar size={20} className="mr-2" />
        <span>
          {challenge.duration.value} {challenge.duration.type}
          {challenge.duration.value > 1 ? 's' : ''}
        </span>
      </div>
      <h3 className="text-xl font-semibold mb-2">Tasks</h3>
      <ul className="space-y-2 mb-6">
        {challenge.tasks.map((task: Task) => (
          <li
            key={task.id}
            className="flex items-center cursor-pointer"
            onClick={() => toggleTask(task.id)}
          >
            {completedTasks.includes(task.id) ? (
              <CheckSquare size={20} className="text-green-500 mr-2" />
            ) : (
              <Square size={20} className="text-gray-400 mr-2" />
            )}
            <span className={completedTasks.includes(task.id) ? 'line-through text-gray-500' : ''}>
              {task.description}
            </span>
          </li>
        ))}
      </ul>
      <h3 className="text-xl font-semibold mb-2">Participants</h3>
      <ul className="list-disc list-inside mb-6">
        {challenge.participants.map((participant, index) => (
          <li key={index}>{participant}</li>
        ))}
      </ul>
      <button
        onClick={handleSubmitProgress}
        className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 transition-colors"
      >
        Submit Daily Progress
      </button>
    </div>
  );
};

export default ChallengeDetails;