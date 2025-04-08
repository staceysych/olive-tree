"use client"

import { Label } from "@/components/ui/label"

import { useState } from "react"
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
  basket: z.string({
    required_error: "Please select a basket.",
  }),
  deliveryMorning: z.boolean().default(false).optional(),
  deliveryEvening: z.boolean().default(false).optional(),
  promotion: z.string().optional(),
})

export function OrderForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      deliveryMorning: false,
      deliveryEvening: false,
      promotion: "free-delivery",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log(values)
      setIsSubmitting(false)
      toast({
        title: "Order received!",
        description: "We'll contact you soon to confirm your order details.",
      })
      form.reset()
    }, 1000)
  }

  return (
    <Card>
      <CardContent className="pt-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a basket" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="dairy">Dairy Basket</SelectItem>
                      <SelectItem value="meat">Meat Basket</SelectItem>
                      <SelectItem value="mixed">Mixed Essentials</SelectItem>
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
                    <RadioGroup onValueChange={field.onChange} defaultValue={field.value} className="space-y-3">
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem value="free-delivery" id="r-free-delivery" />
                        <div className="space-y-1 leading-none">
                          <Label htmlFor="r-free-delivery" className="font-medium">
                            Free Delivery for First Month
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Get your basket delivered for free for the first month (4 deliveries).
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem value="free-tomatoes" id="r-free-tomatoes" />
                        <div className="space-y-1 leading-none">
                          <Label htmlFor="r-free-tomatoes" className="font-medium">
                            Free Kilo of Premium Tomatoes
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Receive a complimentary kilo of farm-fresh tomatoes with your first delivery.
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start space-x-3 space-y-0 rounded-md border p-3 hover:bg-muted/50">
                        <RadioGroupItem value="discount" id="r-discount" />
                        <div className="space-y-1 leading-none">
                          <Label htmlFor="r-discount" className="font-medium">
                            15% Off Your First Two Orders
                          </Label>
                          <p className="text-sm text-muted-foreground">
                            Enjoy a 15% discount on your first two basket deliveries.
                          </p>
                        </div>
                      </div>
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
            <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700" disabled={isSubmitting}>
              {isSubmitting ? "Processing..." : "Order Now"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

