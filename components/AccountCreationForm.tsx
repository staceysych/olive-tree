"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { signup } from "@/app/actions/auth"
import { useRouter } from "next/navigation"
import { createClient } from "@/utils/supabase/client"
import { useTranslations } from 'next-intl'

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const formSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "First name must be at least 2 characters.",
    }),
    lastName: z.string().min(2, {
      message: "Last name must be at least 2 characters.",
    }),
    email: z.string().email({
      message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters.",
    }),
    confirmPassword: z.string(),
    phone: z.string().min(8, {
      message: "Please enter a valid phone number.",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  })

type BasketOrderList = {
  categories: {
    [categoryName: string]: {
      [itemName: string]: {
        unit: string
        quantity: number
        price: number
      }
    }
  }
  totalPrice: number
  totalItems: number
}

interface AccountCreationFormProps {
  onCancel: () => void
  orderList?: BasketOrderList
}

export function AccountCreationForm({ onCancel, orderList }: AccountCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClient()
  const t = useTranslations('accountCreation')

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      phone: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true)
      setError(null)
      
      const formData = new FormData()
      formData.append('email', values.email)
      formData.append('password', values.password)
      formData.append('first_name', values.firstName)
      formData.append('last_name', values.lastName)
      formData.append('phone', values.phone)
      
      const { user } = await signup(formData)
      if (!user) {
        throw new Error('Failed to create user')
      }

      // Save basket to Supabase if orderList is provided
      if (orderList) {
        const { error: basketError } = await supabase
          .from('Baskets')
          .insert({
            user_id: user.id,
            categories: orderList.categories,
            total_price: orderList.totalPrice,
            total_items: orderList.totalItems,
          })

        if (basketError) throw basketError
      }

      router.push('/dashboard')
    } catch (err: any) {
      if (err.message?.includes('User already registered')) {
        setError(t('errors.userExists'))
      } else {
        setError(t('errors.general'))
      }
      console.error('Account creation error:', err)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="w-full mt-10 rounded-lg bg-white shadow p-8 border border-green-100">
      <Form {...form}>
        <form 
          onSubmit={(e) => {
            form.handleSubmit(onSubmit)(e)
          }} 
          className="space-y-8"
        >
          {error && (
            <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
              {error}
            </div>
          )}
          {/* Section 1: Personal Information */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 font-bold mr-3">1</span>
              <span className="text-lg font-semibold text-green-800">{t('sections.personalInfo.title')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="firstName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sections.personalInfo.firstName.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('sections.personalInfo.firstName.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="lastName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sections.personalInfo.lastName.label')}</FormLabel>
                    <FormControl>
                      <Input placeholder={t('sections.personalInfo.lastName.placeholder')} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Section 2: Contact Information */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 font-bold mr-3">2</span>
              <span className="text-lg font-semibold text-green-800">{t('sections.contactInfo.title')}</span>
            </div>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t('sections.contactInfo.email.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('sections.contactInfo.email.placeholder')} type="email" {...field} />
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
                  <FormLabel>{t('sections.contactInfo.phone.label')}</FormLabel>
                  <FormControl>
                    <Input placeholder={t('sections.contactInfo.phone.placeholder')} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Section 3: Account Security */}
          <div>
            <div className="flex items-center mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-full bg-green-100 text-green-700 font-bold mr-3">3</span>
              <span className="text-lg font-semibold text-green-800">{t('sections.security.title')}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sections.security.password.label')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder={t('sections.security.password.placeholder')}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{t('sections.security.confirmPassword.label')}</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder={t('sections.security.confirmPassword.placeholder')}
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="ghost"
                          size="icon"
                          className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          ) : (
                            <Eye className="h-4 w-4 text-muted-foreground" />
                          )}
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
              {t('buttons.cancel')}
            </Button>
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? t('buttons.submit.processing') : t('buttons.submit.default')}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
} 