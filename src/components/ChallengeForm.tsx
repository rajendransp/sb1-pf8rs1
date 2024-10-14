import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { Challenge, Task } from '../types';

interface ChallengeFormProps {
  onSubmit: (challenge: Omit<Challenge, 'id'>) => void;
}

const ChallengeForm: React.FC<ChallengeFormProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [tasks, setTasks] = useState<Omit<Task, 'id'>[]>([{ description: '', completed: false }]);
  const [durationType, setDurationType] = useState<'week' | 'month' | 'days'>('week');
  const [durationValue, setDurationValue] = useState(1);
  const [participants, setParticipants] = useState(['']);

  const addTask = () => {
    setTasks([...tasks, { description: '', completed: false }]);
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const updateTask = (index: number, description: string) => {
    const newTasks = [...tasks];
    newTasks[index].description = description;
    setTasks(newTasks);
  };

  const addParticipant = () => {
    setParticipants([...participants, '']);
  };

  const removeParticipant = (index: number) => {
    setParticipants(participants.filter((_, i) => i !== index));
  };

  const updateParticipant = (index: number, name: string) => {
    const newParticipants = [...participants];
    newParticipants[index] = name;
    setParticipants(newParticipants);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      title,
      tasks: tasks.map((task, index) => ({ ...task, id: `task-${index}` })),
      duration: { type: durationType, value: durationValue },
      startDate: new Date(),
      participants: participants.filter((p) => p.trim() !== ''),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Challenge Title
        </label>
        <input
          type="text"
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Tasks</label>
        {tasks.map((task, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="text"
              value={task.description}
              onChange={(e) => updateTask(index, e.target.value)}
              required
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeTask(index)}
              className="ml-2 p-1 text-red-600 hover:text-red-800"
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addTask}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          Add Task
        </button>
      </div>

      <div className="flex space-x-4">
        <div className="flex-1">
          <label htmlFor="durationType" className="block text-sm font-medium text-gray-700">
            Duration Type
          </label>
          <select
            id="durationType"
            value={durationType}
            onChange={(e) => setDurationType(e.target.value as 'week' | 'month' | 'days')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          >
            <option value="week">Week</option>
            <option value="month">Month</option>
            <option value="days">Days</option>
          </select>
        </div>
        <div className="flex-1">
          <label htmlFor="durationValue" className="block text-sm font-medium text-gray-700">
            Duration Value
          </label>
          <input
            type="number"
            id="durationValue"
            value={durationValue}
            onChange={(e) => setDurationValue(parseInt(e.target.value))}
            min="1"
            required
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Participants</label>
        {participants.map((participant, index) => (
          <div key={index} className="flex items-center mt-2">
            <input
              type="text"
              value={participant}
              onChange={(e) => updateParticipant(index, e.target.value)}
              placeholder="Participant name"
              className="flex-grow rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
            <button
              type="button"
              onClick={() => removeParticipant(index)}
              className="ml-2 p-1 text-red-600 hover:text-red-800"
            >
              <Minus size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={addParticipant}
          className="mt-2 inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <Plus size={16} className="mr-2" />
          Add Participant
        </button>
      </div>

      <button
        type="submit"
        className="w-full inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Create Challenge
      </button>
    </form>
  );
};

export default ChallengeForm;