"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signup attempt with:", { name, email, password, confirmPassword });
  };

  return (
    <div className="min-h-screen flex bg-white p-8">
      {/* Left side with signup form */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none bg-transparent">
            <CardHeader className="space-y-1">
              <CardTitle className="text-3xl font-bold text-center text-[#FF7B00]">Create Account</CardTitle>
              <CardDescription className="text-center text-gray-500">
                Enter your information to get started
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <form onSubmit={handleSubmit}>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-gray-700">Nickname</Label>
                    <Input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                      required
                    />
                  </div>
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
                    <Label htmlFor="password" className="text-gray-700">Password</Label>
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
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword" className="text-gray-700">Confirm Password</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                      required
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white py-6 rounded-xl transition-all duration-300"
                  >
                    Sign Up
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex flex-col">
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link to="/" className="text-[#FF7B00] hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Right side with #FF7B00 background and inverted top right corner */}
      <div className="hidden md:flex flex-1 items-end justify-start bg-[#FF7B00] p-12 m-8 rounded-l-[50px] relative">
        {/* Inverted top right corner using pseudo-element approach */}
        <div className="absolute top-0 right-0 w-[50px] h-[50px] bg-white rounded-bl-full"></div>
        
        {/* Text content */}
        <div className="max-w-lg">
          <p className="text-6xl font-extrabold text-white text-left leading-relaxed">
            Why start from scratch when templates are ready for you?
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;