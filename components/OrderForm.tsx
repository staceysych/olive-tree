"use client"

import { useBasket } from "@/context/BasketContext"
import { BasketType } from "@/types/basket"
import { useTranslations } from "next-intl"
import { Settings } from "lucide-react"

import { useState, useEffect, useRef } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { sendOrderEmail } from "@/utils/send-email"
import { formatDeliveryPreference } from "@/utils/formatDeliveryPreference"
import { OrderConfirmationCard } from "@/components/OrderConfirmationCard"
import { BasketCustomisationModal } from "@/components/BasketCustomisationModal"
import { getInitialItems } from "@/utils/getInitialBasketItems"
export function OrderForm() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedBasketType, setSelectedBasketType } = useBasket()
  const formRef = useRef<HTMLFormElement>(null!)
  const confirmationCardRef = useRef<HTMLDivElement>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isCustomizationModalOpen, setIsCustomizationModalOpen] = useState(false)
  const [submittedData, setSubmittedData] = useState<{
    basketType: string;
    email: string;
    phone: string;
    deliveryLocation: string;
  } | null>(null)
  const [excludedItems, setExcludedItems] = useState<Record<string, string[]>>({})

  const itemsCategories = t.raw("availableItems.categories")
  const [customizedItems, setCustomizedItems] = useState<Record<string, string[]>>(getInitialItems(itemsCategories));


  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("order.orderForm.name.error"),
    }).trim(),
    email: z.string()
      .transform(val => val.trim())
      .refine(val => val.length > 0, {
        message: t("order.orderForm.email.error"),
      })
      .refine(val => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val), {
        message: t("order.orderForm.email.error"),
      }),
    phone: z.string().min(8, {
      message: t("order.orderForm.phone.error"),
    }).trim(),
    address: z.string().min(2, {
      message: t("order.orderForm.address.error"),
    }).trim(),
    basket: z.nativeEnum(BasketType, {
      required_error: t("order.orderForm.basket.error"),
    }),
    customizedItems: z.record(z.string(), z.array(z.string())).optional(),
    deliveryMorning: z.boolean().default(false).optional(),
    deliveryEvening: z.boolean().default(false).optional(),
    deliveryFriday: z.boolean().default(false).optional(),
    deliverySunday: z.boolean().default(false).optional(),
    deliveryPreference: z.string().optional(),
    promotion: z.string().optional(),
    notes: z.string().optional(),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      customizedItems,
      deliveryMorning: false,
      deliveryEvening: false,
      deliveryFriday: false,
      deliverySunday: false,
      deliveryPreference: "",
      promotion: "free-delivery",
      basket: selectedBasketType || undefined,
      notes: "",
    },
  })

  useEffect(() => {
    if (selectedBasketType) {
      form.setValue("basket", selectedBasketType)
    }
  }, [selectedBasketType, form])

  useEffect(() => {
    const basket = form.watch("basket")
    if (!basket || basket === BasketType.TRIAL) {
      form.setValue("promotion", undefined)
    }
  }, [form.watch("basket")])

  useEffect(() => {
    const morning = form.watch("deliveryMorning")
    const evening = form.watch("deliveryEvening")
    const friday = form.watch("deliveryFriday")
    const sunday = form.watch("deliverySunday")
    const preference = formatDeliveryPreference(morning, evening, friday, sunday)
    form.setValue("deliveryPreference", preference)
  }, [form.watch("deliveryMorning"), form.watch("deliveryEvening"), form.watch("deliveryFriday"), form.watch("deliverySunday")])

  useEffect(() => {
    if (showConfirmation && confirmationCardRef.current) {
      confirmationCardRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [showConfirmation])

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      const trimmedValues = {
        ...values,
        name: values.name.trim(),
        email: values.email.trim(),
        phone: values.phone.trim(),
        address: values.address.trim(),
        notes: values.notes?.trim() || '',
      }

      await sendOrderEmail({
        name: trimmedValues.name,
        email: trimmedValues.email,
        phone: trimmedValues.phone,
        location: trimmedValues.address,
        basket: trimmedValues.basket,
        deliveryPreference: trimmedValues.deliveryPreference || 'Anytime',
        promotion: trimmedValues.promotion || 'N/A',
        notes: trimmedValues.notes,
      })
      
      // Store submitted data for confirmation card
      setSubmittedData({
        basketType: t(`order.orderForm.basket.options.${trimmedValues.basket.toLowerCase()}`),
        email: trimmedValues.email,
        phone: trimmedValues.phone,
        
        deliveryLocation: trimmedValues.address,
      })
      setShowConfirmation(true)
      
      form.reset()
      setSelectedBasketType(null)
    } catch (error) {
      console.error("Failed to send email:", error)
      toast({
        title: t("order.orderForm.error.title"),
        description: t("order.orderForm.error.description"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleSaveCustomization = (selectedItems: Record<string, string[]>) => {
    setCustomizedItems(selectedItems)
    form.setValue("customizedItems", selectedItems)
  }

  const handleExcludedItems = (excluded: Record<string, string[]>) => {
    setExcludedItems(excluded)
  }

  if (showConfirmation && submittedData) {
    return (
      <OrderConfirmationCard
        ref={confirmationCardRef}
        {...submittedData}
        onPlaceAnotherOrder={() => {
          setShowConfirmation(false)
          setSubmittedData(null)
        }}
      />
    )
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form ref={formRef} onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.name.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.orderForm.name.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.email.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.orderForm.email.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.phone.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.orderForm.phone.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.address.label")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("order.orderForm.address.placeholder")} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="basket"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.basket.label")}</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={t("order.orderForm.basket.placeholder")} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={BasketType.TRIAL}>{t("order.orderForm.basket.options.trial")}</SelectItem>
                      <SelectItem value={BasketType.STANDARD}>{t("order.orderForm.basket.options.standard")}</SelectItem>
                      <SelectItem value={BasketType.FAMILY}>{t("order.orderForm.basket.options.family")}</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {form.watch("basket") && (
              <div className="space-y-3 bg-muted/50 p-4 rounded-lg border border-border">
                <div className="font-medium">{t("order.orderForm.customization.title")}</div>
                <p className="text-sm text-muted-foreground">{t("order.orderForm.customization.description")}</p>
                <Button
                  type="button"
                  variant="outline"
                  className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 border-gray-400 transition-colors"
                  onClick={() => setIsCustomizationModalOpen(true)}
                >
                  <Settings className="mr-2 h-4 w-4" />
                  {t("order.orderForm.customization.button")}
                </Button>
                
                {Object.keys(excludedItems).length > 0 && (
                  <div className="mt-2 text-sm text-amber-600">
                    <p className="text-sm text-muted-foreground mb-2 text-amber-600">{t("order.orderForm.customization.excludedItems.description")}</p>
                    <ul className="list-disc pl-4 mt-1">
                      {Object.entries(excludedItems).map(([category, items]) => (
                        <li key={category}>
                          <span className="font-medium">{itemsCategories[category].title}:</span>{" "}
                          {items.join(", ")}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {form.watch("basket") && form.watch("basket") !== BasketType.TRIAL && (
              <FormField
                control={form.control}
                name="promotion"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>{t("order.orderForm.promotion.title")}</FormLabel>
                    <FormControl>
                      <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                        <label htmlFor="r-free-delivery" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="free-delivery" id="r-free-delivery" />
                          <div className="space-y-1 leading-none">
                            <div className="font-medium">
                              {t("order.orderForm.promotion.options.free-delivery.title")}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t("order.orderForm.promotion.options.free-delivery.description")}
                            </p>
                          </div>
                        </label>
                        <label htmlFor="r-free-tomatoes" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="free-tomatoes" id="r-free-tomatoes" />
                          <div className="space-y-1 leading-none">
                            <div className="font-medium">
                              {t("order.orderForm.promotion.options.free-tomatoes.title")}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t("order.orderForm.promotion.options.free-tomatoes.description")}
                            </p>
                          </div>
                        </label>
                        <label htmlFor="r-discount" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                          <RadioGroupItem value="discount" id="r-discount" />
                          <div className="space-y-1 leading-none">
                            <div className="font-medium">
                              {t("order.orderForm.promotion.options.discount.title")}
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {t("order.orderForm.promotion.options.discount.description")}
                            </p>
                          </div>
                        </label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="space-y-3">
              <div className="mb-2 font-medium">{t("order.orderForm.delivery.title")}</div>
              
              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">{t("order.orderForm.delivery.time.title")}</div>
                <FormField
                  control={form.control}
                  name="deliveryMorning"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("order.orderForm.delivery.morning.label")}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliveryEvening"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("order.orderForm.delivery.evening.label")}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="space-y-2">
                <div className="text-sm font-medium text-muted-foreground">{t("order.orderForm.delivery.day.title")}</div>
                <FormField
                  control={form.control}
                  name="deliveryFriday"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("order.orderForm.delivery.friday.label")}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="deliverySunday"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>{t("order.orderForm.delivery.sunday.label")}</FormLabel>
                      </div>
                    </FormItem>
                  )}
                />
              </div>

              <div className="text-sm text-muted-foreground">{t("order.orderForm.delivery.hint")}</div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("order.orderForm.notes.label")}</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder={t("order.orderForm.notes.placeholder")}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? t("order.orderForm.submit.processing") : t("order.orderForm.submit.text")}
            </Button>
          </form>
        </Form>
      </CardContent>

      <BasketCustomisationModal
        isOpen={isCustomizationModalOpen}
        onClose={() => setIsCustomizationModalOpen(false)}
        basketType={form.watch("basket") || ""}
        onSaveCustomization={handleSaveCustomization}
        initialSelections={customizedItems}
        onExcludedItems={handleExcludedItems}
      />
    </Card>
  )
}

