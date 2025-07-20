"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { ShoppingBasket, Plus, Calendar, Package, Euro } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useRouter } from "next/navigation"
import { useGetUserBaskets } from "@/hooks/useGetUserBaskets"
import { Separator } from "@/components/ui/separator"

export default function UserBasketCard() {
  const t = useTranslations()
  const { data: session } = useSession()
  const router = useRouter()
  const { baskets, isLoading, error } = useGetUserBaskets(session?.user?.id || "")

  const handleCreateBasket = () => {
    router.push('/register/create-basket')
  }

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="text-sm text-gray-500 mt-2">Loading baskets...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500 text-sm">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-emerald-800">
            {t("dashboard.baskets.title")}
          </h3>
          <p className="text-sm text-gray-600">
            {t("dashboard.baskets.description")}
          </p>
        </div>
        <Button
          onClick={handleCreateBasket}
          className="bg-emerald-600 hover:bg-emerald-700 text-white"
        >
          <Plus className="h-4 w-4 mr-2" />
          {t("dashboard.baskets.createButton")}
        </Button>
      </div>

      {baskets.length === 0 ? (
        <Card className="border-dashed border-2 border-gray-200 bg-gray-50">
          <CardContent className="text-center py-12">
            <ShoppingBasket className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium text-gray-900 mb-2">
              {t("dashboard.baskets.noBaskets.title")}
            </h4>
            <p className="text-gray-500 mb-4">
              {t("dashboard.baskets.noBaskets.description")}
            </p>
            <Button
              onClick={handleCreateBasket}
              variant="outline"
              className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            >
              <Plus className="h-4 w-4 mr-2" />
              {t("dashboard.baskets.createButton")}
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {baskets.map((basket) => (
            <Card 
              key={basket.id} 
              className="hover:shadow-md transition-shadow cursor-pointer"
              onClick={() => router.push(`/dashboard/basket/${basket.id}`)}
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-lg text-emerald-800">
                      {basket.name}
                    </CardTitle>
                    <CardDescription className="text-xs text-gray-600">
                      {t("dashboard.baskets.createdAt", { 
                        date: format(new Date(basket.createdAt), "MMM dd, yyyy") 
                      })}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Package className="h-4 w-4" />
                    <span>{t("dashboard.basketDetails.totalItems")}</span>
                  </div>
                  <span className="font-medium">{basket.totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Euro className="h-4 w-4" />
                    <span>{t("dashboard.basketDetails.totalPrice")}</span>
                  </div>
                  <span className="font-medium text-emerald-700">
                    €{basket.totalPrice.toFixed(2)}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="h-4 w-4" />
                    <span>{t("dashboard.basketDetails.frequency")}</span>
                  </div>
                  <span className="font-medium">{t(`dashboard.basketDetails.frequencyOptions.${basket.frequency}`)}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
} 