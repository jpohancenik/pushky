<template>
  <div>
    <h2>Push Subscription</h2>
    <p><b>Subscription status:</b> {{ subStatus }}</p>
    <form>
      <label>
        <span>FCM Web Push certificates Key pair</span>
        <br />
        <input type="text" v-model="serverKey" class="server-key__input" />
      </label>
      <button type="button" @click="subscribe">Subscribe</button>
    </form>
    <pre v-if="subObject !== defaultSubObjectValue">
      {{ subObject }}
    </pre>
  </div>
</template>

<script lang="ts">
import { subscribeToPushServer } from '../composables/global'
import { defineComponent, ref, watchEffect } from 'vue'

export default defineComponent({
  props: {
    swr: {
      type: ServiceWorkerRegistration,
    },
  },

  setup(props) {
    const defaultSubObjectValue = '...'
    const subStatus = ref('...')
    const subObject = ref(defaultSubObjectValue)
    const serverKey = ref(
      'BCbyukXPL6gq6iOa7Zddxf1D73MLsZpX3SE15L5Hcqx-Bh1Iz9g0C6tkBqxG0MEgJAKr-dUIyL8HjtbT4yDBdO4'
    )
    const subscribe = async () => {
      await subscribeToPushServer(serverKey.value)
    }

    watchEffect(async () => {
      if (props.swr) {
        console.log(props.swr)
        // getting push subscription
        try {
          const sub = await props.swr.pushManager.getSubscription()
          if (sub === null) {
            subStatus.value = 'Not subscribed to push service.'
            subObject.value = defaultSubObjectValue
          } else {
            subStatus.value = 'Subscribed to push service.'
            subObject.value = JSON.stringify(sub)
            // sub.unsubscribe()
          }
        } catch (err) {
          console.error('PushManager error: ', err)
        }
      }
    })

    return {
      defaultSubObjectValue,
      subStatus,
      serverKey,
      subObject,
      subscribe,
    }
  },
})
</script>

<style>
.server-key__input {
  width: 640px;
}
</style>
