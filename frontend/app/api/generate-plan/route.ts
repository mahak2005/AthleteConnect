import { NextResponse } from 'next/server';
import { TrainingFormData, TrainingPlan } from '@/types/training';

const OPENROUTER_API_KEY = process.env.OPENROUTER_API_KEY;
const OPENROUTER_API_URL = 'https://openrouter.ai/api/v1/chat/completions';

function generateMockPlan(formData: TrainingFormData): TrainingPlan {
    // This is a mock plan that will be used if no API key is provided
    return {
        weeks: Array.from({ length: 4 }, (_, weekIndex) => ({
            weekNumber: weekIndex + 1,
            days: Array.from({ length: formData.trainingDaysPerWeek }, (_, dayIndex) => ({
                dayNumber: dayIndex + 1,
                content: `Day ${dayIndex + 1} training for ${formData.sport}:
- Warm-up: 15 minutes dynamic stretching
- Main workout: Focus on ${formData.skillLevel} level exercises
- Cool-down: 10 minutes static stretching
- Notes: ${formData.goals}`
            }))
        }))
    };
}

export async function POST(request: Request) {
    try {
        const formData: TrainingFormData = await request.json();

        if (!OPENROUTER_API_KEY) {
            // Return mock data if no API key is provided
            return NextResponse.json(generateMockPlan(formData));
        }

        const prompt = `Create a 4-week personalized training plan for a ${formData.age}-year-old ${formData.skillLevel} level ${formData.sport} athlete.
Goals: ${formData.goals}
Injuries: ${formData.injuryHistory}
Training days per week: ${formData.trainingDaysPerWeek}
Include weekly breakdowns with rest days and progressive workouts.`;

        const response = await fetch(OPENROUTER_API_URL, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
                'Content-Type': 'application/json',
                'HTTP-Referer': 'https://athlete-connect.vercel.app',
                'X-Title': 'Athlete Connect'
            },
            body: JSON.stringify({
                model: 'openchat/openchat-7b',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate training plan');
        }

        const data = await response.json();
        const generatedText = data.choices[0].message.content;

        // Parse the generated text into our TrainingPlan structure
        // This is a simplified parser - you might want to make it more robust
        const weeks = generatedText.split('\n\n').map((weekText: string, index: number) => {
            const days = weekText.split('\n').filter(line => line.trim()).map((dayText, dayIndex) => ({
                dayNumber: dayIndex + 1,
                content: dayText.trim()
            }));

            return {
                weekNumber: index + 1,
                days
            };
        });

        return NextResponse.json({ weeks });
    } catch (error) {
        console.error('Error generating training plan:', error);
        return NextResponse.json(
            { error: 'Failed to generate training plan' },
            { status: 500 }
        );
    }
} 