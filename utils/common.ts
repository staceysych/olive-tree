export const createPath = (pathname: string, hash: string) => `${pathname}${hash}`

export const mapMarketCategoryToEmoji = (category: string) => {
    switch (category) {
        case "vegetables":
            return "🍅"
        case "mushrooms":
            return "🍄"
        case "nuts":
            return "🌰"
        case "fruits":
            return "🍓"
        case "herbs":
            return "🌿"
        default:
            return "📦"
    }
}