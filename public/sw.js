self.addEventListener('push', (event)=>{
    //fallback if the push notifications are malformed or empty
    let payload = {
        title:'Remonder', 
        body:'You have an upcoming event'
    }
    try {
        if(event.data) payload = event.data.json()
    } catch (err) {
        console.log('Push payload parse error', err)
    }

    event.waitUntil(
        self.registration.showNotification(payload.title, {
            body: payload.body,      
            data: payload.data ?? {},
        })
    )
})


self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  const url = event.notification.data?.url || "/";
  event.waitUntil(clients.openWindow(url));
});