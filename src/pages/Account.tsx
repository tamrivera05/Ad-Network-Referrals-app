"use client";

import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { User, Mail, Lock, LogOut, AlertCircle } from "lucide-react";
import { showSuccess, showError } from "@/utils/toast";
import Sidebar from "@/components/dashboard/Sidebar";

const Account = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("account");
  const [isLoading, setIsLoading] = useState(false);

  // Set active tab to account when on this page
  useEffect(() => {
    setActiveTab("account");
  }, []);

  // Profile information state
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

  // Form validation states
  const [profileErrors, setProfileErrors] = useState<{[key: string]: string}>({});
  const [passwordErrors, setPasswordErrors] = useState<{[key: string]: string}>({});

  const validateProfile = () => {
    const errors: {[key: string]: string} = {};
    
    if (!profileData.name.trim()) {
      errors.name = "Name is required";
    }
    
    if (!profileData.email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(profileData.email)) {
      errors.email = "Please enter a valid email address";
    }
    
    setProfileErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validatePassword = () => {
    const errors: {[key: string]: string} = {};
    
    if (!passwordData.currentPassword) {
      errors.currentPassword = "Current password is required";
    }
    
    if (!passwordData.newPassword) {
      errors.newPassword = "New password is required";
    } else if (passwordData.newPassword.length < 8) {
      errors.newPassword = "Password must be at least 8 characters long";
    }
    
    if (!passwordData.confirmPassword) {
      errors.confirmPassword = "Please confirm your new password";
    } else if (passwordData.newPassword !== passwordData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setPasswordErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleProfileUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateProfile()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess("Profile updated successfully!");
      console.log("Profile updated:", profileData);
    } catch (error) {
      showError("Failed to update profile. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handlePasswordUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validatePassword()) return;
    
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      showSuccess("Password updated successfully!");
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
      console.log("Password updated");
    } catch (error) {
      showError("Failed to update password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    // Clear any stored auth data
    localStorage.removeItem("authToken");
    sessionStorage.removeItem("authToken");
    
    showSuccess("Logged out successfully!");
    
    // Redirect to login page
    setTimeout(() => {
      navigate("/");
    }, 1000);
  };

  return (
    <div className="flex h-screen bg-[#FFFFFF]">
      {/* Sidebar */}
      <Sidebar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto px-6 py-6 md:py-6 pt-24 md:pt-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-lg font-semibold text-gray-900">Account Settings</h1>
            <p className="text-sm text-gray-600 mt-1">Manage your account information and security settings</p>
          </div>

          <div className="space-y-6">
            {/* Profile Information */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5 text-[#FF7B00]" />
                  <CardTitle className="text-lg">Profile Information</CardTitle>
                </div>
                <CardDescription>
                  Update your personal information and contact details
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleProfileUpdate} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        value={profileData.name}
                        onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                        placeholder="Enter your full name"
                      />
                      {profileErrors.name && (
                        <p className="text-sm text-red-600">{profileErrors.name}</p>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={profileData.email}
                        onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                        placeholder="Enter your email address"
                      />
                      {profileErrors.email && (
                        <p className="text-sm text-red-600">{profileErrors.email}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Profile"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Password Change */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Lock className="w-5 h-5 text-[#FF7B00]" />
                  <CardTitle className="text-lg">Password Security</CardTitle>
                </div>
                <CardDescription>
                  Change your password to keep your account secure
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handlePasswordUpdate} className="space-y-4">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="currentPassword">Current Password</Label>
                      <Input
                        id="currentPassword"
                        type="password"
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                        className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                        placeholder="Enter your current password"
                      />
                      {passwordErrors.currentPassword && (
                        <p className="text-sm text-red-600">{passwordErrors.currentPassword}</p>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="newPassword">New Password</Label>
                        <Input
                          id="newPassword"
                          type="password"
                          value={passwordData.newPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                          className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                          placeholder="Enter new password"
                        />
                        {passwordErrors.newPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.newPassword}</p>
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="confirmPassword">Confirm New Password</Label>
                        <Input
                          id="confirmPassword"
                          type="password"
                          value={passwordData.confirmPassword}
                          onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                          className="border-gray-300 focus:border-[#FF7B00] focus:ring-[#FF7B00]"
                          placeholder="Confirm new password"
                        />
                        {passwordErrors.confirmPassword && (
                          <p className="text-sm text-red-600">{passwordErrors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button 
                      type="submit" 
                      className="bg-[#FF7B00] hover:bg-[#FF8d21] text-white"
                      disabled={isLoading}
                    >
                      {isLoading ? "Updating..." : "Update Password"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>

            {/* Logout Section */}
            <Card className="border-gray-200">
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <LogOut className="w-5 h-5 text-red-600" />
                  <CardTitle className="text-lg">Account Actions</CardTitle>
                </div>
                <CardDescription>
                  Manage your account session and access
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <Alert className="border-yellow-200 bg-yellow-50">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <AlertDescription className="text-yellow-800">
                      Logging out will end your current session. You'll need to sign in again to access your account.
                    </AlertDescription>
                  </Alert>
                  
                  <Button 
                    variant="outline" 
                    onClick={handleLogout}
                    className="border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400 hover:text-red-700"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Log Out
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;