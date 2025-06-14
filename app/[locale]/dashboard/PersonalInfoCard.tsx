import React, { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, MapPin, Pencil, Check, X, AlertCircle } from "lucide-react"
import EmojiPicker from "emoji-picker-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useTranslations } from "next-intl"
import { useUpdateUser } from "@/hooks/useUpdateUser"
import { toast } from "sonner"

type PersonalInfoFormData = {
  firstName: string;
  lastName: string;
  email?: string;
  phone: string;
  street: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PersonalInfoCardProps {
  user: {
    id: string;
    firstName?: string | null;
    lastName?: string | null;
    email?: string | null;
    phone?: string | null;
    createdAt?: Date | null;
    street?: string | null;
    city?: string | null;
    postalCode?: string | null;
    country?: string | null;
    emoji?: string | null;
  };
  onSave?: (data: PersonalInfoFormData) => void;
}

export default function PersonalInfoCard({
  user,
  onSave,
}: PersonalInfoCardProps) {
  const t = useTranslations("dashboard.personalInfo")
  const [emoji, setEmoji] = useState<string>(user.emoji || "🧑")
  const [showPicker, setShowPicker] = useState(false)
  const [isEditing, setIsEditing] = useState(false)
  const { updateUser, isLoading } = useUpdateUser()

  const personalInfoSchema = z.object({
    firstName: z.string().min(1, t("fields.firstName.error")),
    lastName: z.string().min(1, t("fields.lastName.error")),
    email: z.string().email(t("fields.email.error")).optional(),
    phone: z.string().min(1, t("fields.phone.error")),
    street: z.string().min(1, t("deliveryAddress.fields.street.error")),
    city: z.string().min(1, t("deliveryAddress.fields.city.error")),
    postalCode: z.string().min(1, t("deliveryAddress.fields.postalCode.error")),
    country: z.string().min(1, t("deliveryAddress.fields.country.error")),
  })

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PersonalInfoFormData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user.firstName || "",
      lastName: user.lastName || "",
      email: user.email || "",
      phone: user.phone || "",
      street: user.street || "",
      city: user.city || "",
      postalCode: user.postalCode || "",
      country: user.country || "",
    },
  })

  const onSubmit = async (data: PersonalInfoFormData) => {
    try {
      await updateUser(user.id, {
        ...data,
        emoji,
      })
      
      if (onSave) {
        onSave(data)
      }
      
      setIsEditing(false)
      window.location.reload()
    } catch (error) {
      toast.error(t("updateError"))
    }
  }

  const handleCancel = () => {
    reset()
    setEmoji(user.emoji || "🧑")
    setIsEditing(false)
  }

  const renderField = (
    label: string,
    name: keyof PersonalInfoFormData,
    type: string = "text"
  ) => (
    <div>
      <div className="text-xs text-gray-500">{label}</div>
      {isEditing && name !== "email" ? (
        <div className="relative">
          <input
            type={type}
            {...register(name)}
            className={`w-full bg-white border ${
              errors[name] ? "border-red-300" : "border-emerald-200"
            } rounded px-2 py-1 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500`}
          />
          {errors[name] && (
            <div className="absolute -bottom-5 left-0 text-xs text-red-500">
              {errors[name]?.message}
            </div>
          )}
        </div>
      ) : (
        <div className="text-sm text-gray-900 font-semibold">
          {name === "email" ? (
            <a href={`mailto:${user.email}`} className="text-gray-900 hover:underline">
              {user.email}
            </a>
          ) : name === "phone" ? (
            <a href={`tel:${user.phone}`} className="text-gray-900 hover:underline">
              {user.phone}
            </a>
          ) : (
            name === "firstName" ? user.firstName :
            name === "lastName" ? user.lastName :
            name === "street" ? user.street :
            name === "city" ? user.city :
            name === "postalCode" ? user.postalCode :
            name === "country" ? user.country :
            ""
          )}
        </div>
      )}
    </div>
  )

  const hasDeliveryAddress = user.street && user.city && user.postalCode && user.country || isEditing

  return (
    <Card className="border-emerald-200">
      <CardContent className="p-6">
        {/* Title Bar with Edit/Save/Cancel Button */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-bold text-xl">
              <Pencil className="w-5 h-5" /> {t("title")}
            </div>
            <div className="text-sm text-gray-500">{t("description")}</div>
          </div>
          <div>
            {!isEditing ? (
              <button
                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-emerald-200 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
                onClick={() => setIsEditing(true)}
                type="button"
              >
                <Pencil className="w-4 h-4" />
                {t("edit")}
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-emerald-200 text-emerald-700 rounded-md hover:bg-emerald-50 transition-colors"
                  type="submit"
                  form="personal-info-form"
                >
                  <Check className="w-4 h-4" />
                  {t("save")}
                </button>
                <button
                  className="flex items-center gap-1 px-3 py-1.5 text-sm border border-red-200 text-red-700 rounded-md hover:bg-red-50 transition-colors"
                  onClick={handleCancel}
                  type="button"
                >
                  <X className="w-4 h-4" />
                  {t("cancel")}
                </button>
              </div>
            )}
          </div>
        </div>
        <form id="personal-info-form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          {/* Profile Emoji at Top (Mobile Only) */}
          <div className="flex flex-col items-center pb-6 block sm:hidden">
            <div className="relative">
              <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-4xl text-emerald-400">
                <span role="img" aria-label="avatar">{emoji}</span>
              </div>
              {isEditing && (
                <button
                  className="absolute bottom-0 right-0 bg-white border border-emerald-200 rounded-full p-1 shadow hover:bg-emerald-50 transition"
                  onClick={() => setShowPicker((v) => !v)}
                  aria-label="Edit avatar emoji"
                  type="button"
                >
                  <span role="img" aria-label="edit">✏️</span>
                </button>
              )}
              {showPicker && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 sm:absolute sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:mt-2 sm:bg-transparent">
                  <div className="w-[95vw] max-w-[350px] bg-white border border-emerald-200 rounded-lg shadow-lg p-2 sm:w-[350px]">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => {
                        setEmoji(emojiData.emoji)
                        setShowPicker(false)
                      }}
                      width="100%"
                      height={350}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* Profile Info */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:gap-6 gap-2 sm:gap-0">
              {/* Profile Emoji (Desktop Only) */}
              <div className="hidden sm:flex items-center justify-center" style={{ minWidth: '100px', maxWidth: '120px' }}>
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-emerald-50 border-2 border-emerald-100 flex items-center justify-center text-4xl text-emerald-400">
                    <span role="img" aria-label="avatar">{emoji}</span>
                  </div>
                  {isEditing && (
                    <button
                      className="absolute bottom-0 right-0 bg-white border border-emerald-200 rounded-full p-1 shadow hover:bg-emerald-50 transition"
                      onClick={() => setShowPicker((v) => !v)}
                      aria-label="Edit avatar emoji"
                      type="button"
                    >
                      <span role="img" aria-label="edit">✏️</span>
                    </button>
                  )}
                  {showPicker && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 sm:absolute sm:inset-auto sm:left-1/2 sm:-translate-x-1/2 sm:mt-2 sm:bg-transparent">
                      <div className="w-[95vw] max-w-[350px] bg-white border border-emerald-200 rounded-lg shadow-lg p-2 sm:w-[350px]">
                        <EmojiPicker
                          onEmojiClick={(emojiData) => {
                            setEmoji(emojiData.emoji)
                            setShowPicker(false)
                          }}
                          width="100%"
                          height={350}
                        />
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full overflow-hidden">
                <div className="min-w-0 w-full">{renderField(t("fields.firstName.label"), "firstName")}</div>
                <div className="min-w-0 w-full">{renderField(t("fields.lastName.label"), "lastName")}</div>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="pb-6 border-b border-gray-100">
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-lg mb-2">
              <Mail className="w-5 h-5" /> {t("contactInfo.title")}
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="min-w-0 w-full">{renderField(t("fields.email.label"), "email", "email")}</div>
              <div className="min-w-0 w-full">{renderField(t("fields.phone.label"), "phone", "tel")}</div>
            </div>
          </div>

          {/* Delivery Address */}
          <div>
            <div className="flex items-center gap-2 text-emerald-700 font-semibold text-lg mb-2">
              <MapPin className="w-5 h-5" /> {t("deliveryAddress.title")}
            </div>
            {!hasDeliveryAddress ? (
              <div className="bg-amber-50 border border-amber-200 rounded-md p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-amber-500 mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-amber-800">{t("deliveryAddress.noAddress.title")}</h4>
                    <p className="text-sm text-amber-700 mt-1">
                      {t("deliveryAddress.noAddress.description")}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="min-w-0 w-full">{renderField(t("deliveryAddress.fields.street.label"), "street")}</div>
                <div className="min-w-0 w-full">{renderField(t("deliveryAddress.fields.city.label"), "city")}</div>
                <div className="min-w-0 w-full">{renderField(t("deliveryAddress.fields.postalCode.label"), "postalCode")}</div>
                <div className="min-w-0 w-full">{renderField(t("deliveryAddress.fields.country.label"), "country")}</div>
              </div>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  )
} 