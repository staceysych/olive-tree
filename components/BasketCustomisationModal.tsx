"use client"

import { useState, useEffect } from "react"
import { ShoppingBasket, Check, X } from "lucide-react"
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
import { ScrollArea } from "@/components/ui/scroll-area"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"

interface BasketCustomizationModalProps {
  isOpen: boolean
  onClose: () => void
  basketType: string
  onSaveCustomization: (selectedItems: Record<string, string[]>) => void
  initialSelections: Record<string, string[]>
  onExcludedItems?: (excludedItems: Record<string, string[]>) => void
}

interface Category {
  title: string
  items: string[]
}

interface Categories {
  [key: string]: Category
}

export function BasketCustomisationModal({
  isOpen,
  onClose,
  basketType,
  onSaveCustomization,
  initialSelections,
  onExcludedItems,
}: BasketCustomizationModalProps) {
  const t = useTranslations("availableItems")
  const [activeTab, setActiveTab] = useState<string>("vegetables")
  const [selectedItems, setSelectedItems] = useState<Record<string, string[]>>(initialSelections)
  const [hasChanges, setHasChanges] = useState(false)

  // Get categories from translations
  const categories = t.raw("categories") as Categories

  const handleItemToggle = (category: string, item: string) => {
    setHasChanges(true)
    setSelectedItems((prev) => {
      const newSelectedItems = { ...prev }

      if (!newSelectedItems[category]) {
        newSelectedItems[category] = []
      }

      if (newSelectedItems[category].includes(item)) {
        // Remove item if already selected
        newSelectedItems[category] = newSelectedItems[category].filter((i) => i !== item)
      } else {
        // Add item if not selected
        newSelectedItems[category] = [...newSelectedItems[category], item]
      }

      return newSelectedItems
    })
  }

  const handleSave = () => {
    // Calculate excluded items
    const newExcludedItems: Record<string, string[]> = {}
    Object.entries(categories).forEach(([category, { items }]) => {
      const excluded = items.filter(item => !selectedItems[category]?.includes(item))
      if (excluded.length > 0) {
        newExcludedItems[category] = excluded
      }
    })
    
    // Call the callback if provided
    if (onExcludedItems) {
      onExcludedItems(newExcludedItems)
    }

    onSaveCustomization(selectedItems)
    onClose()
  }

  const isItemSelected = (category: string, item: string) => {
    return selectedItems[category]?.includes(item) || false
  }

  const getSelectedCount = () => {
    let count = 0
    Object.values(selectedItems).forEach((items) => {
      count += items.length
    })
    return count
  }

  const getTotalCount = () => {
    let count = 0
    Object.values(categories).forEach((category) => {
      count += category.items.length
    })
    return count
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <ShoppingBasket className="h-5 w-5" />
            <span>{t("modal.title")}</span>
          </DialogTitle>
          <DialogDescription>
            {t("modal.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center justify-between py-2">
          <Badge variant="outline" className="bg-emerald-50">
            {t("modal.itemsSelected", { selectedCount: getSelectedCount(), totalCount: getTotalCount() })}
          </Badge>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                const allItems: Record<string, string[]> = {}
                Object.keys(categories).forEach((category) => {
                  allItems[category] = [...categories[category].items]
                })
                setSelectedItems(allItems)
                setHasChanges(true)
              }}
            >
              <Check className="h-3 w-3 mr-1" />
              {t("modal.selectAll")}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => {
                setSelectedItems({})
                setHasChanges(true)
              }}
            >
              <X className="h-3 w-3 mr-1" />
              {t("modal.clearAll")}
            </Button>
          </div>
        </div>

        <ScrollArea className="h-[50vh] pr-4">
          <Tabs defaultValue="vegetables" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-5 mb-4">
              {Object.keys(categories).map((category) => (
                <TabsTrigger key={category} value={category} className="flex items-center gap-1 text-xs md:text-sm">
                  <span>{category === "vegetables" ? "🍅" : category === "mushrooms" ? "🍄" : category === "nuts" ? "🌰" : category === "fruits" ? "🍓" : "🌿"}</span>
                  <span className="hidden md:inline">{categories[category].title.split(" ")[0]}</span>
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.keys(categories).map((category) => (
              <TabsContent key={category} value={category} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {categories[category].items.map((item: string) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${category}-${item}`}
                        checked={isItemSelected(category, item)}
                        onCheckedChange={() => handleItemToggle(category, item)}
                      />
                      <Label htmlFor={`${category}-${item}`} className="text-sm cursor-pointer flex-1 py-2">
                        {item}
                      </Label>
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </ScrollArea>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            {t("modal.cancel")}
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={handleSave} disabled={!hasChanges}>
            {t("modal.save")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
