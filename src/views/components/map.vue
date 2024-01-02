<template>
    <ProductCustomerViewDialog v-if="sidenavViewer === 'store'" />
    <ion-button v-if="sidenavViewer === 'store'" ref="myButton" id="open-modal" expand="block"
        v-show="isButtonVisible"></ion-button>
    <CartDialog />
    <ion-button v-if="sidenavViewer === 'store'" id="CartButton" color="light" class="buttons" @click="viewCart">
        <ion-icon color="primary" :icon="cart"></ion-icon>
    </ion-button>
    <l-map ref="mapRef" :zoom="zoom" :center="center" id="leafletMap" v-if="lmapShow">
        <!-- <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" name="OpenStreetMap"></l-tile-layer> -->
        <l-tile-layer :url="googleStreets.url" :maxZoom="googleStreets.maxZoom"
            :subdomains="googleStreets.subdomains"></l-tile-layer>
        <!-- current marker(dynamic icon) -->
        <l-marker v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :icon="computedMarker"></l-marker>
        <!-- multiple marker(stores) -->
        <l-marker v-if="sidenavViewer === 'store'" v-for="(item, index) in storeMarkersInsideCircle" 
            :key="index" :lat-lng="item" :icon="isMarkerSelected(item,index)" @click="go(item,index)">
        </l-marker>
        <!-- radius -->
        <l-circle v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :radius="circleRadius" :fill="true"
            :fill-opacity="0.1" :color="'#1919FF'" :weight="0.5" style="cursor: move"></l-circle>
    </l-map>
</template>
  
<script >
import { defineComponent, onMounted, onBeforeUnmount, ref } from 'vue';
import { IonModal, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter, IonIcon, } from '@ionic/vue';
import "leaflet/dist/leaflet.css";
import { LMap, LTileLayer, LMarker, LIcon, LCircle, LTooltip, LPopup, LControlZoom } from "@vue-leaflet/vue-leaflet";
import L from 'leaflet';
import { mapGetters } from 'vuex';
import personMarker from '@/assets/markers/customerMarker.png';
import sellerMarker from '@/assets/markers/sellerMarker2.png';
import deliveryMarker from '@/assets/markers/deliveryMarker2.png';
import ProductCustomerViewDialog from "@/views/modal/ProductCustomerViewDialog.vue";
import CartDialog from "@/views/modal/CartDialog.vue";
import { cart, time, alert } from 'ionicons/icons';
import selectedMarker from '@/assets/markers/selectedMarker.png';


export default defineComponent({
    components: {
        ProductCustomerViewDialog,
        IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton,
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
        IonIcon,
        IonModal,
        CartDialog
    },

    props: {
        sidenavViewer: String
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


        storeMarkersInsideCircle() {
            return this.STORES_LAT_LNG.filter(marker => {
                const distance = L.latLng(marker).distanceTo(L.latLng(this.MARKER_LAT_LNG));
                return distance <= this.circleRadius;
            });
        },
    },

    watch: {
        MARKER_LAT_LNG: {
            handler(val) {
                this.center = this.CENTER;
                this.zoom = this.ZOOM;
                // this.$refs.mapRef.mapObject.setView(this.center, this.zoom);
            },
        },

        ORDER_STORE_LAT_LNG: {
            handler(val) {
                // console.log(val)
            },
        },
        CIRCLE_RADIUS: {
            handler(val) {
                this.circleRadius = val
            },
        },
        STORES_LAT_LNG: {
            handler(val) {
                // this.zoom = 12;
                // console.log(val[0])
                // console.log(this.STORES_LAT_LNG)
            },
        }
    },

    methods: {
        isMarkerSelected(marker,index) {
            return index === this.pin ? this.selectedMarker : this.sellerMarker
        },
        checkData(data) {
            console.log(data)
        },
        viewCart() {
            // this.$store.dispatch("GET_CART").then((response) => {
            //     console.log(this.CART)
            // });
        },
        async go(item,index) {
            this.pin = index;
            const buttonRef = this.$refs.myButton;
            if (buttonRef) {
                // Programmatically trigger a click on the native HTML button
                const buttonElement = buttonRef.$el;
                if (buttonElement && buttonElement.click) {
                    buttonElement.click();
                } else {
                    console.error('Unable to programmatically click the button');
                }
            }
            const matchingBranch = this.STORES.find((branch) => {
                return branch.latitude === item[0] && branch.longitude === item[1];
            });
            this.$store.commit('SELECTED_STORE', matchingBranch)
        },
        getTooltipContent(item) {
            const matchingBranch = this.STORES.find((branch) => {
                return branch.latitude === item[0] && branch.longitude === item[1];
            });
            let details = `
            <div>
            <center><strong style='color:#eb8f34;'>${matchingBranch.name}</strong></center><br>
            <center><style='color:#eb8f34;'>
          `;
            for (let i = 0; i < matchingBranch.store_type_details.length; i++) {
                if (i == matchingBranch.store_type_details.length - 1) {
                    details += `${matchingBranch.store_type_details[i].name}`;
                }
                else {
                    details += `${matchingBranch.store_type_details[i].name},`;
                }
            }
            details += `</center></div>`
            return details
        },
    },

    data() {
        return {
            cart,
            pin: null,
            selectedMarker: L.icon({
                iconUrl: selectedMarker,
                iconSize: [25, 41],
                iconAnchor: [10, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
            }),
            googleStreets: {
                url: 'http://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
                maxZoom: 20,
                subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            },
            isButtonVisible: false,
            mapReady: false,
            personMarker: L.icon({
                iconUrl: personMarker,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
            }),
            sellerMarker: L.icon({
                iconUrl: sellerMarker,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
            }),
            deliveryMarker: L.icon({
                iconUrl: deliveryMarker,
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                tooltipAnchor: [16, -28],
            }),
            center: [14.653341002411047, 120.99472379571777],
            zoom: 7,
            markerLatLng: [35.6769883, 139.7588499],
            circleRadius: 50 * 3,

        };
    },

    // beforeDestroy(){
    //     console.log('before destroy')
    // }

    // async mounted() {

    //     // await new Promise((resolve) => setTimeout(resolve, 3000));
    //     // this.lmapShow = false
    //     // console.log(this.$refs.mapRef)
    //     // const map = this.$refs.mapRef.mapObject; // Accessing the Leaflet map instance
    //     // // map.remove(); // Destroy the Leaflet map
    //     // this.$refs.mapRef.mapObject = null;
    // },
    // destroyed(){
    //     console.log('destroy')
    //     this.lmapShow = false
    // },

    setup() {
        const lmapShow = ref(true);
        // onMounted(() => {
        //     // Initialize the Leaflet map here if needed
        //     console.log('mounted')
        // });

        onBeforeUnmount(() => {
            // console.log('before unmounted')
            // lmapShow.value = false
        });

        return {
            lmapShow
        };
    },

});
</script>
<style>
.buttons {
    right: 1%;
    position: absolute;
    z-index: 401;
}
</style>