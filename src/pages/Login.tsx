"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-1">
        {/* Left side with custom vector */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#FFA652] p-8">
          <div className="relative w-full h-full max-w-none">
            {/* Custom vector design with grid of shapes filling the section */}
            <div className="grid grid-cols-6 gap-6 w-full h-full">
              {Array.from({ length: 48 }).map((_, index) => {
                // Determine shape type based on index
                const shapeType = index % 3;
                // Determine color based on index
                const colorClass = index % 3 === 0 
                  ? "bg-[#FF7B00]" 
                  : index % 3 === 1 
                    ? "bg-[#FF8d21]" 
                    : "bg-white";
                
                return (
                  <div 
                    key={index} 
                    className={`w-full h-full ${
                      shapeType === 0 
                        ? `${colorClass} rounded-3xl transform rotate-12` 
                        : shapeType === 1 
                          ? `${colorClass} rounded-full` 
                          : `${colorClass} rounded-2xl transform rotate-45`
                    }`}
                  ></div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Right side with login form */}
        <div className="flex flex-1 items-center justify-center p-6 bg-white">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center text-[#FF7B00]">Sign In</CardTitle>
                <CardDescription className="text-center text-gray-500">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-gray-700">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-gray-700">Password</Label>
                        <Link to="/forgot-password" className="text-sm text-[#FF7B00] hover:underline">
                          Forgot password?
                        </Link>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-white px-2 text-gray-500">Or continue with</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 py-5 rounded-xl">
                    Google
                  </Button>
                  <Button variant="outline" className="flex-1 border-gray-300 text-gray-700 hover:bg-gray-100 py-5 rounded-xl">
                    GitHub
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-center text-sm text-gray-600">
                  Don't have an account?{" "}
                  <Link to="/signup" className="text-[#FF7B00] hover:underline font-medium">
                    Sign up
                  </Link>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;