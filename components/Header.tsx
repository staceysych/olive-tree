'use client'
import Link from "next/link"
import { Leaf } from "lucide-react"
import { useTranslations } from 'next-intl'
import { usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { MobileMenu } from "@/components/MobileMenu"
import { LanguageSelector } from "@/components/LanguageSelector"
import { createPath } from "@/utils/common"
import { NavLinks } from "@/components/NavLinks"

export function Header() {
  const t = useTranslations()
  const pathname = usePathname()
  const basePath = pathname.includes('/feedback') ? '/' : pathname;


  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <div className="flex gap-2 items-center text-xl font-bold text-emerald-700">
          <Leaf className="h-6 w-6" />
          <span>Olive Tree</span>
        </div>
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="hidden md:flex items-center space-x-2">
            <NavLinks />
            <LanguageSelector /> 
            <Button size="sm" asChild>
              <Link href={createPath(basePath, '#order')}>{t('header.order')}</Link>
            </Button>
          </nav>
          <div className="flex items-center space-x-2 md:hidden">
            <LanguageSelector /> 
             <MobileMenu /> 
          </div>
        </div>
      </div>
    </header>
  )
} 