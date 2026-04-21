require('dotenv').config();
const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

async function generateImageCaption(base64ImageFile) {
    try {
        const contents = [
            {
                inlineData: {
                    mimeType: "image/jpeg",
                    data: base64ImageFile,
                },
            },
            { text: "Caption this image." },
        ];

        const response = await ai.models.generateContent({
            model: "gemini-3-flash-preview",
            contents,
            config: {
                systemInstruction: `You are an expert caption generator. 
                Generate a concise and descriptive caption for the given image.
                Focus on the main subject and context of the image. 
                Avoid generic captions and be creative!
                you can use atleast 2 hashtags and 1 emoji in the caption.`,
            },
        });

        return response.text;

    } catch (err) {
        console.error("Gemini Error:", err.message);
        throw err;
    }
}

module.exports = generateImageCaption;