"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

interface UserPreferences {
  id: number;
  emailNotifications: boolean;
  pushNotifications: boolean;
  notificationTypes: {
    project: boolean;
    team: boolean;
    task: boolean;
    comment: boolean;
  };
  theme: "light" | "dark" | "system";
}

export function UserPreferences() {
  const [preferences, setPreferences] = useState<UserPreferences | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchPreferences();
  }, []);

  const fetchPreferences = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/preferences");
      const data = await response.json();
      setPreferences(data);
    } catch (error) {
      console.error("Error fetching preferences:", error);
      toast.error("Failed to load preferences");
    } finally {
      setLoading(false);
    }
  };

  const updatePreferences = async () => {
    if (!preferences) return;

    try {
      setSaving(true);
      const response = await fetch("/api/preferences", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error("Failed to update preferences");
      }

      toast.success("Preferences updated successfully");
    } catch (error) {
      console.error("Error updating preferences:", error);
      toast.error("Failed to update preferences");
    } finally {
      setSaving(false);
    }
  };

  const handleToggle = (key: keyof UserPreferences) => {
    if (!preferences) return;
    setPreferences({
      ...preferences,
      [key]: !preferences[key],
    });
  };

  const handleNotificationTypeToggle = (type: keyof UserPreferences["notificationTypes"]) => {
    if (!preferences) return;
    setPreferences({
      ...preferences,
      notificationTypes: {
        ...preferences.notificationTypes,
        [type]: !preferences.notificationTypes[type],
      },
    });
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-sm text-gray-500">
            Loading preferences...
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!preferences) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>User Preferences</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="p-4 text-center text-sm text-gray-500">
            Failed to load preferences
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>User Preferences</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notifications">Email Notifications</Label>
            <Switch
              id="email-notifications"
              checked={preferences.emailNotifications}
              onCheckedChange={() => handleToggle("emailNotifications")}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notifications">Push Notifications</Label>
            <Switch
              id="push-notifications"
              checked={preferences.pushNotifications}
              onCheckedChange={() => handleToggle("pushNotifications")}
            />
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="text-sm font-medium">Notification Types</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="project-notifications">Project Updates</Label>
              <Switch
                id="project-notifications"
                checked={preferences.notificationTypes.project}
                onCheckedChange={() => handleNotificationTypeToggle("project")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="team-notifications">Team Activities</Label>
              <Switch
                id="team-notifications"
                checked={preferences.notificationTypes.team}
                onCheckedChange={() => handleNotificationTypeToggle("team")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="task-notifications">Task Updates</Label>
              <Switch
                id="task-notifications"
                checked={preferences.notificationTypes.task}
                onCheckedChange={() => handleNotificationTypeToggle("task")}
              />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="comment-notifications">Comments</Label>
              <Switch
                id="comment-notifications"
                checked={preferences.notificationTypes.comment}
                onCheckedChange={() => handleNotificationTypeToggle("comment")}
              />
            </div>
          </div>
        </div>

        <Button
          onClick={updatePreferences}
          disabled={saving}
          className="w-full"
        >
          {saving ? "Saving..." : "Save Preferences"}
        </Button>
      </CardContent>
    </Card>
  );
} 