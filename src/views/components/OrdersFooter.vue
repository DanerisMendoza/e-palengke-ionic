<template>
    <ion-footer>
        <ion-toolbar>
            <ion-grid>
                <ion-row>
                    <ion-col size="12">
                        <ion-select aria-label="Fruit" v-model="selectedStatus" placeholder="ORDER STATUS"
                            interface="action-sheet" mode="md" @ionChange="handleChange">
                            <ion-select-option value="Pending">PENDING</ion-select-option>
                            <ion-select-option value="Preparing">PREPARING</ion-select-option>
                            <ion-select-option value="To Ship">TO-SHIP</ion-select-option>
                            <ion-select-option value="To Receive">TO RECEIVE</ion-select-option>
                            <ion-select-option value="Received">RECEIVED</ion-select-option>
                            <ion-select-option value="Completed">COMPLETED</ion-select-option>
                        </ion-select>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </ion-toolbar>
    </ion-footer>
</template>
  
<script setup lang="ts">
import { IonFooter, IonChip, IonGrid, IonRow, IonCol, IonSelectOption, IonSelect, IonButtons, IonMenuToggle, IonIcon, IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonItem, IonInput, IonButton, useIonRouter } from '@ionic/vue';
import { menu, closeOutline } from 'ionicons/icons';
import OrderDetailsDialog from "@/views/modal/OrderDetailsDialog.vue";
import { computed, ref, watch } from 'vue';
import { onIonViewWillEnter } from '@ionic/vue';
import { useStore } from 'vuex';

const store = useStore();
const USER_DETAILS = computed(() => store.getters.USER_DETAILS);
let selectedStatus = ref('Pending')
store.commit('SELECTED_ORDER_STATUS', selectedStatus.value)

const handleChange = () => {
    // console.log(ev.detail.value)
    // console.log(selectedStatus.value)
    store.commit('SELECTED_ORDER_STATUS', selectedStatus.value)
}
</script>