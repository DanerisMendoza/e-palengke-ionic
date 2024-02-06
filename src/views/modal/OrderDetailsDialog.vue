<template>
  <ion-modal :is-open="ORDER_DETAILS_DIALOG" @willPresent="onPresent" @didDismiss="onClose">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-button @click="cancel()" fill="clear" slot="start">
          <ion-icon :icon="arrowBack" color="light"></ion-icon>
        </ion-button>
        <ion-title style="text-align: center; margin-right: 2rem;">ORDER DETAILS</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-grid>
        <ion-row>
          <ion-col size="10" class="ion-padding-top">
            <!-- <center> -->
            ORDER STATUS: <strong>{{ ORDER_DETAILS[0]?.status }}</strong>
            <!-- </center> -->
          </ion-col>
          <ion-col size="2">
            <ion-button @click="track()">
              <ion-icon :icon="mapOutline"></ion-icon>
            </ion-button>
          </ion-col>
          <ion-col size="12">
            <ion-segment v-model="selectedSegment" :scrollable="true" @ionChange="segmentChange">
              <ion-segment-button value="Pending" color="danger">
                <ion-icon :icon="clipboardOutline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="Preparing">
                <ion-icon :icon="timeOutline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="To Ship">
                <ion-icon :icon="cubeOutline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="To Receive">
                <ion-icon :icon="bagAddOutline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="Received">
                <ion-icon :icon="bagCheckOutline"></ion-icon>
              </ion-segment-button>
              <ion-segment-button value="Completed">
                <ion-icon :icon="checkmarkDoneOutline"></ion-icon>
              </ion-segment-button>
            </ion-segment>
          </ion-col>
        </ion-row>
      </ion-grid>


      <ion-card v-for="item in ORDER_DETAILS">
        <ion-card-content>
          <ion-list>
            <ion-item lines="none">
              <ion-label size="12">Product Name: {{ item.name }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label size="12">Store Name: {{ item.store_name }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label size="12">Quantity: {{ item.quantity }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label size="12">Price: ₱{{ item.price }}</ion-label>
            </ion-item>
            <ion-item lines="none">
              <ion-label size="12">SubTotal: ₱{{ (item.price * item.quantity) }}</ion-label>
            </ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
    </ion-content>
    <ion-footer>
      <ion-toolbar>
        <ion-grid>
          <ion-row class="ion-align-items-center ">
            <ion-col size="12">
              <p>Date: <strong>{{ formatDate(SELECTED_ORDER_DETAILS.created_at) }}</strong></p>
              <p>Total: <strong>₱{{ total }}</strong></p>
            </ion-col>
          </ion-row>
        </ion-grid>
        <div v-if="route.name === 'STORE ORDERS'" style="display: flex; justify-content: space-between;">
          <ion-button v-if="ORDER_DETAILS[0]?.status == 'Pending'" :strong="true" fill="solid" color="danger"
            @click="DECLINE_ORDER" style="flex-grow: 1;">Decline Order</ion-button>
          <ion-button v-if="ORDER_DETAILS[0]?.status == 'Pending'" :strong="true" fill="solid" color="success"
            @click="ACCEPT_ORDER" style="flex-grow: 1;">Accept Order</ion-button>
          <ion-button v-if="ORDER_DETAILS[0]?.status == 'Preparing'" :strong="true" fill="solid" color="success"
            @click="ORDER_TO_SHIP" style="flex-grow: 1;" expand="block">SHIP</ion-button>
        </div>
      </ion-toolbar>
    </ion-footer>
  </ion-modal>
</template>
  
<script setup lang="ts">
import { alertController, IonLabel, IonFooter, IonCol, IonRow, IonGrid, IonList, IonCardContent, IonModal, IonCard, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import { bagAddOutline, mapOutline, bagHandleOutline, clipboardOutline, arrowBack, cart, time, alert, timeOutline, cubeOutline, bagCheckOutline, checkmarkDoneOutline } from 'ionicons/icons';
import { ref, onMounted, computed } from 'vue';
import { useStore } from 'vuex';
import { useRoute } from 'vue-router';
import moment from 'moment';
import { IonSegment, IonSegmentButton } from '@ionic/vue';
import { home, heart, pin, star, call, globe, basket, barbell, trash, person } from 'ionicons/icons'
import { Toast } from '@capacitor/toast';

const route = useRoute();
const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const ORDER_DETAILS_DIALOG = computed(() => store.getters.ORDER_DETAILS_DIALOG);
const SELECTED_ORDER_DETAILS: any = computed(() => store.getters.SELECTED_ORDER_DETAILS);
const ORDER_DETAILS: any = computed(() => store.getters.ORDER_DETAILS);
const selectedSegment = ref("Pending");
const selectedSegmentOrigin = ref("Pending");
const prop = defineProps(['viewer']);
// Toast.show({text: 'viewer: '+prop.viewer});
const total = computed(() => {
  // Calculate the total based on the sum of subtotals in ORDER_DETAILS
  if (ORDER_DETAILS.value) {
    return ORDER_DETAILS.value.reduce((acc: number, item: any) => {
      return acc + item.price * item.quantity;
    }, 0);
  }
  return 0; // Default value if ORDER_DETAILS is empty or undefined
});
const onPresent = () => {
  fetchOrderDetails()
  // initWebsockets()
  initWebsocketsPusher()
}
const onClose = () => {
  store.commit('ORDER_DETAILS_DIALOG', false)
}

const track = () => {

}

const segmentChange = () => {
  selectedSegment.value = selectedSegmentOrigin.value
}

const initWebsockets = async () => {
  const echo = window.echo;
  const Pusher = window.Pusher;
  echo.channel('channel-OrderDetailsEvent' + USER_DETAILS.value.user_id)
    .listen('OrderDetailsEvent', (data: any) => {
      fetchOrderDetails()
    });
  console.log(USER_DETAILS.value)
}

const initWebsocketsPusher = async () => {
  const pusher = window.Pusher;
  const channel = pusher.subscribe('channel-OrderDetailsEvent' + USER_DETAILS.value.user_id);
  channel.bind('OrderDetailsEvent', () => {
    fetchOrderDetails()
  });
}

const fetchOrderDetails = () => {
  const payload = {
    params: {
      order_id: SELECTED_ORDER_DETAILS.value.order_id,
      store_id: SELECTED_ORDER_DETAILS.value.store_id
    }
  }
  store.dispatch('GET_ORDER_DETAILS', payload).then(() => {
    // console.log(SELECTED_ORDER_DETAILS)
    // console.log(ORDER_DETAILS)
    selectedSegmentOrigin.value = ORDER_DETAILS.value[0]?.status
    selectedSegment.value = selectedSegmentOrigin.value
  })
}
const cancel = () => {
  store.commit('ORDER_DETAILS_DIALOG', false)
}

const ACCEPT_ORDER = async () => {
  const item = SELECTED_ORDER_DETAILS.value
  const payload = {
    customer_id: item.customer_id,
    order_id: item.order_id
  }

  await store.dispatch('ACCEPT_ORDER', payload).then(async (response) => {
    if (response === 'success') {
      store.commit('IS_ORDERS_CHANGE', true)
      fetchOrderDetails()
      const alert = await alertController.create({
        header: 'Success',
        message: 'Order Accept Success',
        buttons: ['OK'],
      });
      alert.present()
    }
  })
}

const ORDER_TO_SHIP = () => {
  const item = SELECTED_ORDER_DETAILS.value
  const payload = {
    customer_id: item.customer_id,
    order_id: item.order_id
  }
  store.dispatch('ORDER_TO_SHIP', payload).then(async (response) => {
    if (response === 'success') {
      store.commit('IS_ORDERS_CHANGE', true)
      fetchOrderDetails()
      const alert = await alertController.create({
        header: 'Success',
        message: 'Order To Ship Success',
        buttons: ['OK'],
      });
      alert.present()
    }
  })
}

const DECLINE_ORDER = () => {
  const item = SELECTED_ORDER_DETAILS.value
  const payload = {
    customer_id: item.customer_id,
    order_id: item.order_id
  }
  store.dispatch('DECLINE_ORDER', payload).then(async (response) => {
    if (response === 'success') {
      store.commit('IS_ORDERS_CHANGE', true)
      store.commit('ORDER_DETAILS_DIALOG', false)
      const alert = await alertController.create({
        header: 'Success',
        message: 'Decline Order Success',
        buttons: ['OK'],
      });
      alert.present()
    }
  })
}

const formatDate = (date: any) => {
  return moment(date).format('MMMM D, YYYY - hh:mm A')
};
</script>

<style>
ion-segment-button::part(indicator-background) {
  background: #3880ff;
}

/* Material Design styles */
ion-segment-button.md::part(native) {
  color: #000;
}

.segment-button-checked.md::part(native) {
  color: #3880ff;
}

ion-segment-button.md::part(indicator-background) {
  height: 4px;
}

/* iOS styles */
ion-segment-button.ios::part(native) {
  color: #3880ff;
}

.segment-button-checked.ios::part(native) {
  color: #fff;
}

ion-segment-button.ios::part(indicator-background) {
  border-radius: 20px;
}
</style>