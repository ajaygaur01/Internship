import { useState } from "react";
import axios from "axios";

const Chat = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const generateAnswer = async () => {
    if (!question.trim()) {
      alert("Please enter a question!");
      return;
    }

    setLoading(true);
    try {
      const response = await axios({
        url: "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=AIzaSyDK2VwQI-39V5wLU_UIW0_3X5D9o5HEVlc",
        method: "post",
        data: {
          contents: [
            {
              role: "user",
              parts: [{ text: question }],
            },
          ],
        },
      });
      setAnswer(
        response.data.candidates[0].content.parts[0].text ||
          "No response received."
      );
    } catch (error) {
      console.error("Error generating response:", error);
      setAnswer("Failed to generate a response. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 p-6">
      <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl w-full">
        <h1 className="text-2xl font-bold text-center text-blue-600 mb-4">
          AI Chat App
        </h1>
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Type your question here..."
          className="w-full h-32 p-4 text-gray-700 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 resize-none"
        />
        <button
          onClick={generateAnswer}
          disabled={loading}
          className={`w-full mt-4 py-2 text-white font-semibold rounded-lg ${
            loading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 transition"
          }`}
        >
          {loading ? "Generating..." : "Generate Answer"}
        </button>
        {answer && (
          <div className="mt-6 p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-700 mb-2">
              AI Response:
            </h2>
            <p className="text-gray-600">{answer}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
