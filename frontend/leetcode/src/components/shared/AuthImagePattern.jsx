import { Code, Terminal, FileCode, Braces } from "lucide-react";
import { useEffect, useState } from "react";

const CodeBackground = ({ title, subtitle }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const codeSnippet = [
    `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  let prev = null;
  let current = head;
  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }
  return prev;
}`,
    `function isValid(s) {
  const stack = [];
  const map = {
    '(': ')',
    '{': '}',
    '[': ']'
  };
  
  for (let i = 0; i < s.length; i++) {
    if (s[i] in map) {
      stack.push(s[i]);
    } else {
      const last = stack.pop();
      if (map[last] !== s[i]) return false;
    }
  }
  
  return stack.length === 0;
}`,
  ];

  //this is useeffect which run continously without trigger any
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % codeSnippet.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [codeSnippet.length]);

 return (
<div className="hidden lg:flex flex-col items-center justify-center text-white p-12 relative overflow-hidden">
    {/* Removed background animated code symbols */}

    <div className="z-10 max-w-md flex flex-col items-center">
      {/* Code editor mockup */}
<div className="w-full bg-transparent rounded-lg shadow-xl mb-8 overflow-hidden border border-white/10">
        {/* editor's header */}
        <div className="bg-slate-700 px-4 py-2 flex items-center">
          <div className="flex space-x-2 mr-4">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <div className="text-xs font-mono opacity-70">problem.js</div>
        </div>

        {/* code content */}
        <div className="p-4 font-mono text-xs sm:text-sm overflow-hidden relative h-64">
          <pre className="whitespace-pre-wrap text-green-400 transition-opacity duration-1000">
            {codeSnippet[activeIndex]}
          </pre>
          {/* Blinking cursor */}
<div className="absolute bottom-2 right-2 w-2 h-5 bg-white/30 rounded-sm animate-pulse" />

        </div>
      </div>

      {/* Logo */}
      <div className="flex items-center justify-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
          <Code className="w-6 h-6 text-primary" />
        </div>
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">{title}</h2>
      <p className="text-slate-300 text-center">{subtitle}</p>
    </div>
  </div>
);
}
export default CodeBackground;
