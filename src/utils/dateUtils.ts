import { ChatSession } from '../types';

export type DateCategory = 'Today' | 'Yesterday' | 'Previous 7 Days' | 'Previous 30 Days' | 'Earlier';

export interface GroupedSessions {
    category: DateCategory;
    sessions: ChatSession[];
}

export const groupSessionsByDate = (sessions: ChatSession[]): GroupedSessions[] => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    const last7Days = new Date(today);
    last7Days.setDate(last7Days.getDate() - 7);

    const last30Days = new Date(today);
    last30Days.setDate(last30Days.getDate() - 30);

    const groups: Record<DateCategory, ChatSession[]> = {
        'Today': [],
        'Yesterday': [],
        'Previous 7 Days': [],
        'Previous 30 Days': [],
        'Earlier': []
    };

    sessions.forEach(session => {
        const sessionDate = new Date(session.timestamp);
        const sessionDay = new Date(sessionDate.getFullYear(), sessionDate.getMonth(), sessionDate.getDate());

        if (sessionDay.getTime() === today.getTime()) {
            groups['Today'].push(session);
        } else if (sessionDay.getTime() === yesterday.getTime()) {
            groups['Yesterday'].push(session);
        } else if (sessionDay >= last7Days) {
            groups['Previous 7 Days'].push(session);
        } else if (sessionDay >= last30Days) {
            groups['Previous 30 Days'].push(session);
        } else {
            groups['Earlier'].push(session);
        }
    });

    return (Object.keys(groups) as DateCategory[])
        .map(category => ({
            category,
            sessions: groups[category]
        }))
        .filter(group => group.sessions.length > 0);
};

export const formatSessionTimestamp = (timestamp: string): string => {
    const date = new Date(timestamp);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();

    if (isToday) {
        return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }

    return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
};
