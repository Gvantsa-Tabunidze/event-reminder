import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push";


// ---------------------------
// 1. Setup Supabase client
// ---------------------------
const supabase = createClient(
  Deno.env.get("VITE_SUPABASE_URL")!,
  Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY")! // Service Role Key required for server-side updates
);

// ---------------------------
// 2. Setup VAPID keys
// ---------------------------
webpush.setVapidDetails(
  "mailto:gvantsaletta9@gmail.com", // your real email
  Deno.env.get("VITE_VAPID_PUBLIC_KEY")!,
  Deno.env.get("VITE_VAPID_PRIVATE_KEY")!
);
console.log('Public Key:', Deno.env.get("VITE_VAPID_PUBLIC_KEY"));
console.log('Private Key:', Deno.env.get("VITE_VAPID_PRIVATE_KEY"));

// ---------------------------
// 3. Edge function handler
// ---------------------------
serve(async () => {
  const now = new Date().toISOString();

  // Get pending notifications
  const { data: notifications, error } = await supabase
    .from("push_notifications")
    .select("id, event_id, user_id, events(title)")
    .eq("is_sent", false)
    .lte("notify_at", now);

  if (error) {
    console.error("DB fetch error:", error);
    return new Response("Database error", { status: 500 });
  }

  if (!notifications?.length) return new Response("No notifications", { status: 200 });

  for (const n of notifications) {
    // Get all subscriptions for the user
    const { data: subs } = await supabase
      .from("push_subscriptions")
      .select("subscription")
      .eq("user_id", n.user_id);

    if (!subs?.length) continue;

    // Send push notification
    for (const s of subs) {
      try {
        const subscription = typeof s.subscription === "string" ? JSON.parse(s.subscription) : s.subscription;
        console.log("Sending push to:", subscription.endpoint);
        await webpush.sendNotification(
          subscription,
          JSON.stringify({
            title: "Event Reminder",
            body: `Your event "${n.events[0].title}" is tomorrow!`,
            data: { url: `/event/${n.event_id}` },
          })
        );
      } catch (err) {
        console.error("Push send failed:", err);
      }
    }

    // Mark notification as sent
    await supabase
      .from("push_notifications")
      .update({ is_sent: true })
      .eq("id", n.id);
  }

  return new Response("Notifications processed successfully!", { status: 200 });
});
