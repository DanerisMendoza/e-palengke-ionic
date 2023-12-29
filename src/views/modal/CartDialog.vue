<template>
    <ion-modal ref="modal" trigger="CartButton" @willPresent="onPresent">
        <ion-header>
            <ion-toolbar>
                <ion-button @click="cancel()" fill="clear" slot="start">
                    <ion-icon :icon="arrowBack" color="dark"></ion-icon>
                </ion-button>
                <ion-title style="text-align: center; margin-right: 2rem;">CART</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content class="ion-padding">
            <ion-list>
                <ion-grid v-for="item in CART">
                    <ion-row>
                        <ion-col size="4"> <img :src="item.base64img" alt=""
                                style="height: 100px; width: 100px; object-fit: cover;" /></ion-col>
                        <ion-col size="8">
                            <ion-row>
                                <ion-col size="1"></ion-col>
                                <ion-col><strong>{{ item.name }}</strong></ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="1"></ion-col>
                                <ion-col>{{ item.store_name }}</ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="1"></ion-col>
                                <ion-col>₱{{ item.price }}</ion-col>
                            </ion-row>
                            <ion-row>
                                <ion-col size="1"></ion-col>
                                <ion-col size="2.3"><ion-button fill="outline" color="dark"
                                        @click="deacreaseQuantity(item)"><strong>-</strong></ion-button></ion-col>
                                <ion-col size="2.5"><ion-button fill="outline" color="dark"><strong>{{ item.quantity
                                }}</strong></ion-button></ion-col>
                                <ion-col size="2.3"><ion-button fill="outline" color="dark"
                                        @click="increaseQuantity(item)"><strong>+</strong></ion-button></ion-col>
                            </ion-row>
                        </ion-col>
                    </ion-row>
                    <ion-item-divider></ion-item-divider>
                </ion-grid>
            </ion-list>
        </ion-content>
        <ion-footer>
            <ion-toolbar>
                <ion-button slot="end" :strong="true" fill="solid" color="danger" @click="checkout">Check out</ion-button>
            </ion-toolbar>
        </ion-footer>
    </ion-modal>
</template>

<script  >
import { IonItemDivider, IonFooter, IonCol, IonGrid, IonRow, IonHeader, IonToolbar, IonButtons, IonTitle, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonContent, IonIcon, IonItem, IonList, IonImg, IonLabel, IonSearchbar, IonChip, IonAccordion, IonAccordionGroup } from '@ionic/vue';
import { ref, onMounted, defineComponent } from 'vue';
import { mapGetters } from "vuex";
import { arrowBack, cart, time, alert } from 'ionicons/icons';
import { alertController } from '@ionic/vue';

export default defineComponent({
    components: {
        IonItemDivider, IonIcon, IonFooter, IonCol, IonGrid, IonRow, IonHeader, IonToolbar, IonButtons, IonTitle, IonInput, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButton, IonModal, IonContent, IonIcon, IonItem, IonList, IonImg, IonLabel, IonSearchbar, IonChip, IonAccordion, IonAccordionGroup
    },
    methods: {
        async increaseQuantity(item) {
            if (item.stock > 0) {
                item.stock -= 1;
                item.quantity += 1;
                const payload = {
                    product_id: item.id,
                };
                await this.$store.dispatch("INCREASE_CART_PRODUCT", payload);
            }
            else {
                const alert = await alertController.create({
                    header: 'Warning',
                    message: 'Out Of Stock!',
                    buttons: ['OK'],
                });
                await alert.present();
            }
        },
        async deacreaseQuantity(item) {
            item.stock += 1;
            item.quantity -= 1;
            if (item.quantity <= 0) {
                const newCart = this.CART.filter((item2) => item2 !== item);
                this.$store.commit("CART", newCart);
            }
            const payload = {
                product_id: item.id,
            };
            await this.$store.dispatch("DECREASE_CART_PRODUCT", payload);
        },
        cancel() {
            this.$refs.modal.$el.dismiss(null, 'cancel');
        },
        async onPresent() {
            await this.$store.dispatch("GET_CART")
        },
        checkout() {
      
        }
    },
    computed: {
        ...mapGetters(["CART", "SELECTED_STORE"]),
    },
    data() {
        return {
            arrowBack,
        }
    }
});
</script>