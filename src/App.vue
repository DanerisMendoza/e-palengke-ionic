<template>
  <ion-app>
    <Sidebar />
    <ion-router-outlet id="main-content"></ion-router-outlet>
  </ion-app>
</template>

<script lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import Sidebar from "@/views/components/sidebar.vue";

export default {
  components: {
    IonApp,
    IonRouterOutlet,
    Sidebar,
  },
  data() {
    return {
      currentRoute: '',
      showSidebar: true,
    };
  },
  methods: {
    updateCurrentRoute() {
      this.currentRoute = this.$route.name as string;
      this.showSidebar = this.currentRoute !== 'LOGIN';
    },
  },
  created() {
    this.$watch(
      () => this.$route.name,
      this.updateCurrentRoute,
      { immediate: true }
    );
  },
};
</script>
