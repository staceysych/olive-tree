"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { useTranslations } from 'next-intl'
import { signIn } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"

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
  onCancel?: () => void
  orderList?: BasketOrderList
}

export function AccountCreationForm({ onCancel, orderList }: AccountCreationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const t = useTranslations('accountCreation')

  const formSchema = z
    .object({
      firstName: z.string().min(2, {
        message: t('sections.personalInfo.firstName.error'),
      }),
      lastName: z.string().min(2, {
        message: t('sections.personalInfo.lastName.error'),
      }),
      email: z.string().email({
        message: t('sections.contactInfo.email.error'),
      }),
      password: z.string().min(6, {
        message: t('sections.security.password.error'),
      }),
      confirmPassword: z.string(),
      phone: z.string().min(8, {
        message: t('sections.contactInfo.phone.error'),
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('sections.security.confirmPassword.error'),
      path: ["confirmPassword"],
    })

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
      
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: values.email,
          password: values.password,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          orderList,
        }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to create account')
      }

      // Sign in the user after successful registration
      const result = await signIn('credentials', {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
      router.refresh()
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
    <div className="w-full">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
          {onCancel && (
              <Button type="button" variant="outline" className="flex-1" onClick={onCancel}>
                {t('buttons.cancel')}
            </Button>
          )}
            <Button type="submit" className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white" disabled={isSubmitting}>
              {isSubmitting ? t('buttons.submit.processing') : t('buttons.submit.default')}
          </Button>
        </div>
      </form>
    </Form>
    </div>
  )
} 