import { AppWindow, Globe, PenTool, RefreshCcw, Smartphone, Webhook, type LucideIcon } from "lucide-react";
import type { ServiceIcon } from "@/lib/content";

export const serviceIcons: Record<ServiceIcon, LucideIcon> = {
  web: Globe,
  design: PenTool,
  app: AppWindow,
  api: Webhook,
  mobile: Smartphone,
  modernize: RefreshCcw,
};
