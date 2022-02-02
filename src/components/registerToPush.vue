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
        apiKey: 'AIzaSyALnR3kHUwV2ptFuKYODfKxL7k1uTmdpfg',
        authDomain: 'develop-213311.firebaseapp.com',
        projectId: 'develop-213311',
        storageBucket: 'develop-213311.appspot.com',
        messagingSenderId: '106625671040',
        appId: '1:106625671040:web:ba3c6a788c1ab0db16ab65',
      }

      const app = initializeApp(firebaseConfig)
      console.log(app)
    })
  },
})
</script>
