"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { MadeWithDyad } from "@/components/made-with-dyad";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Login attempt with:", { email, password });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFE9EF]">
      <div className="flex flex-1">
        {/* Left side with custom vector */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-[#FFC0D7] p-12">
          <div className="relative w-full max-w-lg">
            {/* Custom vector design */}
            <div className="relative">
              {/* Main circle */}
              <div className="w-64 h-64 rounded-full bg-[#FF9CB5] absolute -top-10 -left-10 opacity-80"></div>
              <div className="w-48 h-48 rounded-full bg-[#FC809F] absolute top-10 left-20"></div>
              
              {/* Floating elements */}
              <div className="w-24 h-24 rounded-full bg-white absolute top-0 right-10 opacity-70"></div>
              <div className="w-16 h-16 rounded-full bg-[#FFBCCD] absolute bottom-10 right-0"></div>
              <div className="w-12 h-12 rounded-full bg-[#FF9CB5] absolute bottom-20 left-10"></div>
              
              {/* Decorative shapes */}
              <div className="absolute top-20 left-0 w-32 h-2 bg-[#FC809F] rounded-full transform rotate-45"></div>
              <div className="absolute bottom-10 right-0 w-24 h-2 bg-[#FF9CB5] rounded-full transform -rotate-12"></div>
            </div>
            
            <div className="mt-20 text-center">
              <h2 className="text-3xl font-bold text-white">Welcome Back</h2>
              <p className="text-white mt-2 opacity-90">Sign in to continue your journey</p>
            </div>
          </div>
        </div>
        
        {/* Right side with login form */}
        <div className="flex flex-1 items-center justify-center p-6 bg-[#FFE9EF]">
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-none bg-transparent">
              <CardHeader className="space-y-1">
                <CardTitle className="text-3xl font-bold text-center text-[#FC809F]">Sign In</CardTitle>
                <CardDescription className="text-center text-[#FF9CB5]">
                  Enter your credentials to access your account
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <form onSubmit={handleSubmit}>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-[#FF9CB5]">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="border-[#FFBCCD] focus:border-[#FC809F] focus:ring-[#FC809F] py-6 rounded-xl"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="password" className="text-[#FF9CB5]">Password</Label>
                        <a href="#" className="text-sm text-[#FC809F] hover:underline">
                          Forgot password?
                        </a>
                      </div>
                      <Input
                        id="password"
                        type="password"
                        placeholder="••••••••"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="border-[#FFBCCD] focus:border-[#FC809F] focus:ring-[#FC809F] py-6 rounded-xl"
                        required
                      />
                    </div>
                    <Button 
                      type="submit" 
                      className="w-full bg-[#FC809F] hover:bg-[#FF9CB5] text-white py-6 rounded-xl transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Sign In
                    </Button>
                  </div>
                </form>
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#FFBCCD]"></div>
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-[#FFE9EF] px-2 text-[#FF9CB5]">Or continue with</span>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <Button variant="outline" className="flex-1 border-[#FFBCCD] text-[#FF9CB5] hover:bg-[#FFC0D7] py-5 rounded-xl">
                    Google
                  </Button>
                  <Button variant="outline" className="flex-1 border-[#FFBCCD] text-[#FF9CB5] hover:bg-[#FFC0D7] py-5 rounded-xl">
                    GitHub
                  </Button>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <p className="text-center text-sm text-[#FF9CB5]">
                  Don't have an account?{" "}
                  <a href="#" className="text-[#FC809F] hover:underline font-medium">
                    Sign up
                  </a>
                </p>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
      
      <MadeWithDyad />
    </div>
  );
};

export default Index;