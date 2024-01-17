<template>
    <ion-card v-for="item in ORDERS">
        <ion-card-content>
            <ion-grid>
                <ion-row>
                    <ion-col size="11">
                        <ion-list v-if="prop.viewer == 'customer'">
                            <ion-item>
                                <ion-label>{{ formatDate(item.created_at) }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Store Name: {{ item.name }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Status: {{ item.status }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Total: ₱{{ item.total }}</ion-label>
                            </ion-item>
                        </ion-list>
                        <ion-list v-else-if="prop.viewer == 'store'">
                            <ion-item>
                                <ion-label>{{ formatDate(item.created_at) }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Customer Name: {{ item.customer_name }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Status: {{ item.status }}</ion-label>
                            </ion-item>
                            <ion-item>
                                <ion-label>Total: ₱{{ item.total }}</ion-label>
                            </ion-item>
                        </ion-list>
                    </ion-col>
                    <ion-col size="1">
                        <ion-button>
                            <ion-icon :icon="chevronForwardOutline"></ion-icon>
                        </ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-card-content>
    </ion-card>
</template>
  
<script setup lang="ts">
import { onIonViewDidEnter, IonRow, IonCol, IonGrid, IonTabBar, IonCardContent, IonList, IonLabel, IonCard, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { chevronForwardOutline, menu, closeOutline } from 'ionicons/icons';
import { onIonViewWillEnter } from '@ionic/vue';
import Toolbar from "../components/toolbar.vue";
import { useStore } from 'vuex';
import { computed, ref, onMounted, defineComponent, inject } from 'vue';
import moment from 'moment';
import { mapGetters } from "vuex";

const prop = defineProps(['viewer']);
const store = useStore();
const ORDERS = computed(() => store.getters.ORDERS);
let USER_DETAILS_GLOBAL: any = ref(null)
let store_id = ref(null)

onMounted(async () => {
    await iniUserDetails()
    await getOrders()
    await initWebsockets()
})

const initWebsockets = async () => {
    const echo = window.echo;
    const Pusher = window.Pusher;
    echo.channel('channel-OrderEvent' + USER_DETAILS_GLOBAL.value.user_id)
        .listen('OrderEvent', (data: any) => {
            // console.log(data.result)
            getOrders()
        });
}

const iniUserDetails = async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const USER_DETAILS = computed(() => store.getters.USER_DETAILS as any);
    store_id.value = USER_DETAILS.value?.user_role_details
        ?.find((item: any) => item?.id === 3 && item?.status === 'active')
        ?.store_details[0]?.store_id ?? null;
    USER_DETAILS_GLOBAL.value = USER_DETAILS.value;
}

const getOrders = async () => {
    const payload = {
        params: {
            mode: prop.viewer,
            store_id: store_id.value
        }
    }
    await store.dispatch('GET_ORDERS', payload).then(() => {
        // console.log(ORDERS)
    })
}


const formatDate = (date: any) => {
    return moment(date).format('MMMM D, YYYY - hh:mm A')
};


</script>