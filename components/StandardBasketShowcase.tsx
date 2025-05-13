import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export function StandardBasketShowcase() {
  return (
    <section className="w-full py-12 md:py-24 bg-white">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
          <div className="inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">Real Example</div>
          <div className="space-y-2 flex flex-col items-center">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-emerald-800">
              This is what our Standard Basket looks like 😍
            </h2>
            <p className="max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              We select everything so that the combinations of vegetables, fruits, and greens cover all the basic needs
              for the week.
            </p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-8 items-stretch">
          {/* Polaroid-style image on the left */}
          <div className="w-full md:w-1/2 flex items-center justify-center">
            {/* Authentic Polaroid frame */}
            <div className="bg-white rounded-sm shadow-md transform rotate-[-2deg] transition-transform hover:rotate-0 duration-300 relative">
              {/* This creates the Polaroid proportions with padding */}
              <div className="p-3 pb-16">
                {/* Image container with fixed dimensions */}
                <div className="w-[300px] h-[380px] relative bg-gray-50">
                  <Image
                    src="/basketPhoto.jpeg"
                    alt="Standard Basket with fresh produce"
                    width={300}
                    height={380}
                    priority
                    style={{
                      height: '100%',
                    }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Content on the right */}
          <div className="w-full md:w-1/2">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-2xl text-emerald-700">What's in the set:</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍊</span>
                    <div>
                      <p className="font-medium">Citrus fruits (grapefruit, oranges, lemons)</p>
                      <p className="text-muted-foreground">A vitamin boost!</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍑</span>
                    <div>
                      <p className="font-medium">Juicy fruits</p>
                      <p className="text-muted-foreground">Loquat, bananas, apricots</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🍅</span>
                    <div>
                      <p className="font-medium">Vegetables</p>
                      <p className="text-muted-foreground">
                        Tomatoes, peppers, beets, potatoes, eggplants, zucchini, cucumbers
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥬</span>
                    <div>
                      <p className="font-medium">Greens</p>
                      <p className="text-muted-foreground">
                        Dill, parsley, spinach, cilantro, basil — for aroma and vitamins
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥑</span>
                    <div>
                      <p className="font-medium">Extras for variety</p>
                      <p className="text-muted-foreground">Avocado, honey, and mushrooms</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <span className="text-xl">🥬</span>
                    <div>
                      <p className="font-medium">For healthy eating enthusiasts</p>
                      <p className="text-muted-foreground">Cabbage (white and cauliflower) and taro</p>
                    </div>
                  </div>
                </div>

                <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                  <p className="text-sm text-muted-foreground">
                    The set may vary depending on the season and preferences — just write to us or indicate your wishes
                    when filling out the form.
                  </p>
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-emerald-600 hover:bg-emerald-700">Order Standard Basket Now</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
} 