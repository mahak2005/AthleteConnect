'use client';

import { useState } from 'react';
import { TrainingPlan } from '@/types/training';

interface TrainingPlanDisplayProps {
    plan: TrainingPlan;
}

export default function TrainingPlanDisplay({ plan }: TrainingPlanDisplayProps) {
    const [expandedWeeks, setExpandedWeeks] = useState<number[]>([]);

    const toggleWeek = (weekNumber: number) => {
        setExpandedWeeks((prev) =>
            prev.includes(weekNumber)
                ? prev.filter((week) => week !== weekNumber)
                : [...prev, weekNumber]
        );
    };

    return (
        <div className="mt-8 space-y-6">
            <h2 className="text-2xl font-bold text-center">Your Personalized Training Plan</h2>
            <div className="space-y-4">
                {plan.weeks.map((week) => (
                    <div key={week.weekNumber} className="bg-white rounded-lg shadow-md overflow-hidden">
                        <button
                            onClick={() => toggleWeek(week.weekNumber)}
                            className="w-full px-6 py-4 flex justify-between items-center bg-blue-50 hover:bg-blue-100"
                        >
                            <h3 className="text-xl font-semibold">Week {week.weekNumber}</h3>
                            <svg
                                className={`w-6 h-6 transform transition-transform ${expandedWeeks.includes(week.weekNumber) ? 'rotate-180' : ''
                                    }`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M19 9l-7 7-7-7"
                                />
                            </svg>
                        </button>
                        {expandedWeeks.includes(week.weekNumber) && (
                            <div className="px-6 py-4 space-y-4">
                                {week.days.map((day) => (
                                    <div key={day.dayNumber} className="border-l-4 border-blue-500 pl-4">
                                        <h4 className="font-medium mb-2">Day {day.dayNumber}</h4>
                                        <p className="text-gray-700 whitespace-pre-line">{day.content}</p>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
} 