
import { GoogleGenAI } from "@google/genai";
import { AURA_DOCUMENTATION } from '../constants';
import type { ChatMessage } from "../types";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
    // In a real app, you'd want to handle this more gracefully.
    // For this environment, we assume it's always available.
    console.warn("API_KEY environment variable not set.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

const systemInstruction = `You are AuraBot, an expert on the Aura programming language. Your knowledge is based exclusively on the following documentation. Answer the user's questions about Aura clearly and concisely using only the provided information. If the question is outside the scope of the documentation, politely state that you can only answer questions based on the official guide. Do not invent features or syntax. Format your answers with markdown for code blocks and lists where appropriate.

Aura Language Documentation:
---
${AURA_DOCUMENTATION}
---
`;

export const askAuraBot = async (history: ChatMessage[], newUserMessage: string): Promise<string> => {
    try {
        const contents = [
            ...history.map(msg => ({
                role: msg.sender === 'user' ? 'user' : 'model',
                parts: [{ text: msg.text }]
            })),
            { role: 'user', parts: [{ text: newUserMessage }] }
        ];

        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents,
            config: {
                systemInstruction: systemInstruction,
            },
        });

        const text = response.text;
        if (text) {
            return text;
        } else {
            return "I'm sorry, I couldn't generate a response. Please try again.";
        }

    } catch (error) {
        console.error("Error calling Gemini API:", error);
        return "An error occurred while contacting AuraBot. Please check the console for details.";
    }
};
