"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Onboarding = () => {
  const [step, setStep] = useState(1);
  const [selectedNetworks, setSelectedNetworks] = useState<string[]>([]);
  const [accountUsernames, setAccountUsernames] = useState<Record<string, string>>({});

  // CPA Networks data
  const cpaNetworks = [
    { id: "ogads", name: "OGads" },
    { id: "maxbounty", name: "MaxBounty" },
    { id: "clickbooth", name: "Clickbooth" },
    { id: "peerfly", name: "PeerFly" },
    { id: "cake", name: "CAKE" },
    { id: "hasoffers", name: "HasOffers" },
  ];

  const handleNetworkToggle = (networkId: string) => {
    setSelectedNetworks(prev => 
      prev.includes(networkId) 
        ? prev.filter(id => id !== networkId) 
        : [...prev, networkId]
    );
  };

  const handleUsernameChange = (networkId: string, username: string) => {
    setAccountUsernames(prev => ({
      ...prev,
      [networkId]: username
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Onboarding completed with:", { selectedNetworks, accountUsernames });
    // Here you would typically send the data to your backend
    alert("Onboarding completed! Redirecting to dashboard...");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white p-4">
      <div className="w-full max-w-2xl">
        <Card className="border-0 shadow-lg">
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-3xl font-bold text-[#FF7B00]">
              {step === 1 ? "Select CPA Networks" : "Account Information"}
            </CardTitle>
            <CardDescription className="text-gray-500">
              {step === 1 
                ? "Select the CPA networks you have accounts with" 
                : "Provide your usernames for the selected networks"}
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
              </div>
            </div>
          </CardHeader>
          
          <CardContent>
            {step === 1 ? (
              <div className="space-y-4">
                <p className="text-gray-600 text-center mb-6">
                  Select all CPA networks you currently have accounts with:
                </p>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cpaNetworks.map((network) => (
                    <div 
                      key={network.id}
                      className={`border rounded-xl p-4 flex items-center space-x-3 cursor-pointer transition-all ${
                        selectedNetworks.includes(network.id)
                          ? 'border-[#FF7B00] bg-[#FFF5EB]'
                          : 'border-gray-200 hover:border-[#FFA652]'
                      }`}
                      onClick={() => handleNetworkToggle(network.id)}
                    >
                      <Checkbox
                        id={network.id}
                        checked={selectedNetworks.includes(network.id)}
                        onCheckedChange={() => handleNetworkToggle(network.id)}
                        className="border-gray-400 data-[state=checked]:bg-[#FF7B00] data-[state=checked]:border-[#FF7B00]"
                      />
                      <Label 
                        htmlFor={network.id} 
                        className="text-gray-700 font-medium cursor-pointer flex-1"
                      >
                        {network.name}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <p className="text-gray-600 text-center">
                  Please provide your usernames for the selected CPA networks:
                </p>
                
                <div className="space-y-4">
                  {selectedNetworks.map(networkId => {
                    const network = cpaNetworks.find(n => n.id === networkId);
                    return (
                      <div key={networkId} className="space-y-2">
                        <Label htmlFor={`username-${networkId}`} className="text-gray-700">
                          {network?.name} Username
                        </Label>
                        <Input
                          id={`username-${networkId}`}
                          placeholder={`Your ${network?.name} username`}
                          value={accountUsernames[networkId] || ""}
                          onChange={(e) => handleUsernameChange(networkId, e.target.value)}
                          className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] py-6 rounded-xl"
                          required
                        />
                      </div>
                    );
                  })}
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
              
              {step === 1 ? (
                <Button
                  onClick={() => setStep(2)}
                  disabled={selectedNetworks.length === 0}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Continue
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  disabled={selectedNetworks.some(networkId => !accountUsernames[networkId])}
                  className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                >
                  Complete Onboarding
                </Button>
              )}
            </div>
            
            <p className="text-center text-sm text-gray-500 mt-6">
              Step {step} of 2
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default Onboarding;