<template>
    <ion-page>
      <Toolbar />
      <ion-content>
        <ion-button @click="registerNotifications">register</ion-button>
        <ion-button @click="getDeliveredNotifications">notification</ion-button>
      </ion-content>
    </ion-page>
  </template>
  
  <script setup lang="ts">
  import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
  import { menu } from 'ionicons/icons';
  import Toolbar from "@/views/components/toolbar.vue";
  import { PushNotifications } from '@capacitor/push-notifications';
  import { Toast } from '@capacitor/toast';

  Toast.show({text: 'setup',});
  
  const addListeners = async () => {
    await PushNotifications.addListener('registration', token => {
      console.info('Registration token: ', token.value);
      Toast.show({text: 'Registration token: '+token.value});
    });
    
    await PushNotifications.addListener('registrationError', err => {
      console.error('Registration error: ', err.error);
      Toast.show({text: 'Registration error: '+err.error});
    });
    
    await PushNotifications.addListener('pushNotificationReceived', notification => {
      console.log('Push notification received: ', notification);
      Toast.show({text: 'notification: '+notification});
    });
    
    await PushNotifications.addListener('pushNotificationActionPerformed', notification => {
      console.log('Push notification action performed', notification.actionId, notification.inputValue);
      Toast.show({text: 'notification: '+notification.actionId+' '+notification.inputValue});
    });
  }
  
  addListeners()
  
  const registerNotifications = async () => {
    let permStatus = await PushNotifications.checkPermissions();
  
    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }
  
    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }
    if(permStatus.receive === 'granted'){
      try {
        await PushNotifications.register()
      } catch (e) {
        Toast.show({text: 'notification: '+JSON.stringify(e)});
      }
    }
  
    await PushNotifications.register();
  }
  
  const getDeliveredNotifications = async () => {
    const notificationList = await PushNotifications.getDeliveredNotifications();
    console.log('delivered notifications', notificationList);
  }
  
  </script>