<template>
  <ion-app>
    <Sidebar />
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Sidebar from "@/views/components/sidebar.vue";
import { StatusBar, Style } from '@capacitor/status-bar';

StatusBar.setBackgroundColor({color:'#3880ff'})
</script>

<style>
/* Add the following styles to make the notch translucent */
.toolbar-background-md,
.toolbar-background-ios,
.toolbar-background-wp {
  background-color: rgba(255, 255, 255, 0.8);
}

ion-app {
  --ion-safe-area-top: 0px;
  /* Adjust this value based on your design */
}

ion-header {
  --ion-background-color: rgba(255, 255, 255, 0.8);
  /* Adjust the alpha value for transparency */
}

ion-content {
  --ion-background-color: rgba(255, 255, 255, 0.8);
  /* Adjust the alpha value for transparency */
}</style>

