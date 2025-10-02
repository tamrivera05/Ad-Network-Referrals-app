"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password reset requested for:", email);
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-[#FF7B00] shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-[#FF7B00]">
              {isSubmitted ? "Check Your Email" : "Forgot Password?"}
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              {isSubmitted 
                ? "We've sent a password reset link to your email address." 
                : "Enter your email to receive a password reset link"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {isSubmitted ? (
              <div className="text-center py-8">
                <div className="mx-auto w-16 h-16 bg-[#FFA652] rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <p className="text-gray-700 mb-6">
                  Please check your inbox at <span className="font-semibold">{email}</span> and follow the instructions to reset your password.
                </p>
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Resend Email
                </Button>
              </div>
            ) : (
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
                  <Button 
                    type="submit" 
                    className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white py-6 rounded-xl transition-all duration-300"
                  >
                    Send Reset Link
                  </Button>
                </div>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col">
            <p className="text-center text-sm text-gray-600">
              Remember your password?{" "}
              <Link to="/login" className="text-[#FF7B00] hover:underline font-medium">
                Sign in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default ForgotPassword;