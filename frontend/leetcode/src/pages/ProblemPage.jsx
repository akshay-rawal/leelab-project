import { useParams } from "react-router-dom";
import React from "react";
import { useEffect, useState } from "react";
import { Editor } from "@monaco-editor/react";
import { UseProblemStore } from "@/store/ProblemStore";
import { Link } from "react-router-dom";
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
import { Button } from "@/components/ui/button";
import { Select } from "@/components/ui/select";


export const ProblemPge = () => {
  const { id } = useParams();
  const { singleProblemLoading, singleProblem, getSingleProblem } =
    UseProblemStore();
    console.log("singleProblem...",singleProblem);
    
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
  }, [singleProblem, selectedLanguage]);
  const handleLanguageChange = (e) => {
    const lang = e.target.value;
    setSelectedLanguage(lang);
    setCode(singleProblem.codeSnippets?.[lang] || "");
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case "description":
        return (
          <div className="prose max-w-none">
            <p className="text-lg mb-6">{singleProblem.description}</p>
            {singleProblem.examples && (
              <>
                <h3 className="text-xl font-bold mb-4">Examples:</h3>
                {Object.entries(singleProblem.examples).map(
                  ([lang, example], idx) => (
                    <div
                      key={lang}
                      className="bg-base-200 p-6 rounded-xl mb-6 fono-momo"
                    >
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Input:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.input}
                        </span>
                      </div>
                      <div className="mb-4">
                        <div className="text-indigo-300 mb-2 text-base font-semibold">
                          Output:
                        </div>
                        <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white">
                          {example.output}
                        </span>
                      </div>
                      {example.explanation && (
                        <div>
                          <div className="text-emerald-200 mb-2 text-base font-semibold">
                            Explanation:
                          </div>
                          <p className="text-base-content/70 text-lg font-semibold">
                            {example.explanation}
                          </p>
                        </div>
                      )}
                    </div>
                  )
                )}
              </>
            )}

            {singleProblem.constraints && (
              <>
                <h3 className="text-xl font-bold mb-4">Constraints</h3>
                <div className="bg-base-200 p-6 rounded-xl mb-6">
                  <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                    {singleProblem.constraints}
                  </span>
                </div>
              </>
            )}
          </div>
        );
      case "submissions":
        return (
          <SubmissionList
            submissions={submissions}
            isLoading={isSubmissionLoading}
          />
        );
      case "discussion":
        return (
          <div className="p-4 text-center text-base-content/70">
            No discussion yet
          </div>
        );
      case "hints":
        return (
          <div className="p-4">
            {singleProblem?.hints ? (
              <div className="bg-base-200 p-6 rounded-xl">
                <span className="bg-black/90 px-4 py-1 rounded-lg font-semibold text-white text-lg">
                  {singleProblem.hints}
                </span>
              </div>
            ) : (
              <div className="text-center text-base-content/70">
                No hints Avaiable
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

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
      <div className="container mx-auto p-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-bordered"></div>
              <Button
                className={`tab gap-2 ${activeTab === "description" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("description")}
              >
                <FileText className="w-4 h-4">Description</FileText>
              </Button>
              <Button
                className={`tab gap-2 ${activeTab === "submissions" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("submissions")}
              >
                <Code2 className="w-4 h-4" />
                Submissions
              </Button>
              <Button
                className={`tab gap-2 ${activeTab === "discussion" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("discussion")}
              >
                <MessageSquare className="w-4 h-4" />
                Discussion
              </Button>
              <Button
                className={`tab gap-2 ${activeTab === "hints" ? "tab-active" : ""}`}
                onClick={() => setActiveTab("hints")}
              >
                <Lightbulb className="w-4 h-4" />
                Hints
              </Button>
            </div>

            <div className="p-6">{renderTabContent()}</div>
          </div>
          <div className="card bg-base-100 shadow-xl">
            <div className="card-body p-0">
              <div className="tabs tabs-borderd">
                <button className="tab tab-active gap-2">
                  <Terminal className="w-4 h-4" />
                  Code Editor
                </button>
              </div>
              <div className="h-[600px] w-full">
              <Editor
                height={"100%"}
                language={selectedLanguage.toLowerCase()}
                theme="vs-dark"
                value={code}
                onChange={(value) => setCode(value || "")}
                options={{
                  minimap: { enabled: false },
                  fontSize: 22,
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                  readOnly:false,
                  automaticLayout: true,
                }}
              />
              </div>

              <div className="p-4 border-t border-base-300 bg-base-200">
                <div className="flex justify-between items-center">
                  <button className={`btn btn-primary gap-2 ${isExecuting ? "loading" : ""}`}
                  onClick={handleRunCode}
                  disabled={isExecuting}
                  >
                    {!isExecuting && <Play className="w-4 h-4"/>}
                    Run Code
                    </button>
                    <button className="btn btn-success gap-2">
                      Submit Solution 
                    </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card bg-base-100 shadow-xl mt-6">
        <div className="card-body">
          {
            submission ? (<h1>Submission Data</h1>):<> 
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Test Cases</h3>
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr>
                      <th>Input</th>
                      <th>Expected Output</th>
                    </tr>

                  </thead>
                  <tbody>
                    {testcases.map((testCase,index)=>(
                      <tr key={index}>
                        <td className="font-mono">{testCase.input}</td>
                            <td className="font-mono">{testCase.output}</td>
                      </tr> 
                    ))}
                  </tbody>
                </table>
              </div>
              </div></>
          }
        </div>
      </div>
    </div>
  );
};
