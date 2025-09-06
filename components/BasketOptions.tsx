'use client'

import { Button } from "@/components/ui/button"
import { BasketCard } from "@/components/BasketCard"
import { BasketType } from "@/types/basket"
import { List, ShoppingBasket } from "lucide-react"
import { useTranslations } from 'next-intl'
import { useState } from "react"
import { AvailableItemsModal } from "@/components/AvailableItemsModal"
import { useRouter } from 'next/navigation'

export function BasketOptions() {
  const t = useTranslations()
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false)
  const router = useRouter()

  const handleCustomBasketClick = () => {
    router.push('/register/create-basket')
  }

  return (
    <section id="baskets" className="w-full py-12 md:py-24 bg-emerald-50">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
              {t('baskets.title')}
            </h2>
            <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t('baskets.subtitle')}
            </p>
          </div>
          <Button
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all hover:shadow-md"
            onClick={() => setIsItemsModalOpen(true)}
          >
            <List className="h-4 w-4" />
            <span>{t('baskets.seeAllButton')}</span>
          </Button>
        </div>
        <div className="mx-auto grid max-w-7xl gap-4 py-12 md:grid-cols-2 md:gap-8 lg:grid-cols-4 lg:gap-12">
          <BasketCard
            title={t('baskets.trial.title')}
            description={t('baskets.trial.description')}
            price={t('baskets.trial.price')}
            items={t.raw('baskets.trial.items')}
            imageSrc="/trialBasket.jpg"
            showWeekText={false}
            basketType={BasketType.TRIAL}
          />
          <BasketCard
            title={t('baskets.standard.title')}
            description={t('baskets.standard.description')}
            price={t('baskets.standard.price')}
            items={t.raw('baskets.standard.items')}
            imageSrc="/standardBasket.jpg"
            basketType={BasketType.STANDARD}
          />
          <BasketCard
            title={t('baskets.family.title')}
            description={t('baskets.family.description')}
            price={t('baskets.family.price')}
            items={t.raw('baskets.family.items')}
            imageSrc="/familyBasket.jpg"
            basketType={BasketType.FAMILY}
          />
          <BasketCard
            title={t('baskets.custom.title')}
            description={t('baskets.custom.description')}
            price={t('baskets.custom.price')}
            showWeekText={false}
            items={t.raw('baskets.custom.items')}
            icon={<ShoppingBasket className="w-12 h-12 text-emerald-600" />}
            basketType={BasketType.CUSTOM}
            orderText={t('baskets.custom.orderText')}
            onClick={handleCustomBasketClick}
          />
        </div>
        <AvailableItemsModal isOpen={isItemsModalOpen} onClose={() => setIsItemsModalOpen(false)} />
      </div>
    </section>
  )
} 