"use client"

import { useBasket } from "@/context/BasketContext"
import { BasketType } from "@/types/basket"

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
import useSendOrderEmail from "@/utils/useSendOrderEmail"
import { formatDeliveryPreference } from "@/utils/formatDeliveryPreference"

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  phone: z.string().min(8, {
    message: "Please enter a valid phone number.",
  }),
  location: z.string().min(2, {
    message: "Please enter your city.",
  }),
  basket: z.nativeEnum(BasketType, {
    required_error: "Please select a basket.",
  }),
  deliveryMorning: z.boolean().default(false).optional(),
  deliveryEvening: z.boolean().default(false).optional(),
  deliveryPreference: z.string().optional(),
  promotion: z.string().optional(),
  notes: z.string().optional(),
})

type FormValues = z.infer<typeof formSchema>

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { selectedBasketType } = useBasket()
  const formRef = useRef<HTMLFormElement>(null!)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      deliveryMorning: false,
      deliveryEvening: false,
      deliveryPreference: "",
      promotion: "free-delivery",
      basket: selectedBasketType || undefined,
      notes: "",
    },
  })

  const sendEmail = useSendOrderEmail({
    reset: form.reset,
  })

  useEffect(() => {
    if (selectedBasketType) {
      form.setValue("basket", selectedBasketType)
    }
  }, [selectedBasketType, form])

  useEffect(() => {
    const morning = form.watch("deliveryMorning")
    const evening = form.watch("deliveryEvening")
    const preference = formatDeliveryPreference(morning, evening)
    form.setValue("deliveryPreference", preference)
  }, [form.watch("deliveryMorning"), form.watch("deliveryEvening")])

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    console.log(values)
    sendEmail(values)
    setIsSubmitting(false)
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
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Your name" {...field} />
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
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="your.email@example.com" {...field} />
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
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Your phone number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (City)</FormLabel>
                  <FormControl>
                    <Input placeholder="Your city in Cyprus" {...field} />
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
                  <FormLabel>Basket Choice</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a basket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value={BasketType.TRIAL}>Trial Basket - €90 (One-time)</SelectItem>
                      <SelectItem value={BasketType.STANDARD}>Standard Basket - €85/week</SelectItem>
                      <SelectItem value={BasketType.FAMILY}>Family Basket - €140/week</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="promotion"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Promotional Offer</FormLabel>
                  <FormControl>
                    <RadioGroup onValueChange={field.onChange} value={field.value} className="space-y-3">
                      <label htmlFor="r-free-delivery" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="free-delivery" id="r-free-delivery" />
                        <div className="space-y-1 leading-none">
                          <div className="font-medium">
                            Free Delivery for First Month
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Get your basket delivered for free for the first month (4 deliveries).
                          </p>
                        </div>
                      </label>
                      <label htmlFor="r-free-tomatoes" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="free-tomatoes" id="r-free-tomatoes" />
                        <div className="space-y-1 leading-none">
                          <div className="font-medium">
                            Free Kilo of Premium Tomatoes
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Receive a complimentary kilo of farm-fresh tomatoes with your first delivery.
                          </p>
                        </div>
                      </label>
                      <label htmlFor="r-discount" className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50 cursor-pointer">
                        <RadioGroupItem value="discount" id="r-discount" />
                        <div className="space-y-1 leading-none">
                          <div className="font-medium">
                            15% Off Your First Two Orders
                          </div>
                          <p className="text-sm text-muted-foreground">
                            Enjoy a 15% discount on your first two basket deliveries.
                          </p>
                        </div>
                      </label>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="space-y-3">
              <div className="mb-2 font-medium">Delivery Preference</div>
            <FormField
              control={form.control}
                name="deliveryMorning"
              render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                  <FormControl>
                      <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                        <div className="space-y-1 leading-none">
                      <FormLabel>Morning (8am - 12pm)</FormLabel>
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
                      <FormLabel>Evening (4pm - 8pm)</FormLabel>
                        </div>
                </FormItem>
              )}
            />
              <div className="text-sm text-muted-foreground">Select your preferred delivery time slots.</div>
            </div>

            <FormField
              control={form.control}
              name="notes"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Notes</FormLabel>
                  <FormControl>
                    <textarea
                      className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      placeholder="Let us know about any allergies, dietary restrictions, or specific items you'd like to exclude or replace in your basket. We'll do our best to accommodate your preferences!"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Order Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

