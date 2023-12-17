<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <!-- <ProductCustomerViewDialog /> -->
            <!-- <ion-button id="open-modal" expand="block"></ion-button> -->
            <mapComp :sidenavViewer="'store'" />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import ProductCustomerViewDialog from "@/views/modal/ProductCustomerViewDialog.vue";
import mapComp from "@/views/components/map.vue";
import Toolbar from "@/views/components/toolbar.vue";
import { menu } from 'ionicons/icons';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'; 

const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
interface ActiveStoreItem {
    latitude: string;
    longitude: string;
}

const registeredLocation = () => {
    const latitude = USER_DETAILS.value.customer_locations.latitude
    const longitude = USER_DETAILS.value.customer_locations.longitude
    store.commit("MARKER_LAT_LNG", [0, 0])
    store.commit("CENTER", [0, 0])
    store.commit("MARKER_LAT_LNG", [latitude, longitude])
    store.commit("CENTER", [latitude, longitude])
    store.commit("ZOOM", 17)
}
const getActiveStore = () => {
    store.dispatch("GetActiveStore").then((response) => {
        const latLngArr = response.map((item: ActiveStoreItem) => {
            return [item.latitude, item.longitude];
        });
        store.commit("STORES_LAT_LNG", latLngArr);
    });
    store.commit("PRODUCT_TABLE_VIEWER", "STORE");
    store.commit("PRODUCT", []);
}
const delayFunc = () => {
    setTimeout(() => {
        registeredLocation();
        getActiveStore();
    }, 1000);
}
delayFunc()
</script>