import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="py-10 lg:py-16">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid items-center gap-8 lg:grid-cols-2">
          <header className="flex flex-col items-center text-center lg:items-start lg:text-left">
            <Badge variant="outline">
              🚀 Launch Faster
              <ArrowUpRight />
            </Badge>
            <h1 className="font-heading font-semibold my-4 text-4xl text-balance md:text-5xl lg:leading-14">
              All-in-One Platform for Managing Your SaaS
            </h1>
            <p className="text-muted-foreground mb-8 text-balance lg:text-lg">
              Streamline operations, track metrics, and scale your SaaS business with ease.
              Everything you need, in one powerful dashboard.
            </p>
            <div className="flex justify-center gap-2">
              <Button render={<Link href="https://app.yoursaas.com/signup" />} nativeButton={false}>Start Free Trial</Button>
              <Button variant="outline" render={<Link href="https://app.yoursaas.com/demo" />} nativeButton={false}>Request a Demo</Button>
            </div>
          </header>
          <img
            src="/hero.jpg"
            alt="Dashboard interface of the SaaS platform"
            className="aspect-square w-full rounded-md object-cover"
          />
        </div>
      </div>
    </section>
  );
}
