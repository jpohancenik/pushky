import { base64url } from 'rfc4648'

export const subscribeToPushServer = async (serverKey: string) => {
  const reg = await navigator.serviceWorker.ready

  reg.pushManager
    .subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64url.parse(serverKey, {
        loose: true,
      }),
    })
    .then(function (sub) {
      console.log('Subscription', sub)
    })
    .catch(function (e) {
      if (Notification.permission === 'denied') {
        console.warn('Permission for notifications was denied')
      } else {
        console.error('Unable to subscribe to push', e)
      }
    })
}
