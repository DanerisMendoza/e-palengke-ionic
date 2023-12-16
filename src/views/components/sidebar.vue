<template>
  <ion-page>
    <ion-menu ref="menu" content-id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>E-palengke</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content>
        <ion-list>
          <ion-menu-toggle>
          <ion-item v-for="(item, index) in sideNav" :key="index" @click="navigateTo(item)">
            <!-- Use ion-icon if you have an icon property in your 'item' object -->
            <!-- <ion-icon slot="start" :icon="item.icon"></ion-icon> -->
            {{ item.name }}
          </ion-item>
          </ion-menu-toggle>
          <ion-item @click="logout">Logout</ion-item>
        </ion-list>
      </ion-content>
    </ion-menu>
    <ion-page id="main-content">
      <ion-header>
        <ion-toolbar>
          <ion-buttons slot="start">
            <ion-menu-button></ion-menu-button>
          </ion-buttons>
          <ion-title>{{ $route.name }}</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding"> Tap the button in the toolbar to open the menu. </ion-content>
    </ion-page>
  </ion-page>
</template>
  

<script setup lang="ts">
import { IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonButton, IonCol, IonRow, IonMenuToggle, IonItem, IonList } from '@ionic/vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const store = useStore();
const sideNav = ref([]);

const logout = () => {
  localStorage.setItem('e-palengke-token', '');
  router.push({ name: 'LOGIN' });
}

const navigateTo = (item) => {
  if (item.side_nav_children && item.side_nav_children.length > 0) {
    // Handle dropdown logic if needed
  } else {
    //close the menu here
    router.push({ name: item.name });
  }
}

store.dispatch('GetSideNav').then((response) => {
  sideNav.value = response;
  console.log(response)
});

</script>

<style scoped>
.row-with-background {
  background-color: #f7f7f7;
  /* Replace with your desired background color */
}
</style>
