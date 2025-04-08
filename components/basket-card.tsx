"use client"

import { useState } from "react"
import Image from "next/image"
import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { PromoModal } from "@/components/promo-modal"

interface BasketCardProps {
  title: string
  description: string
  price: string
  items: string[]
  imageSrc: string
}

export function BasketCard({ title, description, price, items, imageSrc }: BasketCardProps) {
  const [isPromoModalOpen, setIsPromoModalOpen] = useState(false)

  const handlePreOrder = () => {
    setIsPromoModalOpen(true)
  }

  return (
    <>
      <Card className="flex flex-col overflow-hidden border-2 transition-all hover:border-emerald-200 hover:shadow-md">
        <div className="relative h-[200px] w-full">
          <Image src={imageSrc || "/placeholder.svg"} alt={title} fill className="object-cover" />
        </div>
        <CardHeader className="pb-2">
          <CardTitle className="text-xl text-emerald-700">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="text-2xl font-bold mb-4">
            {price}
            <span className="text-sm text-muted-foreground"> / week</span>
          </div>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <Check className="h-4 w-4 text-emerald-500" />
                <span className="text-sm">{item}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handlePreOrder}>
            Pre-order Now
          </Button>
        </CardFooter>
      </Card>

      <PromoModal
        isOpen={isPromoModalOpen}
        onClose={() => setIsPromoModalOpen(false)}
        basketType={title.split(" ")[0]}
      />
    </>
  )
}

