import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { Card, CardContent } from "@/components/ui/card";
import { forwardRef } from "react";

interface OrderConfirmationCardProps {
  basketType: string;
  email: string;
  phone: string;
  deliveryLocation: string;
  onPlaceAnotherOrder?: () => void;
}

export const OrderConfirmationCard = forwardRef<HTMLDivElement, OrderConfirmationCardProps>(
  ({ basketType, email, phone, deliveryLocation, onPlaceAnotherOrder }, ref) => {
    const t = useTranslations("orderConfirmation");

    return (
      <Card ref={ref}>
        <CardContent className="pt-6">
          <div className="max-w-md mx-auto">
            {/* Success Icon */}
            <div className="flex justify-center mb-8">
              <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center ring-8 ring-emerald-50/50">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
            </div>

            {/* Title */}
            <h2 className="text-2xl font-semibold text-center text-emerald-800 mb-4">
              {t("title")}
            </h2>

            {/* Message */}
            <p className="text-center text-gray-600 mb-8">
              {t("thankYouMessage", { basketType })}
            </p>

            {/* What happens next section */}
            <div className="bg-emerald-50 p-6 rounded-xl mb-8 border border-emerald-100/50">
              <h3 className="font-medium text-emerald-800 mb-4">{t("whatHappensNext.title")}</h3>
              <ol className="space-y-4 text-gray-600">
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">1</span>
                  <span>{t("whatHappensNext.steps.review")}</span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">2</span>
                  <span>
                    {t("whatHappensNext.steps.contact", { email, phone })}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">3</span>
                  <span>
                    {t("whatHappensNext.steps.schedule", { deliveryLocation })}
                  </span>
                </li>
                <li className="flex gap-3">
                  <span className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-sm font-medium">4</span>
                  <span>{t("whatHappensNext.steps.enjoy")}</span>
                </li>
              </ol>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button
                variant="outline"
                className="flex-1 border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700"
                onClick={onPlaceAnotherOrder}
              >
                {t("actions.placeAnother")}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }
); 