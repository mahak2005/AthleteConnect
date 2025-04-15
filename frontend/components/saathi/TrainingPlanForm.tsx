'use client';

import { useState } from 'react';
import { TrainingFormData, SkillLevel } from '@/types/training';

interface TrainingPlanFormProps {
    onSubmit: (data: TrainingFormData) => void;
    isLoading: boolean;
}

export default function TrainingPlanForm({ onSubmit, isLoading }: TrainingPlanFormProps) {
    const [formData, setFormData] = useState<TrainingFormData>({
        age: 18,
        gender: '',
        sport: '',
        skillLevel: 'beginner',
        goals: '',
        injuryHistory: '',
        trainingDaysPerWeek: 3,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formData);
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: name === 'age' || name === 'trainingDaysPerWeek' ? Number(value) : value,
        }));
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700">age</label>
                    <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        min="13"
                        max="100"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Gender</label>
                    <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select Gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Sport/Event</label>
                    <input
                        type="text"
                        name="sport"
                        value={formData.sport}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">Skill Level</label>
                    <div className="mt-2 space-x-4">
                        {(['beginner', 'intermediate', 'advanced'] as SkillLevel[]).map((level) => (
                            <label key={level} className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="skillLevel"
                                    value={level}
                                    checked={formData.skillLevel === level}
                                    onChange={handleChange}
                                    className="text-blue-600 focus:ring-blue-500"
                                />
                                <span className="ml-2 capitalize">{level}</span>
                            </label>
                        ))}
                    </div>
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Goals</label>
                    <textarea
                        name="goals"
                        value={formData.goals}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-700">Injury History</label>
                    <textarea
                        name="injuryHistory"
                        value={formData.injuryHistory}
                        onChange={handleChange}
                        rows={3}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700">
                        Available Training Days per Week
                    </label>
                    <input
                        type="number"
                        name="trainingDaysPerWeek"
                        value={formData.trainingDaysPerWeek}
                        onChange={handleChange}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                        min="1"
                        max="7"
                        required
                    />
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    type="submit"
                    disabled={isLoading}
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
                >
                    {isLoading ? 'Generating...' : 'Generate Training Plan'}
                </button>
            </div>
        </form>
    );
} 