'use client'

import { Button } from "@/components/ui/button"
import { BasketCard } from "@/components/BasketCard"
import { BasketType } from "@/types/basket"
import { List } from "lucide-react"
import { useTranslations } from 'next-intl'
import { useState } from "react"
import { AvailableItemsModal } from "@/components/AvailableItemsModal"

export function BasketOptions() {
  const t = useTranslations()
  const [isItemsModalOpen, setIsItemsModalOpen] = useState(false)

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
        <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 md:gap-12">
          <BasketCard
            title={t('baskets.trial.title')}
            description={t('baskets.trial.description')}
            price={t('baskets.trial.price')}
            items={t.raw('baskets.trial.items')}
            imageSrc="/trialBasket.jpg"
            showWeekText={false}
            basketType={BasketType.TRIAL}
            viewText={t('baskets.trial.viewText')}
          />
          <BasketCard
            title={t('baskets.standard.title')}
            description={t('baskets.standard.description')}
            price={t('baskets.standard.price')}
            items={t.raw('baskets.standard.items')}
            imageSrc="/standardBasket.jpg"
            basketType={BasketType.STANDARD}
            viewText={t('baskets.standard.viewText')}
          />
          <BasketCard
            title={t('baskets.family.title')}
            description={t('baskets.family.description')}
            price={t('baskets.family.price')}
            items={t.raw('baskets.family.items')}
            imageSrc="/familyBasket.jpg"
            basketType={BasketType.FAMILY}
            viewText={t('baskets.family.viewText')}
          />
        </div>
        <AvailableItemsModal isOpen={isItemsModalOpen} onClose={() => setIsItemsModalOpen(false)} />
      </div>
    </section>
  )
} 