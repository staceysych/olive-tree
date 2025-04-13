"use client"

import { Leaf, Truck, CreditCard, MessageSquare, MapPin, Pencil } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { useTranslations } from "next-intl"

export function FaqSection() {
  const t = useTranslations("faq")

  return (
    <div className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            {t("gotQuestions")}
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800 flex items-center justify-center gap-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span>{t("title")}</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              {t("subtitle")}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{t("items.deliveryCities.question")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground mb-4">{t("items.deliveryCities.answer")}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      {t("items.deliveryCities.cities.paphos")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      {t("items.deliveryCities.cities.limassol")}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <Pencil className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{t("items.customization.question")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  {t("items.customization.answer")}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <Truck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{t("items.ordering.question")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  {t("items.ordering.answer")}
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <CreditCard className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{t("items.payment.question")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground mb-4">{t("items.payment.answer")}</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      {t("items.payment.methods.cash")}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      {t("items.payment.methods.online")}
                    </Badge>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <MessageSquare className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>{t("items.feedback.question")}</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  {t("items.feedback.answer")}
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
