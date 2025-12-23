// import { serve } from "https://deno.land/std/http/server.ts";
// import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
// import webpush from "npm:web-push";


// // ---------------------------
// // 1. Setup Supabase client
// // ---------------------------
// const supabase = createClient(
//   Deno.env.get("VITE_SUPABASE_URL")!,
//   Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY")! // Service Role Key required for server-side updates
// );

// // ---------------------------
// // 2. Setup VAPID keys
// // ---------------------------
// webpush.setVapidDetails(
//   "mailto:gvantsaletta9@gmail.com", // your real email
//   Deno.env.get("VITE_VAPID_PUBLIC_KEY")!,
//   Deno.env.get("VITE_VAPID_PRIVATE_KEY")!
// );
// console.log('Public Key:', Deno.env.get("VITE_VAPID_PUBLIC_KEY"));
// console.log('Private Key:', Deno.env.get("VITE_VAPID_PRIVATE_KEY"));

// // ---------------------------
// // 3. Edge function handler
// // ---------------------------
// const corsHeaders = {
//   "Access-Control-Allow-Origin": "*",
//   "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
//   "Access-Control-Allow-Methods": "POST, OPTIONS",
// };

// serve(async (req) => {
//   if (req.method === "OPTIONS") return new Response("ok", { headers: corsHeaders });

//   const now = new Date().toISOString();

//   // 1. Fetch notifications AND titles in ONE query to save resources
//   const { data: notifications, error } = await supabase
//     .from("push_notifications")
//     .select(`
//       id, 
//       event_id, 
//       user_id, 
//       title
//     `)
//     .eq("is_sent", false)
//     .lte("notify_at", now);

//   if (error) return new Response("Database error", { status: 500 });
//   if (!notifications?.length) return new Response("No notifications", {
//      status: 200,
//      headers: { ...corsHeaders, "Content-Type": "application/json" } 
//     });

//   for (const n of notifications) {
//   console.log("DEBUG: Raw Object Keys:", Object.keys(n));
//   console.log("DEBUG: Stringified Object:", JSON.stringify(n));

//     // const eventTitle = n.title || (Array.isArray(n.events) ? n.events[0]?.title : n.events?.title) || "Upcoming Event";
//     const eventTitle = n.title ?? "your event";
//     console.log(`Processing Notification ${n.id} with title: ${eventTitle}`);

//     console.log(`Sending notification for: ${eventTitle}`);
//     const { data: subs } = await supabase
//       .from("push_subscriptions")
//       .select("subscription")
//       .eq("user_id", n.user_id);

//     if (!subs?.length) continue;

//     for (const s of subs) {
//       try {
//         const subscription = typeof s.subscription === "string" 
//           ? JSON.parse(s.subscription) 
//           : s.subscription;

//         // 3. Send the payload
//         await webpush.sendNotification(
//           subscription,
//           JSON.stringify({
//             title: "Event Reminder",
//             body: `Your event "${eventTitle}" is tomorrow!`,
//             data: { url: `/event/${n.event_id}` },
//           })
//         );
//       } catch (err) {
//         console.error("Push send failed:", err);
//       }
//     }

//     // Mark as sent
//     await supabase.from("push_notifications").update({ is_sent: true }).eq("id", n.id);
//   }

   
//     return new Response(JSON.stringify({ success: true }), {
//       status: 200,
//       headers: { ...corsHeaders, "Content-Type": "application/json" },
//     });

 
// });



import { serve } from "https://deno.land/std/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import webpush from "npm:web-push";

// ---------------------------
// 1. Setup Supabase client
// ---------------------------
const supabase = createClient(
  Deno.env.get("VITE_SUPABASE_URL")!,
  Deno.env.get("VITE_SUPABASE_SERVICE_ROLE_KEY")!
);

// ---------------------------
// 2. Setup VAPID keys
// ---------------------------
webpush.setVapidDetails(
  "mailto:gvantsaletta9@gmail.com",
  Deno.env.get("VITE_VAPID_PUBLIC_KEY")!,
  Deno.env.get("VITE_VAPID_PRIVATE_KEY")!
);

// ---------------------------
// 3. CORS Configuration
// ---------------------------
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

serve(async (req) => {
  // Handle Preflight OPTIONS request
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const now = new Date().toISOString();

    // Fetch notifications with the title column
    const { data: notifications, error } = await supabase
      .from("push_notifications")
      .select("id, event_id, user_id, title")
      .eq("is_sent", false)
      .lte("notify_at", now);

    if (error) throw error;

    if (!notifications?.length) {
      return new Response(JSON.stringify({ message: "No notifications" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    for (const n of notifications) {
      // Use the local title column from the notification table
      const eventTitle = n.title || "Upcoming Event";
      
      console.log(`Processing Notification ${n.id} with title: ${eventTitle}`);

      const { data: subs } = await supabase
        .from("push_subscriptions")
        .select("subscription")
        .eq("user_id", n.user_id);

      if (!subs?.length) continue;

      for (const s of subs) {
        try {
          const subscription = typeof s.subscription === "string" 
            ? JSON.parse(s.subscription) 
            : s.subscription;

          await webpush.sendNotification(
            subscription,
            JSON.stringify({
              title: "Event Reminder",
              body: `Your event "${eventTitle}" is tomorrow!`,
              data: { url: `/event/${n.event_id}` },
            })
          );
        } catch (err) {
          console.error("Push send failed for sub:", err);
        }
      }

      // Mark as sent
      await supabase.from("push_notifications").update({ is_sent: true }).eq("id", n.id);
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });

  } catch (err) {
    console.error("Function error:", err.message);
    return new Response(JSON.stringify({ error: err.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});