"use client"

import { ShoppingBasket } from "lucide-react"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AvailableItemsModalProps {
  isOpen: boolean
  onClose: () => void
}

interface Category {
  emoji: string
  title: string
  items: string[]
}

export function AvailableItemsModal({ isOpen, onClose }: AvailableItemsModalProps) {
  const t = useTranslations("availableItems")

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <ShoppingBasket className="h-5 w-5" />
            <span>{t("title")}</span>
          </DialogTitle>
          <DialogDescription>{t("description")}</DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {Object.entries(t.raw("categories")).map(([categoryKey, category]) => {
              const typedCategory = category as Category
              return (
                <div key={categoryKey} className="space-y-3">
                  <h3 className="text-lg font-medium flex items-center gap-2">
                    <span>{typedCategory.emoji}</span>
                    <span>{typedCategory.title}</span>
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {typedCategory.items.map((item: string) => (
                      <Badge key={item} variant="outline" className="bg-emerald-50 justify-start">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </div>
              )
            })}

            <Separator className="my-4" />

            <div className="space-y-3">
              <h3 className="text-lg font-medium">{t("notes.title")}</h3>
              <ul className="space-y-2">
                {t.raw("notes.items").map((note: string, index: number) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">{t("notes.customRequests.title")}</h4>
                <p className="text-sm text-muted-foreground">
                  {t("notes.customRequests.description")}
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  {t("notes.customRequests.updateNote")}
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>{t("close")}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 