"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, Users, DollarSign, Activity } from "lucide-react";

const Overview = () => {
  const stats = [
    {
      title: "Total Earnings",
      value: "$2,456.00",
      change: "+12.5%",
      icon: DollarSign,
      color: "bg-[#FF7B00]",
      bgColor: "bg-[#FFF5EB]",
    },
    {
      title: "Active Campaigns",
      value: "8",
      change: "+2",
      icon: Activity,
      color: "bg-[#FF8D21]",
      bgColor: "bg-[#FFF8F0]",
    },
    {
      title: "Total Clicks",
      value: "12,456",
      change: "+23.1%",
      icon: TrendingUp,
      color: "bg-[#FFA652]",
      bgColor: "bg[#FFFAF5]",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      change: "+0.8%",
      icon: Users,
      color: "bg-[#FFB76B]",
      bgColor: "bg[#FFFCF8]",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="border-gray-200 hover:shadow-lg transition-shadow duration-300">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`h-4 w-4 ${stat.color.replace('bg-', 'text-')}`} />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                <p className="text-xs text-green-600 mt-1">
                  {stat.change} from last month
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { action: "New campaign created", time: "2 hours ago", status: "success" },
                { action: "Payment received", time: "5 hours ago", status: "success" },
                { action: "Campaign approved", time: "1 day ago", status: "success" },
                { action: "New referral signup", time: "2 days ago", status: "info" },
              ].map((activity, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.status === "success" ? "bg-green-500" : "bg-blue-500"
                  }`}></div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Quick Actions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <button className="w-full text-left p-4 bg-[#FFF5EB] hover:bg-[#FF8D21] hover:text-white rounded-lg transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="font-medium group-hover:text-white">Create New Campaign</span>
                  <span className="text-2xl group-hover:text-white">→</span>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-[#FFF8F0] hover:bg-[#FFA652] hover:text-white rounded-lg transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="font-medium group-hover:text-white">View Analytics</span>
                  <span className="text-2xl group-hover:text-white">📊</span>
                </div>
              </button>
              <button className="w-full text-left p-4 bg-[#FFFAF5] hover:bg-[#FFB76B] hover:text-white rounded-lg transition-all duration-300 group">
                <div className="flex items-center justify-between">
                  <span className="font-medium group-hover:text-white">Manage Networks</span>
                  <span className="text-2xl group-hover:text-white">⚙️</span>
                </div>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Overview;