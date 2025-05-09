import { createPath } from "@/utils/common"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTranslations } from "next-intl"

export const NavLinks = ({onClick}: {onClick?: () => void}) => {
    const pathname = usePathname()
    const t = useTranslations();
    const basePath = pathname.includes('/feedback') ? '/' : pathname;

    return (
        <>
            <Link
              href={createPath(basePath, '#how-it-works')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.howItWorks')}
            </Link>
            <Link
              href={createPath(basePath, '#baskets')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.baskets')}
            </Link>
            <Link
              href={createPath(basePath, '#faq')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.faq')}
            </Link>
            <Link
              href={createPath(basePath, '#about')}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              onClick={onClick}
            >
              {t('header.about')}
            </Link>
            </>
    )
}