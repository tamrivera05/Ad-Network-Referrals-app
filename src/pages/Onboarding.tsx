"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [ogadsUsername, setOgadsUsername] = useState<string>("");

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Onboarding completed with:", { selectedNetwork, ogadsUsername });
    // Here you would typically send the data to your backend
    alert("Onboarding completed! Redirecting to dashboard...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-[#FF7B00]">
              {step === 1 && "Select CPA Network"}
              {step === 2 && "How to Use Your Referral Link"}
              {step === 3 && "Account Information"}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {step === 1 && "Select the CPA network you want to work with"}
              {step === 2 && "Learn how to effectively use your OGads referral link"}
              {step === 3 && "Provide your OGads username to get started"}
            </CardDescription>
            
            {/* Progress indicator */}
            <div className="flex justify-center mt-4">
              <div className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-[#FF7B00] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <div className={`w-16 h-1 ${step >= 2 ? 'bg-[#FF7B00]' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-[#FF7B00] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <div className={`w-16 h-1 ${step >= 3 ? 'bg-[#FF7B00]' : 'bg-gray-200'}`}></div>
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-[#FF7B00] text-white' : 'bg-gray-200 text-gray-500'}`}>
                  3
                </div>
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {step === 1 && (
              <div className="space-y-4">
                <p className="text-gray-600 text-center mb-6">
                  Select the CPA network you want to work with:
                </p>
                
                <div className="grid grid-cols-1 gap-4">
                  <div 
                    className={`border-2 rounded-xl p-6 cursor-pointer transition-all ${
                      selectedNetwork === "ogads"
                        ? 'border-[#FF7B00] bg-[#FFF5EB]'
                        : 'border-gray-200 hover:border-[#FFA652] hover:bg-[#FFFAF5]'
                    }`}
                    onClick={() => handleNetworkSelect("ogads")}
                  >
                    <div className="flex items-center space-x-4">
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${
                        selectedNetwork === "ogads"
                          ? 'border-[#FF7B00] bg-[#FF7B00]'
                          : 'border-gray-300'
                      }`}>
                        {selectedNetwork === "ogads" && (
                          <div className="w-3 h-3 bg-white rounded-full"></div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">OGads</h3>
                        <p className="text-sm text-gray-600">Mobile content locking and CPA network</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 2 && (
              <div className="space-y-6">
                <div className="bg-[#FFF5EB] border border-[#FFA652] rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-[#FF7B00] mb-4">Quick Guide to Using Your OGads Referral Link</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">🚀 For New Users:</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• Share your referral link on social media platforms</li>
                        <li>• Create engaging content around mobile apps and games</li>
                        <li>• Focus on mobile-friendly traffic sources</li>
                        <li>• Test different landing pages to optimize conversions</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-gray-800 mb-2">💡 For Experienced Users:</h4>
                      <ul className="space-y-2 text-gray-600 text-sm">
                        <li>• Leverage your existing traffic sources</li>
                        <li>• Use OGads API for advanced tracking</li>
                        <li>• Implement A/B testing strategies</li>
                        <li>• Scale successful campaigns across multiple niches</li>
                      </ul>
                    </div>
                    
                    <div className="mt-4 p-4 bg-white rounded-lg">
                      <p className="text-sm text-gray-700">
                        <strong>Pro Tip:</strong> OGads specializes in mobile content locking, so focus on mobile traffic and app-related offers for best results!
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {step === 3 && (
              <div className="space-y-6">
                <p className="text-gray-600 text-center">
                  Please provide your OGads username to complete setup:
                </p>
                
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="ogads-username" className="text-gray-700">
                      OGads Username
                    </Label>
                    <Input
                      id="ogads-username"
                      placeholder="Your OGads username"
                      value={ogadsUsername}
                      onChange={(e) => setOgadsUsername(e.target.value)}
                      className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                      required
                    />
                  </div>
                </div>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col">
            <div className="flex justify-between w-full">
              <Button
                variant="outline"
                onClick={() => setStep(prev => Math.max(1, prev - 1))}
                disabled={step === 1}
                className="border-gray-300 text-gray-700 hover:bg-gray-100"
              >
                Back
              </Button>
              
              {step === 1 && (
                <Button
                  onClick={() => setStep(2)}
                  disabled={!selectedNetwork}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Continue
                </Button>
              )}
              
              {step === 2 && (
                <Button
                  onClick={() => setStep(3)}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Continue
                </Button>
              )}
              
              {step === 3 && (
                <Button
                  onClick={handleSubmit}
                  disabled={!ogadsUsername}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Complete Onboarding
                </Button>
              )}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              Step {step} of 3
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;