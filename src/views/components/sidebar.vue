<template>
  <ion-menu content-id="main-content">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>E-PALENGKE</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        <ion-menu-toggle>
          <ion-item @click="navigateTo({ name: 'HOME' })"><ion-icon slot="start"
              :icon="personCircle"></ion-icon>HOME</ion-item>
          <ion-item @click="navigateTo({ name: 'STORE' })"><ion-icon slot="start"
              :icon="storefront"></ion-icon>STORE</ion-item>
        </ion-menu-toggle>
        <ion-accordion-group>
          <ion-accordion value="first">
            <ion-item slot="header">
              <ion-icon slot="start" :icon="cart"></ion-icon><ion-label>ORDERS</ion-label>
            </ion-item>
            <ion-item v-if="USER_DETAILS.isSeller" style="padding-left: 40px;" slot="content"
              @click="navigateTo({ name: 'STORE ORDERS' })"><ion-icon slot="start"
                :icon="returnDownForwardOutline"></ion-icon>STORE</ion-item>
            <ion-item style="padding-left: 40px;" slot="content"
              @click="navigateTo({ name: 'CUSTOMER ORDERS' })"><ion-icon slot="start"
                :icon="returnDownForwardOutline"></ion-icon>CUSTOMER</ion-item>
            <ion-item v-if="USER_DETAILS.isDelivery" style="padding-left: 40px;" slot="content"
              @click="navigateTo({ name: 'DELIVERY' })"><ion-icon slot="start"
                :icon="returnDownForwardOutline"></ion-icon>DELIVERY</ion-item>
          </ion-accordion>
        </ion-accordion-group>
        <ion-menu-toggle>
          <!-- <ion-item @click="navigateTo({ name: 'TESTCAMERA' })">TEST-CAMERA</ion-item>
          <ion-item @click="navigateTo({ name: 'TESTGPS' })">TEST-GPS</ion-item>
          <ion-item @click="navigateTo({ name: 'TESTPUSHNOTIF' })">TEST-PUSH-NOTIFICATION</ion-item> -->
          <ion-item @click="logout"><ion-icon slot="start" :icon="logOutOutline"></ion-icon>Logout</ion-item>
        </ion-menu-toggle>
      </ion-list>
    </ion-content>
  </ion-menu>
</template>
  

<script setup lang="ts">
import { IonIcon, IonLabel, IonAccordion, IonAccordionGroup, IonRouterOutlet, IonButtons, IonContent, IonHeader, IonMenu, IonMenuButton, IonPage, IonTitle, IonToolbar, IonMenuToggle, IonItem, IonList } from '@ionic/vue';
import { returnDownForwardOutline, logOutOutline, cart, personCircle, storefront } from 'ionicons/icons';
import { useStore } from 'vuex';
import { useRoute, useRouter } from 'vue-router';
import { computed, ref } from 'vue';
import { watch, onBeforeUnmount } from 'vue';
import { PushNotifications } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';

const router = useRouter();
const currentRoute = useRoute();
const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const currentRouteName = computed(() => currentRoute.name);
let device_token = ref('');
import { isPlatform } from '@ionic/vue';

const logout = async () => {
  if (device_token.value != '') {
    const payload = { device_token: '' }
    await store.dispatch('UpdateDeviceToken', payload).then(() => {
      localStorage.setItem('e-palengke-token', '');
      router.replace({ name: 'LOGIN' });
    })
  }
  else {
    localStorage.setItem('e-palengke-token', '');
    router.replace({ name: 'LOGIN' });
  }
}


if (isPlatform('capacitor')) {
  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      // console.info('Registration token: ', token.value);
      // Toast.show({text: 'token: '+token.value});
      device_token.value = token.value
    });

    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
    });

    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      router.replace({ name: 'STORE ORDERS' });
      const notificationData =  (notification as any).notification.data
      const order_id = notificationData.order_id;
      const store_id = notificationData.store_id;
      const SELECTED_ORDER_DETAILS = {order_id:order_id, store_id:store_id}
      store.commit('SELECTED_ORDER_DETAILS',SELECTED_ORDER_DETAILS)
      store.commit('ORDER_DETAILS_DIALOG',true)
      // Toast.show({ text: 'order_id: ' + order_id });
    });
  }

  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
  addListeners()
  getDeliveredNotifications()
  registerNotifications()
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
  const menuController = document.querySelector('ion-menu');
  if (menuController) {
    await menuController.close();
  }
  await router.replace({ name: item.name });
};
</script>