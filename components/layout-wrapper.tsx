'use client'

import React from "react"

import { Sidebar } from './sidebar'
import { ToastProvider } from './toast-provider'

export function LayoutWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider>
      <div className="flex flex-col md:flex-row">
        <Sidebar />
        <main className="w-full md:pl-64 pt-16 md:pt-0">
          <div className="min-h-screen bg-background">
            {children}
          </div>
        </main>
      </div>
    </ToastProvider>
  )
}
