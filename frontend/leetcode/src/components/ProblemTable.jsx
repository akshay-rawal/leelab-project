import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useAuthStore } from "@/store/store";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  Bookmark,
  PencilIcon,
  Trash,
  TrashIcon,
  Plus,
  Key,
} from "lucide-react";


const ProblemTable = ({ problems }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("");
  const Diffculties = ["EASY", "MEDIUM", "HARD"];
  const [items, setItems] = useState(problems.slice(0, 20));
  
  const authUser = useAuthStore((state) => state.authUser);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];


    const tagSet = new Set();

    problems.forEach((element) =>
      element.tags?.forEach((tag) => tagSet.add(tag))
    );

    return Array.from(tagSet);
  }, [problems]);


  const filterdSearch = useMemo(()=>{
          return (problems || [])
          .filter((problem)=>problem.title.toLowerCase().includes(search.toLowerCase))
          .filter((problem)=>difficulty === "ALL"?true:problem.difficulty === difficulty)
          .filter((problem)=>selectedTag==="ALL"?true:problem.tags?.includes(selectedTag))
  },[selectedTag,search,difficulty])


 


  const fetchMoreData = async() => {
  setTimeout(() => {
    const more =  problems.slice(items.length, items.length + 20);
    setItems(prev => [...prev, ...more]);
  }, 1500);
};

 <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={items.length < problems.length}
      loader={<h4>Loading...</h4>}
    >
      {items.map((problem, index) => (
        <div key={index}>
          <h3>{problem.title}</h3>
          <p>{problem.difficulty}</p>
        </div>
      ))}
    </InfiniteScroll>


  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button className="btn btn-primary gap-2" onClick={() => {}}>
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>
      <div className="flex flex-wrap justfiy-between items-center mb-6 gap-4">
        <input
          type="text"
          placeholder="search by title"
          className="input input-bordered w-full md:w-1/3 bg-base-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="select select-bordered bg-base-200"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="ALL">All Diffculties</option>
          {Diffculties.map((diff) => (
            <option Key={diff} value={diff}>
              {diff[0].toUpperCase() + diff.slice(1).toLowerCase()}
            </option>
          ))}
        </select>
        <select className="select select-bordered bg-base-200">
          {allTags.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>
        <div className="overflow-x-auto rounded-xl shadow-md">
        <table className="table table-zebra table-lg bg-base-200 text-base-content">
        <thead className="bg-base-200">
        <th>Solved</th>
        <th>Title</th>
        <th>Tags</th>
        <th>Difficulty</th>
        <th>Actions</th>
        </thead>
        <tbody>
           <InfiniteScroll
      dataLength={items.length}
      next={fetchMoreData}
      hasMore={items.length < problems.length}
      loader={<h4>Loading...</h4>}
    >
      {items.map((problem, index) => (
        <div key={index}>
          <h3>{problem.title}</h3>
          <p>{problem.difficulty}</p>
        </div>
      ))}
    </InfiniteScroll>
        </tbody>
        </table>
        
        </div>
    </div>
  
  );
};

export default ProblemTable;
