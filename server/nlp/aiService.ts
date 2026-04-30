import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from 'dotenv';

dotenv.config();

// Debug: Check if API key is loaded
const apiKey = process.env.GEMINI_API_KEY;
console.log("API Key loaded:", apiKey ? "Yes" : "No");
console.log("API Key starts with:", apiKey?.substring(0, 10) + "...");

const genAI = new GoogleGenerativeAI(apiKey || "MOCK_KEY");

export const generateAIResponse = async (prompt: string): Promise<string> => {
    // If no real API key is provided, return a simulated "smart" response
    if (!apiKey || apiKey === "MOCK_KEY" || apiKey.includes("your_gemini_api_key")) {
        console.log("Using mock AI response - no valid API key found");
        return simulateAIResponse(prompt);
    }

    try {
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });
        const result = await model.generateContent(prompt);
        const response = await result.response;
        return response.text();
    } catch (error: any) {
        console.error("Gemini AI Error Details:", {
            status: error.status,
            statusText: error.statusText,
            message: error.message
        });
        
        // Handle specific API errors
        if (error.status === 403) {
            return "API key is invalid or has insufficient permissions. Please check your GEMINI_API_KEY.";
        } else if (error.status === 429) {
            return "API rate limit exceeded. Please try again later.";
        } else {
            return `AI service error: ${error.message || "Unknown error occurred"}`;
        }
    }
};

const simulateAIResponse = (prompt: string): string => {
    const lowerPrompt = prompt.toLowerCase();
    
    if (lowerPrompt.includes("weather")) {
        return "I'm a mock AI for now! But if I had internet access, I'd tell you it's a great day to code.";
    }
    if (lowerPrompt.includes("joke")) {
        return "Why did the AI go to therapy? Because it had too many 'processing' issues! (Set your GEMINI_API_KEY for better jokes).";
    }
    if (lowerPrompt.includes("who are you")) {
        return "I am a Gemini AI-inspired chatbot. Currently, I'm running in mock mode until a real API key is provided.";
    }
    
    return `That's an interesting question about "${prompt}". Once you add a real **GEMINI_API_KEY** to the \`.env\` file, I'll be able to give you a deep, intelligent answer!`;
};
