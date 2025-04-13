import Link from "next/link"
import { Leaf } from "lucide-react"

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/MobileMenu"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center text-xl font-bold text-emerald-700">
          <Leaf className="h-6 w-6" />
          <span>Olive Tree</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <Link
              href="#how-it-works"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              How It Works
            </Link>
            <Link
              href="#baskets"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Baskets
            </Link>
            <Link
              href="#faq"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              FAQ
            </Link>
            <Link
              href="#about"
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Button size="sm" asChild>
              <Link href="#order">Order</Link>
            </Button>
          </nav>
          <MobileMenu />
        </div>
      </div>
    </header>
  )
} 