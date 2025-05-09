"use client"

import * as React from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useTranslations } from "next-intl"
import { Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"
import { sendFeedbackEmail } from "@/utils/send-feedback"

export default function FeedbackPage() {
  const t = useTranslations()
  const [isSubmitting, setIsSubmitting] = React.useState(false)
  const [isSubmitted, setIsSubmitted] = React.useState(false)

  const formSchema = z.object({
    name: z.string().min(2, {
      message: t("feedback.form.name.error"),
    }).trim(),
    email: z.string().email({
      message: t("feedback.form.email.error"),
    }),
    rating: z.number().min(1, {
      message: t("feedback.form.rating.error"),
    }),
    feedback: z.string().min(10, {
      message: t("feedback.form.feedback.error"),
    }).trim(),
    allowDisplay: z.boolean(),
  })

  type FormValues = z.infer<typeof formSchema>

  const form = useForm<FormValues>({
    resolver: zodResolver<FormValues, any, FormValues>(formSchema),
    defaultValues: {
      name: "",
      email: "",
      rating: 0,
      feedback: "",
      allowDisplay: false,
    },
  })

  async function onSubmit(values: FormValues) {
    setIsSubmitting(true)
    try {
      await sendFeedbackEmail(values)
      form.reset()
      setIsSubmitted(true)
    } catch (error) {
      console.error("Failed to submit feedback:", error)
      toast({
        title: t("feedback.form.error.title"),
        description: t("feedback.form.error.description"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="bg-[#f0fdf6] min-h-screen w-full">
      <div className="container max-w-2xl py-12">
        <div className="mb-10 text-center">
          <div className="inline-block mb-4 px-4 py-1 rounded-md bg-emerald-100 text-emerald-800 text-sm font-medium">
            {t("feedback.subtitle")}
          </div>
          <h1 className="text-4xl font-bold mb-2 text-emerald-900">{t("feedback.title")}</h1>
          <p className="text-lg text-gray-600">
            {t("feedback.description")}
          </p>
        </div>
        {isSubmitted ? (
          <Card>
            <CardContent className="pt-6 text-center py-8">
              <div className="mb-4">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100">
                  <svg
                    className="w-8 h-8 text-emerald-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </div>
              </div>
              <h2 className="text-2xl font-bold mb-2 text-emerald-900">{t("feedback.form.success.title")}</h2>
              <p className="text-gray-600 mb-6">{t("feedback.form.success.description")}</p>
              <Button
                onClick={() => setIsSubmitted(false)}
                className="bg-emerald-600 hover:bg-emerald-700"
              >
                {t("feedback.form.submit.another")}
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("feedback.form.name.label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("feedback.form.name.placeholder")} {...field} />
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
                        <FormLabel>{t("feedback.form.email.label")}</FormLabel>
                        <FormControl>
                          <Input placeholder={t("feedback.form.email.placeholder")} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("feedback.form.rating.label")}</FormLabel>
                        <FormControl>
                          <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((rating) => (
                              <button
                                key={rating}
                                type="button"
                                onClick={() => field.onChange(rating)}
                                className={`p-1 rounded-full transition-colors ${
                                  field.value >= rating
                                    ? "text-yellow-400"
                                    : "text-gray-300"
                                }`}
                              >
                                <Star className="w-8 h-8" />
                              </button>
                            ))}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="feedback"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>{t("feedback.form.feedback.label")}</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder={t("feedback.form.feedback.placeholder")}
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="allowDisplay"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>
                            {t("feedback.form.allowDisplay.label")}
                          </FormLabel>
                        </div>
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className="w-full bg-emerald-600 hover:bg-emerald-700"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("feedback.form.submit.processing") : t("feedback.form.submit.text")}
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
} 