import { NavLink, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Building2, 
  Settings, 
  BarChart3,
  Bell,
  Menu
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

const menuItems = [
  {
    title: "Dashboard",
    url: "/",
    icon: LayoutDashboard,
    description: "Vista general y métricas"
  },
  {
    title: "Hoteles",
    url: "/hotels",
    icon: Building2,
    description: "Gestión de hoteles"
  },
  {
    title: "Servicios",
    url: "/services",
    icon: Settings,
    description: "Configuración de servicios"
  },
  {
    title: "Reportes",
    url: "/reports",
    icon: BarChart3,
    description: "Métricas detalladas"
  }
];

export function AppSidebar() {
  const { open } = useSidebar();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => {
    if (path === "/") return currentPath === "/";
    return currentPath.startsWith(path);
  };

  const getNavClass = (path: string) =>
    isActive(path)
      ? "bg-sidebar-active text-white font-medium"
      : "text-sidebar-foreground hover:bg-sidebar-hover hover:text-white transition-colors";

  return (
    <Sidebar className="border-r border-sidebar-border bg-sidebar-bg shadow-[var(--shadow-sidebar)]">
      <SidebarContent className="py-4">
        {/* Header */}
        <div className="px-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
              <Bell className="h-6 w-6 text-white" />
            </div>
            {open && (
              <div>
                <h1 className="text-lg font-semibold text-white">
                  Hotel Dashboard
                </h1>
                <p className="text-sm text-sidebar-foreground/70">
                  Notificaciones
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Navigation */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-sidebar-foreground/70 text-xs uppercase tracking-wide font-medium">
            Navegación
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu className="space-y-1">
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink
                      to={item.url}
                      end={item.url === "/"}
                      className={`${getNavClass(item.url)} flex items-center gap-3 px-3 py-2 rounded-lg transition-all group`}
                    >
                      <item.icon className="h-5 w-5 flex-shrink-0" />
                      {open && (
                        <div className="flex-1 min-w-0">
                          <span className="text-sm font-medium block">
                            {item.title}
                          </span>
                          <span className="text-xs opacity-70 block truncate">
                            {item.description}
                          </span>
                        </div>
                      )}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}