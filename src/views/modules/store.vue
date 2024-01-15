<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <mapComp :sidenavViewer="'store'" />
        </ion-content>
        <ion-footer>
            <ion-toolbar color="default">
                <ion-range v-model="circleRadius" aria-label="Volume" mode="ios" ></ion-range>
            </ion-toolbar>
        </ion-footer>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonFooter, IonRange, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { onIonViewWillEnter } from '@ionic/vue';
import mapComp from "@/views/components/map.vue";
import Toolbar from "@/views/components/toolbar.vue";
import { computed} from 'vue';
import { useStore } from 'vuex';
import { ref } from 'vue';
import { watch} from 'vue';

const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const circleRadius = ref(50)

watch(circleRadius, (newValue, oldValue) => {
    store.commit("CIRCLE_RADIUS", newValue * 3);
});

onIonViewWillEnter(async () => {

    await store.dispatch("GetUserDetails").then(async (response) => {
        //Set Leaflet Coordinates by userdetails
        const latitude = USER_DETAILS.value.customer_locations.latitude
        const longitude = USER_DETAILS.value.customer_locations.longitude
        store.commit("MARKER_LAT_LNG", [0, 0])
        store.commit("CENTER", [0, 0])
        store.commit("MARKER_LAT_LNG", [latitude, longitude])
        store.commit("CENTER", [latitude, longitude])
        store.commit("ZOOM", 18)
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