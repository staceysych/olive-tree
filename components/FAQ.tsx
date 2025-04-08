"use client"

import { Leaf, Truck, CreditCard, MessageSquare, MapPin, Pencil } from "lucide-react"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"

export function FaqSection() {
  return (
    <div className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-12">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
            Got Questions?
          </div>
          <div className="space-y-2">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800 flex items-center justify-center gap-2">
              <Leaf className="h-8 w-8 text-emerald-600" />
              <span>Olive Tree — FAQ</span>
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Find answers to commonly asked questions about our service
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-3xl">
          <Accordion type="single" collapsible className="w-full space-y-4">
            <AccordionItem value="item-1" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <MapPin className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Which cities do you deliver to?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground mb-4">For now, we deliver to:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      Paphos
                    </Badge>
                    <span className="text-sm text-muted-foreground">and surrounding towns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      Limassol
                    </Badge>
                    <span className="text-sm text-muted-foreground">and surrounding towns</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <Pencil className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>Can I customise my basket?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  Yes — you can specify in the notes section what you want to include or exclude, and we will confirm
                  your total price before delivery.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <Truck className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>How do I place an order?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  Simply fill out the order form on our website. Choose your basket, delivery area, and we'll contact
                  you with the final confirmation.
                </p>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <CreditCard className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>How do I pay?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground mb-4">We currently accept:</p>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      Cash on delivery
                    </Badge>
                    <span className="text-sm text-muted-foreground">(for MVP)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className="bg-emerald-50">
                      Online payments
                    </Badge>
                    <span className="text-sm text-muted-foreground">(coming soon)</span>
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5" className="border rounded-lg px-6">
              <AccordionTrigger className="text-lg font-medium">
                <div className="flex items-center gap-3 text-left">
                  <MessageSquare className="h-5 w-5 text-emerald-600 shrink-0" />
                  <span>How do I leave feedback or suggestions?</span>
                </div>
              </AccordionTrigger>
              <AccordionContent className="pl-10">
                <p className="text-muted-foreground">
                  We love hearing from you! After your order, we'll send a short feedback form. You can also message us
                  directly through the website or email.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </div>
  )
}
