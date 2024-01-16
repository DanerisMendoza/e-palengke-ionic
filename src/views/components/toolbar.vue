<template>
    <ion-header>
        <ion-toolbar color="primary">
            <ion-buttons slot="start">
                <ion-menu-toggle>
                    <ion-button>
                        <ion-icon slot="start" :icon="menu"></ion-icon>
                    </ion-button>
                </ion-menu-toggle>
            </ion-buttons>
            <ion-title slot="start">{{ $route.name }}</ion-title>
            <!-- <p slot="end">{{ USER_DETAILS.first_name }}</p> -->
            <img :src="PROFILE_PATH" slot="end" alt="" width="50"  />
        </ion-toolbar>
    </ion-header>
</template>
  
<script setup lang="ts">
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
const store = useStore();
const PROFILE_PATH = computed(() => store.getters.PROFILE_PATH);
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);

</script>