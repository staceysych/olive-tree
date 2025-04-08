"use client"

import { useState } from "react"
import { Gift } from "lucide-react"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

interface PromoModalProps {
  isOpen: boolean
  onClose: () => void
  basketType: string
}

export function PromoModal({ isOpen, onClose, basketType }: PromoModalProps) {
  const [selectedPromo, setSelectedPromo] = useState<string>("free-delivery")

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <Gift className="h-5 w-5" />
            <span>Special Offer for Early Customers!</span>
          </DialogTitle>
          <DialogDescription>
            As one of our first customers, you qualify for a special promotion. Choose one of the following:
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <RadioGroup value={selectedPromo} onValueChange={setSelectedPromo} className="space-y-4">
            <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50">
              <RadioGroupItem value="free-delivery" id="free-delivery" />
              <div className="space-y-1 leading-none">
                <Label htmlFor="free-delivery" className="font-medium">
                  Free Delivery for First Month
                </Label>
                <p className="text-sm text-muted-foreground">
                  Get your {basketType} Basket delivered for free for the first month (4 deliveries).
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50">
              <RadioGroupItem value="free-tomatoes" id="free-tomatoes" />
              <div className="space-y-1 leading-none">
                <Label htmlFor="free-tomatoes" className="font-medium">
                  Free Kilo of Premium Tomatoes
                </Label>
                <p className="text-sm text-muted-foreground">
                  Receive a complimentary kilo of farm-fresh tomatoes with your first delivery.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-3 space-y-0 rounded-md border p-4 hover:bg-muted/50">
              <RadioGroupItem value="discount" id="discount" />
              <div className="space-y-1 leading-none">
                <Label htmlFor="discount" className="font-medium">
                  15% Off Your First Two Orders
                </Label>
                <p className="text-sm text-muted-foreground">
                  Enjoy a 15% discount on your first two basket deliveries.
                </p>
              </div>
            </div>
          </RadioGroup>
        </div>
        <DialogFooter className="flex flex-col-reverse sm:flex-row sm:justify-between sm:space-x-2">
          <Button variant="outline" onClick={onClose}>
            Maybe Later
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700" asChild>
            <Link href="#order">Continue with Offer</Link>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

