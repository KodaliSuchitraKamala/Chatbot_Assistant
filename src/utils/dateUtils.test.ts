import { groupSessionsByDate } from './dateUtils';
import { ChatSession } from '../types';

describe('dateUtils', () => {
    const mockSession = (id: string, daysAgo: number): ChatSession => {
        const date = new Date();
        date.setDate(date.getDate() - daysAgo);
        return {
            id,
            messages: [],
            timestamp: date.toISOString(),
            preview: `Session ${id}`
        };
    };

    it('should group sessions correctly', () => {
        const sessions: ChatSession[] = [
            mockSession('1', 0), // Today
            mockSession('2', 0), // Today
            mockSession('3', 1), // Yesterday
            mockSession('4', 5), // Last 7 Days
            mockSession('5', 15), // Last 30 Days
            mockSession('6', 40), // Earlier
        ];

        const grouped = groupSessionsByDate(sessions);

        expect(grouped.find((g: any) => g.category === 'Today')?.sessions.length).toBe(2);
        expect(grouped.find((g: any) => g.category === 'Yesterday')?.sessions.length).toBe(1);
        expect(grouped.find((g: any) => g.category === 'Previous 7 Days')?.sessions.length).toBe(1);
        expect(grouped.find((g: any) => g.category === 'Previous 30 Days')?.sessions.length).toBe(1);
        expect(grouped.find((g: any) => g.category === 'Earlier')?.sessions.length).toBe(1);
    });
});
