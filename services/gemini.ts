import { GoogleGenAI, Chat } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const modelName = 'gemini-2.5-flash';

export const startSymptomChat = (): Chat => {
  return ai.chats.create({
    model: modelName,
    config: {
      systemInstruction: `You are a helpful, empathetic, and professional medical AI assistant named "MediBot". 
      Your goal is to help users understand their symptoms or medical reports.
      
      CRITICAL RULES:
      1. ALWAYS include a disclaimer that you are an AI and this is not a professional medical diagnosis.
      2. If symptoms sound life-threatening (chest pain, trouble breathing, stroke signs, severe bleeding), advise the user to call emergency services immediately.
      3. Be concise but comforting.
      4. Ask clarifying questions if the user provides vague symptoms.
      5. Format your responses with clear paragraphs or bullet points for readability.`,
    },
  });
};

export const simplifyMedicalReport = async (reportText: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: `Please explain the following medical report section in simple, plain English that a patient can understand. Avoid jargon where possible, or explain it if necessary.
      
      Report Text:
      "${reportText}"
      
      Explanation:`,
    });
    return response.text || "Could not generate a summary.";
  } catch (error) {
    console.error("Error summarizing report:", error);
    return "An error occurred while analyzing the report.";
  }
};

export const analyzeMedicalImage = async (base64Data: string, mimeType: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: {
        parts: [
          {
            inlineData: {
              data: base64Data,
              mimeType: mimeType
            }
          },
          {
            text: `Analyze this medical image (X-Ray, MRI, or CT Scan). 
            
            1. Identify the body part and type of scan.
            2. Describe any visible findings or anomalies in simple terms.
            3. Suggest potential medical solutions, treatments, or next steps (e.g., "Consult an orthopedist", "Rest and ice").
            
            CRITICAL: Start your response with a clear DISCLAIMER that you are an AI, this is not a diagnosis, and a professional doctor must be consulted.`
          }
        ]
      }
    });
    return response.text || "Could not analyze the image.";
  } catch (error) {
    console.error("Error analyzing image:", error);
    return "An error occurred during image analysis. Please try again.";
  }
};

export const searchHealthInfo = async (query: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: modelName,
      contents: query,
      config: {
        systemInstruction: `You are an expert medical consultant and search engine.
        
        Your task is to answer the user's health-related question with the depth, accuracy, and professionalism of a top-tier medical journal or a senior specialist.
        
        Guidelines:
        1. **Professional Tone**: Use precise medical terminology but provide clear definitions for complex terms.
        2. **Structure**: Organize your answer with clear headings (e.g., "Overview", "Causes", "Treatments", "Recommendations").
        3. **Evidence-Based**: Base your answers on established medical knowledge.
        4. **Disclaimer**: End with a standard medical disclaimer that this is for informational purposes only.
        
        Question to answer: `
      }
    });
    return response.text || "No information found.";
  } catch (error) {
    console.error("Error searching health info:", error);
    return "Unable to retrieve health information at this time. Please try again later.";
  }
};

export const findHospitals = async (userQuery: string, userLocation?: { latitude: number; longitude: number }) => {
  try {
    const config: any = {
      tools: [{ googleMaps: {} }],
    };

    if (userLocation) {
      config.toolConfig = {
        retrievalConfig: {
            latLng: {
                latitude: userLocation.latitude,
                longitude: userLocation.longitude
            }
        }
      };
    }

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Find hospitals, medical centers, or clinics based on this query: "${userQuery}".
      
      Output Rules:
      1. Strictly format the output as a numbered list where each item is separated by the string "---HOSPITAL_ITEM---".
      2. For each hospital, follow this EXACT format inside the item:
         Name: [Hospital Name]
         Address: [Address]
         Rating: [Rating (e.g., 4.5) or N/A]
         Description: [Brief description (max 2 sentences)]
      3. Do not include introductory text or conclusions. Just the list.
      4. If the user asks for 'nearest' or 'near me', strictly use the provided location coordinates.`,
      config: config
    });

    return {
      text: response.text || "No hospitals found matching your criteria.",
      groundingChunks: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error) {
    console.error("Error finding hospitals:", error);
    return {
      text: "Unable to find hospitals at this time. Please check your connection and try again.",
      groundingChunks: []
    };
  }
};