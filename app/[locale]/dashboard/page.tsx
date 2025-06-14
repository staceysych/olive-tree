"use client"

import { useState } from "react"
import { useTranslations } from "next-intl"
import { useSession } from "next-auth/react"
import { User, ShoppingBasket } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import PersonalInfoCard from "./PersonalInfoCard"
import { useGetUserById } from "@/hooks/useGetUserById"

export default function DashboardPage() {
  const t = useTranslations()

  const [activeTab, setActiveTab] = useState("personal")
  const { data: session } = useSession()
  const { user, isLoading, error } = useGetUserById(session?.user?.id || "")



  return (
    <div className="container mx-auto px-2 sm:px-4 py-4 sm:py-8 min-h-screen">
      <div className="mx-auto p-3 sm:p-6 rounded-lg">
        <div className="space-y-1">
          <h2 className="text-2xl sm:text-4xl font-bold text-emerald-800 flex items-center gap-2">
            {t("dashboard.welcome.title", { name: user?.firstName || "" })} <span className="text-xl sm:text-3xl">👋</span>
          </h2>
          <div className="text-xs sm:text-sm text-gray-500 font-normal mt-1 sm:mt-2">
            {t("dashboard.welcome.memberSince", { date: format(user?.createdAt || new Date(), "MMMM yyyy") })}
          </div>
        </div>
      </div>

      <Card className="border-emerald-200 mt-4 sm:mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-2 sm:pb-4">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-50">
              <TabsTrigger
                value="personal"
                className="flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <User className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.personal.label")}</span>
                <span className="sm:hidden">{t("dashboard.tabs.personal.shortLabel")}</span>
              </TabsTrigger>
              <TabsTrigger
                value="baskets"
                className="flex items-center justify-center gap-1 sm:gap-2 text-sm sm:text-base data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <ShoppingBasket className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">{t("dashboard.tabs.baskets.label")}</span>
                <span className="sm:hidden">{t("dashboard.tabs.baskets.shortLabel")}</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent className="p-3 sm:p-6">
            <TabsContent value="personal" className="mt-0">
              {isLoading ? (
                <div className="text-center py-2 sm:py-4 text-sm sm:text-base">Loading user data...</div>
              ) : error ? (
                <div className="text-center py-2 sm:py-4 text-red-500 text-sm sm:text-base">{error}</div>
              ) : user ? (
                <PersonalInfoCard user={user} />
              ) : null}
            </TabsContent>

            <TabsContent value="baskets" className="mt-0">
              Baskets
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
} 