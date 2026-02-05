'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { BarChart3, Plus, Home, Menu, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

export function Sidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  const navItems = [
    {
      label: 'Dashboard',
      href: '/',
      icon: Home,
    },
    {
      label: 'New Campaign',
      href: '/campaigns/new',
      icon: Plus,
    },
    {
      label: 'Campaigns',
      href: '/campaigns',
      icon: BarChart3,
    },
  ]

  return (
    <>
      {/* Mobile Toggle Button */}
      <div className="fixed left-0 top-0 z-50 flex h-16 w-full items-center justify-between border-b border-border bg-background px-4 md:hidden">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <BarChart3 className="h-5 w-5 text-primary-foreground" />
          </div>
          <h1 className="text-lg font-bold text-foreground">AdTech</h1>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen(!open)}
          className="md:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Mobile Overlay */}
      {open && (
        <div
          className="fixed inset-0 top-16 z-40 bg-black/50 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed left-0 top-0 z-40 h-screen w-64 border-r border-border bg-sidebar-background transition-transform duration-300',
          'md:static md:translate-x-0 md:pt-0',
          open ? 'translate-x-0 pt-16' : '-translate-x-full pt-16'
        )}
      >
        {/* Header - Hidden on Mobile, shown on Desktop */}
        <div className="hidden border-b border-sidebar-border p-6 md:flex md:items-center md:justify-center">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <BarChart3 className="h-5 w-5 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-bold text-foreground">AdTech</h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className={cn(
                  'flex items-center gap-3 rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                  isActive
                    ? 'bg-sidebar-accent text-sidebar-primary'
                    : 'text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-primary'
                )}
              >
                <Icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>

        {/* Footer Info */}
        <div className="absolute bottom-0 left-0 right-0 border-t border-sidebar-border p-4">
          <p className="text-xs text-sidebar-foreground">
            <span className="font-semibold">AdTech Platform</span>
            <br />
            Campaign Management System
          </p>
        </div>
      </aside>
    </>
  )
}
