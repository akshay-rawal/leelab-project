import { useState, useCallback } from "react";
import { LoginSchema } from "./schemas/Schema";
import { Code, Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link, useNavigate } from "react-router-dom";
import AuthImagePattern from "../components/shared/AuthImagePattern";
import { useAuthStore } from "../store/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { loadFull } from "tsparticles";
import Particles from "react-tsparticles";
import TypingHeading from "@/libs/typingHeading";

const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLogginIn } = useAuthStore();

  const formMethods = useForm({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { register, handleSubmit, formState } = formMethods;
  const { errors } = formState;

  const onSubmit = async (data) => {
    try {
      const user = await login(data);
      if (user) navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#005AA7] to-[#FFFDE4] text-black">
      {" "}
      {/* Particle background */}
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
      {/* Main Content */}
      <div className="relative z-10 min-h-screen grid lg:grid-cols-2 overflow-auto">
        <div className="flex flex-col justify-center items-center p-6 sm:p-12">
          <div className="w-full max-w-md space-y-8">
            <div className="text-center mb-8 text-white">
              <div className="flex flex-col items-center gap-2 group">
                <TypingHeading />
                <p className="opacity-90 relative top-5">Login your account</p>
              </div>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
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
                    placeholder="Enter your email"
                    {...register("email")}
                    className={`w-full pl-10 text-black dark:text-white bg-white dark:bg-gray-800 rounded-md px-3 py-2 shadow-sm transition-colors
                    focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400
                    ${errors.email ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
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
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400 dark:text-gray-500" />
                  </div>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    className={`w-full pl-10 text-black dark:text-white bg-white dark:bg-gray-800 rounded-md px-3 py-2 shadow-sm transition-colors
  focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-400
  ${errors.password ? "border-red-500" : "border-gray-300 dark:border-gray-600"}`}
                  />

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
                {errors.password && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.password.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="btn btn-primary w-full"
                disabled={isLogginIn}
              >
                {isLogginIn ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin mr-2" />
                    Loading...
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </form>

            <div className="text-center">
              <p className="text-white">
                Don't have an account?{" "}
                <Link
                  to="/sign-up"
                  className="text-blue-400 hover:underline font-semibold"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </div>
        </div>

        <AuthImagePattern
          title="Welcome back to our platform!"
          subtitle="Login to access our platform and start using our services."
        />
      </div>
    </div>
  );
};

export default LoginPage;
