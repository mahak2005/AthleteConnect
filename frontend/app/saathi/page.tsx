'use client';

import { useState } from 'react';
import TrainingPlanForm from '@/components/saathi/TrainingPlanForm';
import TrainingPlanDisplay from '@/components/saathi/TrainingPlanDisplay';
import { TrainingPlan, TrainingFormData } from '@/types/training';
import { Navbar } from '@/components/layout/navbar';

export default function SaathiPage() {
    const [trainingPlan, setTrainingPlan] = useState<TrainingPlan | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFormSubmit = async (formData: TrainingFormData) => {
        setIsLoading(true);
        try {
            const response = await fetch('/api/generate-plan', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to generate training plan');
            }

            const data: TrainingPlan = await response.json();
            setTrainingPlan(data);
        } catch (error) {
            console.error('Error generating training plan:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-24 bg-gradient-to-b from-teal-500 to-teal-400">
            <Navbar />
            <h1 className="text-4xl font-bold mb-8 text-center">Saathi - Your AI Training Partner</h1>
            <div className="max-w-3xl mx-auto">
                <TrainingPlanForm onSubmit={handleFormSubmit} isLoading={isLoading} />
                {isLoading && (
                    <div className="flex justify-center my-8">
                        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                )}
                {trainingPlan && <TrainingPlanDisplay plan={trainingPlan} />}
            </div>
        </div>
    );
}