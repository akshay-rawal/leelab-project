import React, { useEffect } from "react";
import { UseProblemStore } from "@/store/ProblemStore";
import { Loader } from "lucide-react";
import ProblemTable from "@/components/ProblemTable";
const Home = () => {
  const allProblems = UseProblemStore((state) => state.allProblems);
  const getAllProblem = UseProblemStore((state) => state.getAllProblem);
  const allProblemLoading = UseProblemStore((state) => state.allProblemLoading);
  useEffect(() => {
    getAllProblem();
    
  }, [getAllProblem]);


  if (allProblemLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center mt-14 px-4 ">
      <div className="absolute top-16 left-0 w-1/3 bg-primary opacity-30 blur-3xl rounded-md bottom-9"></div>
      <h1 className="text-4xl font-extrabold z-10 text-center">
        Welcome to <span className="text-primary">Leetlab</span>
      </h1>
      <p className="mt-4 text-center text-lg font-semibold text-gray-500 dar :text-gray-400 z-10">
        A Platform Inspired by Leetcode which helps you to prepare for coding
        interviews and helps you to improve your coding skills by solving coding
        problems
      </p>
      {allProblems && allProblems.length > 0 ? (
        <ProblemTable problems={allProblems} />
      ) : (
        <p className="mt-10 text-center text-lg font-semibold text-gray-500 dark:text-gray-400 z-10 border border-primary px-4 py-2 rounded-md border-dashed">
          No problem found!
        </p>
      )}
    </div>
  );
};

export default Home;
