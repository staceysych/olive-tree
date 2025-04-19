"use client"

import { useState, useEffect } from "react"
import { Check, Globe } from "lucide-react"
import { useRouter } from '@/i18n/navigation'
import { usePathname } from 'next/navigation'

import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { LANGUAGES, STORAGE_KEY } from "@/utils/defaults"

type Language = {
  code: string
  name: string
  nativeName: string
  flag: string
}


export const LanguageSelector = () => {
  const router = useRouter()
  const pathname = usePathname()
  const currentLocale = pathname.split('/')[1] || 'en'
  const [currentLanguage, setCurrentLanguage] = useState<Language>(
    LANGUAGES.find(lang => lang.code === currentLocale) || LANGUAGES[0]
  )



  // Load saved language preference on component mount
  useEffect(() => {
    const savedLanguage = localStorage.getItem(STORAGE_KEY)
    if (savedLanguage) {
      const language = LANGUAGES.find(lang => lang.code === savedLanguage)
      if (language) {
        setCurrentLanguage(language)
        // If the current URL locale doesn't match the saved preference, redirect
        if (currentLocale !== savedLanguage) {
          const pathWithoutLocale = pathname.replace(`/${currentLocale}`, '')
          router.replace(pathWithoutLocale, { locale: savedLanguage })
        }
      }
    }
  }, [])

  const handleLanguageChange = (language: Language) => {
    setCurrentLanguage(language)
    localStorage.setItem(STORAGE_KEY, language.code)

    const pathWithoutLocale = pathname === `/${currentLocale}` 
      ? '/'  // If we're on the home page, use root path
      : pathname.replace(`/${currentLocale}`, '') // Otherwise, remove the locale prefix

    // Navigate to the new locale
    router.replace(pathWithoutLocale, { locale: language.code })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9" aria-label="Select language">
          <Globe className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[200px]">
        {LANGUAGES.map((language) => (
          <DropdownMenuItem
            key={language.code}
            className="flex items-center justify-between cursor-pointer"
            onClick={() => handleLanguageChange(language)}
          >
            <div className="flex items-center gap-2">
              <span className="text-base">{language.flag}</span>
              <span>{language.name}</span>
              {language.name !== language.nativeName && (
                <span className="text-xs text-muted-foreground">({language.nativeName})</span>
              )}
            </div>
            {currentLanguage.code === language.code && (
              <Check className="h-3.5 w-3.5 text-emerald-600 ml-2" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 