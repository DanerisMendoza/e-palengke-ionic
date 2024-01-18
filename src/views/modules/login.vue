<template>
  <ion-page>
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Login</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="login-container">
        <ion-item>
          <ion-input v-model="username" placeholder="Username: "></ion-input>
        </ion-item>

        <ion-item>
          <ion-input type="password" v-model="password" placeholder="Password: "></ion-input>
        </ion-item>
        <ion-button @click="login">Login</ion-button>
      </div>

    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { useStore } from 'vuex';
import { alertController } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { PushNotifications } from '@capacitor/push-notifications';
import { Toast } from '@capacitor/toast';
import { isPlatform } from '@ionic/vue';

const store = useStore();
const router = useRouter();
const username = ref('');
const password = ref('');
let device_token = ref('');
const ionRouter = useIonRouter();

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

const login = async () => {
  try {
    const payload = {
      username: username.value,
      password: password.value,
    };

    const response = await store.dispatch('LOGIN', payload);

    if (response.message === 'success') {
      localStorage.setItem('e-palengke-token', response.token);
      await store.dispatch('GetSideNav').then((response) => {
        ionRouter.replace('/' + response[0].name);
        if (device_token.value != '') {
          const payload = { device_token: device_token.value }
          store.dispatch('UpdateDeviceToken', payload)
        }
      });
    } else if (response.message === 'not active') {
      const alert = await alertController.create({
        header: 'Warning',
        message: 'Your account is currently being reviewed. Please wait for activation!',
        buttons: ['OK'],
      });
      await alert.present();
    } else {
      const alert = await alertController.create({
        header: 'Warning',
        message: 'Credential incorrect. Please check your username or password!',
        buttons: ['OK'],
        cssClass: 'ios-alert'
      });
      await alert.present();
    }
  } catch (error) {
    console.error(error);
  }
};



</script>

<style scoped>
#login-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}

ion-item {
  margin-bottom: 16px;
}
</style>
