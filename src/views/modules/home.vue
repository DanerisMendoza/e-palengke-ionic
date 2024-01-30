<template>
  <ion-page>
    <Toolbar />
    <ion-content>
      <ion-card>
        <ion-card-content>
          <swiper-container slides-per-view="2" loop="true" pagination="true" css-mode="true" :autoplay="{ delay: 3000 }">
            <swiper-slide v-for="(item, index) in deliveryImages" :key="index">
              <img :src="item" alt="" style="height: 150px;" />
            </swiper-slide>
          </swiper-container>
        </ion-card-content>
      </ion-card>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonImg, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import { register } from 'swiper/element/bundle';
import Toolbar from "@/views/components/toolbar.vue";
import delivery1 from '@/assets/home/delivery.png';
import delivery2 from '@/assets/home/delivery2.png';
import delivery3 from '@/assets/home/delivery3.png';
import delivery4 from '@/assets/home/delivery4.png';
import delivery5 from '@/assets/home/delivery5.png';

register();
const deliveryImages = [delivery1, delivery2, delivery3, delivery4, delivery5];
</script>

