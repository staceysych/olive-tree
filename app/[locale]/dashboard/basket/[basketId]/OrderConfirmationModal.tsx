"use client"

import { format, addDays } from "date-fns"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { 
  CheckCircle,
  MapPin,
  Calendar,
  ShoppingBasket
} from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface OrderConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  basket: {
    id: string
    name: string
    totalItems: number
    totalPrice: number
    frequency: string
  }
  user: {
    street?: string | null
    city?: string | null
    postalCode?: string | null
    country?: string | null
  } | null
  basketId: string
}

export default function OrderConfirmationModal({
  isOpen,
  onClose,
  basket,
  user,
  basketId
}: OrderConfirmationModalProps) {
  const t = useTranslations()
  const router = useRouter()

  // Calculate next delivery date based on the specified logic
  const getNextDeliveryDate = () => {
    const today = new Date()
    const todayDay = today.getDay() // 0 = Sunday, 5 = Friday, 6 = Saturday
    
    let nextDeliveryDate: Date
    
    if (todayDay < 5) { // Monday (1) through Thursday (4)
      // Next delivery is Friday
      const daysUntilFriday = 5 - todayDay
      nextDeliveryDate = addDays(today, daysUntilFriday)
    } else { // Friday (5) or Saturday (6)
      // Next delivery is Sunday
      const daysUntilSunday = todayDay === 5 ? 2 : 1 // Friday -> Sunday = 2 days, Saturday -> Sunday = 1 day
      nextDeliveryDate = addDays(today, daysUntilSunday)
    }
    
    return nextDeliveryDate
  }

  const handleConfirmOrder = () => {
    // Navigate to order form with basket data
    router.push(`/register/confirm-order?basketId=${basketId}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <CheckCircle className="h-5 w-5" />
            {t("dashboard.basketDetails.confirmOrder.title")}
          </DialogTitle>
          <DialogDescription>
            {t("dashboard.basketDetails.confirmOrder.description")}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">{t("dashboard.basketDetails.confirmOrder.orderSummary")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t("dashboard.basketDetails.confirmOrder.basketName")}</span>
                <span className="font-medium">{basket.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t("dashboard.basketDetails.confirmOrder.totalItems")}</span>
                <span className="font-medium">{basket.totalItems}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">{t("dashboard.basketDetails.confirmOrder.frequency")}</span>
                <Badge variant="secondary">{t(`dashboard.basketDetails.frequencyOptions.${basket.frequency}`)}</Badge>
              </div>
              <div className="flex items-center justify-between border-t pt-4">
                <span className="text-lg font-semibold text-gray-900">{t("dashboard.basketDetails.confirmOrder.totalPrice")}</span>
                <span className="text-2xl font-bold text-emerald-600">€{basket.totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Delivery Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <MapPin className="h-5 w-5" />
                {t("dashboard.basketDetails.confirmOrder.deliveryInfo")}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* User Address */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t("dashboard.basketDetails.confirmOrder.deliveryAddress")}</h4>
                {user?.street && user?.city && user?.postalCode && user?.country ? (
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm text-gray-700">{user.street}</p>
                    <p className="text-sm text-gray-700">{user.city}, {user.postalCode}</p>
                    <p className="text-sm text-gray-700">{user.country}</p>
                  </div>
                ) : (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
                    <p className="text-sm text-amber-800">{t("dashboard.basketDetails.confirmOrder.noAddress")}</p>
                  </div>
                )}
              </div>

              {/* Delivery Date */}
              <div>
                <h4 className="font-medium text-gray-900 mb-2">{t("dashboard.basketDetails.confirmOrder.deliveryDate")}</h4>
                <div className="flex items-center gap-2 bg-emerald-50 p-3 rounded-lg">
                  <Calendar className="h-4 w-4 text-emerald-600" />
                  <span className="text-sm font-medium text-emerald-800">
                    {format(getNextDeliveryDate(), "EEEE, MMMM dd, yyyy")}
                  </span>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {t("dashboard.basketDetails.confirmOrder.deliveryTime")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={onClose}
          >
            {t("dashboard.basketDetails.confirmOrder.cancel")}
          </Button>
          <Button
            onClick={handleConfirmOrder}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            <ShoppingBasket className="h-4 w-4 mr-2" />
            {t("dashboard.basketDetails.confirmOrder.confirm")}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}