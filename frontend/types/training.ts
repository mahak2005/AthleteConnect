export type SkillLevel = 'beginner' | 'intermediate' | 'advanced';

export interface TrainingFormData {
    age: number;
    gender: string;
    sport: string;
    skillLevel: SkillLevel;
    goals: string;
    injuryHistory: string;
    trainingDaysPerWeek: number;
}

export interface TrainingPlan {
    weeks: {
        weekNumber: number;
        days: {
            dayNumber: number;
            content: string;
        }[];
    }[];
} 