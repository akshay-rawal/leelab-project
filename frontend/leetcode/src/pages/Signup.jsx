import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import {
  Code,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  CheckCircle,
} from "lucide-react";
import Typewriter from "typewriter-effect";
import TypingHeading from "@/libs/typingHeading";

import { Schema } from "./schemas/Schema";
import { useAuthStore } from "../store/store";
import AuthImagePattern from "../components/shared/AuthImagePattern";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const SignupPage = () => {
  const navigate = useNavigate();
  const { signup, isSigninUp } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const formMethods = useForm({
    resolver: zodResolver(Schema),
  });

  const { register, handleSubmit, formState } = formMethods;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const user = await signup(data);
      if (user) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
<div className="h-screen overflow-hidden bg-gradient-to-br from-[#005AA7] to-[#FFFDE4]">      
  <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          fullScreen: { enable: false },
          background: { color: "#0f172a" },
          particles: {
            number: { value: 50 },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.3 },
            size: { value: 3 },
            move: { enable: true, speed: 1 },
            links: {
              enable: true,
              distance: 150,
              color: "#ffffff",
              opacity: 0.4,
              width: 1,
            },
          },
          interactivity: {
            events: {
              onHover: { enable: true, mode: "repulse" },
              onClick: { enable: true, mode: "push" },
            },
            modes: {
              repulse: { distance: 100 },
              push: { quantity: 4 },
            },
          },
        }}
        className="absolute inset-0 z-0"
      />

<div className="relative z-10 h-full grid lg:grid-cols-2">
          {/* Left Form Side */}
<div className="flex flex-col items-center justify-start p-6 sm:p-12 overflow-auto h-full bg-slate-900">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8">
              <div className="flex flex-col items-center gap-2 group">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <Code className="w-6 h-6 text-primary" />
                </div>
                <TypingHeading />
                <h2 className="text-2xl font-bold mt-2 text-white">
                  <Typewriter
                    options={{
                      strings: [
                        "Practice DSA Daily",
                        "Learn Coding by Solving",
                        "Ace Coding Interviews",
                        "Start Your Problem-Solving Journey",
                        "Solve Challenges. Improve Skills.",
                        "Become a Better Coder",
                      ],
                      autoStart: true,
                      loop: true,
                    }}
                  />
                </h2>{" "}
                <p className="text-white/70 relative top-5">
                  Sign Up to your account
                </p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* Name */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Name
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Code className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <Input
                    type="text"
                    {...register("name")}
                    className={`w-full pl-10 text-black dark:text-white bg-white dark:bg-gray-800 border-2 rounded-md px-3 py-2 shadow-sm transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    placeholder="John Doe"
                  />
                </div>
                {errors.name && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Email
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <Input
                    type="email"
                    {...register("email")}
                    className={`w-full pl-10 text-black dark:text-white bg-white dark:bg-gray-800 border-2 rounded-md px-3 py-2 shadow-sm transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                    placeholder="you@example.com"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Password
                  </span>
                </label>
                <div className="relative">
                  {/* Left Icon */}
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>

                  {/* Input Field */}
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full pl-10 pr-10 text-black dark:text-white bg-white dark:bg-gray-800 border-2 rounded-md px-3 py-2 shadow-sm transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400 ${
                      errors.password
                        ? "border-red-500"
                        : "border-gray-300 dark:border-gray-600"
                    }`}
                    placeholder="••••••••"
                  />

                  {/* Eye Toggle Button using <Button> component */}
                  <Button
                    type="button"
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                    variant="ghost"
                    size="icon"
                  >
                    {showPassword ? (
                      <EyeOff className="h-6 w-6" />
                    ) : (
                      <Eye className="h-6 w-6" />
                    )}
                  </Button>
                </div>

                {/* Error message */}
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirm Password */}
              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold text-white">
                    Confirm Password
                  </span>
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <CheckCircle className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <Input
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    className={`w-full pl-10 pr-10 text-black dark:text-white bg-white dark:bg-gray-800 border-2 rounded-md px-3 py-2 shadow-sm transition-colors focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400}`}
                    placeholder="Confirm Password"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>
              {/* Submit Button */}
              <Button type="submit" className="w-full" disabled={isSigninUp}>
                {isSigninUp ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Sign up"
                )}
              </Button>
            </form>

            {/* Footer */}
            <div className="text-center mt-4">
              <p className="text-white text-base font-medium">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Sign in
                </Link>
              </p>
            </div>
          
          </div>
        </div>

        {/* Right Side Pattern */}
        <AuthImagePattern
          title={"Welcome to our platform!"}
          subtitle={
            "Sign up to access our platform and start using our services."
          }
        />
      </div>
    </div>
  );
};

export default SignupPage;
