
 
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
  
  export const submitBatch = async(submssion)=>{
    const {data} = await axios.post(`${process.env.JUDGE0_API_URL}/submissions/?base64_encoded=false&wait=false`,{submssion})

    console.log("submission data:",data);
    return data
    
  }  

  const sleep = (ms)=> new Promise((resolve)=> setTimeout(resolve,ms))

  export const pollBatchResults = async (tokens)=>{
    while(true){
      const {data} = await axios.get(`${process.env.JUDGE0_API_URL}/submissions/batch`,
        {
          params:{
            tokens:tokens.join(","),
            base64_encoded: false,
          },
          headers:{"content-type":"application/json"}
        }
      )
       const result = data.submissions
       const isllDone = result.every((r)=>r.status.id !== 1 && r.status.id !== 2)
       if(isllDone) return result
       await sleep(1000)
    }
  }