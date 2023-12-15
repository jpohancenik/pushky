<template>
  <div>
    <h2>Firebase integration</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { initializeApp } from 'firebase/app';
import { getMessaging, getToken } from 'firebase/messaging';


export default defineComponent({
  props: {
    swr: {
      type: ServiceWorkerRegistration,
      default: null,
    },
  },

  setup(props) {
    onMounted(() => {
      console.log(props, props.swr)

      const firebaseConfig = {
        apiKey: 'AIzaSyArFhhaSl5ek7sCiipFYFZ4wned0g_vwp0',
        authDomain: 'sazkamobil-test.firebaseapp.com',
        projectId: 'sazkamobil-test',
        storageBucket: 'sazkamobil-test.appspot.com',
        messagingSenderId: '668904320346',
        appId: '1:668904320346:web:cfd8e9af4504945b091763'
      };

      const app = initializeApp(firebaseConfig)
      const messaging = getMessaging(app);

      getToken(messaging, {vapidKey: 'BCbyukXPL6gq6iOa7Zddxf1D73MLsZpX3SE15L5Hcqx-Bh1Iz9g0C6tkBqxG0MEgJAKr-dUIyL8HjtbT4yDBdO4'}).then((currentToken) => {
        if (currentToken) {
          // Send the token to your server and update the UI if necessary
          // ...
        } else {
          // Show permission request UI
          console.log('No registration token available. Request permission to generate one.');
          // ...
        }
      }).catch((err) => {
        console.log('An error occurred while retrieving token. ', err);
        // ...
      });

      console.log(app)
    })
  },
})
</script>
