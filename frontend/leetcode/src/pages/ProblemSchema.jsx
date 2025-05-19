import { z } from "zod";

export const problemSchema = z.object({
  
  title: z.string().min(1, { message: "Title is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  difficulty: z.enum(["EASY", "MEDIUM", "HARD"]), // assuming enum values
  constraints: z.array(z.string()),
examples: z.object({
  PYTHON: z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional(),
  }),
  JAVASCRIPT: z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional(),
  }),
  JAVA: z.object({
    input: z.string(),
    output: z.string(),
    explanation: z.string().optional(),
  }),
}),

  testCases: z.array(
  z.object({
    input: z.string().min(1, { message: "Input is required" }),
    output: z.string().min(1, { message: "Output is required" }),
  })
),

  tag: z.string().min(1, { message: "Tag is required" }),
  codeSnippets: z.object({
  PYTHON: z.string().min(1, { message: "Python code is required" }),
  JAVASCRIPT: z.string().min(1, { message: "JavaScript code is required" }),
  JAVA: z.string().min(1, { message: "Java code is required" }),
}),

referenceSolution: z.object({
  PYTHON: z.string().min(1, { message: "Python solution is required" }),
  JAVASCRIPT: z.string().min(1, { message: "JavaScript solution is required" }),
  JAVA: z.string().min(1, { message: "Java solution is required" }),
}),
    
 
});
