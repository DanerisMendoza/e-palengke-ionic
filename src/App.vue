<template>
  <ion-app>
    <ion-router-outlet />
    <sidebar v-if="showSidebar" :currentRoute="currentRoute" />
  </ion-app>
</template>

<script lang="ts">
import { ref, onMounted, watch } from 'vue';
import { useRoute } from 'vue-router';
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
      this.currentRoute = this.$route.name;
      console.log('Current Route:', this.currentRoute);
      this.showSidebar = this.currentRoute !== 'LOGIN';
    },
  },
  created() {
    // Log the initial route for debugging
    console.log('Initial Route:', this.currentRoute);

    // Watch for route changes
    this.$watch(
      () => this.$route.name,
      this.updateCurrentRoute,
      { immediate: true }
    );
  },
};
</script>
