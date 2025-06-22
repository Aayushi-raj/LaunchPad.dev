


import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, AlertCircle, XCircle } from "lucide-react";

const History = () => {
  const historyItems = [
    {
      id: 1,
      title: "Resume Analysis Completed",
      description: "Your resume has been analyzed with 15 suggestions",
      status: "completed",
      time: "2 hours ago",
      type: "resume"
    },
    {
      id: 2,
      title: "Career Roadmap Generated",
      description: "Frontend Developer roadmap created successfully",
      status: "completed",
      time: "1 day ago",
      type: "roadmap"
    },
    {
      id: 3,
      title: "AI Chat Session",
      description: "Discussion about transitioning to tech career",
      status: "completed",
      time: "3 days ago",
      type: "chat"
    },
    {
      id: 4,
      title: "Resume Upload",
      description: "Failed to process - file format not supported",
      status: "failed",
      time: "1 week ago",
      type: "resume"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-500" />;
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'failed':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <Card className="animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900">Recent Activity</CardTitle>
        <CardDescription>Your recent interactions and progress</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {historyItems.map((item, index) => (
            <div 
              key={item.id} 
              className={`flex items-start space-x-4 p-4 rounded-lg border hover:shadow-md transition-all duration-300 hover:border-blue-200 bg-white animate-slide-in-right`}
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex-shrink-0 mt-1">
                {getStatusIcon(item.status)}
              </div>
              <div className="flex-grow min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-semibold text-gray-900 truncate">
                    {item.title}
                  </h4>
                  <Badge 
                    variant="outline" 
                    className={`ml-2 ${getStatusColor(item.status)} border`}
                  >
                    {item.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-600 mt-1">{item.description}</p>
                <p className="text-xs text-gray-400 mt-2">{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default History;