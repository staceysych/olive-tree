import Image from "next/image"
import Link from "next/link"
import { Leaf, Truck, ShoppingBasket } from "lucide-react"

import { Button } from "@/components/ui/button"
import { BasketCard } from "@/components/BasketCard"
import { OrderForm } from "@/components/OrderForm"
import { BasketType } from "@/types/basket"
import { FaqSection } from "@/components/FAQ"
import { Header } from "@/components/Header"

export default function Home() {
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
                  Farm-Fresh Goodness, Delivered Across Cyprus
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Straight from local farms to your table – enjoy the taste of real, seasonal produce without lifting a finger.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="bg-emerald-600 hover:bg-emerald-700" asChild>
                    <Link href="#baskets">Choose Your Basket</Link>
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
                  How It Works
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Simple steps to get fresh farm goods delivered to your door
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3 md:gap-12">
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <ShoppingBasket className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">Pick a Basket</h3>
                <p className="text-muted-foreground">
                  Choose from our selection of curated baskets filled with farm-fresh goods.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Truck className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">We Deliver Weekly</h3>
                <p className="text-muted-foreground">
                  We'll deliver your basket to your doorstep every week, fresh from the farm.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-4 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                  <Leaf className="h-8 w-8 text-emerald-600" />
                </div>
                <h3 className="text-xl font-bold text-emerald-700">Enjoy Farm-Fresh Food</h3>
                <p className="text-muted-foreground">
                  Savor the taste of fresh, locally-sourced produce and support Cyprus farmers.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Basket Options */}
        <section id="baskets" className="w-full py-12 md:py-24 bg-emerald-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                  Basket Options
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Choose the perfect basket to suit your needs
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-3 lg:gap-12">
              <BasketCard
                title="Trial Basket"
                description="Curious to taste the difference? Try our one-time basket packed with nature's best."
                price="Only €90"
                items={["15–20 handpicked seasonal items", "Up to 10 kg of fresh fruits, veggies, herbs & greens", "No commitment – just pure, farm-fresh flavor"]}
                imageSrc="/trialBasket.jpg"
                showWeekText={false}
                basketType={BasketType.TRIAL}
                viewText="View what's in season"
              />
              <BasketCard
                title="Standard Basket"
                description="Perfect for singles or couples who want a weekly dose of vibrant health."
                price="€85"
                items={["Weekly delivery for 1-2 people", "15–20 rotating seasonal items", "Up to 10 kg of fresh, nutrient-rich produce"]}
                imageSrc="/standardBasket.jpg"
                basketType={BasketType.STANDARD}
                viewText="See what's included this week"
              />
              <BasketCard
                title="Family Basket"
                description="Feeding the whole family? This one's for you."
                price="€140"
                items={["Weekly delivery for 3–5 people", "20+ rotating seasonal items", "Up to 20 kg of the healthiest food around"]}
                imageSrc="/familyBasket.jpg"
                basketType={BasketType.FAMILY}
                viewText="Discover this week's harvest"
              />
            </div>
          </div>
        </section>

        {/* Order Form */}
        <section id="order" className="w-full py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
                  Order Now
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Get fresh farm goods delivered to your doorstep
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
                  About Olive Tree
                </h2>
                <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  At Olive Tree, we believe real food comes from real farms. That's why we work with trusted local growers across Cyprus to deliver seasonal, sustainable produce straight to your door. No middlemen, no chemicals – just honest food that's good for you.
                  Let us take the hassle out of shopping so you can spend more time enjoying fresh, delicious meals with the people you love.
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
            <span>Olive Tree</span>
          </div>
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} Olive Tree. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

