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


export function MobileMenu() {
  const [open, setOpen] = React.useState(false)

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
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1"
            onClick={() => setOpen(false)}
          >
            How It Works
          </Link>
          <Link
            href="#baskets"
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1"
            onClick={() => setOpen(false)}
          >
            Baskets
          </Link>
          <Link
            href="#faq"
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1"
            onClick={() => setOpen(false)}
          >
            FAQ
          </Link>
          <Link
            href="#about"
            className="text-sm font-medium text-muted-foreground transition-all duration-300 hover:text-foreground hover:translate-x-1"
            onClick={() => setOpen(false)}
          >
            About
          </Link>
          <Button size="sm" asChild className="w-full transition-transform hover:scale-[1.02]">
            <Link href="#order" onClick={() => setOpen(false)}>Order</Link>
          </Button>
        </nav>
      </SheetContent>
    </Sheet>
  )
} 