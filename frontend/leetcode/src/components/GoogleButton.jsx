import {signInWithPopup } from "firebase/auth";
import { provider,auth } from "@/Firebase";

const GoogleLoginButton = () => {
 const handleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    console.log("User Info:", result.user);
  } catch (error) {
    if (error.code === "auth/popup-closed-by-user") {
      console.warn("User closed the Google Sign-In popup.");
    } else {
      console.error("Google Sign-In Error:", error.message);
    }
  }
};


  return (
    <button
      onClick={handleLogin}
      className="px-4 py-2 bg-white text-black rounded-lg shadow hover:bg-gray-100"
    >
      Sign in with Google
    </button>
  );
};

export default GoogleLoginButton;
