import { useEffect, useMemo, useState } from "react";
import React from "react";
import { useAuthStore } from "@/store/store";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import { Input } from "./ui/input";
import { Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption } from "./ui/table";
import {  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem } from "./ui/select";

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
  const [selectedTag, setSelectedTag] = useState("ALL");
  const Diffculties = ["EASY", "MEDIUM", "HARD"];
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(20); // how many to show initially
  const authUser = useAuthStore((state) => state.authUser);

  const allTags = useMemo(() => {
    if (!Array.isArray(problems)) return [];


    const tagSet = new Set();

    problems.forEach((element) =>
      element.tags?.forEach((tag) => tagSet.add(tag))
    );

    return Array.from(tagSet);
  }, [problems]);


  const filterdProblems = useMemo(()=>{
          return (problems || [])
          .filter((problem)=>problem.title.toLowerCase().includes(search.toLowerCase()))
          .filter((problem)=>difficulty === "ALL"?true:problem.difficulty === difficulty)
          .filter((problem)=>selectedTag==="ALL"?true:problem.tags?.includes(selectedTag))
  },[selectedTag,search,difficulty])
   
  useEffect(()=>{
    setItems(filterdProblems.slice(0,visibleCount))
  },[filterdProblems,visibleCount])

  const fetchMoreData = ()=>{
       setTimeout(()=>{
        setVisibleCount((prev)=>prev+20)
       },500)
  }
 


  return (
    <div className="w-full max-w-6xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Problems</h2>
        <button className="btn btn-primary gap-2" onClick={() => {}}>
          <Plus className="w-4 h-4" />
          Create Playlist
        </button>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <Input
          type="text"
          placeholder="Search by title"
          className="w-full md:w-1/3 bg-base-200"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[200px] bg-base-200">
            <SelectValue placeholder="Select difficulty" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Difficulties</SelectItem>
            {Diffculties.map((diff) => (
              <SelectItem key={diff} value={diff}>
                {diff[0] + diff.slice(1).toLowerCase()}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={selectedTag} onValueChange={setSelectedTag}>
          <SelectTrigger className="w-[200px] bg-base-200">
            <SelectValue placeholder="Select tag" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="ALL">All Tags</SelectItem>
            {allTags.map((tag) => (
              <SelectItem key={tag} value={tag}>
                {tag}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="overflow-x-auto">
        <InfiniteScroll
          dataLength={items.length}
          next={fetchMoreData}
          hasMore={items.length < filterdProblems.length}
          loader={<h4 className="text-center my-4">Loading more problems...</h4>}
          scrollableTarget="scroll"
        >
          <Table className="bg-base-200 text-base-content">
            <TableHeader className="bg-base-200">
              <TableRow>
                <TableHead>Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((problem, index) => (
                <TableRow key={problem.id || index}>
                  <TableCell>{problem.solved ? "✅" : "❌"}</TableCell>
                  <TableCell>{problem.title}</TableCell>
                  <TableCell>{problem.tags?.join(", ")}</TableCell>
                  <TableCell>{problem.difficulty}</TableCell>
                  <TableCell>
                    <button className="btn btn-sm btn-outline">View</button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </div>
    </div>
  );
};

export default ProblemTable;
