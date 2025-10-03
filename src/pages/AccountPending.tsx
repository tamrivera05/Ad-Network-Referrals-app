"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link } from "react-router-dom";

const AccountPending = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-md">
        <Card className="border-2 border-[#FFA652] shadow-none">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center text-[#FF7B00]">
              Account Pending Approval
            </CardTitle>
            <CardDescription className="text-center text-gray-500">
              Your account is currently under review
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center py-8">
              <div className="mx-auto w-16 h-16 bg-[#FFA652] rounded-full flex items-center justify-center mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <p className="text-gray-700 mb-6 text-lg">
                Thank you for completing the onboarding process! Your account is now in line for approval.
              </p>
              <p className="text-gray-600 mb-8">
                You will receive an email regarding your account status within <span className="font-semibold text-[#FF7B00]">24-72 hours</span>.
              </p>
              <div className="bg-[#FFF5EB] border border-[#FFA652] rounded-lg p-4 mb-8">
                <p className="text-sm text-gray-700">
                  <strong>What happens next?</strong><br />
                  Our team will review your application and you'll receive an email once your account is approved.
                </p>
              </div>
              <Link to="/">
                <Button variant="outline" className="w-full border-gray-300 text-gray-700 hover:bg-gray-100">
                  Back to Sign In
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountPending;