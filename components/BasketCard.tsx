"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useBasket } from "@/context/BasketContext"
import { BasketType } from "@/types/basket"
import { useTranslations } from "next-intl"

interface BasketCardProps {
  title: string
  description: string
  price: string
  items: string[]
  imageSrc?: string
  icon?: React.ReactNode
  showWeekText?: boolean
  basketType: BasketType
  orderText?: string
  onClick?: () => void
}

export function BasketCard({ title, description, price, items, imageSrc, icon, showWeekText = true, basketType, orderText, onClick }: BasketCardProps) {
  const { setSelectedBasketType } = useBasket()
  const t = useTranslations()

  const handlePreOrder = () => {
    const orderForm = document.getElementById("order")
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth" })
      setSelectedBasketType(basketType)
    }
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden border-2 transition-all hover:border-emerald-200 hover:shadow-md">
        <div className="relative h-[200px] w-full flex items-center justify-center bg-emerald-50">
          {icon ? (
            <div className="flex items-center justify-center w-full h-full">
              {icon}
            </div>
          ) : (
            <Image
              src={imageSrc!}
              alt={title}
              fill
              className="object-cover rounded-t-lg"
              quality={75}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 33vw, 25vw"
            />
          )}
        </div>
        <CardHeader className="pb-2 h-[180px] flex flex-col">
          <CardTitle className="text-xl text-emerald-700 flex items-center gap-2">
            {title}
          </CardTitle>
          <CardDescription className="flex-1">{description}</CardDescription>
          <div className="text-2xl font-bold">
            {price}
            {showWeekText && <span className="text-sm text-muted-foreground"> / {t('common.week')}</span>}
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check size={16} className="text-emerald-500 min-w-[16px] min-h-[16px] flex-shrink-0" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={onClick || handlePreOrder}>
            {orderText || t('baskets.order')}
          </Button>
        </CardFooter>
      </Card>
    </>
  )
}

