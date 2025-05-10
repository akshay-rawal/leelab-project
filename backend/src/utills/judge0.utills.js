import axios from "axios";

export const getJudge0LanguageId = (language) => {
  const languageMap = {
    "javascript": 63,
    "python": 71,
    "java": 62,
    "c": 50,
    "cpp": 54,
    // Add more languages as needed
  };

  const id = languageMap[language.toLowerCase()] || null;
  console.log(`Language: ${language}, Language ID: ${id}`);
  return id;
};

export const submitBatch = async (submissions) => {
  try {
    

    const { data } = await axios.post(
      `${process.env.JUDGE0_API_URL}/submissions/batch?base64_encoded=false&wait=false`,
      
      { submissions },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("Submission response data:", data);
    return data;
  } catch (error) {
    console.error("Error in submitBatch:", error.message);
    if (error.response) {
      console.error("Response error data:", error.response.data);
    }
    throw error;
  }
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const pollBatchResults = async (tokens) => {
  console.log("Polling batch results for tokens:", tokens);
  while (true) {
    try {
      console.log("Using Judge0 API URL:", process.env.JUDGE0_API_URL);

      const { data } = await axios.get(
        `${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params: {
            tokens: tokens.join(","),
            base64_encoded: false,
          },
          headers: { "Content-Type": "application/json" },
        }
      );

      const result = data.submissions;
      console.log("Polling response:", result);

      const isAllDone = result.every(
        (r) => r.status.id !== 1 && r.status.id !== 2
      );

      if (isAllDone) {
        console.log("All submissions processed.");
        return result;
      }

      console.log("Some submissions still processing. Retrying in 10s...");
      await sleep(10000);
    } catch (error) {
      console.error("Error while polling batch results:", error.message);
      if (error.response) {
        console.error("Polling response error data:", error.response.data);
      }
      throw error;
    }
  }
};

export function getJudge0LanguageName(languageId) {
  const languages = {
    63: "JavaScript",
    71: "Python",
    62: "Java",
    74: "TypeScript",
    50: "C",
    54: "C++",
  };

  return languages[languageId] || "Unknown";
}
