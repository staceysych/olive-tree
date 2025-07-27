"use client"

import { useTranslations } from "next-intl"
import { useParams } from "next/navigation"
import { Package, ShoppingBasket } from "lucide-react"
import { mapMarketCategoryToEmoji } from "@/utils/common"

interface BasketItemsDisplayProps {
  basket: any
  showEditButton?: boolean
  onEditClick?: () => void
  editButtonText?: string
}

export default function BasketItemsDisplay({ 
  basket, 
  showEditButton = false, 
  onEditClick,
  editButtonText 
}: BasketItemsDisplayProps) {
  const t = useTranslations()
  const params = useParams()

  // Helper function to find translated item name by key
  const getTranslatedItemName = (categoryName: string, itemKey: string) => {
    try {
      const messages = require(`@/messages/${params.locale || 'en'}.json`)
      const itemsArray = messages.marketplace?.categories?.[categoryName]?.items
      
      if (Array.isArray(itemsArray)) {
        const item = itemsArray.find((item: any) => item.key === itemKey)
        return item ? item.name : itemKey
      }
    } catch (error) {
      console.error('Error getting translated item name:', error)
    }
    return itemKey
  }

  const renderCategories = () => {
    if (!basket.categories) return null

    return Object.entries(basket.categories).map(([categoryName, items]: [string, any]) => {
      const categoryTitle = t(`marketplace.categories.${categoryName}.title`, { fallback: categoryName })
      
      return (
        <div key={categoryName} className="space-y-3">
          <h4 className="font-medium text-emerald-800 capitalize">{mapMarketCategoryToEmoji(categoryName)} {categoryTitle}</h4>
          <div className="space-y-2 bg-gray-50 rounded-lg p-3">
            {Object.entries(items).map(([itemName, itemData]: [string, any]) => {
              const translatedItemName = getTranslatedItemName(categoryName, itemName)
              
              return (
                <div key={itemName} className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{translatedItemName}</p>
                    <p className="text-sm text-gray-600">
                      {itemData.quantity} {itemData.unit} × €{itemData.price.toFixed(2)}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-emerald-700">
                      €{(itemData.quantity * itemData.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )
    })
  }

  if (!basket.categories || Object.keys(basket.categories).length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <Package className="h-12 w-12 mx-auto mb-4 text-gray-300" />
        <p className="text-sm">{t("dashboard.basketDetails.noItems")}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {renderCategories()}
      {showEditButton && onEditClick && (
        <div className="mt-6 pt-6 border-t">
          <button 
            onClick={onEditClick}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
          >
            <ShoppingBasket className="h-4 w-4 mr-2" />
            {editButtonText || t("dashboard.basketDetails.editItems")}
          </button>
        </div>
      )}
    </div>
  )
} 