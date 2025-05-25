import { useEffect, useRef } from "react";
import Typed from "typed.js";

const TypingHeading = () => {
  const typedRef = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedRef.current, {
      strings: ["Welcome to MyCode"],
      typeSpeed: 50, // Fast typing speed
      showCursor: false,
    });

    return () => {
      typed.destroy(); // Clean up on unmount
    };
  }, []);

  return (
    <h1 className="text-2xl font-bold mt-2 text-white">
      <span ref={typedRef}></span>
    </h1>
  );
};

export default TypingHeading;
