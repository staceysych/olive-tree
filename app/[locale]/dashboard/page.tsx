"use client"

import { useEffect, useState } from "react"
import { useTranslations } from "next-intl"
import { createClient } from "@/utils/supabase/client"
import { Leaf, User, ShoppingBasket } from "lucide-react"
import { format } from "date-fns"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function DashboardPage() {
  const t = useTranslations()
  const [userName, setUserName] = useState<string>("")
  const [memberSince, setMemberSince] = useState<string>("")
  const [activeTab, setActiveTab] = useState("personal")
  const supabase = createClient()

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      if (user) {
        const firstName = user.user_metadata?.first_name || ""
        setUserName(firstName)
        if (user.created_at) {
          const date = new Date(user.created_at)
          setMemberSince(format(date, "MMMM yyyy"))
        }
      }
    }

    getUserData()
  }, [supabase])

  return (
    <div className="container mx-auto px-4 py-8 bg-emerald-50 min-h-screen">
      <div className="mx-auto p-6 rounded-lg">
        <div className="space-y-1">
          <h2 className="text-4xl font-bold text-emerald-800 flex items-center gap-2">
            Welcome back, {userName}! <span className="text-3xl">👋</span>
          </h2>
          <div className="text-sm text-gray-500 font-normal mt-2">
            Member since {memberSince}
          </div>
        </div>
      </div>

      <Card className="border-emerald-200 mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <CardHeader className="pb-4">
            <TabsList className="grid w-full grid-cols-2 bg-emerald-50">
              <TabsTrigger
                value="personal"
                className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Personal Info</span>
                <span className="sm:hidden">Info</span>
              </TabsTrigger>
              <TabsTrigger
                value="baskets"
                className="flex items-center gap-2 data-[state=active]:bg-emerald-600 data-[state=active]:text-white"
              >
                <ShoppingBasket className="h-4 w-4" />
                <span className="hidden sm:inline">Saved Baskets</span>
                <span className="sm:hidden">Baskets</span>
              </TabsTrigger>
            </TabsList>
          </CardHeader>

          <CardContent>
            <TabsContent value="personal" className="mt-0">
              <div>Personal Info Content</div>
            </TabsContent>

            <TabsContent value="baskets" className="mt-0">
              <div>Saved Baskets Content</div>
            </TabsContent>
          </CardContent>
        </Tabs>
      </Card>
    </div>
  )
} 