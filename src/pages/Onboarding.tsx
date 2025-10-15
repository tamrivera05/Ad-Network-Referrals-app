"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedNetwork, setSelectedNetwork] = useState<string>("");
  const [ogadsUsername, setOgadsUsername] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleNetworkSelect = (networkId: string) => {
    setSelectedNetwork(networkId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call and processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    console.log("Onboarding completed with:", { selectedNetwork, ogadsUsername });
    
    // Redirect directly to dashboard after onboarding completion
    navigate("/dashboard?tab=templates");
  };

  const handleSkipStep3 = async () => {
    setIsLoading(true);
    
    // Simulate API call and processing time
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    console.log("Onboarding completed with:", { selectedNetwork, ogadsUsername: "" });
    
    // Redirect directly to dashboard after skipping
    navigate("/dashboard?tab=templates");
  };

  const progressPercentage = (step / 3) * 100;

  return (
    <div className="min-h-screen flex bg-white p-4 max-w-[1350px] mx-auto relative">
      {/* Left side with content/inputs */}
      <div className="flex flex-1 items-center justify-center p-6">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-none bg-transparent">
            <CardContent className="space-y-6">
              {/* Progress bar without step indicator */}
              <div className="space-y-2">
                <Progress value={progressPercentage} className="h-2 bg-gray-200" />
              </div>
              
              {/* Instructions moved to left side */}
              <div className="text-left">
                {step === 1 && (
                  <>
                    <h2 className="text-[20px] md:text-[25px] font-bold text-[#FF7B00] mb-4">Select CPA Network</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Select the CPA network you want to work with</p>
                  </>
                )}
                {step === 2 && (
                  <>
                    <h2 className="text-[20px] md:text-[25px] font-bold text-[#FF7B00] mb-4">How to Use Your Referral Link</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Learn how to effectively use your OGads referral link</p>
                  </>
                )}
                {step === 3 && (
                  <>
                    <h2 className="text-[20px] md:text-[25px] font-bold text-[#FF7B00] mb-4">Account Information</h2>
                    <p className="text-xl font-semibold text-gray-700 mb-6">Provide your OGads username to get started (optional)</p>
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
                        OGads Username (Optional)
                      </Label>
                      <Input
                        id="ogads-username"
                        placeholder="Your OGads username"
                        value={ogadsUsername}
                        onChange={(e) => setOgadsUsername(e.target.value)}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                      />
                    </div>
                    
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                      <p className="text-sm text-blue-700">
                        <strong>Note:</strong> You can skip this step and add your OGads username later in your Account settings.
                      </p>
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
                  disabled={step === 1 || isLoading}
                  className="border-gray-300 text-gray-700 hover:bg-gray-100"
                >
                  Back
                </Button>
                
                {step === 1 && (
                  <Button
                    onClick={() => setStep(2)}
                    disabled={!selectedNetwork || isLoading}
                    className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  >
                    Continue
                  </Button>
                )}
                
                {step === 2 && (
                  <Button
                    onClick={() => setStep(3)}
                    disabled={isLoading}
                    className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  >
                    Continue
                  </Button>
                )}
                
                {step === 3 && (
                  <div className="flex space-x-3">
                    <Button
                      variant="outline"
                      onClick={handleSkipStep3}
                      disabled={isLoading}
                      className="border-gray-300 text-gray-700 hover:bg-gray-100"
                    >
                      {isLoading ? "Completing..." : "Skip for Now"}
                    </Button>
                    <Button
                      onClick={handleSubmit}
                      disabled={isLoading}
                      className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                    >
                      {isLoading ? (
                        <div className="flex items-center space-x-2">
                          <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          <span>Complete Onboarding</span>
                        </div>
                      ) : (
                        "Complete Onboarding"
                      )}
                    </Button>
                  </div>
                )}
              </div>
              
              <p className="text-center text-sm text-gray-500 mt-6">
                Step {step} of 3
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      {/* Center divider line */}
      <div className="w-px bg-gray-300 mx-4"></div>
      
      {/* Right side with text and shapes */}
      <div className="hidden md:flex flex-1 relative">
        {/* Text at top left corner */}
        <div className="absolute top-8 left-8 right-8">
          <p className="text-[40px] md:text-[50px] font-extrabold italic text-[#FF7B00] text-left leading-tight break-words">
            Your CPA<br />journey starts<br />here.
          </p>
        </div>
        
        {/* Shapes positioned at bottom with varied colors */}
        <div className="absolute bottom-0 left-0 right-0 flex justify-center items-end pb-8">
          <div className="grid grid-cols-4 gap-4">
            {/* Row 1 - only 4th shape remains */}
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24 bg-[#FFB76B] rounded-full"></div>
            
            {/* Row 2 - only 3rd and 4th shapes remain */}
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24 bg-[#FF7B00] rounded-lg"></div>
            <div className="w-24 h-24 bg-[#FF8D21] rounded-full"></div>
            
            {/* Row 3 - only 2nd, 3rd, and 4th shapes remain */}
            <div className="w-24 h-24"></div>
            <div className="w-24 h-24 bg-[#FFB76B] rounded-lg"></div>
            <div className="w-24 h-24 bg-[#FF8D21] rounded-full"></div>
            <div className="w-24 h-24 bg-[#FF7B00] rounded-lg transform rotate-45"></div>
            
            {/* Row 4 - all shapes remain */}
            <div className="w-24 h-24 bg-[#FFB76B] rounded-full"></div>
            <div className="w-24 h-24 bg-[#FF7B00] rounded-lg"></div>
            <div className="w-24 h-24 bg-[#FF8D21] rounded-lg transform rotate-45"></div>
            <div className="w-24 h-24 bg-[#FFA652] rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;