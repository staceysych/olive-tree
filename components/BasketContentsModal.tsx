"use client"

import { useState } from "react"
import { ShoppingBasket, Leaf, Apple, Carrot } from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

interface BasketContentsModalProps {
  isOpen: boolean
  onClose: () => void
  basketType: string
}

// Sample data for basket contents
const basketContents = {
  "Trial Basket": {
    fruits: ["Oranges", "Apples", "Strawberries", "Lemons"],
    vegetables: ["Tomatoes", "Cucumbers", "Bell Peppers", "Zucchini", "Eggplant"],
    greens: ["Lettuce", "Spinach", "Arugula", "Fresh Herbs (Mint, Basil, Parsley)"],
  },
  "Standard Basket": {
    fruits: ["Oranges", "Apples", "Strawberries", "Lemons", "Grapes", "Seasonal Berries"],
    vegetables: ["Tomatoes", "Cucumbers", "Bell Peppers", "Zucchini", "Eggplant", "Carrots", "Onions"],
    greens: ["Lettuce", "Spinach", "Arugula", "Kale", "Fresh Herbs (Mint, Basil, Parsley, Dill)"],
  },
  "Family Basket": {
    fruits: ["Oranges", "Apples", "Strawberries", "Lemons", "Grapes", "Seasonal Berries", "Watermelon", "Peaches"],
    vegetables: [
      "Tomatoes",
      "Cucumbers",
      "Bell Peppers",
      "Zucchini",
      "Eggplant",
      "Carrots",
      "Onions",
      "Potatoes",
      "Broccoli",
      "Cauliflower",
    ],
    greens: [
      "Lettuce",
      "Spinach",
      "Arugula",
      "Kale",
      "Fresh Herbs (Mint, Basil, Parsley, Dill, Oregano)",
      "Microgreens",
    ],
  },
}

export function BasketContentsModal({ isOpen, onClose, basketType }: BasketContentsModalProps) {
  const [activeTab, setActiveTab] = useState<string>("fruits")

  // Default to Trial Basket if the basket type is not found
  const contents = basketContents[basketType as keyof typeof basketContents] || basketContents["Trial Basket"]

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <ShoppingBasket className="h-5 w-5" />
            <span>What's in the {basketType}</span>
          </DialogTitle>
          <DialogDescription>
            Here's what you can expect in your fresh farm basket this week. Contents may vary slightly based on seasonal
            availability.
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          <Tabs defaultValue="fruits" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="fruits" className="flex items-center gap-1">
                <Apple className="h-4 w-4" />
                <span>Fruits</span>
              </TabsTrigger>
              <TabsTrigger value="vegetables" className="flex items-center gap-1">
                <Carrot className="h-4 w-4" />
                <span>Vegetables</span>
              </TabsTrigger>
              <TabsTrigger value="greens" className="flex items-center gap-1">
                <Leaf className="h-4 w-4" />
                <span>Greens & Herbs</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="fruits" className="space-y-4">
              <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                <Image src="/placeholder.svg?height=200&width=600" alt="Fresh fruits" fill className="object-cover" />
              </div>
              <div className="flex flex-wrap gap-2">
                {contents.fruits.map((fruit, index) => (
                  <Badge key={index} variant="outline" className="bg-emerald-50">
                    {fruit}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                All fruits are harvested at peak ripeness for maximum flavor and nutrition.
              </p>
            </TabsContent>

            <TabsContent value="vegetables" className="space-y-4">
              <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=600"
                  alt="Fresh vegetables"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {contents.vegetables.map((vegetable, index) => (
                  <Badge key={index} variant="outline" className="bg-emerald-50">
                    {vegetable}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Our vegetables are grown using sustainable farming practices and harvested within 24-48 hours of
                delivery.
              </p>
            </TabsContent>

            <TabsContent value="greens" className="space-y-4">
              <div className="relative h-[200px] w-full rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=200&width=600"
                  alt="Fresh greens and herbs"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex flex-wrap gap-2">
                {contents.greens.map((green, index) => (
                  <Badge key={index} variant="outline" className="bg-emerald-50">
                    {green}
                  </Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                Our greens and herbs are carefully selected for freshness and flavor, perfect for salads and cooking.
              </p>
            </TabsContent>
          </Tabs>
        </div>

        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" onClick={onClose}>
            Pre-order This Basket
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
