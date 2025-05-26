import { useEffect,useMemo, useState } from "react"
import React from 'react'
import { useAuthStore } from "@/store/store"
import { Link } from "react-router-dom"
import { BookMark,PencilIcon,Trash,TrashIcon,Plus, Key } from "lucide-react"
import { diff } from "util"

const ProblemTable = ({problems}) => {
    const authUser = useAuthStore((state)=>state.authUser)

    const allTags = useMemo(()=>{
        if(!Array.isArray(problems)) return []
    })

    const [search,setSearch] = useState("")
  const [difficulty,setDifficulty] = useState("ALL")
  const [selectedTag,setSelectedTag] = useState("")
  const [currentPage,setCurrentPage] = useState(1)
  const Diffculties = ["EASY","MEDIUM","HARD"]

  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
        <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Problems</h2>
            <button className="btn btn-primary gap-2"
            onClick={()=>{}}>
            <Plus className="w-4 h-4"/>
            Create Playlist

            </button>
        </div>
      <div className="flex flex-wrap justfiy-between items-center mb-6 gap-4">
        <input 
          type="text"
          placeholder="search by title"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={search}
          onChange={(e)=>setSearch(e.target.value)}/>

            <select className="select select-bordered bg-base-200"
            value={difficulty}
            onChange={(e)=>setDifficulty(e.target.value)}>
                <option value="ALL">All Diffculties</option>
                {Diffculties.map((diff)=>(
                    <option Key = {diff} value={diff}>

                    </option>

                ))}
            </select>

      </div>
       
    </div>
  )
}

export default ProblemTable