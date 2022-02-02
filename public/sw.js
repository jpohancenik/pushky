self.addEventListener('push', function (e) {
  console.log('SW push received')
  let body

  if (e.data) {
    body = e.data.text()
  } else {
    body = 'Push message no payload'
  }

  const options = {
    body,
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  }
  e.waitUntil(self.registration.showNotification('Push Notification', options))
})
