<template>
  <ion-page>
    <Toolbar />
    <ion-content>
      <h1 class="ion-padding-start" style="text-transform: capitalize; ">
        Hi <span style="color: #3880ff;">{{ USER_DETAILS.name }}</span>
      </h1>
      <ion-card>
        <ion-card-content>
          <swiper-container slides-per-view="2" loop="true" pagination="true" css-mode="true" :autoplay="{ delay: 3000 }">
            <swiper-slide v-for="(item, index) in deliveryImages" :key="index">
              <img :src="item" alt="" style="height: 150px;" />
            </swiper-slide>
          </swiper-container>
        </ion-card-content>
      </ion-card>
      <ion-card class="ion-padding">
        <ion-card-content>
          <ion-list>
            <ion-item lines="none"><ion-icon :icon="wallet" color="primary"></ion-icon>
              <span style="margin-left: 2px;">e-Palengke Wallet: </span>
              <span style="color: #3880ff; margin-left: 2px;"> ₱{{ USER_DETAILS.balance }}</span></ion-item>
          </ion-list>
        </ion-card-content>
      </ion-card>
      <p class="ion-padding-start ion-padding-top"> Store type</p>
      <swiper-container slides-per-view="4" loop="true" :autoplay="{ delay: 4000 }" :spaceBetween="50">
        <swiper-slide class="ion-padding-start"
          v-for="(item, index) in ['Grocery', 'Clothing', 'Electronics', 'Bookstore', 'Hardware', 'Pharmacy']" :key="index">
          <ion-chip color="primary">
            {{ item }}
          </ion-chip>
        </swiper-slide>
      </swiper-container>
      <p class="ion-padding-start ion-padding-top">Product type</p>
      <swiper-container slides-per-view="3" loop="true" :autoplay="{ delay: 3000 }">
        <swiper-slide class="ion-padding-start" v-for="(item, index) in PRODUCT_TYPE_DETAIL" :key="index">
          <ion-chip color="primary">
            <img :src="item.base64img" alt="" style="height: 40px;" />
          </ion-chip>
        </swiper-slide>
      </swiper-container>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonList, IonCardContent, IonCard, IonImg, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import { useStore } from 'vuex';
import { computed, ref } from 'vue';
import Toolbar from "@/views/components/toolbar.vue";
import delivery1 from '@/assets/home/delivery.png';
import delivery2 from '@/assets/home/delivery2.png';
import delivery3 from '@/assets/home/delivery3.png';
import delivery4 from '@/assets/home/delivery4.png';
import delivery5 from '@/assets/home/delivery5.png';
import { wallet, time, alert } from 'ionicons/icons';
register();
const store = useStore();
const deliveryImages = [delivery1, delivery2, delivery3, delivery4, delivery5];
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
const PRODUCT_TYPE_DETAIL = computed(() => store.getters.PRODUCT_TYPE_DETAIL);
console.log(USER_DETAILS)
store.dispatch('GET_PRODUCT_TYPE_DETAIL').then((response:any)=>{
  console.log(response)
})
</script>

