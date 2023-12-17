<template>
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
          <ion-item @click="logout">Logout</ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
  

<script setup lang="ts">
import { IonRouterOutlet, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonMenuToggle, IonItem, IonList } from '@ionic/vue';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { ref } from 'vue';

const router = useRouter();
const store = useStore();

const logout = () => {
  localStorage.setItem('e-palengke-token', '');
  router.push({ name: 'LOGIN' });
}

const getAllSideNav = async () => {
  await store.dispatch('GetSideNav').then((response) => {
    sideNav.value = response;
    console.log(response)
  });
}

getAllSideNav()

const sideNav = ref<SidebarItem[]>([
  { name: 'Item 1' },
  { name: 'Item 2' },
  // Add more items with the required properties
]);

interface SidebarItem {
  name: string;
  side_nav_children?: SidebarItem[];
  // Add other properties as needed
}


const navigateTo = (item: SidebarItem) => {
  if (item.side_nav_children && item.side_nav_children.length > 0) {
    // Handle dropdown logic if needed
  } else {
    // close the menu here
    router.push({ name: item.name });
  }
};



</script>