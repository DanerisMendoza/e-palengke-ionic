<template>
    <ion-content :fullscreen="true">
        <l-map ref="map" :zoom="zoom" :use-global-leaflet="false" :center="center">
            <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" layer-type="base"
                name="OpenStreetMap"></l-tile-layer>
        </l-map>
    </ion-content>
</template>
  
<script >
import { defineComponent } from 'vue';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LCircle, LTooltip, LPopup, LControlZoom } from "@vue-leaflet/vue-leaflet";
import { mapGetters } from 'vuex';


export default defineComponent({
    components: {
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
        LMap,
        LTileLayer,
        LMarker,
        LMap,
        LTileLayer,
        LMarker,
        LCircle,
        LTooltip,
        LPopup,
        LControlZoom,
    },

    computed: {
        ...mapGetters([
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

        computedMarker() {
            if (this.sidenavViewer === 'store') {
                return this.personMarker
            }
            else if (this.sidenavViewer === 'application') {
                if (this.SELECTED_USER_ROLE_DETAILS === 3) {
                    return this.sellerMarker
                }
                else if (this.SELECTED_USER_ROLE_DETAILS === 4) {
                    return this.deliveryMarker
                }
            }
            else if (this.sidenavViewer === 'registration') {
                return this.personMarker
            }
            else if (this.sidenavViewer === 'delivery') {
                return this.deliveryMarker
            }
        },

        // watch: {
        //     MARKER_LAT_LNG: {
        //         handler(val) {
        //             // console.log(val)
        //             this.center = this.CENTER;
        //             this.zoom = this.ZOOM;
        //             this.$refs.map.mapObject.setView(this.center, this.zoom);
        //         },
        //     },

        //     ORDER_STORE_LAT_LNG: {
        //         handler(val) {
        //             // console.log(val)
        //         },
        //     },
        //     CIRCLE_RADIUS: {
        //         handler(val) {
        //             this.circleRadius = val
        //         },
        //     },
        //     STORES_LAT_LNG: {
        //         handler(val) {
        //             // console.log(this.STORES_LAT_LNG)
        //         },
        //     }
        // },

        storeMarkersInsideCircle() {
            return this.STORES_LAT_LNG.filter(marker => {
                const distance = L.latLng(marker).distanceTo(L.latLng(this.MARKER_LAT_LNG));
                return distance <= this.circleRadius;
            });
        },
    },


    data() {
        return {
            center: [14.653341002411047, 120.99472379571777],
            zoom: 7,
            markerLatLng: [35.6769883, 139.7588499]

        };
    },
});
</script>