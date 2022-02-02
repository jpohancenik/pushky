import { base64url } from 'rfc4648'

export const subscribeToPushServer = async (serverKey: string) => {
  const reg = await navigator.serviceWorker.ready

  try {
    return await reg.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: base64url.parse(serverKey, {
        loose: true,
      }),
    })
  } catch (e) {
    if (Notification.permission === 'denied') {
      console.warn('Permission for notifications was denied')
    } else {
      console.error('Unable to subscribe to push', e)
    }
  }

  return undefined
}
