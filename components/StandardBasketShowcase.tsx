"use client"

import Image from "next/image"
import { useTranslations } from "next-intl"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useBasket } from "@/context/BasketContext"
import { BasketType } from "@/types/basket"

export function StandardBasketShowcase() {
  const t = useTranslations("standardBasketShowcase")

  const { setSelectedBasketType } = useBasket()



  const handleOrder = () => {
    const orderForm = document.getElementById("order")
    if (orderForm) {
      orderForm.scrollIntoView({ behavior: "smooth" })

      setSelectedBasketType(BasketType.STANDARD)
    }
  }

  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Real Example</div>
          <div className="space-y-2 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
              {t("title")}
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("description")}
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Polaroid-style image on the left */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {/* Authentic Polaroid frame */}
            <div className="bg-white rounded-sm shadow-md transform rotate-[-2deg] transition-transform hover:rotate-0 duration-300 relative">
              {/* This creates the Polaroid proportions with padding */}
              <div className="p-3 pb-16">
                {/* Image container with fixed dimensions */}
                <div className="w-[320px] h-[400px] relative bg-gray-50">
                  <Image
                    src="/basketPhoto.jpeg"
                    alt="Standard Basket with fresh produce"
                    width={320}
                    height={400}
                    priority
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content on the right */}
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-700">{t("whatsInSet")}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍊</span>
                    <div>
                      <p className="font-medium">{t("categories.citrus.title")}</p>
                      <p className="text-muted-foreground">{t("categories.citrus.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍑</span>
                    <div>
                      <p className="font-medium">{t("categories.juicy.title")}</p>
                      <p className="text-muted-foreground">{t("categories.juicy.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍅</span>
                    <div>
                      <p className="font-medium">{t("categories.vegetables.title")}</p>
                      <p className="text-muted-foreground">{t("categories.vegetables.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥬</span>
                    <div>
                      <p className="font-medium">{t("categories.greens.title")}</p>
                      <p className="text-muted-foreground">{t("categories.greens.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥑</span>
                    <div>
                      <p className="font-medium">{t("categories.extras.title")}</p>
                      <p className="text-muted-foreground">{t("categories.extras.description")}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥬</span>
                    <div>
                      <p className="font-medium">{t("categories.healthy.title")}</p>
                      <p className="text-muted-foreground">{t("categories.healthy.description")}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    {t("variationNote")}
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700" onClick={handleOrder}>{t("orderButton")}</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 