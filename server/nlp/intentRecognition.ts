export type Intent = 'BOOK_DESIGNER' | 'ASK_MANAGEMENT' | 'CHECK_AVAILABILITY' | 'ASK_COST' |'GET_AI_NEWS' | 'GREETING' | 'UNKNOWN';

export const recognizeIntent = (text: string): Intent => {
    const lowerText = text.toLowerCase();

    if (lowerText.includes("designer for my brand") || lowerText.includes("hire designer")) {
        return 'BOOK_DESIGNER';
    }
    if (lowerText.includes("manage team") || lowerText.includes("team management")) {
        return 'ASK_MANAGEMENT';
    }
    if (lowerText.includes("availability") || lowerText.includes("is open") || lowerText.includes("when ready")) {
        return 'CHECK_AVAILABILITY';
    }
    if (lowerText.includes("cost") || lowerText.includes("price") || lowerText.includes("budget")) {
        return 'ASK_COST';
    }
    if (lowerText.includes("ai news") || lowerText.includes("artificial intelligence news") || lowerText.includes("ai updates")) {
        return 'GET_AI_NEWS';
    }
    if (lowerText.match(/\b(hi|hello|hey)\b/)) {
        return 'GREETING';
    }

    return 'UNKNOWN';
};