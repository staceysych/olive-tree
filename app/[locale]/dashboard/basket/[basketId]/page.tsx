"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { useParams, useRouter } from "next/navigation"
import { 
  ArrowLeft, 
  Edit, 
  ShoppingBasket, 
  Package, 
  Euro, 
  Calendar,
  Trash2

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
import { useGetBasketById } from "@/hooks/useGetBasketById"
import { useGetUserById } from "@/hooks/useGetUserById"
import { useDeleteBasket } from "@/hooks/useDeleteBasket"
import OrderConfirmationModal from "@/app/[locale]/dashboard/OrderConfirmationModal"
import BasketItemsDisplay from "@/app/[locale]/dashboard/basket/[basketId]/BasketItemsDisplay"

export default function BasketDetailsPage() {
  const t = useTranslations()
  const { data: session } = useSession()
  const router = useRouter()
  const params = useParams()
  const basketId = params.basketId as string
  
  const [showOrderModal, setShowOrderModal] = useState(false)

  const { basket, isLoading, error } = useGetBasketById(session?.user?.id || "", basketId)
  const { user } = useGetUserById(session?.user?.id || "")
  const { deleteBasket, isLoading: isDeleting, error: deleteError } = useDeleteBasket()

  const handleEdit = () => {
    router.push(`/dashboard/basket/${basketId}/edit`)
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
    setShowOrderModal(true)
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
              {basket.name}
            </h1>
            <p className="text-sm text-gray-600">
              {t("dashboard.basketDetails.createdAt", { 
                date: format(new Date(basket.createdAt), "MMM dd, yyyy") 
              })}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Package className="h-4 w-4" />
                  <span>{t("dashboard.basketDetails.totalItems")}</span>
                </div>
                <span className="font-medium">{basket.totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="h-4 w-4" />
                  <span>{t("dashboard.basketDetails.frequency")}</span>
                </div>
                <Badge variant="secondary">{t(`dashboard.basketDetails.frequencyOptions.${basket.frequency}`)}</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-600">
                  <Euro className="h-4 w-4" />
                  <span>{t("dashboard.basketDetails.totalPrice")}</span>
                </div>
                <span className="text-xl font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg border border-emerald-200">
                  €{basket.totalPrice.toFixed(2)}
                </span>
              </div>
            </CardContent>
          </Card>

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
              <BasketItemsDisplay basket={basket} />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Order Confirmation Modal */}
      <OrderConfirmationModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        basket={basket}
        user={user}
        basketId={basketId}
      />
    </div>
  )
} 