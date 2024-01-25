<template>
    <ion-page>
        <Toolbar />
        <ion-content>
            <OrderDetailsDialog :viewer="'store'"/>
            <CustomerOrders :viewer="'store'"/>
        </ion-content>
        <OrdersFooter/>
    </ion-page>
</template>
  
<script setup lang="ts">
import { IonFooter, IonChip, IonGrid, IonRow, IonCol, IonSelectOption, IonSelect, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import Toolbar from "../../components/toolbar.vue";
import OrdersFooter from "../../components/OrdersFooter.vue";
import CustomerOrders from "../../list/Orders.vue";
import OrderDetailsDialog from "@/views/modal/OrderDetailsDialog.vue";

</script>