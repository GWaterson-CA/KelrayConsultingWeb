import type { User } from "@supabase/supabase-js";
import { unstable_noStore as noStore } from "next/cache";

import { hasSupabaseEnv } from "@/lib/supabase/env";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type AdminSession = {
  enabled: boolean;
  user: User | null;
  isAdmin: boolean;
};

export async function getAdminSession(): Promise<AdminSession> {
  noStore();

  if (!hasSupabaseEnv) {
    return { enabled: false, user: null, isAdmin: false };
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { enabled: true, user: null, isAdmin: false };
  }

  const { data } = await supabase
    .from("admin_users")
    .select("user_id")
    .eq("user_id", user.id)
    .maybeSingle();

  return { enabled: true, user, isAdmin: Boolean(data) };
}

export async function assertAdmin() {
  const session = await getAdminSession();

  if (!session.enabled) {
    throw new Error("Supabase is not configured.");
  }

  if (!session.user || !session.isAdmin) {
    throw new Error("Not authorized.");
  }

  return session;
}
