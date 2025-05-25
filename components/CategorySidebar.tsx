import { Button } from "@/components/ui/button"
import { useTranslations } from "next-intl"

interface Category {
  id: string
  name: string
  emoji: string
  count: number
}

interface CategorySidebarProps {
  categories: Category[]
  selectedCategory: string
  onCategorySelect: (categoryId: string) => void
}

export function CategorySidebar({ categories, selectedCategory, onCategorySelect }: CategorySidebarProps) {
  const t = useTranslations('marketplace')

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-100 p-4 min-h-[300px]">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold text-emerald-800 mb-4">{t('categoriesTitle')}</h2>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? "default" : "ghost"}
            className={`w-full justify-start gap-2 ${
              selectedCategory === category.id ? "bg-emerald-600 text-white" : "hover:bg-emerald-50"
            }`}
            onClick={() => onCategorySelect(category.id)}
          >
            <span>{category.emoji}</span>
            <span>{category.name}</span>
            <span className="ml-auto text-sm opacity-70">({category.count})</span>
          </Button>
        ))}
      </div>
    </div>
  )
} 