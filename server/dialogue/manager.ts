import { recognizeIntent, Intent } from '../nlp/intentRecognition';
import { extractEntities } from '../nlp/entityExtraction';
import { getSession, updateSession } from '../data/database';
import { callTool } from '../nlp/tools';
import { knowledgeBase } from '../data/knowledgeBase';
import { generateAIResponse } from '../nlp/aiService';

export const processMessage = async (userId: string, text: string) => {
    const session = getSession(userId);
    const intent = recognizeIntent(text);
    const entities = extractEntities(text);

    let prompt = text;
    let knowledge = "";

    // Pull from knowledge base based on intent or service
    if (intent === 'BOOK_DESIGNER' || (entities.service && entities.service.toLowerCase().includes("branding"))) {
        knowledge = knowledgeBase.getServiceInfo("Branding");
    } else if (intent === 'ASK_MANAGEMENT' || (entities.service && entities.service.toLowerCase().includes("management"))) {
        knowledge = knowledgeBase.getServiceInfo("Team Management");
    } else if (intent === 'ASK_COST') {
        knowledge = knowledgeBase.getFAQ("pricing");
    } else if (intent === 'CHECK_AVAILABILITY') {
        knowledge = knowledgeBase.getFAQ("availability");
    }

    if (knowledge) {
        prompt = `Context: ${knowledge}\n\nUser Question: ${text}\n\nAssistant: Use the context above to provide a helpful, accurate, and concise response.`;
    } else if (intent !== 'UNKNOWN') {
        prompt = `User intent: ${intent}. User question: ${text}. Answer helpfully.`;
    }
    
    // Pass everything to the AI
    let response = await generateAIResponse(prompt);

    // Update session history and context
    updateSession(userId, {
        history: [...session.history, { role: 'user', text }, { role: 'bot', text: response }],
        context: { ...session.context, lastIntent: intent, lastEntities: entities }
    });

    return response;
};