"use client"

import * as React from "react"
import Link from "next/link"
import { Menu, User, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { usePathname } from 'next/navigation'
import { createPath } from "@/utils/common"
import { NavLinks } from "@/components/NavLinks"
import { signOut } from "next-auth/react"

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="md:hidden transition-transform hover:scale-105">
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="right" 
        className="w-[300px] sm:w-[400px] transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]"
      >
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-4 mt-4">
          {isDashboard ? (
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setOpen(false);
                signOut({ callbackUrl: '/' });
              }}
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <LogOut className="h-4 w-4" />
              <span>Logout</span>
            </Button>
          ) : (
            <>
              <NavLinks onClick={() => setOpen(false)} />
              <Button
                variant="outline"
                size="sm"
                asChild
                className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
              >
                <Link href="/login" className="flex items-center gap-1">
                  <User className="h-4 w-4" />
                  <span>My Olive Tree</span>
                </Link>
              </Button>
              <Button size="sm" asChild className="w-full transition-transform hover:scale-[1.02]">
                <Link href={createPath(pathname, '#order')} onClick={() => setOpen(false)}>Order</Link>
              </Button>
            </>
          )}
        </nav>
      </SheetContent>
    </Sheet>
  )
} 