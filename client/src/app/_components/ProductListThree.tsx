import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const products = [
  {
    title: "White crew-Neck T-Shirt",
    image: "/product.jpg",
    price: "$129.00",
    badge: "New Season"
  },
  {
    title: "White crew-Neck T-Shirt",
    image: "/product.jpg",
    price: "$49.00",
    badge: "Best Seller"
  },
  {
    title: "White crew-Neck T-Shirt",
    image: "/product.jpg",
    price: "$39.00",
    badge: "New Season"
  },
  {
    title: "White crew-Neck T-Shirt",
    image: "/product.jpg",
    price: "$19.00",
    badge: "Best Seller"
  }
];

export type ProductListThree = (typeof products)[number];

export default function ProductListThree() {
  return (
    <section className="py-10 lg:py-20">
      <div className="mx-auto max-w-7xl px-4">
        <header className="mb-4 flex items-end justify-between space-y-2">
          <h2 className="font-heading text-xl md:text-2xl">Similar Products</h2>
          <Button variant="link" size="sm" className="px-0!" render={<Link href="#" />} nativeButton={false}>Show more products
                                <ChevronRight className="size-3.5" /></Button>
        </header>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {products.map((product, i) => (
            <Product key={i} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
}

const Product = ({ product }: { product: ProductListThree }) => (
  <Link href="#" className="group">
    <figure className="relative aspect-square w-full overflow-hidden rounded-md object-cover">
      <Image
        fill
        className="object-cover transition-all duration-300 group-hover:scale-105 group-hover:opacity-80"
        src={product.image}
        alt={product.title}
      />
      <Badge variant="secondary" className="absolute inset-e-2 top-2 bg-white/30 dark:bg-black/30">
        {product.badge}
      </Badge>
    </figure>
    <div className="mt-3 space-y-0.5">
      <p className="font-medium">{product.title}</p>
      <p className="text-muted-foreground">{product.price}</p>
      <Button variant="secondary" className="mt-3 w-full">
        Add to Cart
      </Button>
    </div>
  </Link>
);
