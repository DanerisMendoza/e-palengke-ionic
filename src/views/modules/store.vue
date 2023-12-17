<template>
    <ion-page>
        <Toolbar/>
        <ion-content>
            <mapComp />
        </ion-content>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonButtons,IonMenuToggle, IonIcon,IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import mapComp from "@/views/components/map.vue";
import Toolbar from "@/views/components/toolbar.vue";
import { menu } from 'ionicons/icons';

</script>