"use client";

import { useState } from "react";
import { Star, HeartIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductListOne from "@/app/_components/ProductListOne";

export default function page() {
    const [selectedImage, setSelectedImage] = useState(0);

    const images = [
        "/product.jpg",
        "/product.jpg",
        "/product.jpg",
        "/product.jpg"
    ];

    return (
        <main>
            <section className="py-10 lg:pt-20">
                <div className="mx-auto max-w-7xl px-4">
                    <div className="grid gap-8 lg:grid-cols-3">
                        <div className="col-span-2 flex flex-col-reverse gap-4 md:flex-row">
                            <div className="flex flex-row gap-2 md:flex-col md:gap-4">
                                {images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setSelectedImage(index)}
                                        className={cn(
                                            "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all md:h-24 md:w-24",
                                            selectedImage === index
                                                ? "border-foreground"
                                                : "border-border hover:border-muted-foreground"
                                        )}>
                                        <img
                                            src={image}
                                            alt={`Product view ${index + 1}`}
                                            className="h-full w-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>

                            <figure className="aspect-square flex-1 overflow-hidden rounded-lg border lg:max-h-4/5">
                                <img
                                    src={images[selectedImage]}
                                    alt="Nike Pegasus 41 shoes"
                                    className="h-full w-full object-cover"
                                />
                            </figure>
                        </div>

                        <div className="flex flex-col space-y-4 lg:space-y-6">
                            <div>
                                <h1 className="text-foreground font-heading text-3xl md:text-4xl">
                                    Nike Pegasus 41 shoes
                                </h1>

                                <div className="mt-4 flex items-center gap-2">
                                    <div className="flex gap-1">
                                        {[1, 2, 3, 4].map((star) => (
                                            <Star key={star} className="size-4 fill-amber-500 text-amber-500" />
                                        ))}
                                        <Star className="text-muted-foreground size-4" />
                                    </div>
                                    <span className="text-muted-foreground text-sm">(4)</span>
                                </div>
                            </div>

                            <div>
                                <p className="text-muted-foreground text-lg line-through">$189</p>
                                <p className="text-foreground text-3xl font-bold md:text-4xl">$159</p>
                                <p className="text-muted-foreground mt-1 text-sm">(inclusive of all taxes)</p>
                            </div>

                            <div className="text-sm">
                                <h2 className="text-foreground text-base font-semibold">About Product</h2>
                                <ul className="mt-4 space-y-3">
                                    <li className="text-muted-foreground flex items-start gap-3">
                                        <span className="bg-muted-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span>High-quality material</span>
                                    </li>
                                    <li className="text-muted-foreground flex items-start gap-3">
                                        <span className="bg-muted-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span>Comfortable for everyday use</span>
                                    </li>
                                    <li className="text-muted-foreground flex items-start gap-3">
                                        <span className="bg-muted-foreground mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" />
                                        <span>Available in different sizes</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="flex gap-3">
                                <Button variant="outline" size="lg">
                                    <HeartIcon />
                                    Add to Favorites
                                </Button>
                                <Button size="lg">Add to Cart</Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            
            <section>
                <ProductListOne />
            </section>
        </main>
    );
}
