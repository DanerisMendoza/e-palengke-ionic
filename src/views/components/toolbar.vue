<template>
    <ion-header>
        <ion-toolbar>
            <ion-buttons slot="start">
                <ion-menu-toggle>
                    <ion-button>
                        <ion-icon slot="start" :icon="menu"></ion-icon>
                    </ion-button>
                </ion-menu-toggle>
            </ion-buttons>
            <ion-title>{{ $route.name }}</ion-title>
        </ion-toolbar>
    </ion-header>
</template>
  
<script setup lang="ts">
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu } from 'ionicons/icons';

</script>