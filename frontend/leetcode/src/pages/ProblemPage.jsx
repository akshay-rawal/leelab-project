import { useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import UseProblemStore from "@/store/ProblemStore";
import {
  Play,
  FileText,
  MessageSquare,
  Lightbulb,
  Bookmark,
  Share2,
  Clock,
  ChevronRight,
  BookOpen,
  Terminal,
  Code2,
  Users,
  ThumbsUp,
  Home,
} from "lucide-react";
import { json } from "stream/consumers";
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";

export const ProblemPge = () => {
  const { id } = useParams();
  const { singleProblemLoading, singleProblem, getSingleProblem } =
    UseProblemStore();
  const [code, setCode] = useState("");
  const [activeTab, setActiveTab] = useState("description");
  const [selectedLanguage, setSelectedLanguage] = useState("javascript");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [testcases, setTestCases] = useState([]);

  const submissionCount = 10;

  useEffect(() => {
    getSingleProblem(id);
  }, [id]);

  useEffect(() => {
    setCode(
      singleProblem.codeSnippets?.[selectedLanguage] ||
        submission?.sourceCode ||
        ""
    );
    setTestCases(
      singleProblem.testcases?.map((tc) => ({
        input: tc.input,
        output: tc.output,
      }))
    ) || [];

   const handleLanguageChange = (e)=>{
       const lang = e.target.value
       setSelectedLanguage(lang)
       setCode(singleProblem.codeSnippets?.[lang] || "")
       
   }
  });
  return (
    <div className="min-h-screen bg-gradient-to-br from-base-300 to-base-200">
      <nav className="navbar bg-base-100 shadow-lg px-4">
        <div className="flex-1 gp-2">
          <Link to={"/"} className="flex items-center gap-2 text-primary">
            <Home className="w-6 h-6" />
          </Link>
          <div className="mt-2">
            <h1 className="text-xl font-bold">{singleProblem.title}</h1>
            <div className="flex items-center gap-2 text-sm text-base-content/70 mt-5">
              <Clock className="w-4 h-4" />

              <span>
                Updated{" "}
                {new Date(singleProblem.createdAt).toLocaleString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              <span className="text-base-content/30">.</span>
              <Users className="-4 h-4" />
              <span>{submissionCount} Submissions</span>
              <span className="text-base-content/30">.</span>
              <ThumbsUp className="w-4 h-4" />
              <span>95% Success Rate</span>
            </div>
          </div>
        </div>
        <div className="flex-none gap-4"></div>
        <Button
          className={`btn btn-ghost btn-circle ${isBookmarked ? "text-primary" : ""}`}
          onClick={() => setIsBookmarked(!isBookmarked)}
        >
          <Bookmark className="w-5 h-5" />
          <Select
            className="select select-bordered select-primary w-40"
            value={selectedLanguage}
            onchange={handleLanguageChange} 
          >
            {Object.keys(singleProblem.codeSnippets || {}).map((lang) => (
              <option key={lang} value={lang}>
                {lang.charAt(0).toUpperCase() + lang.slice(1)}
              </option>
            ))}
          </Select>
        </Button>
      </nav>
      <div className="contaniner mx-auto p-4 ">

      </div>
    </div>
  );
};
