"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

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

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen flex bg-white p-4 max-w-[1600px] mx-auto">
      {/* Left side with content/inputs */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="space-y-6">
              {/* Progress bar with step indicator */}
              <div className="space-y-2">
                <div className="flex justify-between text-sm font-medium">
                  <span className={`text-[#FF7B00] ${step === 1 ? 'font-bold' : ''}`}>Step 1</span>
                  <span className={`text-[#FF7B00] ${step === 2 ? 'font-bold' : ''}`}>Step 2</span>
                  <span className={`text-[#FF7B00] ${step === 3 ? 'font-bold' : ''}`}>Step 3</span>
                </div>
                <Progress value={progressPercentage} className="h-2 bg-gray-200" />
              </div>
              
              {/* Instructions moved to left side */}
              <div className="text-left">
                {step === 1 && (
                  <>
                    <h2 className="text-[40px] md:text-[50px] font-extrabold text-[#FF7B00] mb-4">Select CPA Network</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Select the CPA network you want to work with</p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="text-[40px] md:text-[50px] font-extrabold text-[#FF7B00] mb-4">How to Use Your Referral Link</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Learn how to effectively use your OGads referral link</p>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h2 className="text-[40px] md:text-[50px] font-extrabold text-[#FF7B00] mb-4">Account Information</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Provide your OGads username to get started</p>
                  </>
                )}
              </div>
              
              {step === 1 && (
                <div className="space-y-4">
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
      
      {/* Right side with #FF8D21 background, rounded corners, and half circles on edges */}
      <div className="hidden md:flex flex-1 bg-[#FF8D21] rounded-tl-[50px] rounded-br-[50px] m-4 relative overflow-hidden">
        {/* Large half circle on top edge */}
        <div className="absolute top-0 left-20 w-48 h-48 bg-white rounded-t-full"></div>
        
        {/* Medium half circle on right edge */}
        <div className="absolute top-32 right-0 w-32 h-32 bg-white rounded-r-full"></div>
        
        {/* Large half circle on bottom edge */}
        <div className="absolute bottom-0 right-40 w-48 h-48 bg-white rounded-b-full"></div>
        
        {/* Medium half circle on left edge */}
        <div className="absolute top-64 left-0 w-32 h-32 bg-white rounded-l-full"></div>
        
        {/* Large half circle on right edge (lower) */}
        <div className="absolute bottom-40 right-0 w-48 h-48 bg-white rounded-r-full"></div>
        
        {/* Medium half circle on top edge (right side) */}
        <div className="absolute top-0 right-32 w-32 h-32 bg-white rounded-t-full"></div>
      </div>
    </div>
  );
};

export default Onboarding;