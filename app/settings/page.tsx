import { UserPreferences } from "@/components/UserPreferences";
import { ActivityFeed } from "@/components/ActivityFeed";

export default function SettingsPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Settings</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <UserPreferences />
        </div>
        <div>
          <ActivityFeed />
        </div>
      </div>
    </div>
  );
} 