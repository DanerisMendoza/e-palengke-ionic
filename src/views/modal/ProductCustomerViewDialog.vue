<template>
    <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.44" :breakpoints="[0,0.44,1]">
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h2>Store Name:</h2>
                        <p>{{ SELECTED_STORE.name }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Address</h2>
                        <p>{{ SELECTED_STORE.address }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Contact</h2>
                        <p>{{ SELECTED_STORE.storeOwner.phone_number }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Store Type Details</h2>
                        <ion-chip v-for="(detail, index) in SELECTED_STORE.store_type_details" :key="index" class="mr-2"
                            style="font-size: smaller;">
                            {{ detail.name }}
                        </ion-chip>
                    </ion-label>
                </ion-item>
                <ion-searchbar></ion-searchbar>
                <swiper>
                    <swiper-slide v-for="(item, index) in PRODUCT">
                        <ion-card>
                            <ion-card-header>
                                <ion-card-title> {{ item.name }}</ion-card-title>
                            </ion-card-header>
                            <ion-card-subtitle>Price: ₱{{ item.price }}</ion-card-subtitle>
                            <ion-card-subtitle>Stock: {{ item.stock }}</ion-card-subtitle>

                            <ion-card-content>
                                <img :src="item.base64img" alt=""  />
                            </ion-card-content>
                            <ion-button  fill="solid">Add To Cart</ion-button>
                        </ion-card>
                    </swiper-slide>
                </swiper>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>
<script lang="ts" setup>
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonSearchbar,
    IonChip
} from '@ionic/vue';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { watch } from 'vue';

const store = useStore();
const SELECTED_STORE = computed(() => store.getters.SELECTED_STORE);
const PRODUCT = computed(() => store.getters.PRODUCT);
// store.dispatch("GET_PRODUCT_BY_ID", SELECTED_STORE.id).then((response)=>{
//     console.log(response)
// })
watch(SELECTED_STORE, (newValue, oldValue) => {
    console.log(SELECTED_STORE.value.id)
    store.dispatch("GET_PRODUCT_BY_ID", SELECTED_STORE.value.id).then((response) => {
        console.log(response)
    })
});
</script>