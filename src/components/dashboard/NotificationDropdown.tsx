"use client";

import { useState, useRef, useEffect } from "react";
import { Bell, Check, X, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Notification {
  id: string;
  title: string;
  message: string;
  time: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
  action?: {
    label: string;
    url: string;
  };
}

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Mock notification data
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      title: "Site Published Successfully",
      message: "Your site 'Summer Giveaway Landing' has been published and is now live.",
      time: "2 hours ago",
      read: false,
      type: "success",
      action: {
        label: "View Site",
        url: "https://summer-giveaway.example.com"
      }
    },
    {
      id: "2",
      title: "New Template Available",
      message: "Check out our new 'Video Landing Page' template for higher conversions.",
      time: "5 hours ago",
      read: false,
      type: "info",
      action: {
        label: "View Template",
        url: "/dashboard?tab=templates"
      }
    },
    {
      id: "3",
      title: "Site Approval Pending",
      message: "Your site 'Mobile App Download' is under review and will be approved within 24-72 hours.",
      time: "1 day ago",
      read: true,
      type: "warning"
    },
    {
      id: "4",
      title: "Payment Received",
      message: "You've received a payment of $245.00 from your campaigns.",
      time: "2 days ago",
      read: true,
      type: "success"
    },
    {
      id: "5",
      title: "Site Error",
      message: "There was an issue publishing your site 'Email Capture Form'. Please check your settings.",
      time: "3 days ago",
      read: true,
      type: "error"
    }
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  // Detect mobile screen size
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  // Prevent body scroll when dropdown is open on mobile
  useEffect(() => {
    if (isOpen && isMobile) {
      // Save current scroll position
      const scrollY = window.scrollY;
      
      // Prevent body scroll
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
      
      return () => {
        // Restore body scroll
        const scrollY = document.body.style.top;
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.width = '';
        document.body.style.overflow = '';
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      };
    }
  }, [isOpen, isMobile]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleMarkAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, read: true }))
    );
  };

  const handleDeleteNotification = (id: string) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getNotificationIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <div className="w-2 h-2 bg-green-500 rounded-full"></div>;
      case "warning":
        return <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>;
      case "error":
        return <div className="w-2 h-2 bg-red-500 rounded-full"></div>;
      default:
        return <div className="w-2 h-2 bg-blue-500 rounded-full"></div>;
    }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Notification Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 hover:bg-gray-100 rounded-lg transition-colors group"
      >
        <Bell className="w-5 h-5 text-gray-600 group-hover:text-[#FF7B00] transition-colors duration-200" />
        {/* Notification badge */}
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          {isMobile && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={() => setIsOpen(false)} />
          )}
          
          {/* Dropdown container */}
          <div className={`z-50 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden ${
            isMobile 
              ? 'fixed inset-4 md:inset-auto md:right-0 md:mt-2 md:w-96 md:max-h-96' 
              : 'absolute right-0 mt-2 w-96 max-h-96'
          }`}>
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h3 className="font-semibold text-gray-900">Notifications</h3>
              {unreadCount > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleMarkAllAsRead}
                  className="text-[#FF7B00] hover:text-[#FF8d21] hover:bg-[#FFF5EB] flex-shrink-0"
                >
                  Mark all as read
                </Button>
              )}
            </div>

            {/* Notifications List */}
            <div className={`overflow-y-auto ${
              isMobile ? 'max-h-[calc(100vh-8rem)]' : 'max-h-80'
            }`}>
              {notifications.length === 0 ? (
                <div className="p-8 text-center">
                  <Bell className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                  <p className="text-gray-500">No notifications yet</p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {notifications.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-4 transition-colors duration-200 ${
                        !notification.read ? 'bg-gray-50' : 'bg-white'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        {/* Status indicator */}
                        <div className="flex-shrink-0 mt-1">
                          {getNotificationIcon(notification.type)}
                        </div>
                        
                        {/* Content */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className={`text-sm font-medium break-words ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                                {notification.title}
                              </p>
                              <p className={`text-sm mt-1 break-words ${notification.read ? 'text-gray-500' : 'text-gray-600'}`}>
                                {notification.message}
                              </p>
                              <p className="text-xs text-gray-400 mt-2">
                                {notification.time}
                              </p>
                            </div>
                            
                            {/* Actions */}
                            <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
                              {/* Mark as read button - only visible for unread notifications */}
                              {!notification.read && (
                                <button
                                  onClick={() => handleMarkAsRead(notification.id)}
                                  className="p-1 hover:bg-gray-200 rounded transition-all duration-200 hover:scale-110"
                                  title="Mark as read"
                                >
                                  <Check className="w-4 h-4 text-gray-500 hover:text-gray-700" />
                                </button>
                              )}
                              {/* Delete button - always visible */}
                              <button
                                onClick={() => handleDeleteNotification(notification.id)}
                                className="p-1 hover:bg-red-100 rounded transition-all duration-200 hover:scale-110"
                                title="Delete"
                              >
                                <X className="w-4 h-4 text-gray-500 hover:text-red-600" />
                              </button>
                            </div>
                          </div>
                          
                          {/* Action button */}
                          {notification.action && (
                            <div className="mt-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => {
                                  // Handle navigation to action URL
                                  console.log("Navigate to:", notification.action?.url);
                                }}
                                className="text-[#FF7B00] border-[#FF7B00] hover:bg-[#FFF5EB] hover:text-[#FF8d21] w-full sm:w-auto"
                              >
                                {notification.action.label}
                                <ExternalLink className="w-3 h-3 ml-1" />
                              </Button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;