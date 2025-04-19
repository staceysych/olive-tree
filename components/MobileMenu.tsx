"use client"

import * as React from "react"
import Link from "next/link"
import { Menu } from "lucide-react"
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

export function MobileMenu() {
  const [open, setOpen] = React.useState(false)
  const pathname = usePathname()


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
          <NavLinks onClick={() => setOpen(false)} />
          <Button size="sm" asChild className="w-full transition-transform hover:scale-[1.02]">
            <Link href={createPath(pathname, '#order')} onClick={() => setOpen(false)}>Order</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
} 