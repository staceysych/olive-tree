import { Button } from "@/components/ui/button"
import { Plus, Minus } from "lucide-react"
import type { MarketItem } from "@/app/[locale]/register/create-basket/page"

interface ItemsGridProps {
  items: MarketItem[]
  onAddToBasket: (item: MarketItem, quantity?: number) => void
  onRemoveFromBasket: (itemId: string, quantity?: number) => void
  getItemQuantity: (itemId: string) => number
}

export function ItemsGrid({ items, onAddToBasket, onRemoveFromBasket, getItemQuantity }: ItemsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {items.map((item) => {
        const quantity = getItemQuantity(item.id)
        return (
          <div
            key={item.id}
            className={`flex flex-col justify-between h-full bg-white rounded-lg shadow-sm border border-gray-100 p-4 hover:shadow-md transition-all ${
              quantity > 0 ? 'bg-emerald-50/50 border-emerald-100' : ''
            }`}
          >
            <div>
              <div className="aspect-square relative mb-4 bg-gray-100 rounded-md overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-semibold text-emerald-800">{item.name}</h3>
              <p className="text-sm text-gray-600 mb-2">{item.description}</p>
            </div>
            <div className="mt-auto flex items-center justify-between pt-2">
              <div className="text-emerald-600 font-medium">
                €{item.price.toFixed(2)}/{item.unit}
              </div>
              <div className="flex items-center gap-2">
                {quantity > 0 && (
                  <>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8"
                      onClick={() => onRemoveFromBasket(item.id)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{quantity}</span>
                  </>
                )}
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => onAddToBasket(item)}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
} 