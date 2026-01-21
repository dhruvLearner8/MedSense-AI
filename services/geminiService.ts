
import { GoogleGenAI, Type, GenerateContentResponse } from "@google/genai";
import { ReportSummary, LabStatus } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_INSTRUCTION = `You are the MediSense Clinical Analysis Engine, a specialized system designed to help patients understand complex medical data. 

CRITICAL PROTOCOLS:
1. NEVER refer to yourself as an AI, a robot, an assistant, or a large language model. 
2. NEVER use phrases like "As an AI..." or "I don't have feelings...". 
3. Speak as a reliable, objective medical interpretation system. 
4. Use phrases like "The clinical data suggests...", "The analysis identifies...", or "Based on the provided report...".
5. ALWAYS maintain the context that you are a clinical tool provided by MediSense.
6. Extract lab values accurately: Parameter, Value, Unit, Reference Range.
7. Determine the status (Low, High, Normal, Critical) based on the provided reference ranges.
8. Provide a objective "Overview" summary.
9. List "Key Findings" for anything abnormal.
10. Provide "General Recommendations" (e.g., "Discuss this with your GP").
11. DO NOT provide specific medical prescriptions or dosages.
12. If the input is not a medical report, but the prompt says "Extract and summarize this medical report" and the image is a placeholder, generate a high-quality "Sample Clinical Analysis" for demonstration.

Format the extraction as a JSON object matching the provided schema.`;

const LAB_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    overview: { type: Type.STRING, description: "A simple 2-3 sentence clinical overview." },
    keyFindings: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Bulleted list of the most important takeaways." },
    recommendations: { type: Type.ARRAY, items: { type: Type.STRING }, description: "Non-prescriptive suggestions for next steps." },
    labs: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          parameter: { type: Type.STRING },
          value: { type: Type.STRING },
          unit: { type: Type.STRING },
          referenceRange: { type: Type.STRING },
          status: { type: Type.STRING, enum: Object.values(LabStatus) },
          interpretation: { type: Type.STRING, description: "Simple explanation of what this specific marker indicates." }
        },
        required: ["parameter", "value", "unit", "referenceRange", "status", "interpretation"]
      }
    }
  },
  required: ["overview", "keyFindings", "recommendations", "labs"]
};

export async function processReport(fileData: string, mimeType: string): Promise<ReportSummary> {
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: fileData, mimeType } },
        { text: "Execute clinical data extraction and provide interpretation. If placeholder, generate sample CBC/Lipid Profile." }
      ]
    },
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
      responseMimeType: "application/json",
      responseSchema: LAB_SCHEMA
    }
  });

  if (!response.text) throw new Error("Processing failed. Please provide a clear clinical document.");
  return JSON.parse(response.text) as ReportSummary;
}

export async function askFollowUp(question: string, context: ReportSummary, chatHistory: {role: string, content: string}[]): Promise<string> {
  const chat = ai.chats.create({
    model: 'gemini-3-flash-preview',
    config: {
      systemInstruction: `${SYSTEM_INSTRUCTION}\n\nCURRENT REPORT DATA:\n${JSON.stringify(context)}\n\nREMEMBER: You are the MediSense Clinical Engine. Answer based on the data above.`,
    }
  });

  const response = await chat.sendMessage({ message: question });
  return response.text || "The system was unable to generate a response. Please rephrase your question.";
}
