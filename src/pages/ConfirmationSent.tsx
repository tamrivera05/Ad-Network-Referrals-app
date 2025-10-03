"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const ConfirmationSent = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-[#FFA652] shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-[#FF7B00]">
              Check Your Email
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              We've sent a confirmation link to your email address
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-[#FFA652] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Please check your inbox and click the confirmation link to activate your account.
              </p>
              <p className="text-sm text-gray-500 mb-8">
                If you don't see the email, check your spam folder or request a new confirmation link.
              </p>
              <div className="space-y-4">
                <Button 
                  className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Resend Confirmation Email
                </Button>
                <Link to="/">
                  <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                    Back to Sign In
                  </Button>
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ConfirmationSent;