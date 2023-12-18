<template>
  <ion-app>
    <Sidebar />
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Sidebar from "@/views/components/sidebar.vue";

</script>
