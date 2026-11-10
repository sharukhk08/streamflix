import { createBrowserClient } from "@supabase/ssr";

// Demo mode: a tiny stand-in so account screens work without a database.
const demoUser = {
  id: "demo-user",
  email: "demo@streamflix.example",
  user_metadata: { displayName: "Demo User" },
};
const ok = async () => ({ data: { user: demoUser }, error: null });
const demoClient: any = {
  auth: {
    getUser: ok,
    updateUser: ok,
    signInWithPassword: ok,
    signUp: ok,
    signOut: async () => ({ error: null }),
  },
};

export const createClient = () =>
  process.env.NEXT_PUBLIC_DEMO_MODE === "true"
    ? demoClient
    : createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
      );
