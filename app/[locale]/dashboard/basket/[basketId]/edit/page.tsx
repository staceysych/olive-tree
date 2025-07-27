"use client"

import { useState, useEffect } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Save, 
  X, 
  ShoppingBasket, 
  Package, 
  Euro, 
  Calendar,
} from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useGetBasketById } from "@/hooks/useGetBasketById"
import { useUpdateBasket } from "@/hooks/useUpdateBasket"
import { BasketItem } from "@/types/basket"
import Marketplace from "@/components/Marketplace"
import BasketItemsDisplay from "@/app/[locale]/dashboard/basket/[basketId]/BasketItemsDisplay"

export default function EditBasketPage() {
  const t = useTranslations()
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const basketId = params.basketId as string
  
  const [editedBasket, setEditedBasket] = useState<any>(null)
  const [editingBasketItems, setEditingBasketItems] = useState<BasketItem[]>([])
  const [showEditItemsModal, setShowEditItemsModal] = useState(false)

  const { basket, isLoading, error } = useGetBasketById(session?.user?.id || "", basketId)
  const { updateBasket, isLoading: isUpdating, error: updateError } = useUpdateBasket()

  // Convert basket categories to BasketItem array
  const convertBasketToItems = (basketData: any): BasketItem[] => {
    if (!basketData?.categories) return []
    
    const items: BasketItem[] = []
    Object.entries(basketData.categories).forEach(([categoryName, categoryItems]: [string, any]) => {
      Object.entries(categoryItems).forEach(([itemKey, itemData]: [string, any]) => {
        items.push({
          id: itemKey,
          name: itemKey,
          price: itemData.price,
          unit: itemData.unit,
          quantity: itemData.quantity,
          image: t.raw(`marketplace.categories.${categoryName}.items`).find((item: any) => item.key === itemKey)?.image || "/placeholder.svg",
          category: categoryName
        })
      })
    })
    return items
  }

  // Convert BasketItem array back to basket categories format
  const convertItemsToBasket = (items: BasketItem[]): any => {
    const categories: any = {}
    
    items.forEach(item => {
      if (!categories[item.category]) {
        categories[item.category] = {}
      }
      
      categories[item.category][item.id] = {
        quantity: item.quantity,
        price: item.price,
        unit: item.unit
      }
    })
    
    return categories
  }

  // Initialize editing state when basket loads
  useEffect(() => {
    if (basket && !editedBasket) {
      const basketItems = convertBasketToItems(basket)
      setEditingBasketItems(basketItems)
      setEditedBasket({
        name: basket?.name || "",
        frequency: basket?.frequency || "once",
        categories: basket?.categories || {},
        totalPrice: basket?.totalPrice || 0,
        totalItems: basket?.totalItems || 0
      })
    }
  }, [basket, editedBasket])

  const handleCancel = () => {
    router.push(`/dashboard/basket/${basketId}`)
  }

  const handleSave = async () => {
    if (!basket || !editedBasket || !session?.user?.id) return

    try {
      // Convert editing basket items back to basket format
      const updatedCategories = convertItemsToBasket(editingBasketItems)
      const totalPrice = editingBasketItems.reduce((total, item) => total + (item.price * item.quantity), 0)
      const totalItems = editingBasketItems.reduce((total, item) => total + item.quantity, 0)
      
      const updatedBasket = {
        ...editedBasket,
        categories: updatedCategories,
        totalPrice,
        totalItems
      }
      
      await updateBasket(session.user.id, basketId, updatedBasket)
      // Navigate back to basket details page
      router.push(`/dashboard/basket/${basketId}`)
    } catch (error) {
      console.error('Error updating basket:', error)
    }
  }

  const handleUpdateBasket = (basketItems: BasketItem[]) => {
    setEditingBasketItems(basketItems)
    // Close the modal after updating
    setShowEditItemsModal(false)
  }

  const handleEditItems = () => {
    setShowEditItemsModal(true)
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
          <p className="text-sm text-gray-500 mt-2">Loading basket details...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
        <div className="text-center py-8">
          <p className="text-red-500 text-sm">{error}</p>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("dashboard.basketDetails.backToDashboard")}
          </Button>
        </div>
      </div>
    )
  }

  if (!basket) {
    return (
      <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
        <div className="text-center py-8">
          <p className="text-gray-500">Basket not found</p>
          <Button 
            onClick={() => router.push('/dashboard')}
            className="mt-4"
            variant="outline"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("dashboard.basketDetails.backToDashboard")}
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
      <Button
        onClick={() => router.push(`/dashboard/basket/${basketId}`)}
        variant="outline"
        size="sm"
        className="mb-4"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        {t("dashboard.basketDetails.backToBasket")}
      </Button>

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
            {t("dashboard.basketDetails.editTitle")}
          </h1>
          <p className="text-sm text-gray-600">
            {t("dashboard.basketDetails.createdAt", { 
              date: format(new Date(basket.createdAt), "MMM dd, yyyy") 
            })}
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={handleSave}
            size="sm"
            disabled={isUpdating}
          >
            <Save className="h-4 w-4 mr-2" />
            {isUpdating ? t("dashboard.basketDetails.saving") : t("dashboard.basketDetails.save")}
          </Button>
          <Button
            onClick={handleCancel}
            variant="outline"
            size="sm"
          >
            <X className="h-4 w-4 mr-2" />
            {t("dashboard.basketDetails.cancel")}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Basket Summary */}
        <div className="lg:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBasket className="h-5 w-5" />
                {t("dashboard.basketDetails.summary")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="basket-name">{t("dashboard.basketDetails.name")}</Label>
                  <Input
                    id="basket-name"
                    value={editedBasket?.name || ""}
                    onChange={(e) => setEditedBasket({...editedBasket, name: e.target.value})}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="basket-frequency">{t("dashboard.basketDetails.frequency")}</Label>
                  <Select
                    value={editedBasket?.frequency || "once"}
                    onValueChange={(value) => setEditedBasket({...editedBasket, frequency: value})}
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="once">{t("dashboard.basketDetails.frequencyOptions.once")}</SelectItem>
                      <SelectItem value="weekly">{t("dashboard.basketDetails.frequencyOptions.weekly")}</SelectItem>
                      <SelectItem value="biweekly">{t("dashboard.basketDetails.frequencyOptions.biweekly")}</SelectItem>
                      <SelectItem value="monthly">{t("dashboard.basketDetails.frequencyOptions.monthly")}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Basket Items with Edit Button */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.basketDetails.items")}</CardTitle>
              <CardDescription>
                {t("dashboard.basketDetails.itemsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BasketItemsDisplay 
                basket={{ categories: convertItemsToBasket(editingBasketItems) }}
                showEditButton={true}
                onEditClick={handleEditItems}
                editButtonText={t("dashboard.basketDetails.editItems")}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Edit Items Modal */}
      <Dialog open={showEditItemsModal} onOpenChange={setShowEditItemsModal}>
        <DialogContent className="max-w-7xl max-h-[90vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle>{t("dashboard.basketDetails.editBasket")}</DialogTitle>
            <DialogDescription>
              {t("dashboard.basketDetails.editBasketDescription")}
            </DialogDescription>
          </DialogHeader>
          <div className="overflow-y-auto max-h-[70vh]">
            <Marketplace
              title=""
              description=""
              showHeader={false}
              initialBasketItems={editingBasketItems}
              updateBasket={handleUpdateBasket}
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
} 