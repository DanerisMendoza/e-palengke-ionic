<template>
    <ion-page>
        <Toolbar />
        <ion-content class="center-content ion-padding-top">
            <ion-toggle class="ion-padding-bottom">Start Shift</ion-toggle>
            <mapComp :sidenavViewer="'delivery'" />
            <ion-list v-if="loaded">
                <ion-list-header>ORDERS</ion-list-header>
                <ion-item>
                    <ion-thumbnail slot="start">
                        <!-- <ion-icon style="width: 100%; height: 100%" :icon="musicalNotes"></ion-icon> -->
                    </ion-thumbnail>
                    <ion-label>
                        <h3>Abbey Road</h3>
                        <p>The Beatles</p>
                        <p>1969</p>
                    </ion-label>
                </ion-item>
            </ion-list>

            <ion-list v-if="!loaded">
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
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonSkeletonText, IonLabel, IonThumbnail,IonListHeader, IonList, IonToggle, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import mapComp from "@/views/components/map.vue";
import { computed, ref, watch } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { useStore } from 'vuex';

const store = useStore();
const loaded = ref(false)
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