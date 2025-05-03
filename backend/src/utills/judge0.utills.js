
 
 export const getJudge0LanguageId = (language)=> {
    const languageMap = {
      "javascript": 63,
      "python": 71,
      "java": 62,
      "c": 50,
      "cpp": 54,
      // aur bhi languages de sakte hai
    };
  
    return languageMap[language.toLowerCase()] || null;
  }
  
  