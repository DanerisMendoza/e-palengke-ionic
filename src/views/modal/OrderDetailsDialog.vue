<template>
  <ion-modal :is-open="ORDER_DETAILS_DIALOG" @willPresent="onPresent">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-button @click="cancel()" fill="clear" slot="start">
          <ion-icon :icon="arrowBack" color="light"></ion-icon>
        </ion-button>
        <ion-title style="text-align: center; margin-right: 2rem;">ORDER DETAILS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content class="ion-padding">
      <ion-card v-for="item in ORDER_DETAILS">
        <ion-card-content>
          <ion-list>
            <ion-grid>
              <ion-row>
                <ion-col size="12">Product Name: {{ item.name }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12">Store Name: {{ item.store_name }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12">Quantity: {{ item.quantity }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12">Price: ₱{{ item.price }}</ion-col>
              </ion-row>
              <ion-row>
                <ion-col size="12">SubTotal: ₱{{ (item.price*item.quantity) }}</ion-col>
              </ion-row>
            </ion-grid>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-grid>
          <ion-row class="ion-align-items-center ">
            <ion-col size="12">
              <!-- <p>Total: ₱{{ SELECTED_ORDER_DETAILS.total }}</p> -->
            </ion-col>
          </ion-row>
          <ion-row class="ion-align-items-center ">
            <ion-col size="6">
              <ion-button :strong="true" fill="solid" color="danger">Decline Order</ion-button>
            </ion-col>
            <ion-col size="6">
              <ion-button :strong="true" fill="solid" color="primary">Accept Order</ion-button>
            </ion-col>
          </ion-row>
        </ion-grid>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>
  
<script setup lang="ts">
import {IonLabel, IonFooter, IonCol, IonRow, IonGrid, IonList, IonCardContent, IonModal, IonCard, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import { arrowBack, cart, time, alert } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const ORDER_DETAILS_DIALOG = computed(() => store.getters.ORDER_DETAILS_DIALOG);
const SELECTED_ORDER_DETAILS: any = computed(() => store.getters.SELECTED_ORDER_DETAILS);
const ORDER_DETAILS = computed(() => store.getters.ORDER_DETAILS);
const total = ref(null)
const onPresent = () => {
  console.log(SELECTED_ORDER_DETAILS.value)
  fetchOrderDetails()
}
const fetchOrderDetails = () => {
  const payload = {
    params: {
      order_id: SELECTED_ORDER_DETAILS.value.order_id,
      store_id: SELECTED_ORDER_DETAILS.value.store_id
    }
  }
  store.dispatch('GET_ORDER_DETAILS', payload).then(() => {
    // console.log(ORDER_DETAILS)
  })
}
const cancel = () => {
  store.commit('ORDER_DETAILS_DIALOG', false)
}
</script>