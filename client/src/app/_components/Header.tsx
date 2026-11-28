"use client";

import { cn } from "@/lib/utils";
import { useScroll } from "@/hooks/use-scroll";
import { Button } from "@/components/ui/button";
import { DesktopNav } from "./desktop-nav";
import { MobileNav } from "./mobile-nav";
import Image from "next/image";
import Link from "next/link";
import { useAuthStore } from "@/store/useAuthStore";
import { useLogout } from "@/hooks/use-logout";

export function Header() {
	const scrolled = useScroll(10);
	const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
	const isInitializing = useAuthStore((state) => state.isInitializing);
	const user = useAuthStore((state) => state.user);
	const logout = useLogout();

	return (
		<header
			className={cn("sticky top-0 z-50 w-full border-transparent border-b", {
				"border-border bg-background/95 backdrop-blur-sm supports-backdrop-filter:bg-background/50":
					scrolled,
			})}
		>
			<nav className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between px-4">
				<div className="flex items-center gap-5">
					<a
						className="rounded-lg px-3 py-2.5 hover:bg-muted dark:hover:bg-muted/50"
						href="#"
					>
						<Image className="text-white" src="/logo.svg" alt="Logo" width={40} height={40} />
					</a>
					<DesktopNav />
				</div>
				<div className="hidden items-center gap-2 md:flex">
					{isInitializing ? null : isAuthenticated ? (
						<>
							<Link href="/dashboard">
								<Button variant="outline">{user?.userName ?? "Dashboard"}</Button>
							</Link>
							<Button onClick={logout}>Log out</Button>
						</>
					) : (
						<>
							<Link href="/login"><Button variant="outline">Sign In</Button></Link>
							<Link href="/signup"><Button>Get Started</Button></Link>
						</>
					)}
				</div>
				<MobileNav />
			</nav>
		</header>
	);
}
