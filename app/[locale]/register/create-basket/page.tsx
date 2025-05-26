'use client'

import { useState } from "react"
import {  Sparkles } from "lucide-react"
import { useTranslations } from "next-intl"

import { CategorySidebar } from "@/components/CategorySidebar"
import { ItemsGrid } from "@/components/ItemsGrid"
import { BasketSidebar } from "@/components/BasketSidebar"

interface Category {
  title: string
  items: MarketplaceItem[]
}

interface Categories {
  [key: string]: Category
}

interface MarketplaceItem {
  name: string
  description: string
  price: number
  unit: string
  image: string
  key: string
}

export interface BasketItem {
  id: string
  name: string
  price: number
  unit: string
  quantity: number
  image: string
  category: string
  key: string
}

export interface MarketItem {
  id: string
  name: string
  description: string
  price: number
  unit: string
  image: string
  category: string
  inSeason: boolean;
  key: string;
}

export default function CreateBasketPage() {
  const t = useTranslations("marketplace")
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [basketItems, setBasketItems] = useState<BasketItem[]>([])

  // Get categories from translations
  const categoriesData = t.raw("categories") as Categories

  // Transform categories data into the format needed for the sidebar
  const categories = [
    { id: "all", name: "All Items", emoji: "🛒", count: Object.values(categoriesData).reduce((acc, cat) => acc + cat.items.length, 0) },
    ...Object.entries(categoriesData).map(([id, category]) => ({
      id,
      name: category.title,
      emoji: id === "vegetables" ? "🍅" : id === "mushrooms" ? "🍄" : id === "nuts" ? "🌰" : id === "fruits" ? "🍓" : id === "herbs" ? "🌿" : "📦",
      count: category.items.length,
    })),
  ]

  // Transform items into MarketItem format
  const marketItems: MarketItem[] = Object.entries(categoriesData).flatMap(([category, { items }]) =>
    items.map((item) => ({
      id: item.name.toLowerCase().replace(/\s+/g, '-'),
      name: item.name,
      description: item.description,
      price: item.price,
      unit: item.unit,
      image: item.image || "/placeholder.svg?height=200&width=200",
      category,
      inSeason: true,
      key: item.key,
    }))
  )

  const filteredItems =
    selectedCategory === "all" ? marketItems : marketItems.filter((item) => item.category === selectedCategory)

  const addToBasket = (item: MarketItem, quantity = 1) => {
    setBasketItems((prev) => {
      const existingItem = prev.find((basketItem) => basketItem.id === item.id)

      if (existingItem) {
        return prev.map((basketItem) =>
          basketItem.id === item.id ? { ...basketItem, quantity: basketItem.quantity + quantity } : basketItem,
        )
      } else {
        return [
          ...prev,
          {
            id: item.id,
            name: item.name,
            price: item.price,
            unit: item.unit,
            quantity: quantity,
            image: item.image,
            category: item.category,
            key: item.key,
          },
        ]
      }
    })
  }

  const removeFromBasket = (itemId: string, quantity = 1) => {
    setBasketItems((prev) => {
      return prev
        .map((basketItem) => {
          if (basketItem.id === itemId) {
            const newQuantity = basketItem.quantity - quantity
            return newQuantity <= 0 ? null : { ...basketItem, quantity: newQuantity }
          }
          return basketItem
        })
        .filter(Boolean) as BasketItem[]
    })
  }

  const updateQuantity = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setBasketItems((prev) => prev.filter((item) => item.id !== itemId))
    } else {
      setBasketItems((prev) =>
        prev.map((basketItem) => (basketItem.id === itemId ? { ...basketItem, quantity: newQuantity } : basketItem)),
      )
    }
  }

  const getItemQuantityInBasket = (itemId: string) => {
    const basketItem = basketItems.find((item) => item.id === itemId)
    return basketItem ? basketItem.quantity : 0
  }

  const totalPrice = basketItems.reduce((total, item) => total + item.price * item.quantity, 0)
  const totalItems = basketItems.reduce((total, item) => total + item.quantity, 0)

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6">
          <div className="mb-8 text-center">
            <div className="flex flex-col items-center gap-2">
              <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-4 py-1 rounded-full mb-2">{t('title')}</span>
              <div className="flex items-center justify-center gap-2">
                <Sparkles className="w-8 h-8 text-green-800" />
                <h1 className="text-4xl md:text-5xl font-extrabold text-green-800 mb-0">{t('createBasket')}</h1>
              </div>
              <p className="text-gray-500 text-lg mt-2">{t('description')}</p>
            </div>
          </div>
          <div className="grid grid-cols-12 gap-6">
            {/* Left Sidebar - Categories */}
            <div className="col-span-12 lg:col-span-2">
              <CategorySidebar
                categories={categories}
                selectedCategory={selectedCategory}
                onCategorySelect={setSelectedCategory}
              />
            </div>

            {/* Center - Items Grid */}
            <div className="col-span-12 lg:col-span-7">
              <ItemsGrid
                items={filteredItems}
                onAddToBasket={addToBasket}
                onRemoveFromBasket={removeFromBasket}
                getItemQuantity={getItemQuantityInBasket}
              />
            </div>

            {/* Right Sidebar - Basket */}
            <div className="col-span-12 lg:col-span-3">
              <BasketSidebar
                basketItems={basketItems}
                totalPrice={totalPrice}
                totalItems={totalItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={(itemId) => updateQuantity(itemId, 0)}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 