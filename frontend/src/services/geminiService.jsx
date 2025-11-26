import axios from "axios";

const API_KEY = "AIzaSyBDXfRbQQqW2gURbSKqs4RZ0gdjnl4u-Ww";

export const askGemini = async (question, context = "") => {
    const url =
        "https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash-latest:generateContent?key=" +
        API_KEY;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: `${context}\n\nUser: ${question}` }
                ]
            }
        ]
    };

    const res = await axios.post(url, requestBody, {
        headers: { "Content-Type": "application/json" },
    });

    return res.data.candidates[0].content.parts[0].text;
};
