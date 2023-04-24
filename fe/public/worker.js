self.addEventListener("push", e => {
    const data = e.data.json();
    self.registration.showNotification(
        data.title, // title of the notification
        {
            body: "Click here for more info", //the body of the push notification
            icon: "https://gpudriver.com/GPU_Driver_icon.png", // icon 
            data: {url: data.url}
        }
    );
});

self.addEventListener('notificationclick', e => {
    const url = e.notification.data.url;
    e.notification.close()
    clients.openWindow(url);
})