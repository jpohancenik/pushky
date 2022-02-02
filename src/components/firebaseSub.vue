<template>
  <div>
    <h2>Push Subscription</h2>
    <p><b>Subscription status:</b> {{ subStatus }}</p>
    <div v-if="sub">
      <p>{{ serverKey }}</p>
      <button type="button" @click="unsubscribe">Unsubscribe</button>
    </div>

    <form v-else>
      <label>
        <span>FCM Web Push certificates Key pair</span>
        <br />
        <input type="text" v-model="serverKey" class="server-key__input" />
      </label>
      <button type="button" @click="subscribe">Subscribe</button>
    </form>
    <div class="sub-object-data-wrapper">
      <pre v-if="subObject !== defaultSubObjectValue" class="sub-object-data">
        {{ subObject }}
      </pre>
    </div>
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
    const sub = ref()
    const subObject = ref(defaultSubObjectValue)
    const serverKey = ref(
      'BCbyukXPL6gq6iOa7Zddxf1D73MLsZpX3SE15L5Hcqx-Bh1Iz9g0C6tkBqxG0MEgJAKr-dUIyL8HjtbT4yDBdO4'
    )

    const subscribe = async () => {
      await subscribeToPushServer(serverKey.value)
      await getSubscription()
    }

    const unsubscribe = async () => {
      if (sub) {
        await sub.value.unsubscribe()
      }
      await getSubscription()
    }

    const getSubscription = async () => {
      if (props.swr) {
        try {
          sub.value = await props.swr.pushManager.getSubscription()
          if (sub.value === null) {
            subStatus.value = 'Not subscribed to push service.'
            subObject.value = defaultSubObjectValue
          } else {
            subStatus.value = 'Subscribed to push service.'
            subObject.value = JSON.stringify(sub, undefined, 2)
          }
        } catch (err) {
          console.error('PushManager error: ', err)
        }
      }
    }

    watchEffect(async () => {
      await getSubscription()
    })

    return {
      sub,
      defaultSubObjectValue,
      subStatus,
      serverKey,
      subObject,
      subscribe,
      unsubscribe,
    }
  },
})
</script>

<style>
.server-key__input {
  width: 640px;
}

.sub-object-data-wrapper {
  max-width: 100%;
}

.sub-object-data {
  font-size: 0.75rem;
  text-align: left;
  max-width: 100%;
  overflow: auto;
}
</style>
