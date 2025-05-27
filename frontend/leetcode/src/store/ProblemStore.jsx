 import {create} from "zustand"
 import axiosInstance from "../libs/axios"
import {toast} from "react-hot-toast"



 const UseProblemStore = create((set)=>({
   allProblems:[],
   singleProblem:null,
   allProblemLoading:false,
   singleProblemLoading:false,
   solvedProblemByUser:[],


 getSingleProblem: async (problemId) => {
  try {
    set({ singleProblemLoading: true });

    const res = await axiosInstance.get(`/problems/get-problems/${problemId}`);
    console.log("✅ Single Problem:", res.data);

    set({ singleProblem: res.data.problem, singleProblemLoading: false });
  } catch (error) {
    console.error("❌ Error fetching single problem:", error.message);
    toast.error("Failed to load problem. Please try again.");
    set({ singleProblemLoading: false });
  }
},

getSolvedProblem: async () => {
  try {
    set({ solvedProblemLoading: true });

    const res = await axiosInstance.get("/get-solved-problem/solved");
    console.log("✅ Solved Problems:", res.data);

    set({ solvedProblem: res.data.solvedProblems, solvedProblemLoading: false });
  } catch (error) {
    console.error("❌ Error fetching solved problems:", error.message);
    toast.error("Failed to load solved problems.");
    set({ solvedProblemLoading: false });
  }
},

getAllProblem: async () => {
  try {
    set({ allProblemLoading: true });

    const allProblem = await axiosInstance.get("/problems/getAll-problems"  );


    set({ allProblems: allProblem.data.data, allProblemLoading: false });
  } catch (error) {
    console.error("❌ Error fetching all problems:", error.message);
    toast.error("Unable to fetch all problems. Please try again.");
    set({ allProblemLoading: false });
  }
} 

})) 

export default UseProblemStore;