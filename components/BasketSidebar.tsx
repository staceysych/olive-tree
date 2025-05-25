import { Button } from "@/components/ui/button"
import { Trash2 } from "lucide-react"
import type { BasketItem } from "@/app/[locale]/register/create-basket/page"
import { useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { CheckoutModal } from './CheckoutModal'

interface BasketSidebarProps {
  basketItems: BasketItem[]
  totalPrice: number
  totalItems: number
  onUpdateQuantity: (itemId: string, quantity: number) => void
  onRemoveItem: (itemId: string) => void
}

export function BasketSidebar({
  basketItems,
  totalPrice,
  totalItems,
  onUpdateQuantity,
  onRemoveItem,
}: BasketSidebarProps) {
  const t = useTranslations('basketSidebar')
  const router = useRouter()
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState(false)

  const handleOrderNow = () => {
    router.push('/register/confirm-order')
  }

  const handleCreateAccount = () => {
    router.push('/register')
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 min-h-[300px] flex flex-col">
      <h2 className="text-lg font-semibold text-emerald-800 mb-4">{t('title')}</h2>
      <div className="flex-1 overflow-y-auto">
        {basketItems.length === 0 ? (
          <p className="text-gray-500 text-center py-8">{t('empty')}</p>
        ) : (
          <div className="space-y-4">
            {basketItems.map((item) => (
              <div key={item.id} className="flex items-start gap-3">
                <div className="w-16 h-16 bg-gray-100 rounded-md overflow-hidden flex-shrink-0">
                  <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-emerald-800 truncate">{item.name}</h3>
                  <p className="text-sm text-gray-600">
                    €{item.price.toFixed(2)}/{item.unit}
                  </p>
                  <div className="flex items-center gap-2 mt-1">
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    >
                      -
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    >
                      +
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0 ml-auto text-gray-400 hover:text-red-500"
                      onClick={() => onRemoveItem(item.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="border-t pt-4 mt-4">
        <div className="flex justify-between mb-2">
          <span className="text-gray-600">{t('totalItems')}</span>
          <span className="font-medium">{totalItems}</span>
        </div>
        <div className="flex justify-between mb-4">
          <span className="text-gray-600">{t('totalPrice')}</span>
          <span className="font-medium text-emerald-600">€{totalPrice.toFixed(2)}</span>
        </div>
        <p className="text-sm text-gray-500 mb-4 text-center">
          {t('minimumOrder')} €40
        </p>
        <Button 
          className="w-full bg-emerald-600 hover:bg-emerald-700" 
          disabled={basketItems.length === 0 || totalPrice < 40}
          onClick={() => setIsCheckoutModalOpen(true)}
        >
          {t('proceedToCheckout')}
        </Button>
      </div>

      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        basketItems={basketItems}
        totalPrice={totalPrice}
        totalItems={totalItems}
        onOrderNow={handleOrderNow}
        onCreateAccount={handleCreateAccount}
      />
    </div>
  )
} 