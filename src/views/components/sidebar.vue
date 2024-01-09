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
          <ion-item v-for="(item, index) in SIDE_NAV" :key="index" @click="navigateTo(item)">
            <!-- Use ion-icon if you have an icon property in your 'item' object -->
            <!-- <ion-icon slot="start" :icon="item.icon"></ion-icon> -->
            {{ item.name }}
          </ion-item>
          <ion-item @click="navigateTo({ name: 'TESTCAMERA' })">TEST-CAMERA</ion-item>
          <ion-item @click="navigateTo({ name: 'TESTGPS' })">TEST-GPS</ion-item>
          <ion-item @click="navigateTo({ name: 'TESTPUSHNOTIF' })">TEST-PUSH-NOTIFICATION</ion-item>
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
import { computed, ref } from 'vue';
import { watch, onBeforeUnmount } from 'vue';


const router = useRouter();
const currentRoute = useRoute();
const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const currentRouteName = computed(() => currentRoute.name);

const logout = async() => {
  const payload = { device_token: '' }
  await store.dispatch('UpdateDeviceToken', payload).then(()=>{
    localStorage.setItem('e-palengke-token', '');
    router.replace({ name: 'LOGIN' });
  })
}

const SIDE_NAV = computed(() => store.getters.SIDE_NAV);

const GetAllSideNav = async () => {
  await store.dispatch('GetSideNav')
}
const GetUserDetails = async () => {
  await store.dispatch('GetUserDetails').then(() => {
    // console.log(USER_DETAILS)
    store.commit('PROFILE_PATH', USER_DETAILS.value.base64img == null ? require("../../assets/sample.jpg") : USER_DETAILS.value.base64img)
  })
}

watch(() => currentRouteName.value, (newRoute, oldRoute) => {
  if (newRoute != 'LOGIN') {
    GetAllSideNav();
    GetUserDetails();
  }
});

if (currentRouteName.value != 'LOGIN') {
  GetAllSideNav();
  GetUserDetails();
}

const navigateTo = async (item: any) => {
  await router.replace({ name: item.name });
};
</script>