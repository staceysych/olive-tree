import { createPath } from "@/utils/common"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

export const NavLinks = ({onClick}: {onClick?: () => void}) => {
    const pathname = usePathname()
    const t = useTranslations()
    return (
        <>
            <Link
              href={createPath(pathname, '#how-it-works')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.howItWorks')}
            </Link>
            <Link
              href={createPath(pathname, '#baskets')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.baskets')}
            </Link>
            <Link
              href={createPath(pathname, '#faq')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.faq')}
            </Link>
            <Link
              href={createPath(pathname, '#about')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.about')}
            </Link>
            </>
    )
}