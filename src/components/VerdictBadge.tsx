import { CheckCircle, XCircle, AlertCircle } from "lucide-react";

type VerdictType = "True" | "False" | "Doubtful";

interface VerdictBadgeProps {
  verdict: VerdictType;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export function VerdictBadge({ verdict, size = "md", showIcon = true }: VerdictBadgeProps) {
  const getVerdictConfig = (verdict: VerdictType) => {
    switch (verdict) {
      case "True":
        return {
          className: "verdict-true",
          icon: CheckCircle,
          label: "True"
        };
      case "False":
        return {
          className: "verdict-false",
          icon: XCircle,
          label: "False"
        };
      case "Doubtful":
        return {
          className: "verdict-doubtful",
          icon: AlertCircle,
          label: "Doubtful"
        };
      default:
        return {
          className: "bg-muted text-muted-foreground border border-border",
          icon: AlertCircle,
          label: "Unknown"
        };
    }
  };

  const getSizeClasses = (size: string) => {
    switch (size) {
      case "sm":
        return "px-2 py-1 text-xs";
      case "lg":
        return "px-4 py-2 text-sm";
      default:
        return "px-3 py-1.5 text-xs";
    }
  };

  const getIconSize = (size: string) => {
    switch (size) {
      case "sm":
        return "w-3 h-3";
      case "lg":
        return "w-5 h-5";
      default:
        return "w-4 h-4";
    }
  };

  const config = getVerdictConfig(verdict);
  const Icon = config.icon;

  return (
    <span className={`
      inline-flex items-center gap-1.5 rounded-full font-medium
      ${config.className}
      ${getSizeClasses(size)}
    `}>
      {showIcon && <Icon className={getIconSize(size)} />}
      <span>{config.label}</span>
    </span>
  );
}