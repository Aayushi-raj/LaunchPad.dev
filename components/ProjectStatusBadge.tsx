import { Badge } from "@/components/ui/badge";

interface ProjectStatusBadgeProps {
  status: string;
}

const statusConfig = {
  not_started: {
    label: "Not Started",
    variant: "secondary" as const,
  },
  in_progress: {
    label: "In Progress",
    variant: "info" as const,
  },
  on_hold: {
    label: "On Hold",
    variant: "warning" as const,
  },
  completed: {
    label: "Completed",
    variant: "success" as const,
  },
  cancelled: {
    label: "Cancelled",
    variant: "destructive" as const,
  },
};

export function ProjectStatusBadge({ status }: ProjectStatusBadgeProps) {
  const config = statusConfig[status as keyof typeof statusConfig] || {
    label: status,
    variant: "default" as const,
  };

  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
} 