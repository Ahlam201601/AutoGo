import axios from "axios";

const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${GEMINI_API_KEY}`;

export const getAIRecommendations = async (userPreferences, cars) => {
    if (!GEMINI_API_KEY) {
        throw new Error("Gemini API key is missing in environment variables.");
    }

    const prompt = `
    You are an expert car recommendation assistant for AutoGo.
    Based on the following user preferences and the list of available cars, return a JSON array containing ONLY the IDs of the top 3 recommended cars.
    
    User Preferences:
    - Budget Level: ${userPreferences.budget}
    - Primary Purpose: ${userPreferences.purpose}
    - Minimum Seats: ${userPreferences.seats}
    - Preferred Fuel: ${userPreferences.fuel}

    Available Cars (JSON):
    ${JSON.stringify(cars.map(c => ({
        id: c.id,
        brand: c.brand,
        model: c.model,
        price: c.pricePerDay,
        category: c.category,
        fuel: c.fuel,
        seats: c.seats,
        description: c.description
    })))}

    Return ONLY the JSON array of IDs, for example: ["1", "2", "3"]. 
    Do not include any other text, markdown blocks, or explanations. Just the array.
  `;

    try {
        const response = await axios.post(GEMINI_URL, {
            contents: [{
                parts: [{ text: prompt }]
            }]
        });

        const aiText = response.data.candidates[0].content.parts[0].text;
        // Clean potential markdown formatting
        const cleanedText = aiText.replace(/```json/g, "").replace(/```/g, "").trim();
        const recommendedIds = JSON.parse(cleanedText);

        return recommendedIds;
    } catch (error) {
        console.error("AI Recommendation Error:", error);
        throw error;
    }
};
