import React from 'react';
import { Challenge } from '../types';
import { Calendar } from 'lucide-react';

interface ChallengeListProps {
  challenges: Challenge[];
  onSelectChallenge: (challenge: Challenge) => void;
}

const ChallengeList: React.FC<ChallengeListProps> = ({ challenges, onSelectChallenge }) => {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold mb-4">Active Challenges</h2>
      {challenges.map((challenge) => (
        <div
          key={challenge.id}
          className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-lg transition-shadow"
          onClick={() => onSelectChallenge(challenge)}
        >
          <h3 className="text-xl font-semibold mb-2">{challenge.title}</h3>
          <div className="flex items-center text-gray-600 mb-2">
            <Calendar size={16} className="mr-2" />
            <span>
              {challenge.duration.value} {challenge.duration.type}
              {challenge.duration.value > 1 ? 's' : ''}
            </span>
          </div>
          <p className="text-gray-600">
            {challenge.tasks.length} task{challenge.tasks.length !== 1 ? 's' : ''}
          </p>
          <p className="text-gray-600">
            {challenge.participants.length} participant{challenge.participants.length !== 1 ? 's' : ''}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ChallengeList;