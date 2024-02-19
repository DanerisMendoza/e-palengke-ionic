<template>
    <!-- store components -->
    <ProductCustomerViewDialog v-if="sidenavViewer === 'store'" />
    <ion-button v-if="sidenavViewer === 'store'" ref="myButton" id="open-modal" expand="block"
        v-show="isButtonVisible"></ion-button>
    <CartDialog v-if="sidenavViewer === 'store'" />
    <ion-list v-if="sidenavViewer === 'store'" class="ionList">
        <ion-item lines="none">
            <ion-select :selectedText="STORE_TYPE_FILTER" @ionChange="selectChange($event.detail.value)">
                <ion-select-option>All</ion-select-option>
                <template v-for="(item, index) in STORE_TYPE_DETAIL">
                    <ion-select-option :value="item.name">{{ item.name }}</ion-select-option>
                </template>
            </ion-select>
        </ion-item>
    </ion-list>
    <ion-button v-if="sidenavViewer === 'store'" id="CartButton" color="primary" class="buttons">
        <ion-icon :icon="cart"></ion-icon>
    </ion-button>
    <!-- leaflet map -->
    <l-map ref="mapRef" :zoom="zoom" :center="center" id="leafletMap" :style="mapStyle">
        <!-- <l-tile-layer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" name="OpenStreetMap"></l-tile-layer> -->
        <l-tile-layer url='https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png'></l-tile-layer>
        <!-- <l-tile-layer :url="googleStreets.url" :maxZoom="googleStreets.maxZoom"
            :subdomains="googleStreets.subdomains"></l-tile-layer> -->
        <!-- current marker(dynamic icon) -->
        <LRoutingMachine v-bind="routingOptions" v-if="sidenavViewer === 'store'" />
        <l-marker v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :icon="computedMarker"></l-marker>
        <!-- multiple marker(stores) -->
        <l-marker v-if="sidenavViewer === 'store'" v-for="(item, index) in storeMarkersInsideCircle" :key="item"
            :lat-lng="item" :icon="isMarkerSelected(item, index)" @click="go(item, index)">
        </l-marker>
        <!-- multiple marker(delivery) -->
        <l-marker v-if="sidenavViewer === 'delivery' && TRANSACTION.length != 0"
            v-for="(item, index) in ORDER_STORE_LAT_LNG" ref="markers" :key="item"
            :lat-lng="{ lat: item.latitude, lng: item.longitude }" :icon="sellerMarker">
        </l-marker>

        <!-- radius -->
        <l-circle v-if="MARKER_LAT_LNG !== null" :lat-lng="MARKER_LAT_LNG" :radius="circleRadius" :fill="true"
            :fill-opacity="0.1" :color="'#1919FF'" :weight="0.5" style="cursor: move"></l-circle>

    </l-map>
</template>
  
<script >
import { defineComponent, onMounted, onBeforeUnmount, ref, reactive } from 'vue';
import { IonList, IonSelect, IonSelectOption, IonModal, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter, IonIcon, } from '@ionic/vue';
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
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import "leaflet/dist/leaflet.css";
import LRoutingMachine from "./LRoutingMachine.vue";

export default {
    components: {
        IonList, IonItem, IonSelect, IonSelectOption,
        LRoutingMachine,
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
            "STORE_TYPE_DETAIL",
            "STORE",
            "STORE_TYPE_FILTER",
        ]),

        mapStyle() {
            if (this.sidenavViewer === 'delivery') {
                return {
                    border: '0.5px solid #000',
                    height: '200px',
                    width: '300px',
                    margin: 'auto',
                };
            }
        },

        computedMarker() {
            if (this.sidenavViewer === 'store' || this.sidenavViewer === 'testgps') {
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
        },
        STORE_TYPE_FILTER: {
            handler(val) {
                if (val != 'All') {
                    const filterVal = this.STORES.filter(store => {
                        return store.store_type_details.some((detail) => detail.name === val);
                    });
                    const latLngArr = filterVal.map((item) => {
                        return [item.latitude, item.longitude];
                    });
                    this.$store.commit("STORES_LAT_LNG", latLngArr);
                }
                else {
                    const latLngArr = this.STORES.map(item => {
                        return [item.latitude, item.longitude];
                    });
                    this.$store.commit("STORES_LAT_LNG", latLngArr);
                }
            },
        },
    },

    methods: {
        selectChange(data) {
            this.$store.commit('STORE_TYPE_FILTER', data)
            this.$store.commit('SELECTED_STORE', null)
            this.pin = null;
        },

        isMarkerSelected(marker, index) {
            return index === this.pin ? this.selectedMarker : this.sellerMarker
        },
        checkData(data) {
            console.log(data)
        },

        async go(item, index) {
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
            this.routingOptions.waypoints[1] = [matchingBranch.latitude, matchingBranch.longitude]
        },
    },

    data() {
        return {
            routingOptions: {
                waypoints: [
                    [null, null]
                    [null, null]
                ],
                lineOptions: {
                    styles: [{ color: 'blue', opacity: 1, weight: 5 }]
                },
                createMarker: false
            },
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


    async mounted() {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        await this.$store.dispatch('GET_STORE_TYPE_DETAIL').then((response) => {
            // console.log(response)
        })
        this.routingOptions.waypoints[0] = this.MARKER_LAT_LNG
    },

    setup() {
        const lmapShow = ref(true);
        const mapRef = ref(true);
        onMounted(() => {

        });

        onBeforeUnmount(() => {
            // lmapShow.value = false
        });

        return {
            lmapShow,
            mapRef,
        };
    },

};
</script>
<style>
.ionList {
    position: absolute;
    z-index: 401;
    border-radius: 15px;
    /* Adjust the value to change the roundness */
    overflow: hidden;
    opacity: 85%;
    top: 1%;
    left: 50%;
    transform: translate(-50%);
}

.buttons {
    right: 1%;
    position: absolute;
    z-index: 401;
}

.leaflet-control-attribution.leaflet-control {
    display: none;
}

.leaflet-routing-container {
    display: none !important;
}
</style>