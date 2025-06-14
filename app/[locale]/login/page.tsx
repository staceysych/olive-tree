"use client"

import type React from "react"
import { useState } from "react"
import { Mail, Lock, Eye, EyeOff, Leaf } from "lucide-react"
import { useTranslations } from "next-intl"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { signIn } from "next-auth/react"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AccountCreationForm } from "@/components/AccountCreationForm"

export default function AuthPage() {
  const t = useTranslations("auth")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  
  const formSchema = z.object({
    email: z.string().email({
      message: t("errors.invalidEmail"),
    }),
    password: z.string().min(1, {
      message: t("errors.passwordRequired"),
    }),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
      })

      if (result?.error) {
        throw new Error(result.error)
      }

      router.push('/dashboard')
      router.refresh()
    } catch (error: any) {
      setError(error.message || t("errors.loginFailed"))
      toast.error(error.message || t("errors.loginFailed"))
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
              <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
                {t("welcome.badge")}
              </div>
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800 flex items-center justify-center gap-2">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                  <span>{t("welcome.title")}</span>
          </h1>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
            {t("welcome.description")}
          </p>
              </div>
        </div>

            <div className="mx-auto max-w-xl">
              <Card className="border-emerald-200 shadow-lg">
                <Tabs defaultValue="login" className="w-full">
                  <CardHeader className="space-y-1">
                    <TabsList className="grid w-full grid-cols-2 bg-emerald-50">
                      <TabsTrigger
                        value="login"
                        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                      >
                        {t("tabs.signIn")}
                      </TabsTrigger>
                      <TabsTrigger
                        value="signup"
                        className="data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
                      >
                        {t("tabs.signUp")}
                      </TabsTrigger>
          </TabsList>
                  </CardHeader>

                  <CardContent>
                    <TabsContent value="login" className="space-y-4">
                      <div className="space-y-2 text-center">
                        <CardTitle className="text-2xl text-emerald-700">{t("signIn.title")}</CardTitle>
                <CardDescription>
                  {t("signIn.description")}
                </CardDescription>
                      </div>

                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    {error && (
                      <div className="p-3 rounded-md bg-red-50 text-red-600 text-sm">
                        {error}
                      </div>
                    )}

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("signIn.email.label")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                      type="email"
                                placeholder={t("signIn.email.placeholder")}
                                      className="pl-10 border-emerald-200 focus:border-emerald-500"
                                {...field}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t("signIn.password.label")}</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                              <Input
                                type={showPassword ? "text" : "password"}
                                placeholder={t("signIn.password.placeholder")}
                                      className="pl-10 pr-10 border-emerald-200 focus:border-emerald-500"
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

                          <Button
                            type="submit"
                            className="w-full bg-emerald-600 hover:bg-emerald-700"
                            disabled={isLoading}
                          >
                            {isLoading ? (
                              <div className="flex items-center gap-2">
                                <svg
                                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                                  xmlns="http://www.w3.org/2000/svg"
                                  fill="none"
                                  viewBox="0 0 24 24"
                                >
                                  <circle
                                    className="opacity-25"
                                    cx="12"
                                    cy="12"
                                    r="10"
                                    stroke="currentColor"
                                    strokeWidth="4"
                                  ></circle>
                                  <path
                                    className="opacity-75"
                                    fill="currentColor"
                                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                  ></path>
                                </svg>
                                {t("signIn.submit.loading")}
                              </div>
                            ) : (
                              t("signIn.submit.default")
                            )}
                    </Button>
                  </form>
                </Form>
          </TabsContent>

                    <TabsContent value="signup" className="space-y-4">
                      <div className="space-y-2 text-center">
                        <CardTitle className="text-2xl text-emerald-700">{t("signUp.title")}</CardTitle>
                <CardDescription>
                  {t("signUp.description")}
                </CardDescription>
                      </div>

                <AccountCreationForm />
                    </TabsContent>
                  </CardContent>
                </Tabs>
              </Card>

              {/* Benefits Card */}
              <Card className="mt-6 border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
                <CardContent className="pt-6">
                  <h3 className="font-semibold text-emerald-700 mb-3 text-center">{t("benefits.title")}</h3>
                  <ul className="space-y-2 text-sm text-emerald-600">
                    {t.raw("benefits.items").map((item: string, index: number) => (
                      <li key={index} className="flex items-center gap-2">
                        <div className="h-1.5 w-1.5 rounded-full bg-emerald-500"></div>
                        {item}
                      </li>
                    ))}
                  </ul>
              </CardContent>
            </Card>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
