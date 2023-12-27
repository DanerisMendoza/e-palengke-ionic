<template>
    <div>
        <!-- First Swiper -->
        <swiper @swiper="setFirstSwiper">
            <swiper-slide v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index">
                <ion-card>
                    <ion-card-content>
                        <ion-card-header>
                            <ion-card-title>{{ item }}</ion-card-title>
                        </ion-card-header>
                    </ion-card-content>
                </ion-card>
            </swiper-slide>
        </swiper>

        <!-- Second Swiper -->
        <swiper @swiper="setSecondSwiper" :slides-per-view="3">
            <swiper-slide v-for="(item, index) in [1, 2, 3, 4, 5, 6]" :key="index">
                <ion-card @click="onSecondSwiperCardClick(index)">
                    <ion-card-content>
                        <ion-card-header>
                            <ion-card-title>{{ item }}</ion-card-title>
                        </ion-card-header>
                    </ion-card-content>
                </ion-card>
            </swiper-slide>
        </swiper>
    </div>
</template>
  
<script>
import { ref } from 'vue';
import { Controller } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/vue';

export default {
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        const firstSwiper = ref(null);

        const setFirstSwiper = (swiper) => {
            firstSwiper.value = swiper;
            console.log(firstSwiper.value)
        };

        const onSecondSwiperCardClick = (index) => {
            console.log(firstSwiper.value)
            firstSwiper.value.slideTo(index);
        };

        return {
            Controller,
            firstSwiper,
            setFirstSwiper,
            onSecondSwiperCardClick,
        };
    },
};
</script>
