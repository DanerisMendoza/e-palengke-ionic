<template>
    <ion-page>
        <Toolbar />
        <ion-content class="center-content ion-padding-top">
            <ion-toggle v-model="isRunning" class="ion-padding-bottom">Start Shift</ion-toggle>
            <mapComp :sidenavViewer="'delivery'" />
            <ion-card v-if="isRunning && TRANSACTION.length">
                <ion-card-content>
                    <ion-list>
                        <ion-list-header>New Order Incoming</ion-list-header>
                        <ion-item>
                            <ion-label>
                                <h3>Customer Name: {{ TRANSACTION[0]?.customer_name }}</h3>
                                <h3>Customer Address: {{ TRANSACTION[0]?.customer_address }}</h3>
                                <h3>Status: {{ TRANSACTION[0]?.status }}</h3>
                                <h3>Contact: {{ TRANSACTION[0]?.phone_number }}</h3>
                            </ion-label>
                        </ion-item>
                    </ion-list>
                    <ion-item-divider></ion-item-divider>
                    <ion-list v-for="(item, index) in TRANSACTION[0]?.orders" :key="index">
                        <ion-item>
                            <ion-label>Store Name: {{ item.name }}</ion-label>
                        </ion-item>
                        <ion-item>
                            <ion-label>Store Address: {{ item.address }}</ion-label>
                        </ion-item>
                        <ion-list v-for="(item2, index2) in item.order_details" :key="index2">
                            <ion-item>
                                {{ item2.quantity }} {{ item2.name }} ₱{{ item2.price }}
                            </ion-item>
                        </ion-list>
                        <ion-item-divider v-if="TRANSACTION[0].orders.length != (index + 1)"></ion-item-divider>
                    </ion-list>
                </ion-card-content>
            </ion-card>

            <ion-list v-else>
                <ion-list-header>
                    <ion-skeleton-text :animated="true" style="width: 80px"></ion-skeleton-text>
                </ion-list-header>
                <ion-item>
                    <ion-thumbnail slot="start">
                        <ion-skeleton-text :animated="true"></ion-skeleton-text>
                    </ion-thumbnail>
                    <ion-label>
                        <h3>
                            <ion-skeleton-text :animated="true" style="width: 80%;"></ion-skeleton-text>
                        </h3>
                        <p>
                            <ion-skeleton-text :animated="true" style="width: 60%;"></ion-skeleton-text>
                        </p>
                        <p>
                            <ion-skeleton-text :animated="true" style="width: 30%;"></ion-skeleton-text>
                        </p>
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
        <ion-footer v-if="loaded">
            <ion-toolbar>
                <ion-grid>
                    <ion-row v-if="TRANSACTION[0]?.status == 'Pending'">
                        <ion-col size="5">
                            <ion-button :strong="true" fill="solid" color="danger" @click="DECLINE_ORDER">Decline
                                Order</ion-button>
                        </ion-col>
                        <ion-col size="5">
                            <ion-button :strong="true" fill="solid" color="success" @click="ACCEPT_TRANSACTION">Accept
                                Order</ion-button>
                        </ion-col>
                        <ion-col size="2">
                            <ion-chip>{{ remainingSeconds }}s</ion-chip>
                        </ion-col>
                    </ion-row>
                    <ion-row v-else-if="TRANSACTION[0]?.status == 'To Pickup'">
                        <ion-col size="12">
                            <ion-button :strong="true" fill="solid" @click="PICKUP_ORDERS">Pickup</ion-button>
                        </ion-col>
                    </ion-row>
                    <ion-row v-else-if="TRANSACTION[0]?.status == 'Picked up'">
                        <ion-col size="12">
                            <ion-button :strong="true" fill="solid" @click="DROP_OFF">Drop off</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </ion-toolbar>
            <ion-progress-bar :value="progress" v-if="TRANSACTION[0]?.status == 'Pending'"></ion-progress-bar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonChip, IonProgressBar, IonCol, IonRow, IonGrid, IonFooter, IonItemDivider, IonCard, IonCardContent, IonSkeletonText, IonLabel, IonThumbnail, IonListHeader, IonList, IonToggle, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import mapComp from "@/views/components/map.vue";
import { computed, ref, watch } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { useStore } from 'vuex';

const store = useStore();
const loaded = ref(false)
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const TRANSACTION = computed(() => store.getters.TRANSACTION);
const CURRENT_TRANSACTION_ID = computed(() => store.getters.CURRENT_TRANSACTION_ID);
const circleRadius = ref(50)
const countdown = ref(0)
const defaultCountdown = ref(10)
const isRunning = ref(false)
const hasDeliver = ref(false)
const newOrder = ref(false)
let progress = ref(1);
let intervalId: any = null

// Define constants for progress duration and decrement interval
const decrementIntervalMilliseconds = 50; // Interval at which progress is updated in milliseconds
const remainingSeconds = ref(defaultCountdown.value)

// Calculate total updates and decrement value
const totalUpdates = (defaultCountdown.value * 1000) / decrementIntervalMilliseconds;
const decrementValue = 1 / totalUpdates;

let declinedTransactions: Array<number> = [];

watch(circleRadius, (newValue, oldValue) => {
    store.commit("CIRCLE_RADIUS", newValue * 3);
});

watch(isRunning, (newValue, oldValue) => {
    if (newValue) {
        FIND_NEAR_BY()
    } else {
        clearInterval(intervalId);
        store.commit('ORDER_STORE_LAT_LNG', [])
        store.commit('TRANSACTION', [])
        declinedTransactions = [];
        newOrder.value = false
        loaded.value = false
        progress.value = 1
        countdown.value = 0
    }
});

const decrementProgress = () => {
    if (progress.value > 0) {
        progress.value -= decrementValue;
        remainingSeconds.value = Math.ceil(progress.value * defaultCountdown.value);
    }
    else {
        clearInterval(intervalId);
        store.commit('ORDER_STORE_LAT_LNG', [])
        store.commit('TRANSACTION', [])
        newOrder.value = false
        loaded.value = false
        progress.value = 1
        countdown.value = 0
    }
};

const GET_IN_PROGRESS_TRANSACTION = () => {
    const payload = {
        params: {
            user_id: USER_DETAILS.value.user_id,
        }
    }
    store.dispatch('GET_IN_PROGRESS_TRANSACTION', payload).then((response: any) => {
        if (response.length > 0) {
            console.log(response)
            store.commit('TRANSACTION', response)
            store.commit('CURRENT_TRANSACTION_ID', response[0].transaction_id)
            store.commit('ORDER_STORE_LAT_LNG', TRANSACTION.value[0].orders)
            isRunning.value = true
            hasDeliver.value = true
            loaded.value = true
        }
        else {
            isRunning.value = false
            hasDeliver.value = false
        }
    })
}

const DECLINE_ORDER = () => {
    countdown.value = 0
    // clearInterval(intervalId);
}

const ACCEPT_TRANSACTION = () => {
    countdown.value = 0
    hasDeliver.value = true
    const payload = {
        transaction_id: CURRENT_TRANSACTION_ID.value,
        user_id: USER_DETAILS.value.user_id,
    }
    store.dispatch('ACCEPT_TRANSACTION', payload).then(() => {
        GET_IN_PROGRESS_TRANSACTION()
    })
}

const PICKUP_ORDERS = () => {
    const payload = {
        transaction_id: CURRENT_TRANSACTION_ID.value,
        user_id: USER_DETAILS.value.user_id,
    }
    store.dispatch('PICKUP_ORDERS', payload).then((response) => {
        if (response != null) {
            GET_IN_PROGRESS_TRANSACTION()
        }
    })
}

const DROP_OFF = () => {
    const payload = {
        transaction_id: CURRENT_TRANSACTION_ID.value,
    }
    store.dispatch('DROP_OFF', payload).then((response) => {
        if (response == 'success') {
            isRunning.value = false
            hasDeliver.value = false
        }
    })
}


const FIND_NEAR_BY = async () => {
    console.log('finding order...')
    console.log(declinedTransactions)
    const userDetails = (USER_DETAILS as any).value.user_role_details
    const targetItem = userDetails.find((item: any) => item.id === 4 && item.status === 'active');
    const latitude = targetItem.delivery_details[0].latitude
    const longitude = targetItem.delivery_details[0].longitude
    const payload = {
        latitude: latitude,
        longitude: longitude,
        radius: circleRadius.value * 3,
        user_id: (USER_DETAILS as any).value.user_id,
        declinedTransactions: declinedTransactions
    }
    await store.dispatch('FIND_ORDER_WITHIN_RADIUS', payload).then(async (response: any) => {
        if (response.length === 0) {
            // if see nothing find again delay 3 seconds
            await new Promise((resolve) => setTimeout(resolve, 3000));
            if (isRunning.value && !hasDeliver.value) {
                FIND_NEAR_BY()
            }
        }
        else {
            // find new order success delay 5 seconds before reflect
            // await new Promise((resolve) => setTimeout(resolve, 2000));
            if (isRunning.value && !hasDeliver.value) {
                intervalId = setInterval(decrementProgress, decrementIntervalMilliseconds);
                loaded.value = true
                store.commit('TRANSACTION', response)
                store.commit('ORDER_STORE_LAT_LNG', TRANSACTION.value[0].orders)
                newOrder.value = true
                countdown.value = defaultCountdown.value
                //new order popup
                while (newOrder.value && countdown.value > 0 && !hasDeliver.value && isRunning.value) {
                    countdown.value--
                    await new Promise((resolve) => setTimeout(resolve, 1000));
                    //countdown finish
                    if (isRunning.value && countdown.value <= 0) {
                        if (!hasDeliver.value) {
                            declinedTransactions.push(TRANSACTION.value[0].transaction_id)
                            store.commit('ORDER_STORE_LAT_LNG', [])
                            store.commit('TRANSACTION', [])
                            FIND_NEAR_BY()
                        }
                    }
                }
            }
        }
    })
}
onIonViewWillEnter(async () => {
    await store.dispatch("GetUserDetails").then(async (response) => {
        //Set Leaflet Coordinates by userdetails
        GET_IN_PROGRESS_TRANSACTION()
        const latitude = USER_DETAILS.value.customer_locations.latitude
        const longitude = USER_DETAILS.value.customer_locations.longitude
        store.commit("MARKER_LAT_LNG", [0, 0])
        store.commit("CENTER", [0, 0])
        store.commit("MARKER_LAT_LNG", [latitude, longitude])
        store.commit("CENTER", [latitude, longitude])
        store.commit("ZOOM", 17)
        //Set Store Coordinates
        await store.dispatch("GetActiveStore").then((response) => {
            const latLngArr = response.map((item: any) => {
                return [item.latitude, item.longitude];
            });
            store.commit("STORES_LAT_LNG", latLngArr);
        });
        store.commit("PRODUCT_TABLE_VIEWER", "STORE");
        store.commit("PRODUCT", []);
    });
});

</script>

<style>
.center-content {
    text-align: center;
}
</style>