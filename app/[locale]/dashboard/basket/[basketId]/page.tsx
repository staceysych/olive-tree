"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Edit, 
  Save, 
  X, 
  ShoppingBasket, 
  Package, 
  Euro, 
  Calendar,
  Trash2,

} from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useGetBasketById } from "@/hooks/useGetBasketById"
import { useGetUserById } from "@/hooks/useGetUserById"
import { useUpdateBasket } from "@/hooks/useUpdateBasket"
import { useDeleteBasket } from "@/hooks/useDeleteBasket"

export default function BasketDetailsPage() {
  const t = useTranslations()
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const basketId = params.basketId as string
  
  const [isEditing, setIsEditing] = useState(false)
  const [editedBasket, setEditedBasket] = useState<any>(null)

  const { basket, isLoading, error } = useGetBasketById(session?.user?.id || "", basketId)
  const { user } = useGetUserById(session?.user?.id || "")
  const { updateBasket, isLoading: isUpdating, error: updateError } = useUpdateBasket()
  const { deleteBasket, isLoading: isDeleting, error: deleteError } = useDeleteBasket()

  const handleEdit = () => {
    setEditedBasket({
      name: basket?.name || "",
      frequency: basket?.frequency || "Once",
      categories: basket?.categories || {},
      totalPrice: basket?.totalPrice || 0,
      totalItems: basket?.totalItems || 0
    })
    setIsEditing(true)
  }

  const handleCancel = () => {
    setIsEditing(false)
    setEditedBasket(null)
  }

  const handleSave = async () => {
    if (!basket || !editedBasket || !session?.user?.id) return

    try {
      await updateBasket(session.user.id, basketId, editedBasket)
      // Refresh the page to show updated data
      window.location.reload()
    } catch (error) {
      console.error('Error updating basket:', error)
    }
  }

  const handleDelete = async () => {
    if (!basket || !session?.user?.id) return

    try {
      await deleteBasket(session.user.id, basketId)
      router.push('/dashboard')
    } catch (error) {
      console.error('Error deleting basket:', error)
    }
  }

  const handleOrderBasket = () => {
    // Navigate to order form with basket data
    router.push(`/register/confirm-order?basketId=${basketId}`)
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

  const renderCategories = () => {
    if (!basket.categories) return null

    // Helper function to find translated item name by key
    const getTranslatedItemName = (categoryName: string, itemKey: string) => {
      try {
        // Import the translation data directly
        const messages = require(`@/messages/${params.locale || 'en'}.json`)
        const itemsArray = messages.marketplace?.categories?.[categoryName]?.items
        
        if (Array.isArray(itemsArray)) {
          // Find the item with matching key
          const item = itemsArray.find((item: any) => item.key === itemKey)
          return item ? item.name : itemKey
        }
      } catch (error) {
        console.error('Error getting translated item name:', error)
        // If translation fails, return the original key
      }
      return itemKey
    }

    return Object.entries(basket.categories).map(([categoryName, items]: [string, any]) => {
      // Get translated category title
      const categoryTitle = t(`marketplace.categories.${categoryName}.title`, { fallback: categoryName })
      
      return (
        <div key={categoryName} className="space-y-3">
          <h4 className="font-medium text-emerald-800 capitalize">{categoryTitle}</h4>
          <div className="space-y-2">
            {Object.entries(items).map(([itemName, itemData]: [string, any]) => {
              // Get translated item name using the helper function
              const translatedItemName = getTranslatedItemName(categoryName, itemName)
              
              return (
                <div key={itemName} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
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

  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">

        <Button
            onClick={() => router.push('/dashboard')}
            variant="outline"
            size="sm"
            className="mb-4"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            {t("dashboard.basketDetails.backToDashboard")}
          </Button>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-emerald-800">
              {isEditing ? t("dashboard.basketDetails.editTitle") : basket.name}
            </h1>
            <p className="text-sm text-gray-600">
              {t("dashboard.basketDetails.createdAt", { 
                date: format(new Date(basket.createdAt), "MMM dd, yyyy") 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          {!isEditing ? (
            <>
              <Button
                onClick={handleEdit}
                variant="outline"
                size="sm"
              >
                <Edit className="h-4 w-4 mr-2" />
                {t("dashboard.basketDetails.edit")}
              </Button>
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="destructive"
                    size="sm"
                    disabled={isDeleting}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    {isDeleting ? t("dashboard.basketDetails.deleting") : t("dashboard.basketDetails.delete")}
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>{t("dashboard.basketDetails.deleteConfirmTitle")}</AlertDialogTitle>
                    <AlertDialogDescription>
                      {t("dashboard.basketDetails.deleteConfirmDescription")}
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>{t("dashboard.basketDetails.cancel")}</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={handleDelete}
                      className="bg-red-600 hover:bg-red-700"
                      disabled={isDeleting}
                    >
                      {isDeleting ? t("dashboard.basketDetails.deleting") : t("dashboard.basketDetails.delete")}
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          ) : (
            <>
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
            </>
          )}
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
              {isEditing ? (
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
                      value={editedBasket?.frequency || "Once"}
                      onValueChange={(value) => setEditedBasket({...editedBasket, frequency: value})}
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                                             <SelectContent>
                         <SelectItem value="Once">{t("dashboard.basketDetails.frequencyOptions.once")}</SelectItem>
                         <SelectItem value="Weekly">{t("dashboard.basketDetails.frequencyOptions.weekly")}</SelectItem>
                         <SelectItem value="Bi-weekly">{t("dashboard.basketDetails.frequencyOptions.biweekly")}</SelectItem>
                         <SelectItem value="Monthly">{t("dashboard.basketDetails.frequencyOptions.monthly")}</SelectItem>
                       </SelectContent>
                    </Select>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Package className="h-4 w-4" />
                      <span>{t("dashboard.basketDetails.totalItems")}</span>
                    </div>
                    <span className="font-medium">{basket.totalItems}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Euro className="h-4 w-4" />
                      <span>{t("dashboard.basketDetails.totalPrice")}</span>
                    </div>
                    <span className="font-medium text-emerald-700">
                      €{basket.totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Calendar className="h-4 w-4" />
                      <span>{t("dashboard.basketDetails.frequency")}</span>
                    </div>
                    <Badge variant="secondary">{basket.frequency}</Badge>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          {!isEditing && (
            <Card className="mt-6">
              <CardContent className="pt-6">
                <Button 
                  onClick={handleOrderBasket}
                  className="w-full bg-emerald-600 hover:bg-emerald-700"
                  size="lg"
                >
                  <ShoppingBasket className="h-4 w-4 mr-2" />
                  {t("dashboard.basketDetails.orderBasket")}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Basket Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>{t("dashboard.basketDetails.items")}</CardTitle>
              <CardDescription>
                {t("dashboard.basketDetails.itemsDescription")}
              </CardDescription>
            </CardHeader>
            <CardContent>
              {basket.categories && Object.keys(basket.categories).length > 0 ? (
                <div className="space-y-6">
                  {renderCategories()}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  {t("dashboard.basketDetails.noItems")}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
} 