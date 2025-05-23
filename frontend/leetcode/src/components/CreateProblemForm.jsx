 import React from 'react'
 import {Controller,useFieldArray,useForm} from "react-hook-form"
 import {zodResolver} from "@hookform/resolvers/zod"  
 import {z} from "zod"
 import {Plus,Trash2,Code2,FileText,Lightbulb,BookOpen,CheckCircle2,Download,} from "lucide-react"
 import Editor from "@monaco-editor/react";
 import axiosInstance from '../libs/axios'
import toast from "react-hot-toast"
import {useNavigate} from "react-router-dom"
import { problemSchema } from '../pages/ProblemSchema'
import { sampleStringProblem,sampledpData} from '../data/SampleData'
import { useState  } from 'react'

 
const CreateProblemForm = () => {
    const [sampleType , setSampleType] = useState("DP")
      const [isLoading , setIsLoading] = useState(false);

    const navigation = useNavigate();
    const {register , control , handleSubmit , reset ,watch, formState:{errors}} = useForm(
        {
           // resolver:zodResolver(problemSchema),
            defaultValues:{
                 testcases: [{ input: "", output: "" }],
      tags: [""],
      examples: {
        JAVASCRIPT: { input: "", output: "", explanation: "" },
        PYTHON: { input: "", output: "", explanation: "" },
        JAVA: { input: "", output: "", explanation: "" },
      },
      codeSnippets: {
        JAVASCRIPT: "function solution() {\n  // Write your code here\n}",
        PYTHON: "def solution():\n    # Write your code here\n    pass",
        JAVA: "public class Solution {\n    public static void main(String[] args) {\n        // Write your code here\n    }\n}",
      },
      referenceSolutions: {
        JAVASCRIPT: "// Add your reference solution here",
        PYTHON: "# Add your reference solution here",
        JAVA: "// Add your reference solution here",
      },
            }
        }
    )
     const onSubmit = async (value)=>{
   try {
      console.log("Submitted", value);
    setIsLoading(true)
    const res = await axiosInstance.post("/problems/create-problem" , value)
        console.log("Server Response:", res.data);
    toast.success(res.data.message || "Problem Created successfully⚡");
    navigation("/");

   } catch (error) {
       console.error("Error in submission", error);
    toast.error("Error creating problem")
   }
   finally{
      setIsLoading(false);
   }
  }
     const {
    fields: testCaseFields,
    append: appendTestCase,
    remove: removeTestCase,
    replace: replacetestcases,
  } = useFieldArray({
    control,
    name: "testcases",
  });

  const {
    fields: tagFields,
    append: appendTag,
    remove: removeTag,
    replace: replaceTags,
  } = useFieldArray({
    control,
    name: "tags",
  });

    const loadSampleData=()=>{
    const sampleData = sampleType === "DP" ? sampledpData : sampleStringProblem
  
replaceTags(sampleData?.tags?.map(tag => tag) || []);
    replacetestcases(sampleData.testcases.map((tc) => tc));

   // Reset the form with sample data 
    reset(sampleData);
}

  
console.log("this is error",errors);

  const tags = watch("tags") || [];
     return (
      <div className='container mx-auto py-8 px-4 max-w-7xl'>
    <div className="card bg-base-100 shadow-xl">
          <div className="card-body p-6 md:p-8">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 md:mb-8 pb-4 border-b">
              <h2 className="card-title text-2xl md:text-3xl flex items-center gap-3">
                <FileText className="w-6 h-6 md:w-8 md:h-8 text-primary" />
                Create Problem
              </h2>
  
              <div className="flex flex-col md:flex-row gap-3 mt-4 md:mt-0">
                <div className="join">
                  <button
                    type="button"
                    className={`btn join-item ${
                      sampleType === "DP" ? "btn-active" : ""
                    }`}
                    onClick={() => setSampleType("array")}
                  >
                    DP Problem
                  </button>
                  <button
                    type="button"
                    className={`btn join-item ${
                      sampleType === "string" ? "btn-active" : ""
                    }`}
                    onClick={() => setSampleType("string")}
                  >
                    String Problem
                  </button>
                </div>
                <button
                  type="button"
                  className="btn btn-secondary gap-2"
                  onClick={loadSampleData}
                >
                  <Download className="w-4 h-4" />
                  Load Sample
                </button>
              </div>
            </div>
  
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
              
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Title
                    </span>
                  </label>
                  <input
                    type="text"
                    className="input input-bordered w-full text-base md:text-lg"
                    {...register("title")}
                    placeholder="Enter problem title"
                  />
                  {errors.title && (
                    
                    <label className="label">
                      <span className="label-text-alt text-error">
                              {errors.title.message}

                      </span>
                    </label>
                  
                  )}
                </div>
                
                <div className="form-control md:col-span-2">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Description
                    </span>
                  </label>
                  <textarea
                    className="textarea textarea-bordered min-h-32 w-full text-base md:text-lg p-4 resize-y"
                    {...register("description")}
                    placeholder="Enter problem description"
                  />
                  {errors.description && typeof errors.description.message === "string" && (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.description.message}
                      </span>
                    </label>
                  )}
                </div>
                  
                <div className="form-control">
                  <label className="label">
                    <span className="label-text text-base md:text-lg font-semibold">
                      Difficulty
                    </span>
                  </label>
                  <select
                    className="select select-bordered w-full text-base md:text-lg"
                    {...register("difficulty")}
                  >
                    <option value="EASY">Easy</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HARD">Hard</option>
                  </select>
                  {errors.difficulty && typeof errors.difficulty.message === "string" &&  (
                    <label className="label">
                      <span className="label-text-alt text-error">
                        {errors.difficulty.message}
                      </span>
                    </label>
                  )}
                </div>
              </div>
  
              {/* Tags */}
              {/* <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Tags
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => appendTag("")}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Tag
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {tagFields.map((field, index) => (
                    <div key={field.id} className="flex gap-2 items-center">
                      <input
                        type="text"
                        className="input input-bordered flex-1"
                        {...register(`tags.${index}`)}
                        placeholder="Enter tag"
                      />
                      <button
                        type="button"
                        className="btn btn-ghost btn-square btn-sm"
                        onClick={() => removeTag(index)}
                        disabled={tagFields.length === 1}
                      >
                        <Trash2 className="w-4 h-4 text-error" />
                      </button>
                    </div>
                  ))}
                </div>
                {errors.tags && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                           {console.log('errors.tags.message', errors.tags.message)}
                      {errors.tags.message}
                    </span>
                  </div>
                )}
              </div>  */}
                <div className="card bg-base-200 p-4 md:p-6 shadow-md">
              <Controller
                control={control}
                name="tags"
                render={({ field: { value, onChange } }) => (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                        <BookOpen className="w-5 h-5" />
                        Tags
                      </h3>

                      <button
                        type="button"
                        className="bg-brand hover:bg-brand/80 btn-sm text-white"
                        onClick={() => onChange([...value, ""])}
                      >
                        <Plus className="w-4 h-4 mr-1" /> Add Tags
                      </button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {value.map((tag, index) => (
                        <div
                          key={index}
                          className="flex gap-2 items-center flex-wrap"
                        >
                          <input
                            value={tag}
                            {...register(`tags.${index}`)}
                            className="input input-bordered "
                            placeholder="Enter tag"
                            onChange={(e) => {
                              const newTags = [...value];
                              newTags[index] = e.target.value;
                              onChange(newTags);
                            }}
                          />

                          <button
                            type="button"
                            disabled={tags.length === 1}
                            className="btn btn-ghost btn-square btn-sm"
                            onClick={() => {
                              const newTags = value.filter(
                                (_, i) => i !== index
                              );
                              onChange(newTags);
                            }}
                          >
                            <Trash2 className="w-4 h-4 text-error" />
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              />
              {errors.tags && (
                <div className="mt-2">
                  <span className="text-error text-sm">
                    {errors.tags.message}
                  </span>
                </div>
              )}
            </div>
              {/* Test Cases */}
              <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg md:text-xl font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5" />
                    Test Cases
                  </h3>
                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => appendTestCase({ input: "", output: "" })}
                  >
                    <Plus className="w-4 h-4 mr-1" /> Add Test Case
                  </button>
                </div>
                <div className="space-y-6">
                  {testCaseFields.map((field, index) => (
                    <div key={field.id} className="card bg-base-100 shadow-md">
                      <div className="card-body p-4 md:p-6">
                        <div className="flex justify-between items-center mb-4">
                          <h4 className="text-base md:text-lg font-semibold">
                            Test Case #{index + 1}
                          </h4>
                          <button
                            type="button"
                            className="btn btn-ghost btn-sm text-error"
                            onClick={() => removeTestCase(index)}
                            disabled={testCaseFields.length === 1}
                          >
                            <Trash2 className="w-4 h-4 mr-1" /> Remove
                          </button>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Input
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                              {...register(`testcases.${index}.input`)}
                              placeholder="Enter test case input"
                            />
                            {errors.testCases?.[index]?.input && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testCases[index].input.message}
                                  {console.log("testcase input error:", errors.testCases?.[index]?.input)}

                                </span>
                              </label>
                            )}
                          </div>
                          <div className="form-control">
                            <label className="label">
                              <span className="label-text font-medium">
                                Expected Output
                              </span>
                            </label>
                            <textarea
                              className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                              {...register(`testcases.${index}.output`)}
                              placeholder="Enter expected output"
                            />
                            {errors.testCases?.[index]?.output && (
                              <label className="label">
                                <span className="label-text-alt text-error">
                                  {errors.testCases[index].output.message}
                                </span>
                              </label>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.testCases && !Array.isArray(errors.testCases) && (
                  <div className="mt-2">
                    <span className="text-error text-sm">
                      {errors.testCases.message}
                    </span>
                  </div>
                )}
              </div>
  
              {/* Code Editor Sections */}
              <div className="space-y-8">
                {["JAVASCRIPT", "PYTHON", "JAVA"].map((language) => (
                  <div
                    key={language}
                    className="card bg-base-200 p-4 md:p-6 shadow-md"
                  >
                    <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                      <Code2 className="w-5 h-5" />
                      {language}
                    </h3>
  
                    <div className="space-y-6">
                      {/* Starter Code */}
                      <div className="card bg-base-100 shadow-md">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Starter Code Template
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`codeSnippets.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.codeSnippets?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.codeSnippets[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Reference Solution */}
                      <div className="card bg-base-100 shadow-md">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4 flex items-center gap-2">
                            <CheckCircle2 className="w-5 h-5 text-success" />
                            Reference Solution
                          </h4>
                          <div className="border rounded-md overflow-hidden">
                            <Controller
                              name={`referenceSolutions.${language}`}
                              control={control}
                              render={({ field }) => (
                                <Editor
                                  height="300px"
                                  language={language.toLowerCase()}
                                  theme="vs-dark"
                                  value={field.value}
                                  onChange={field.onChange}
                                  options={{
                                    minimap: { enabled: false },
                                    fontSize: 14,
                                    lineNumbers: "on",
                                    roundedSelection: false,
                                    scrollBeyondLastLine: false,
                                    automaticLayout: true,
                                  }}
                                />
                              )}
                            />
                          </div>
                          {errors.referenceSolution?.[language] && (
                            <div className="mt-2">
                              <span className="text-error text-sm">
                                {errors.referenceSolution[language].message}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
  
                      {/* Examples */}
                      <div className="card bg-base-100 shadow-md">
                        <div className="card-body p-4 md:p-6">
                          <h4 className="font-semibold text-base md:text-lg mb-4">
                            Example
                          </h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Input
                                </span>
                              </label>
                              <textarea
                                className="textarea textarea-bordered min-h-20 w-full p-3 resize-y"
                                {...register(`examples.${language}.input`)}
                                placeholder="Example input"
                              />
                              {errors.examples?.[language]?.input && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].input.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Output
                                </span>
                              </label>
                              <textarea
                                className="textarea textarea-bordered min-h-20 w-full p-3 resize-y"
                                {...register(`examples.${language}.output`)}
                                placeholder="Example output"
                              />
                              {errors.examples?.[language]?.output && (
                                <label className="label">
                                  <span className="label-text-alt text-error">
                                    {errors.examples[language].output.message}
                                  </span>
                                </label>
                              )}
                            </div>
                            <div className="form-control md:col-span-2">
                              <label className="label">
                                <span className="label-text font-medium">
                                  Explanation
                                </span>
                              </label>
                              <textarea
                                className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                                {...register(`examples.${language}.explanation`)}
                                placeholder="Explain the example"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
  
              {/* Additional Information */}
              <div className="card bg-base-200 p-4 md:p-6 shadow-md">
                <h3 className="text-lg md:text-xl font-semibold mb-6 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-warning" />
                  Additional Information
                </h3>
                <div className="space-y-6">
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">Constraints</span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                      {...register("constraints")}
                      placeholder="Enter problem constraints"
                    />
                    {errors.constraints && (
                      <label className="label">
                        <span className="label-text-alt text-error">
                          {errors.constraints.message}
                        </span>
                      </label>
                    )}
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Hints (Optional)
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered min-h-24 w-full p-3 resize-y"
                      {...register("hints")}
                      placeholder="Enter hints for solving the problem"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-medium">
                        Editorial (Optional)
                      </span>
                    </label>
                    <textarea
                      className="textarea textarea-bordered min-h-32 w-full p-3 resize-y"
                      {...register("editorial")}
                      placeholder="Enter problem editorial/solution explanation"
                    />
                  </div>
                </div>
              </div>
  
              <div className="card-actions justify-end pt-4 border-t">
                <button type="submit" className="btn btn-primary btn-lg gap-2">
                  
                  {isLoading ? (
                    <span className="loading loading-spinner text-white"></span>
                  ) : (
                    <>
                      <CheckCircle2 className="w-5 h-5" />
                      Create Problem
                    </>
                  )}
                  
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    )
  }


 export default CreateProblemForm;