<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-button @click="cancel()" fill="clear" slot="start">
                    <ion-icon :icon="arrowBack" color="light"></ion-icon>
                </ion-button>
                <ion-title style="text-align: center; margin-right: 2rem;">PRODUCTS</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <h3 style="translate: 40%;">{{ PRODUCT_TYPE_FILTER.name }}</h3>
            <div class="grid">
                <ion-card v-for="(item, index) in PRODUCT" :key="index" class="flex">
                    <ion-card-content style="padding-bottom: 0%;">
                        <img :src="item.base64img" alt="" style="height: 100px; width: 100%; object-fit: cover;" />
                    </ion-card-content>
                    <ion-card-header>
                        <ion-card-title style="font-size: 4vw;"> {{ item.name }}</ion-card-title>
                    </ion-card-header>
                        <ion-card-subtitle>Price: ₱{{ item.price }}</ion-card-subtitle>
                        <ion-card-subtitle>Stock: {{ item.stock }}</ion-card-subtitle>
                        <ion-button v-if="item.stock > 0" shape="round" fill="solid" color="dark" size="small" @click="addToCart(item)">
                            <ion-icon slot="start" :icon="cart"></ion-icon>
                            Add To Cart
                        </ion-button>
                </ion-card>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from 'vue';
import { IonCardSubtitle,IonCardTitle,IonCardHeader, IonCard,IonCardContent,IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { useStore } from 'vuex';
import { alertController } from '@ionic/vue';
import { useRoute, useRouter } from 'vue-router';
import { arrowBack, cart, time, alert } from 'ionicons/icons';
import Store from '@/api/modules/Store';
import Product from '@/store/modules/Product/interface';

const ionRouter = useIonRouter();
const store = useStore();
const PRODUCT_TYPE_FILTER = computed(() => store.getters.PRODUCT_TYPE_FILTER);
const PRODUCT = computed(() => store.getters.PRODUCT);

const cancel = () => {
    ionRouter.replace('/HOME');
}
const addToCart = async (item: any) => {
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
const payload = {
    params: {
        id: PRODUCT_TYPE_FILTER.value.id,
        name: PRODUCT_TYPE_FILTER.value.name,
    }
}
store.dispatch('GET_PRODUCT_BY_TYPE', payload).then((response: Product[]) => {
    console.log(response)
})


</script>

<style>
.grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
.flex{
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>