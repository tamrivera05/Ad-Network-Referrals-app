"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Separator } from "@/components/ui/separator";
import { User, Lock, LogOut, Eye, EyeOff, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const ProfileSection = () => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Simulate checking if user completed onboarding
  // In a real app, this would come from user data/API
  const hasCompletedOnboarding = false; // Change to true to test locked form
  
  // OGads username state - this tracks if the user has set up their username
  const [ogadsUsername, setOgadsUsername] = useState(hasCompletedOnboarding ? "johndoe123" : "");
  const [hasSetOgadsUsername, setHasSetOgadsUsername] = useState(hasCompletedOnboarding);
  const [isEditingOgads, setIsEditingOgads] = useState(false);
  const [tempOgadsUsername, setTempOgadsUsername] = useState(ogadsUsername);
  
  // Profile info state
  const [profileData, setProfileData] = useState({
    name: "John Doe",
    email: "john.doe@example.com"
  });
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Profile updated:", profileData);
    setIsLoading(false);
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("New passwords do not match");
      return;
    }
    
    if (passwordData.newPassword.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    console.log("Password updated");
    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: ""
    });
    setIsLoading(false);
  };

  const handleSaveOgadsUsername = async () => {
    if (!tempOgadsUsername.trim()) {
      alert("Please enter your OGads username");
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Update the username and mark as set
    setOgadsUsername(tempOgadsUsername);
    setHasSetOgadsUsername(true);
    setIsEditingOgads(false);
    setIsLoading(false);
  };

  const handleCancelEdit = () => {
    setTempOgadsUsername(ogadsUsername);
    setIsEditingOgads(false);
  };

  const handleLogout = () => {
    // Simulate logout
    console.log("Logging out...");
    navigate("/");
  };

  return (
    <div className="space-y-6">
      {/* OGads Username Section */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <AlertCircle className="w-5 h-5 text-[#FF7B00]" />
            <span>OGads Account Information</span>
          </CardTitle>
          <CardDescription>
            {hasSetOgadsUsername 
              ? "Your OGads username is connected to your account"
              : "Connect your OGads account to start earning with our templates"
            }
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {hasSetOgadsUsername ? (
            // Locked state - user has set up OGads username (either from onboarding or profile settings)
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-[#FF7B00] rounded-full flex items-center justify-center">
                    <span className="text-white font-bold">OG</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">OGads Username</p>
                    <p className="font-semibold text-gray-900">{ogadsUsername}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-green-600 font-medium">Connected</span>
                </div>
              </div>
              
              <Alert className="bg-blue-50 border-blue-200">
                <AlertCircle className="h-4 w-4 text-blue-600" />
                <AlertDescription className="text-blue-700">
                  Your OGads account is connected. This username cannot be changed for security reasons. 
                  If you need to update it, please contact support.
                </AlertDescription>
              </Alert>
            </div>
          ) : isEditingOgads ? (
            // Edit mode
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="ogads-username" className="text-gray-700">OGads Username</Label>
                <Input
                  id="ogads-username"
                  type="text"
                  placeholder="Enter your OGads username"
                  value={tempOgadsUsername}
                  onChange={(e) => setTempOgadsUsername(e.target.value)}
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                />
              </div>
              
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                <p className="text-sm text-yellow-700">
                  <strong>Important:</strong> Make sure you enter the correct OGads username. This will be used to connect your smartlinks and track your earnings.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  variant="outline"
                  onClick={handleCancelEdit}
                  disabled={isLoading}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleSaveOgadsUsername}
                  className="flex-1 bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                  disabled={isLoading}
                >
                  {isLoading ? "Saving..." : "Save Username"}
                </Button>
              </div>
            </div>
          ) : (
            // Show form to add OGads username
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="font-medium text-yellow-800">OGads Account Not Connected</p>
                    <p className="text-sm text-yellow-700">Connect your OGads account to access all features</p>
                  </div>
                </div>
              </div>
              
              <Button
                onClick={() => setIsEditingOgads(true)}
                className="w-full bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
              >
                Add OGads Username
              </Button>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Profile Information */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <User className="w-5 h-5 text-[#FF7B00]" />
            <span>Profile Information</span>
          </CardTitle>
          <CardDescription>
            Update your account information and email address
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleProfileUpdate} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700">Full Name</Label>
                <Input
                  id="name"
                  type="text"
                  value={profileData.name}
                  onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Password Change */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lock className="w-5 h-5 text-[#FF7B00]" />
            <span>Change Password</span>
          </CardTitle>
          <CardDescription>
            Update your password to keep your account secure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password" className="text-gray-700">Current Password</Label>
              <div className="relative">
                <Input
                  id="current-password"
                  type={showCurrentPassword ? "text" : "password"}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] pr-10"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-gray-700">New Password</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={passwordData.newPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                    className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirm-password" className="text-gray-700">Confirm New Password</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={passwordData.confirmPassword}
                    onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                    className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00] pr-10"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>
            <Button 
              type="submit" 
              className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
              disabled={isLoading}
            >
              {isLoading ? "Updating..." : "Update Password"}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Logout */}
      <Card className="border-gray-200">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <LogOut className="w-5 h-5 text-red-500" />
            <span>Logout</span>
          </CardTitle>
          <CardDescription>
            Sign out of your account and return to the login page
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            className="border-red-200 text-red-600 hover:bg-red-50 hover:border-red-300"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProfileSection;