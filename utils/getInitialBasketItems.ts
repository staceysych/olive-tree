export const getInitialItems = (itemsCategories: Record<string, { title: string; items: string[] }>) => {
    const initialItems: Record<string, string[]> = {}
    Object.keys(itemsCategories).forEach((category) => {
      initialItems[category] = [...itemsCategories[category].items]
    })
    return initialItems
  }