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
  import { Button } from "./ui/button";
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
import { Checkbox } from "./ui/checkbox";


const ProblemTable = ({ problems }) => {
  const [search, setSearch] = useState("");
  const [difficulty, setDifficulty] = useState("ALL");
  const [selectedTag, setSelectedTag] = useState("ALL");
  const Diffculties = ["EASY", "MEDIUM", "HARD"];
  const [items, setItems] = useState([]);
  const [visibleCount, setVisibleCount] = useState(1); // how many to show initially
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
        <Button onClick={() => {}} className="flex gap-2">
          <Plus className="w-4 h-4" />
          Create Playlist
        </Button>
      </div>

      <div className="flex flex-wrap justify-between items-center mb-6 gap-4">
        <Input
          type="text"
          placeholder="Search by title"
          className="w-full md:w-1/3"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <Select value={difficulty} onValueChange={setDifficulty}>
          <SelectTrigger className="w-[200px]">
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
          <SelectTrigger className="w-[200px]">
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
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Solved</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Tags</TableHead>
                <TableHead>Difficulty</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {items.map((problem, index) => {
                const isSolved = (problem.solvedBy || []).some(
                  (user) => user.createdBy === authUser?.id
                )

                return (
                  <TableRow key={problem.id || index}>
                    <TableCell>
                      <Checkbox checked={isSolved} readOnly />
                    </TableCell>
                    <TableCell>
                      <Link
                        to={`problem/${problem.id}`}
                        className="font-semibold hover:underline"
                      >
                        {problem.title}
                      </Link>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {(problem.tags || []).map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-xs font-medium border rounded px-2 py-0.5 bg-yellow-100 text-yellow-800"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </TableCell>
                    <TableCell>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded text-white ${
                          problem.difficulty === "EASY"
                            ? "bg-green-500"
                            : problem.difficulty === "MEDIUM"
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                      >
                        {problem.difficulty}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col md:flex-row gap-2 items-start md:items-center">
                        {authUser?.role === "ADMIN" && (
                          <div className="flex gap-2">
                            <Button
                              size="sm"
                              variant="destructive"
                              onClick={() => handleDelete(problem.id)}
                            >
                              <TrashIcon className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="secondary" disabled>
                              <PencilIcon className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex gap-2 items-center"
                          onClick={() => handleAddToPlaylist(problem.id)}
                        >
                          <Bookmark className="w-4 h-4" />
                          <span className="hidden sm:inline">
                            Save to Playlist
                          </span>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </InfiniteScroll>
      </div>
    </div>
  )
};

export default ProblemTable;
