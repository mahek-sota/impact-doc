"use client"

import {
  LayoutDashboard,
  Users,
  Zap,
  FlaskConical,
  FolderKanban,
  MessageCircle,
  Github,
  Linkedin,
  Mail,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "colleagues", label: "Helping Colleagues", icon: Users },
  { id: "extras", label: "Above & Beyond", icon: Zap },
  { id: "prototypes", label: "Prototypes", icon: FlaskConical },
  { id: "projects", label: "Projects & Metrics", icon: FolderKanban },
  { id: "contact", label: "Get in Touch", icon: MessageCircle },
]

const socialLinks = [
  { href: "https://github.com/maheksota", icon: Github, label: "GitHub" },
  { href: "https://linkedin.com/in/maheksota", icon: Linkedin, label: "LinkedIn" },
  { href: "mailto:sotamahek@gmail.com", icon: Mail, label: "Email" },
]

interface DashboardSidebarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

export function DashboardSidebar({ activeSection, onNavigate }: DashboardSidebarProps) {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <aside
      className={cn(
        "fixed left-0 top-0 z-40 flex h-screen flex-col border-r border-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-60"
      )}
    >
      <div className={cn(
        "flex h-16 items-center border-b border-border px-4",
        collapsed ? "justify-center" : "justify-between"
      )}>
        {!collapsed && (
          <div className="flex items-center gap-2.5 overflow-hidden">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
              M
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="truncate text-sm font-semibold text-foreground">Mahek Sota</span>
              <span className="truncate text-[11px] text-muted-foreground">Brag Document</span>
            </div>
          </div>
        )}
        {collapsed && (
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold">
            M
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "hidden lg:flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary transition-colors",
            collapsed && "absolute -right-3 top-5 z-50 h-6 w-6 rounded-full border border-border bg-card shadow-sm"
          )}
          aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {collapsed ? <ChevronRight className="h-3.5 w-3.5" /> : <ChevronLeft className="h-3.5 w-3.5" />}
        </button>
      </div>

      <nav className="flex flex-1 flex-col gap-1 p-3" aria-label="Dashboard navigation">
        <span className={cn(
          "mb-1 px-2 text-[10px] font-semibold uppercase tracking-widest text-muted-foreground transition-opacity",
          collapsed ? "opacity-0" : "opacity-100"
        )}>
          Sections
        </span>
        {navItems.map((item) => {
          const isActive = activeSection === item.id
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={cn(
                "group flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-secondary hover:text-foreground",
                collapsed && "justify-center px-0"
              )}
              title={collapsed ? item.label : undefined}
            >
              <item.icon className={cn("h-4.5 w-4.5 shrink-0", isActive && "text-primary")} />
              {!collapsed && <span className="truncate">{item.label}</span>}
            </button>
          )
        })}
      </nav>

      <div className={cn(
        "border-t border-border p-3",
        collapsed ? "flex flex-col items-center gap-2" : "flex items-center gap-2 px-4"
      )}>
        {socialLinks.map((link) => (
          <a
            key={link.label}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            aria-label={link.label}
          >
            <link.icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </aside>
  )
}
