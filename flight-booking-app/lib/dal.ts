import "server-only";
import { cache } from "react";
import { redirect } from "next/navigation";
import { getSessionUserId } from "@/lib/session";
import { findUserById, type User } from "@/lib/db";

export type SafeUser = Pick<User, "id" | "name" | "email" | "createdAt">;

export const getCurrentUser = cache(async (): Promise<SafeUser | null> => {
  const userId = await getSessionUserId();
  if (!userId) return null;
  const user = await findUserById(userId);
  if (!user) return null;
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    createdAt: user.createdAt,
  };
});

export async function verifySession(): Promise<{
  isAuth: true;
  userId: string;
}> {
  const userId = await getSessionUserId();
  if (!userId) {
    redirect("/login");
  }
  return { isAuth: true, userId };
}

export async function requireUser(): Promise<SafeUser> {
  const user = await getCurrentUser();
  if (!user) {
    redirect("/login");
  }
  return user;
}
