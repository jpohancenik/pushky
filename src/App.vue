<template>
  <div>
    <h1>Pushky</h1>
    <p>
      <b>Notification permission status:</b> {{ notificationPermissionStatus }}
    </p>

    <button
      v-if="notificationPermissionStatus === 'granted' && swr"
      type="button"
      @click="tryLocalPushNotification"
    >
      Try local push notification
    </button>

    <!--    <register-to-push :swr="swr"></register-to-push>-->
    <firebase-sub :swr="swr"></firebase-sub>
  </div>
</template>

<script lang="ts">
// import RegisterToPush from './components/registerToPush.vue'
import { onMounted, ref } from 'vue'
import FirebaseSub from './components/firebaseSub.vue'

export default {
  components: {
    FirebaseSub,
    // RegisterToPush,
  },

  setup() {
    const notificationPermissionStatus = ref('...')
    const swr = ref()

    const tryLocalPushNotification = () => {
      const options = {
        body: 'Here is a notification body!',
        vibrate: [100, 50, 100],
        data: {
          dateOfArrival: Date.now(),
          primaryKey: 1,
        },
      }

      swr.value.showNotification('Local notification works!', options)
    }

    onMounted(async () => {
      console.log('Registering service worker')

      // registering service worker
      try {
        swr.value = await navigator.serviceWorker.register('/sw.js', {
          updateViaCache: 'none',
        })
      } catch (err) {
        console.error('Service Worker registration failed: ', err)
      }

      await Notification.requestPermission((status) => {
        notificationPermissionStatus.value = status
      })
    })

    return {
      notificationPermissionStatus,
      swr,
      tryLocalPushNotification,
    }
  },
}
</script>

<style>
html,
body {
  font-family: 'Open Sans', sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin: 0;
}
</style>
