"use client"

import { ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"

interface AvailableItemsModalProps {
  isOpen: boolean
  onClose: () => void
}

// Available items data
const availableItems = {
  vegetables: {
    emoji: "🍅",
    title: "Vegetables",
    items: [
      "Tomatoes",
      "Asparagus",
      "Artichoke",
      "Zucchini",
      "Cucumbers",
      "Cauliflower",
      "Brussels Sprouts",
      "Green Bell Pepper",
      "Radish",
      "Green Onion",
      "New Potatoes",
      "Broccoli",
      "Arugula (Seasonal)",
      "Fava Beans (Seasonal)",
      "Green Peas (Seasonal)",
    ],
  },
  mushrooms: {
    emoji: "🍄",
    title: "Mushrooms",
    items: ["Champignon Mushrooms"],
  },
  nuts: {
    emoji: "🌰",
    title: "Nuts",
    items: ["Walnut"],
  },
  fruits: {
    emoji: "🍓",
    title: "Fruits",
    items: [
      "Pears",
      "Melon",
      "Pomegranate",
      "Plums",
      "Dragon Fruit",
      "Loquat (Medlar)",
      "Grapefruit",
      "Bananas",
      "Papaya",
      "Strawberries (Seasonal)",
      "Cherries (Seasonal)",
      "Apricots (Seasonal)",
      "Melons (Seasonal – early harvest)",
    ],
  },
  herbs: {
    emoji: "🌿",
    title: "Herbs (Seasonal – Fresh Spring Herbs)",
    items: ["Mint", "Basil", "Parsley", "Dill", "Cilantro"],
  },
}

const notes = [
  "Items are selected based on seasonal availability.",
  "Not all listed items will be included in every delivery — we choose the freshest produce available on the day of packing.",
  "We aim to vary each delivery.",
  "To keep things exciting and seasonal, we mix up the contents so your basket includes a variety of different items each time.",
]

export function AvailableItemsModal({ isOpen, onClose }: AvailableItemsModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="sm:max-w-md md:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-emerald-700">
            <ShoppingBasket className="h-5 w-5" />
            <span>🛒 Available Items</span>
          </DialogTitle>
          <DialogDescription>
            Here's what's currently available in our farm-fresh selection. Items may vary based on seasonal
            availability.
          </DialogDescription>
        </DialogHeader>

        <ScrollArea className="h-[60vh] pr-4">
          <div className="space-y-6">
            {Object.values(availableItems).map((category) => (
              <div key={category.title} className="space-y-3">
                <h3 className="text-lg font-medium flex items-center gap-2">
                  <span>{category.emoji}</span>
                  <span>{category.title}</span>
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                  {category.items.map((item) => (
                    <Badge key={item} variant="outline" className="bg-emerald-50 justify-start">
                      {item}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}

            <Separator className="my-4" />

            <div className="space-y-3">
              <h3 className="text-lg font-medium">Important Notes</h3>
              <ul className="space-y-2">
                {notes.map((note, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-emerald-600 mt-1">•</span>
                    <span>{note}</span>
                  </li>
                ))}
              </ul>

              <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                <h4 className="font-medium mb-2">Custom Requests Welcome!</h4>
                <p className="text-sm text-muted-foreground">
                  If there's anything you prefer not to receive, just let us know! We'll gladly replace it with another
                  item from the available selection.
                </p>
                <p className="text-sm text-muted-foreground mt-2">
                  The list of items is updated based on the season and availability. Make sure to check back regularly
                  to see what's new and fresh!
                </p>
              </div>
            </div>
          </div>
        </ScrollArea>

        <DialogFooter>
          <Button onClick={onClose}>Close</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 