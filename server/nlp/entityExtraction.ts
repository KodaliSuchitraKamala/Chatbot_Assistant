export interface ExtractedEntities {
    service?: string;
    date?: string;
    email?: string;
    budget?: number;
}

export const extractEntities = (text: string): ExtractedEntities => {
    const entities: ExtractedEntities = {};

    // Basic Regex for email
    const emailMatch = text.match(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/);
    if (emailMatch) entities.email = emailMatch[0];

    // Basic Regex for prices/budget
    const budgeMatch = text.match(/\$(\d+)/);
    if (budgeMatch) entities.budget = parseInt(budgeMatch[1]);

    // Keyword based service extraction
    if (text.toLowerCase().includes("branding")) entities.service = "Branding";
    if (text.toLowerCase().includes("management")) entities.service = "Full Management";

    return entities;
};