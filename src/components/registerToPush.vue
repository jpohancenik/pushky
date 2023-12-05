<template>
  <div>
    <h2>Firebase integration</h2>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import firebase from 'firebase/compat'
import initializeApp = firebase.initializeApp

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
      console.log(app)
    })
  },
})
</script>
