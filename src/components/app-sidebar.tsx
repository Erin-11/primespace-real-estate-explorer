import React from "react";
import { useParams, Link } from "react-router-dom";
import { Building2, Landmark, Factory, MapPin, Globe, Briefcase, ChevronRight, BarChart3 } from "lucide-react";
import { DEPARTMENTS } from "@shared/mock-data";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
const iconMap: Record<string, React.ElementType> = {
  'hong-kong': Globe,
  'kowloon': MapPin,
  'commercial-sales': Landmark,
  'sz': Building2,
  'gz': Building2,
  'industrial': Factory,
};
export function AppSidebar(): JSX.Element {
  const { id: currentId } = useParams<{ id: string }>();
  return (
    <Sidebar className="border-r border-border/50">
      <SidebarHeader className="p-4 border-b border-border/40">
        <Link to="/" className="flex items-center gap-3 px-2 group">
          <div className="h-9 w-9 rounded-xl bg-primary flex items-center justify-center text-primary-foreground shadow-glow group-hover:scale-110 transition-transform duration-300">
            <BarChart3 className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tighter">PrimeSpace</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground leading-none">Intelligence</span>
          </div>
        </Link>
      </SidebarHeader>
      <SidebarContent className="py-6">
        <SidebarGroup>
          <SidebarGroupLabel className="px-6 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground/50 mb-4">
            Regional Departments
          </SidebarGroupLabel>
          <SidebarMenu className="px-3 space-y-1">
            {DEPARTMENTS.map((dept) => {
              const Icon = iconMap[dept.id] || Briefcase;
              const isActive = currentId === dept.id;
              return (
                <SidebarMenuItem key={dept.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive}
                    tooltip={dept.name}
                    className={cn(
                      "h-11 rounded-lg transition-all duration-200",
                      isActive 
                        ? "bg-primary/5 text-primary font-bold shadow-sm" 
                        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                    )}
                  >
                    <Link to={`/department/${dept.id}`} className="flex items-center justify-between w-full group/link">
                      <div className="flex items-center gap-3">
                        <Icon className={cn("h-4 w-4 shrink-0 transition-colors", isActive ? "text-primary" : "text-muted-foreground/60")} />
                        <span className="text-sm tracking-tight">{dept.name}</span>
                      </div>
                      <ChevronRight className={cn(
                        "h-3.5 w-3.5 opacity-0 -translate-x-2 transition-all",
                        isActive ? "opacity-100 translate-x-0" : "group-hover/link:opacity-40 group-hover/link:translate-x-0"
                      )} />
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-6 border-t border-border/40">
        <div className="flex flex-col gap-1">
          <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground/40">Terminal v1.4.2</p>
          <p className="text-[10px] font-bold text-muted-foreground/30">PrimeSpace Analytics Hub</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}