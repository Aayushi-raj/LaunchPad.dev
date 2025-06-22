"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { format } from "date-fns";

interface Activity {
  id: number;
  type: string;
  action: string;
  entityType: string;
  entityId: number;
  metadata: any;
  createdAt: string;
}

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/activities");
      const data = await response.json();
      setActivities(data);
    } catch (error) {
      console.error("Error fetching activities:", error);
    } finally {
      setLoading(false);
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "project":
        return "📋";
      case "team":
        return "👥";
      case "task":
        return "✅";
      case "comment":
        return "💬";
      default:
        return "🔔";
    }
  };

  const getActivityMessage = (activity: Activity) => {
    const { type, action, entityType, metadata } = activity;
    const entityName = metadata?.name || `#${activity.entityId}`;

    switch (action) {
      case "create":
        return `Created a new ${type} "${entityName}"`;
      case "update":
        return `Updated ${type} "${entityName}"`;
      case "delete":
        return `Deleted ${type} "${entityName}"`;
      case "join":
        return `Joined ${type} "${entityName}"`;
      case "leave":
        return `Left ${type} "${entityName}"`;
      default:
        return `${action} ${type} "${entityName}"`;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Activity Feed</CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[400px]">
          {loading ? (
            <div className="p-4 text-center text-sm text-gray-500">
              Loading activities...
            </div>
          ) : activities.length === 0 ? (
            <div className="p-4 text-center text-sm text-gray-500">
              No activities yet
            </div>
          ) : (
            <div className="space-y-4">
              {activities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50"
                >
                  <span className="text-xl mt-1">
                    {getActivityIcon(activity.type)}
                  </span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">
                      {getActivityMessage(activity)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {format(new Date(activity.createdAt), "MMM d, h:mm a")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
} 