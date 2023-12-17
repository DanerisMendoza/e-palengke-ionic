<template>
    <ion-modal ref="modal" trigger="open-modal" :initial-breakpoint="0.25" :breakpoints="[0, 0.25, 0.5, 0.75, 1]" >
        <ion-content class="ion-padding">
            <ion-list>
                <ion-item>
                    <ion-label>
                        <h2>Store Name:</h2>
                        <p>{{ SELECTED_STORE.name }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Address</h2>
                        <p>{{ SELECTED_STORE.address }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Contact</h2>
                        <p>{{ SELECTED_STORE.storeOwner.phone_number }}</p>
                    </ion-label>
                </ion-item>
                <ion-item>
                    <ion-label>
                        <h2>Store Type Details</h2>
                        <ion-chip  v-for="(detail, index) in SELECTED_STORE.store_type_details" :key="index" class="mr-2"
                        style="font-size: smaller;">
                        {{ detail.name }}
                      </ion-chip >
                    </ion-label>
                </ion-item>
            </ion-list>
        </ion-content>
    </ion-modal>
</template>
<script lang="ts" setup>
import {
    IonButton,
    IonModal,
    IonHeader,
    IonContent,
    IonToolbar,
    IonTitle,
    IonItem,
    IonList,
    IonAvatar,
    IonImg,
    IonLabel,
    IonSearchbar,
    IonChip 
} from '@ionic/vue';
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex'; 
const store = useStore();
const SELECTED_STORE = computed(() => store.getters.SELECTED_STORE);
</script>