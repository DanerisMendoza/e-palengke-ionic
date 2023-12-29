<template>
    <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.44" :breakpoints="[0, 0.44, 1]" @willPresent="onPresent">
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

                <ion-item>
                    <ion-label>
                        <ion-accordion-group>
                            <ion-accordion value="first">
                                <ion-item slot="header" color="light">
                                    <ion-icon :icon="time"></ion-icon>
                                    <ion-label>SCHEDULE</ion-label>
                                </ion-item>
                                <div class="ion-padding" slot="content">MONDAY {{ SELECTED_STORE.monday }}</div>
                                <div class="ion-padding" slot="content">TUESDAY {{ SELECTED_STORE.tuesday }}</div>
                                <div class="ion-padding" slot="content">WEDNESDAY {{ SELECTED_STORE.wednesday }}</div>
                                <div class="ion-padding" slot="content">THURSDAY {{ SELECTED_STORE.thursday }}</div>
                                <div class="ion-padding" slot="content">FRIDAY {{ SELECTED_STORE.friday }}</div>
                                <div class="ion-padding" slot="content">SATURDAY {{ SELECTED_STORE.saturday }}</div>
                                <div class="ion-padding" slot="content">SUNDAY {{ SELECTED_STORE.sunday }}</div>
                            </ion-accordion>
                        </ion-accordion-group>
                    </ion-label>
                </ion-item>

                <ion-searchbar></ion-searchbar>
                <swiper @swiper="onSwiper">
                    <swiper-slide v-for="(item, index) in PRODUCT">
                        <ion-card>
                            <ion-card-content>
                                <img :src="item.base64img" alt="" style="height: 300px; width: 300px; object-fit: cover;"/>
                            </ion-card-content>
                            <ion-card-header>
                                <ion-card-title> {{ item.name }}</ion-card-title>
                            </ion-card-header>
                            <ion-card-subtitle>Price: ₱{{ item.price }}</ion-card-subtitle>
                            <ion-card-subtitle>Stock: {{ item.stock }}</ion-card-subtitle>

                            <ion-button v-if="item.stock > 0" shape="round" fill="solid" color="dark" class="ion-margin" @click="addToCart(item)">
                                <ion-icon slot="start" :icon="cart"></ion-icon>
                                Add To Cart
                            </ion-button>
                            <ion-button v-else shape="round" fill="solid" color="light" class="ion-margin" >
                                <ion-icon slot="end" :icon="alert"></ion-icon>
                                out of stock
                            </ion-button>
                        </ion-card>
                    </swiper-slide>
                </swiper>
                <swiper :slides-per-view="3">
                    <swiper-slide v-for="(item, index) in PRODUCT" @click="logIndex(index)">
                        <ion-card>
                            <ion-card-content>
                                <img :src="item.base64img" alt="" style="height: 100px; width: 100px; object-fit: cover;" />
                            </ion-card-content>
                        </ion-card>
                    </swiper-slide>
                </swiper>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>
<script setup>
import { IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonContent, IonIcon, IonItem, IonList, IonImg, IonLabel, IonSearchbar, IonChip, IonAccordion, IonAccordionGroup } from '@ionic/vue';
import 'swiper/css';
import '@ionic/vue/css/ionic-swiper.css';
import { Swiper, SwiperSlide } from 'swiper/vue';
import { computed, onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import { watch } from 'vue';
import { cart, time, alert } from 'ionicons/icons';
import { alertController } from '@ionic/vue';

const store = useStore();
const SELECTED_STORE = computed(() => store.getters.SELECTED_STORE);
const PRODUCT = computed(() => store.getters.PRODUCT);

const firstSwiper = ref(null);
const onSwiper = (swiper) => {
    firstSwiper.value = swiper;
};

const logIndex = (index) => {
    firstSwiper.value.slideTo(index);
};

const onPresent = ()=> {
    store.dispatch("GET_PRODUCT_BY_ID", SELECTED_STORE.value.id)
}

const addToCart = async(item) => {
    console.log(item)
    console.log(item.stock)
    if (item.stock - 1 >= 0) {
        item.stock -= 1;
        const payload = {
            product_id: item.id,
            store_id: item.store_id,
            quantity: 1,
        };
        store.dispatch("ADD_CART_PRODUCT", payload).then((response) => {
            console.log(response)
        });
    } else {
        const alert = await alertController.create({
            header: 'Warning',
            message: 'Quantity is greater than Stocks!',
            buttons: ['OK'],
            cssClass: 'ios-alert'
        });
        await alert.present();
    }
}

// watch(SELECTED_STORE, (newValue, oldValue) => {
//     store.dispatch("GET_PRODUCT_BY_ID", SELECTED_STORE.value.id)
// });
</script>