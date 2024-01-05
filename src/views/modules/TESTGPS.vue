<template>
    <ion-page>
        <Toolbar />
        <ion-content class="ion-padding">
            <h1>{{ coord }}</h1>
            <mapComp :sidenavViewer="'testgps'" />
        </ion-content>
    </ion-page>
</template>
  
<script>
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter, IonImg } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import Toolbar from "@/views/components/toolbar.vue";
import { Camera, CameraResultType } from '@capacitor/camera';
import mapComp from "@/views/components/map.vue";
import { mapGetters } from 'vuex';
import { Geolocation } from '@capacitor/geolocation';
import { Toast } from '@capacitor/toast';


export default {
    components: {
        IonPage, IonContent, Toolbar, IonButton, mapComp, Toast
    },
    data() {
        return {
            coord: 'coordinates'
        };
    },
    methods: {

    },
    computed: {
        ...mapGetters([
            "CART",
            "CENTER",
            "ZOOM",
            "CIRCLE_RADIUS",
            "MARKER_LAT_LNG",
            "SELECTED_REQUIREMENT",
            "SELECTED_USER_ROLE_DETAILS",
            "STORES_LAT_LNG",
            "STORES",
            "USER_INSIDE_RADIUS",
            "TRANSACTION",
            "ORDER_STORE_LAT_LNG",
            "SELECTED_STORE",
        ]),
    },
    async mounted() {
        const coordinates = await Geolocation.getCurrentPosition();
        const latitude = coordinates.coords.latitude;
        const longitude = coordinates.coords.longitude;
        await Toast.show({
            text: `Latitude: ${latitude}, Longitude: ${longitude}`,
        });
        this.$store.commit("MARKER_LAT_LNG", [latitude, longitude])
        this.$store.commit("CENTER", [latitude, longitude])
        this.$store.commit("ZOOM", 16)
    }
};
</script>