import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: LucideIcon;
  variant?: "default" | "primary" | "success" | "info" | "warning";
  trend?: {
    value: number;
    label: string;
    positive?: boolean;
  };
  className?: string;
}

export function MetricCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  variant = "default",
  trend,
  className 
}: MetricCardProps) {
  const getVariantStyles = () => {
    switch (variant) {
      case "primary":
        return "metric-card-primary";
      case "success":
        return "metric-card-success";
      case "info":
        return "metric-card-info";
      case "warning":
        return "bg-gradient-to-br from-warning to-orange-500 text-white";
      default:
        return "bg-surface";
    }
  };

  const isGradient = variant !== "default";

  return (
    <div className={cn("metric-card", getVariantStyles(), className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className={cn(
            "text-sm font-medium mb-2",
            isGradient ? "text-white/90" : "text-text-muted"
          )}>
            {title}
          </p>
          <p className={cn(
            "text-3xl font-bold mb-1",
            isGradient ? "text-white" : "text-foreground"
          )}>
            {typeof value === 'number' && value > 999 
              ? new Intl.NumberFormat().format(value)
              : value
            }
          </p>
          {subtitle && (
            <p className={cn(
              "text-sm",
              isGradient ? "text-white/80" : "text-text-muted"
            )}>
              {subtitle}
            </p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              <span className={cn(
                "text-xs px-2 py-1 rounded-full font-medium",
                trend.positive 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800",
                isGradient && "bg-white/20 text-white"
              )}>
                {trend.positive ? "+" : ""}{trend.value}%
              </span>
              <span className={cn(
                "text-xs",
                isGradient ? "text-white/80" : "text-text-muted"
              )}>
                {trend.label}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className={cn(
            "w-12 h-12 rounded-lg flex items-center justify-center",
            isGradient 
              ? "bg-white/20" 
              : "bg-primary/10"
          )}>
            <Icon className={cn(
              "h-6 w-6",
              isGradient ? "text-white" : "text-primary"
            )} />
          </div>
        )}
      </div>
    </div>
  );
}