 import React from 'react'
 import {Controller,useFieldArray,useForm} from "react-hook-form"
 import {zodResolver} from "@hookform/resolvers/zod"  
 import {z} from "zod"
 import {Plus,Trash2,Code2,FileText,Lightbulb,BookOpen,CheckCircle2,Download,} from "lucide-react"
 import Editor from "@monaco-editor/react";
 import axiosInstance from '../libs/axios'
import toast from "react-hot-toast"
import useNavigate from "react-router-dom"
import { problemSchema } from '../pages/ProblemSchema'
 
 const CreateProblemForm = () => {
       
    const navigate = useNavigate()

    const {} = useForm({
      resolver:zodResolver(problemSchema),
      defaultValues:{
        
      }
    })
   return (
     <div>CreateProblemForm</div>
   )
 }
 
 export default CreateProblemForm