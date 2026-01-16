import { supabase } from "@/api/supabaseClient";

export async function registerPush(vapidPublicKey: string): Promise<void> {
  if (!("serviceWorker" in navigator)) {
    console.log("Service workers not supported");
    return;
  }
  if (!("PushManager" in window)) {
    console.log("Push not supported");
    return;
  }

  // Register service worker
  let registration;
  try {
    registration = await navigator.serviceWorker.register("/sw.js");
    // console.log("Service worker registration succeeded", registration)
  } catch (err) {
    console.error("Service worker registration failed:", err);
    return;
  }

  
  // Ask for permission
  const permission = await Notification.requestPermission();
  console.log("Notification permission:", permission);
  if (permission !== "granted") {
    console.warn("Push permission denied");
    return;
  }

  // Convert VAPID key
  const urlBase64ToUint8Array = (base64: string) => {
    const padding = "=".repeat((4 - (base64.length % 4)) % 4);
    const safe = (base64 + padding).replace(/-/g, "+").replace(/_/g, "/");
    const rawData = atob(safe);
    return Uint8Array.from([...rawData].map((c) => c.charCodeAt(0)));
  };

  // Subscribe
  let subscription;
  try {
    subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(vapidPublicKey),
    });
    // console.log("Push subscription object:", subscription);
  } catch (err) {
    console.error("Push subscription failed:", err);
    return;
  }

  // Get user session
  const {data: { session }} = await supabase.auth.getSession();
  if (!session) return;

  // Save subscription
  try {
   const { data } = await supabase
  .from("push_subscriptions")
  .upsert(
    { user_id: session.user.id,
    subscription: subscription.toJSON()
    },
    { onConflict: "user_id" }
  )
  .select("*"); // returns the inserted/updated row
    console.log("Subscription saved:", data);
  } catch (err) {
    console.error("Failed to save subscription:", err);
  }
}
