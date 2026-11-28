"use client";

import { Button } from "@/components/ui/button";
import { useLogout } from "@/hooks/use-logout";
import { useAuthStore } from "@/store/useAuthStore";

export default function DashboardPage() {
  const user = useAuthStore((state) => state.user);
  const logout = useLogout();

  return (
    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            You are signed in{user ? ` as ${user.fullName}` : ""}.
          </p>
        </div>
        <Button variant="outline" onClick={logout}>
          Log out
        </Button>
      </div>

      {user && (
        <dl className="grid gap-2 rounded-lg border p-4 text-sm">
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Username</dt>
            <dd>{user.userName}</dd>
          </div>
          <div className="flex justify-between gap-4">
            <dt className="text-muted-foreground">Email</dt>
            <dd>{user.email}</dd>
          </div>
        </dl>
      )}
    </div>
  );
}
