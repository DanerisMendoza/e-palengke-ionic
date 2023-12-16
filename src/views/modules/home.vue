<template>
  <ion-page>
    <!-- <sidebar /> -->
  </ion-page>
</template>

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import sidebar from "@/views/components/sidebar.vue";

const router = useRouter();
const logout = () => {
  localStorage.setItem('e-palengke-token', '');
  router.push({ name: 'LOGIN' });
}


</script>