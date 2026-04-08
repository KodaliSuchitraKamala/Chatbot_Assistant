export interface UserSession {
    userId: string;
    context: any;
    history: any[];
}

const sessions: Record<string, UserSession> = {};

export const getSession = (userId: string): UserSession => {
    if (!sessions[userId]) {
        sessions[userId] = { userId, context: {}, history: [] };
    }
    return sessions[userId];
};

export const updateSession = (userId: string, updates: Partial<UserSession>) => {
    const session = getSession(userId);
    Object.assign(session, updates);
    return session;
};