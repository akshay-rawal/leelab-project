import React, { useState } from 'react'
import SignupSchema from './schemas/SignupSchemas';
import {Code,Eye,EyeOff,Loader2,Lock,Mail} from "lucide-react"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";



const Signup = () => {
   const [showPassword,setShowPassword] = useState(false)
   const formMethods = useForm({
  resolver:zodResolver(SignupSchema )
})

const { register, handleSubmit, formState } = formMethods;
const { errors } = formState;

 const onSubmit = async (data) => {
    console.log(data);
 }

  return (
    <div>Signup</div>
  )
}

export default Signup