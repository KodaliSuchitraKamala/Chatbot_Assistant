import fs from 'fs';
import path from 'path';
import { ChatSession } from '../types';

const HISTORY_FILE = path.join(__dirname, 'history.json');

// Ensure history file exists
if (!fs.existsSync(HISTORY_FILE)) {
    fs.writeFileSync(HISTORY_FILE, JSON.stringify({}, null, 2));
}

export const loadHistory = (userId: string): ChatSession[] => {
    try {
        const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
        const historyMap = JSON.parse(data);
        return historyMap[userId] || [];
    } catch (error) {
        console.error("Error loading history:", error);
        return [];
    }
};

export const saveHistory = (userId: string, history: ChatSession[]) => {
    try {
        console.log(`Writing to history file for ${userId}...`);
        const data = fs.readFileSync(HISTORY_FILE, 'utf-8');
        const historyMap = JSON.parse(data);
        historyMap[userId] = history;
        fs.writeFileSync(HISTORY_FILE, JSON.stringify(historyMap, null, 2));
        console.log(`Successfully saved history for ${userId}`);
    } catch (error) {
        console.error("Error saving history:", error);
    }
};
