import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locations } from '@/types/locations';
import { getTranslations } from 'next-intl/server';
import { OrderForm } from '@/components/OrderForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft, Leaf, ShoppingBasket, Truck } from 'lucide-react';
import Image from 'next/image';
import { Header } from '@/components/Header';
import { FaqSection } from '@/components/FAQ';
import { BasketOptions } from '@/components/BasketOptions';

type Props = {
  params: {
    locale: string;
    slug: string;
  };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const location = locations.find(loc => loc.slug === slug);
  const t = await getTranslations('metadata');
  
  if (!location) {
    return {
      title: t('notFound.title'),
      description: t('notFound.description')
    };
  }

  const locationName = location.name[locale as keyof typeof location.name];
  
  return {
    title: t('location.title', { location: locationName }),
    description: t('location.description', { location: locationName }),
    alternates: {
      canonical: `https://olive-tree.cy/locations/${slug}`,
      languages: {
        en: `https://olive-tree.cy/en/locations/${slug}`,
        el: `https://olive-tree.cy/el/locations/${slug}`,
        ru: `https://olive-tree.cy/ru/locations/${slug}`,
      },
    },
  };
}

export default async function LocationPage({ params }: Props) {
  const { locale, slug } = params;
  const location = locations.find(loc => loc.slug === slug);
  const t = await getTranslations();

  if (!location) {
    notFound();
  }

  const locationName = location.name[locale as keyof typeof location.name];
  const locationDescription = location.description[locale as keyof typeof location.description];

  return (
    <div className="flex min-h-screen flex-col">
     <Header /> 
     <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-emerald-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl text-emerald-800">
                  {t('locations.title', { location: locationName })}
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  {t('locations.description', { location: locationName })}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="#baskets">{t('hero.cta')}</Link>
                  </Button>
                </div>
              </div>
              <div className="relative h-[300px] lg:h-[400px] rounded-xl overflow-hidden mix-blend-multiply">
                <Image
                  src="/hero.jpeg"
                  alt="Fresh farm goods"
                  fill
                  className="object-cover"
                  priority
                  quality={75}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section id="how-it-works" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                  {t('howItWorks.title')}
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('howItWorks.subtitle')}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <ShoppingBasket className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">{t('howItWorks.steps.pick.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.steps.pick.description')}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Truck className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">{t('howItWorks.steps.deliver.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.steps.deliver.description')}
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">{t('howItWorks.steps.enjoy.title')}</h3>
                <p className="text-muted-foreground">
                  {t('howItWorks.steps.enjoy.description')}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Basket Options */}
        <BasketOptions />

        {/* Order Form */}
        <section id="order" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                  {t('order.title')}
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('order.subtitle')} {locationName}
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-lg py-12">
              <OrderForm />
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq">
          <FaqSection />
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                  {t('about.title')}
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {t('about.description')}
                </p>
              </div>
            </div>
          </div>
        </section> 
      </main>

      {/* Footer */}
      <footer className="w-full border-t bg-white py-6 md:py-8">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row px-4 md:px-6">
          <div className="flex gap-2 items-center text-xl font-bold text-emerald-700">
            <Leaf className="h-5 w-5" />
            <span>{t('footer.brand')}</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} {t('footer.brand')}. {t('footer.copyright')}
          </p>
        </div>
      </footer>
    </div>
  );
}