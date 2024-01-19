<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <OrderDetailsDialog />
            <CustomerOrders :viewer="'customer'"/>
        </ion-content>
        <OrdersFooter/>
    </ion-page>
</template>
  
<script setup >
import { IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu, closeOutline } from 'ionicons/icons';
import Toolbar from "../../components/toolbar.vue";
import CustomerOrders from "../../list/Orders.vue";
import { computed, ref, watch } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { useStore } from 'vuex';
import OrdersFooter from "../../components/OrdersFooter.vue";
import OrderDetailsDialog from "@/views/modal/OrderDetailsDialog.vue";


const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);


</script>