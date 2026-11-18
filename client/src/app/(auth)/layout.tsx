import { GalleryVerticalEndIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";


export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="grid min-h-svh lg:grid-cols-2">
                <div className="flex flex-col gap-4 p-6 md:p-10">
                    <div className="flex justify-center gap-2 md:justify-start">
                        <Link href="/" className="flex items-center gap-2 font-medium">
                            <div className="flex size-6 items-center justify-center rounded-md text-primary-foreground">
                                <Image
                                    src="/logo.svg"
                                    alt="Logo"
                                    width={40}
                                    height={40}
                                />
                            </div>
                            Ahmad Siddique
                        </Link>
                    </div>
                    <div className="flex flex-1 items-center justify-center">
                        <div className="w-full max-w-xs">
                            {children}
                        </div>
                    </div>
                </div>
                <div className="relative hidden bg-muted lg:block">
                    <Image
                        loading="eager"
                        height={600}
                        unoptimized
                        width={600}
                        src="/placeholder.webp"
                        alt="Image"
                        className="absolute inset-0 h-full w-full object-cover dark:grayscale"
                    />
                </div>
            </div>
        </>
    )
}
