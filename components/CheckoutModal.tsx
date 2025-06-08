"use client"

import { useState } from "react"
import { ShoppingCart, User, UserPlus, ArrowRight, Save, Clock, CloudCog } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import type { BasketItem } from "@/app/[locale]/register/create-basket/page"
import { OrderForm } from "@/components/OrderForm"
import { AccountCreationForm } from "@/components/AccountCreationForm"

type BasketOrderItem = {
  unit: string
  quantity: number
  price: number
}

type BasketOrderCategory = {
  [itemName: string]: BasketOrderItem
}

type BasketOrderList = {
  categories: {
    [categoryName: string]: BasketOrderCategory
  }
  totalPrice: number
  totalItems: number
}

const transformBasketToOrderList = (items: BasketItem[], totalPrice: number, totalItems: number): BasketOrderList => {
  const categories: { [key: string]: BasketOrderCategory } = {}
  
  items.forEach(item => {
    if (!categories[item.category]) {
      categories[item.category] = {}
    }
    
    categories[item.category][item.id] = {
      unit: item.unit,
      quantity: item.quantity,
      price: item.price
    }
  })

  return {
    categories,
    totalPrice,
    totalItems
  }
}

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  basketItems: BasketItem[]
  totalPrice: number
  totalItems: number
  onCreateAccount: () => void
}

export function CheckoutModal({
  isOpen,
  onClose,
  basketItems,
  totalPrice,
  totalItems,
  onCreateAccount,
}: CheckoutModalProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(null)
  const [showOrderForm, setShowOrderForm] = useState(false)
  const [showAccountForm, setShowAccountForm] = useState(false)
  const t = useTranslations("checkoutModal")
  const router = useRouter();


  const orderList = transformBasketToOrderList(basketItems, totalPrice, totalItems);


  const handleOrderNow = () => {
    setSelectedOption("order")
    setShowOrderForm(true)
  }

  const handleCreateAccount = () => {
    setSelectedOption("account")
    setShowAccountForm(true)
    console.log(orderList)
  }

  const handleAccountCreated = () => {
    setShowAccountForm(false)
    onClose()
    onCreateAccount()
  }

  const handleClose = () => {
    setShowOrderForm(false)
    setShowAccountForm(false)
    onClose()
  }


  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogContent className="sm:max-w-4xl">
          {showOrderForm ? (
            <OrderForm customBasketItems={basketItems} />
          ) :
          showAccountForm ? (
            <AccountCreationForm 
              onCancel={() => setShowAccountForm(false)} 
              orderList={orderList}
            />
          ) :
           (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-emerald-700">
                  <ShoppingCart className="h-5 w-5" />
                  <span>{t("title")}</span>
                </DialogTitle>
                <DialogDescription>{t("description")}</DialogDescription>
              </DialogHeader>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Basket Summary */}
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">{t("orderSummary.title")}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">{t("orderSummary.items")}</span>
                        <Badge variant="outline">{totalItems} items</Badge>
                      </div>

                      <div className="space-y-2 max-h-32 overflow-y-auto">
                        {basketItems.slice(0, 3).map((item) => (
                          <div key={item.id} className="flex justify-between text-sm">
                            <span className="truncate">{item.name}</span>
                            <span className="text-muted-foreground">×{item.quantity}</span>
                          </div>
                        ))}
                        {basketItems.length > 3 && (
                          <div className="text-xs text-muted-foreground text-center">
                            {t("orderSummary.moreItems", { count: basketItems.length - 3 })}
                          </div>
                        )}
                      </div>

                      <Separator />

                      <div className="flex justify-between items-center font-bold">
                        <span>Total:</span>
                        <span className="text-emerald-700">€{totalPrice.toFixed(2)}</span>
                      </div>
                    </CardContent>
                  </Card>
                </div>

                {/* Checkout Options */}
                <div className="lg:col-span-2 space-y-4">
                  {/* Create Account Option */}
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-lg border-2 ${
                      selectedOption === "account"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-emerald-300 hover:border-emerald-400 bg-gradient-to-br from-white to-emerald-50/50"
                    }`}
                    onClick={handleCreateAccount}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="h-12 w-12 rounded-full bg-emerald-100 flex items-center justify-center ring-4 ring-emerald-50">
                          <UserPlus className="h-6 w-6 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-xl">{t("createAccount.title")}</span>
                          <Badge className="ml-2 bg-emerald-100 text-emerald-700 pointer-events-none font-medium">{t("createAccount.recommended")}</Badge>
                        </div>
                      </CardTitle>
                      <CardDescription className="text-base">{t("createAccount.description")}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <Save className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium">{t("createAccount.benefits.saveBasket")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <User className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium">{t("createAccount.benefits.trackOrders")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium">{t("createAccount.benefits.fasterCheckout")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-5 w-5 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm font-medium">{t("createAccount.benefits.exclusiveOffers")}</span>
                        </div>
                      </div>

                      <Button
                        className="w-full mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-medium"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleCreateAccount()
                        }}
                      >
                        {t("createAccount.button")}
                        <UserPlus className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>

                  {/* Order Now Option */}
                  <Card
                    className={`cursor-pointer transition-all duration-300 hover:shadow-md border-2 ${
                      selectedOption === "order"
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-border hover:border-emerald-200"
                    }`}
                    onClick={handleOrderNow}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                          <ShoppingCart className="h-5 w-5 text-emerald-600" />
                        </div>
                        <div>
                          <span className="text-lg">{t("orderNow.title")}</span>
                          <Badge className="ml-2 bg-orange-100 text-orange-700 pointer-events-none">{t("orderNow.quickAndEasy")}</Badge>
                        </div>
                      </CardTitle>
                      <CardDescription>
                        {t("orderNow.description")}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm">{t("orderNow.benefits.proceedToForm")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm">{t("orderNow.benefits.noAccount")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <ArrowRight className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                          <span className="text-sm">{t("orderNow.benefits.fastestCheckout")}</span>
                        </div>
                        <div className="flex items-start gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
                          <span className="text-sm text-muted-foreground">{t("orderNow.benefits.basketNotSaved")}</span>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full mt-4 border-emerald-200 text-emerald-700 hover:bg-emerald-50 hover:text-emerald-800"
                        onClick={(e) => {
                          e.stopPropagation()
                          handleOrderNow()
                        }}
                      >
                        {t("orderNow.button")}
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
} 