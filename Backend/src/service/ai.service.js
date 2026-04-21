const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

async function generateImageCaption(base64ImageFile, mimeType = "image/jpeg") {
  try {
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: "You are a creative caption generator. Write a short caption with 2 hashtags and 1 emoji."
    });

    const result = await model.generateContent([
      "Caption this image.",
      {
        inlineData: {
          data: base64ImageFile,
          mimeType,
        },
      },
    ]);

    const response = await result.response;
    return response.text();
  } catch (err) {
    console.error("Gemini API Error:", err.message);
    return "A beautiful moment captured. #photography #vibes ✨";
  }
}

module.exports = generateImageCaption;